import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize Pollinations Client (OpenAI compatible)
  const pollinations = new OpenAI({
    apiKey: (process.env.POLL_KEY || "pollinations").trim(),
    baseURL: "https://gen.pollinations.ai/v1"
  });

  // Request logger - VERY TOP
  app.use((req, res, next) => {
    console.log(`[Server] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  
  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (req, res) => {
    console.log("[Server] Health check hit");
    res.json({ 
      status: "ok", 
      version: "1.3.5",
      timestamp: new Date().toISOString(),
      env: {
        BIGMODEL: !!process.env.BIGMODEL_API_KEY,
        POLLINATIONS: !!process.env.POLL_KEY,
        GEMINI: !!process.env.GEMINI_API_KEY,
        NODE_ENV: process.env.NODE_ENV
      }
    });
  });

  // BigModel Vision Proxy
  app.post("/api/vision", async (req, res) => {
    console.log("[Server] Vision proxy hit");
    const apiKey = process.env.BIGMODEL_API_KEY;
    if (!apiKey) {
      console.error("[Server] Vision proxy failed: Missing API Key");
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

      console.log(`[Server] BigModel API status: ${response.status}`);

      if (!response.ok) {
        const errText = await response.text();
        console.error("[Server] BigModel API Error:", response.status, errText);
        return res.status(response.status).json({ error: errText });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("[Server] BigModel Proxy Exception:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Pollinations Proxy - Using OpenAI SDK as requested
  app.post("/api/pollinations", async (req, res) => {
    console.log("[Server] Pollinations proxy hit (SDK)");
    const { prompt, seed, model, jsonMode, systemInstruction } = req.body;

    try {
      const completion = await pollinations.chat.completions.create({
        model: model || "openai",
        messages: [
          { role: "system", content: systemInstruction || "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        seed: seed || Math.floor(Math.random() * 1000000),
        response_format: jsonMode ? { type: "json_object" } : undefined,
        temperature: 0.3
      });

      if (!completion || !completion.choices || completion.choices.length === 0) {
        console.error("[Server] Pollinations SDK returned empty choices");
        return res.status(500).json({ error: "Pollinations returned empty response" });
      }

      console.log("[Server] Pollinations SDK success:", JSON.stringify(completion).substring(0, 100));
      res.json(completion);
    } catch (error: any) {
      console.error("[Server] Pollinations SDK Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Universal Image Proxy
  app.get("/api/proxy-image", async (req, res) => {
    const imageUrl = req.query.url as string;
    console.log(`[Server] Image proxy hit: ${imageUrl}`);
    if (!imageUrl) return res.status(400).send("No URL provided");

    try {
      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });

      console.log(`[Server] Image fetch status: ${response.status}`);

      if (!response.ok) {
        return res.status(response.status).send(`Failed to fetch image: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType) res.setHeader("Content-Type", contentType);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");

      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error: any) {
      console.error("[Server] Image Proxy Error:", error);
      res.status(500).send(error.message);
    }
  });

  // Catch-all for undefined API routes
  app.all("/api/*splat", (req, res) => {
    console.log(`[Server] 404 API Route: ${req.method} ${req.url}`);
    res.status(404).json({ error: `API route not found: ${req.url}` });
  });

  // --- STATIC FILES & SPA ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      console.log(`[Server] Serving static files from: ${distPath}`);
      app.use(express.static(distPath));
    } else {
      console.error(`[Server] CRITICAL: dist directory NOT found at ${distPath}`);
    }
    
    // SPA fallback - Express 5 syntax (using named wildcard)
    app.get("/*splat", (req, res) => {
      const indexPath = path.join(process.cwd(), 'dist', 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application build not found. Please run 'npm run build'.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
