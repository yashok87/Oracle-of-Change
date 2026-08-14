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
  const textItems: { index: number; text: string; type: string }[] = [];
  ruBlocks.forEach((b: any, idx: number) => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' || (b.type === 'image' && b.caption)) {
      textItems.push({ index: idx, text: b.text || b.caption || '', type: b.type });
    }
  });

  const translations = new Map<number, string>();
  const batchSize = 15;
  const totalBatches = Math.ceil(textItems.length / batchSize);

  console.log(`Starting translation of ${textItems.length} items in ${totalBatches} batches...`);

  for (let i = 0; i < textItems.length; i += batchSize) {
    const batchNum = Math.floor(i / batchSize) + 1;
    const chunk = textItems.slice(i, i + batchSize);
    console.log(`Executing batch ${batchNum}/${totalBatches}...`);

    const prompt = `You are an expert literary and theological translator. Translate the following items from Russian to lyrical, dignified English. The text is from Jacob Kelbert's spiritual pilgrimage memoir 'Walks Around the Island' in Cyprus.
Keep Orthodox Christian terms, Greek names, and proper nouns accurate (Papa Haralampios, Fr. Alexey, Anthony of Sourozh, Natalia Trauberg, St. Neophytos, Toni Hotel, Trooditissa, etc.).

Return ONLY a JSON array in format:
[{"id": 0, "en": "..."}]

Input:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}`;

    try {
      const raw = await callInteractions(prompt);
      const clean = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed)) {
        parsed.forEach((item: any) => {
          if (item && typeof item.id === 'number' && item.en) {
            translations.set(item.id, item.en);
          }
        });
      }
    } catch (e: any) {
      console.error(`Batch ${batchNum} error:`, e.message);
    }
  }

  const enBlocks = ruBlocks.map((b: any, idx: number) => {
    if (b.type === 'image') {
      return { ...b, caption: translations.get(idx) || b.caption };
    } else if (b.type === 'divider') {
      return { ...b };
    } else {
      return { ...b, text: translations.get(idx) || b.text };
    }
  });

  fs.writeFileSync('en_blocks.json', JSON.stringify(enBlocks, null, 2));
  console.log(`Saved en_blocks.json! Total translated items: ${translations.size}/${textItems.length}`);
}

run().catch(console.error);
