import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

try {
  if (typeof (process as unknown as { loadEnvFile?: () => void }).loadEnvFile === 'function') {
    (process as unknown as { loadEnvFile: () => void }).loadEnvFile();
  }
} catch {
  // Ignore missing .env file
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const POLLINATIONS_BASE_URL = 'https://gen.pollinations.ai';

function getServerPollinationsKey(): string {
  const envKey = (process.env.POLL_KEY || process.env.POLLINATIONS_API_KEY || '').trim();
  if (envKey && !envKey.startsWith('pk_')) {
    return envKey;
  }
  return 'sk_s9fBvD7M4jvepKyDhnxcsFABr9f5qs0b';
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).setHeader('Cache-Control', 'no-store').type('text/plain').send('OK');
  });
  app.head('/health', (_req: Request, res: Response) => {
    res.status(200).setHeader('Cache-Control', 'no-store').end();
  });

  // Proxy chat completions to Pollinations without exposing the secret key to the browser
  app.post('/api/pollinations/chat', async (req: Request, res: Response) => {
    try {
      const apiKey = getServerPollinationsKey();
      const upstream = await fetch(`${POLLINATIONS_BASE_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(req.body ?? {}),
      });

      const text = await upstream.text();
      const contentType = upstream.headers.get('content-type') || 'application/json';
      res.status(upstream.status).type(contentType).send(text);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Pollinations chat proxy error';
      console.error('[Backend] Pollinations chat proxy failed:', message);
      res.status(502).json({ error: { message } });
    }
  });

  // Proxy image generation to Pollinations without exposing the secret key in image URLs
  app.get('/api/pollinations/image', async (req: Request, res: Response) => {
    try {
      const rawPrompt = typeof req.query.prompt === 'string' ? req.query.prompt : 'abstract-void-chaos';
      const params = new URLSearchParams();

      for (const paramKey of ['width', 'height', 'nologo', 'seed', 'model'] as const) {
        const val = req.query[paramKey];
        if (typeof val === 'string' && val.length > 0) {
          params.set(paramKey, val);
        }
      }

      const apiKey = getServerPollinationsKey();
      const queryString = params.toString();
      const targetUrl = `${POLLINATIONS_BASE_URL}/image/${encodeURIComponent(rawPrompt)}${queryString ? `?${queryString}` : ''}`;

      const upstream = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!upstream.ok) {
        const errText = await upstream.text();
        res.status(upstream.status).send(errText || 'Pollinations image request failed');
        return;
      }

      const contentType = upstream.headers.get('content-type') || 'image/jpeg';
      const cacheControl = upstream.headers.get('cache-control') || 'public, max-age=31536000, immutable';
      const arrayBuffer = await upstream.arrayBuffer();

      res.status(200);
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', cacheControl);
      res.send(Buffer.from(arrayBuffer));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Pollinations image proxy error';
      console.error('[Backend] Pollinations image proxy failed:', message);
      res.status(502).json({ error: { message } });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
