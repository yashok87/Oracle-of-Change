import fs from 'fs';
import https from 'https';

const apiKey = process.env.GEMINI_API_KEY;
const ruBlocks = JSON.parse(fs.readFileSync('ru_blocks.json', 'utf-8'));

function callInteractions(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'gemini-3.1-flash-lite-preview',
      input: prompt
    });

    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/interactions?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          let resultText = '';
          if (parsed.steps) {
            for (const step of parsed.steps) {
              if (step.content) {
                for (const part of step.content) {
                  if (part.text) resultText += part.text;
                }
              }
            }
          }
          resolve(resultText);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  const currentEn = fs.existsSync('en_blocks.json') ? JSON.parse(fs.readFileSync('en_blocks.json', 'utf-8')) : [];
  const translations = new Map<number, string>();

  // Check what's already translated
  currentEn.forEach((b: any, idx: number) => {
    if (b.text && b.text.length > 5 && !/[а-яА-ЯёЁ]/.test(b.text)) {
      translations.set(idx, b.text);
    }
  });

  const pendingItems: { index: number; text: string }[] = [];
  ruBlocks.forEach((b: any, idx: number) => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' || (b.type === 'image' && b.caption)) {
      const text = b.text || b.caption || '';
      if (text.trim() && text.trim() !== '***') {
        if (!translations.has(idx)) {
          pendingItems.push({ index: idx, text });
        }
      }
    }
  });

  console.log(`Pending items to translate: ${pendingItems.length} (Already translated: ${translations.size})`);

  // Batch into chunks of 8
  const batchSize = 8;
  const chunks: { index: number; text: string }[][] = [];
  for (let i = 0; i < pendingItems.length; i += batchSize) {
    chunks.push(pendingItems.slice(i, i + batchSize));
  }

  // Worker function to process chunks with concurrency
  let nextChunkIdx = 0;
  async function worker(workerId: number) {
    while (nextChunkIdx < chunks.length) {
      const chunkIndex = nextChunkIdx++;
      const chunk = chunks[chunkIndex];
      console.log(`[Worker ${workerId}] Processing chunk ${chunkIndex + 1}/${chunks.length} (${chunk.length} items)...`);

      const prompt = `Translate each numbered Russian passage below into natural, literary, and engaging English. The passages are from Jacob Kelbert's travelogue memoir 'Walks Around the Island' in Cyprus.
Keep proper names (Fr. Haralampios, Fr. Alexey, Anthony of Sourozh, Natalia Trauberg, St. Neophytos, Toni Hotel, Trooditissa, etc.) accurate.
Output format: Return ONLY a valid JSON array of objects: [{"id": <number>, "en": "<translated text>"}]

Items:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}`;

      try {
        const raw = await callInteractions(prompt);
        const match = raw.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          parsed.forEach((item: any) => {
            if (item && item.id !== undefined && item.en) {
              translations.set(item.id, item.en);
            }
          });
          console.log(`[Worker ${workerId}] Chunk ${chunkIndex + 1} succeeded! Total translated: ${translations.size}`);
        } else {
          console.warn(`[Worker ${workerId}] Chunk ${chunkIndex + 1} no JSON found.`);
        }
      } catch (e: any) {
        console.error(`[Worker ${workerId}] Chunk ${chunkIndex + 1} error:`, e.message);
      }

      // Save progress to file
      const updatedEn = ruBlocks.map((b: any, idx: number) => {
        if (b.type === 'image') {
          return { ...b, caption: translations.get(idx) || b.caption };
        } else if (b.type === 'divider') {
          return { ...b };
        } else {
          return { ...b, text: translations.get(idx) || b.text };
        }
      });
      fs.writeFileSync('en_blocks.json', JSON.stringify(updatedEn, null, 2));
    }
  }

  // Run 3 concurrent workers
  await Promise.all([worker(1), worker(2), worker(3)]);
  console.log(`ALL WORKERS FINISHED. Total translated: ${translations.size}`);
}

run().catch(console.error);
