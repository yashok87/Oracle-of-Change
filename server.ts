import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  
  // Log environment status
  console.log("[Server] Environment Check:");
  console.log(`- BIGMODEL_API_KEY: ${process.env.BIGMODEL_API_KEY ? 'Present' : 'MISSING'}`);
  console.log(`- POLL_KEY: ${process.env.POLL_KEY ? 'Present' : 'MISSING'}`);
  console.log(`- GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'Present' : 'MISSING'}`);
  console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

  // BigModel Vision Proxy
  app.post("/api/vision", async (req, res) => {
    const apiKey = process.env.BIGMODEL_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "BIGMODEL_API_KEY is missing on server." });
    }

    try {
      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("[Server] BigModel API Error:", response.status, errText);
        let errorMessage = errText;
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error) errorMessage = errJson.error;
        } catch (e) {
          // Not JSON, use raw text
        }
        return res.status(response.status).json({ error: errorMessage });
      }

      const text = await response.text();
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("[Server] BigModel API expected JSON but received:", text.substring(0, 100));
        return res.status(500).json({ error: "Vision Proxy returned invalid format (not JSON)" });
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr: any) {
        console.error("[Server] BigModel API JSON parse failed:", jsonErr.message, text.substring(0, 100));
        return res.status(500).json({ error: "Upstream API returned malformed JSON" });
      }
      res.json(data);
    } catch (error: any) {
      console.error("[Server] BigModel Proxy Exception:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Pollinations Proxy (to avoid CORS and handle retries)
  app.post("/api/pollinations", async (req, res) => {
    const { prompt, seed, model, jsonMode, systemInstruction } = req.body;
    const apiKey = (process.env.POLL_KEY || "").trim();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

    try {
      // Using the newer v1/chat/completions endpoint
      const response = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: model || "openai",
          messages: [
            { role: "system", content: systemInstruction || "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          seed,
          response_format: jsonMode ? { type: "json_object" } : undefined,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("[Server] Pollinations API Error:", response.status, errText);
        let errorMessage = errText;
        try {
          if (errText.trim().startsWith('{')) {
            const errJson = JSON.parse(errText);
            if (errJson.error) errorMessage = errJson.error;
          }
        } catch (e) {
          // Not JSON, use raw text
        }
        return res.status(response.status).json({ error: errorMessage });
      }

      const text = await response.text();
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("[Server] Pollinations API expected JSON but received:", text.substring(0, 100));
        return res.status(500).json({ error: "Backend Proxy returned invalid format (not JSON)" });
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr: any) {
        console.error("[Server] Pollinations API JSON parse failed:", jsonErr.message, text.substring(0, 100));
        return res.status(500).json({ error: "Upstream API returned malformed JSON" });
      }
      res.json(data);
    } catch (error: any) {
      console.error("[Server] Pollinations Proxy Exception:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Universal Image Proxy to bypass CORS
  app.get("/api/proxy-image", async (req, res) => {
    const imageUrl = req.query.url as string;
    if (!imageUrl) return res.status(400).send("No URL provided");

    console.log(`[Server] Proxying image: ${imageUrl}`);

    let attempts = 0;
    const maxAttempts = 2;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(imageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          },
          timeout: 60000
        });

        if (!response.ok) {
          console.error(`[Server] Image fetch attempt ${attempts + 1} failed: ${response.status} ${response.statusText}`);
          if (attempts === maxAttempts - 1) {
            return res.status(response.status).send(`Failed to fetch image: ${response.statusText}`);
          }
          attempts++;
          continue;
        }

        const contentType = response.headers.get("content-type");
        if (contentType) res.setHeader("Content-Type", contentType);
        
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "public, max-age=86400");

        response.body.pipe(res);
        return;
      } catch (error: any) {
        attempts++;
        console.error(`[Server] Image Proxy Attempt ${attempts} Error:`, error.message);
        if (attempts >= maxAttempts) {
          return res.status(500).send(error.message);
        }
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  });

  // Health check endpoint for Render/Troubleshooting
  app.get("/api/health", (req, res) => {
    const healthInfo = {
      status: "ok",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };
    console.log(`[Server] Health check requested: ${JSON.stringify(healthInfo)}`);
    res.json(healthInfo);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`[Server] Production mode: serving static files from ${distPath}`);
    
    app.use(express.static(distPath, {
      index: false // We'll handle index.html manually to ensure it's the fallback
    }));

    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error(`[Server] Error sending index.html:`, err);
          res.status(500).send("Server Error: index.html not found. Did you run 'npm run build'?");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
