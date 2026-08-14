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
          if (parsed.error) {
            return reject(new Error(parsed.error.message || JSON.stringify(parsed.error)));
          }
          // Extract text from steps
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

async function translateAll() {
  const textItems: { index: number; text: string; type: string }[] = [];
  ruBlocks.forEach((b: any, idx: number) => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' || (b.type === 'image' && b.caption)) {
      textItems.push({ index: idx, text: b.text || b.caption || '', type: b.type });
    }
  });

  console.log(`Translating ${textItems.length} items using gemini-3.1-flash-lite-preview...`);
  const translations = new Map<number, string>();
  const batchSize = 10;

  for (let i = 0; i < textItems.length; i += batchSize) {
    const chunk = textItems.slice(i, i + batchSize);
    console.log(`Batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(textItems.length / batchSize)}...`);

    const prompt = `You are translating Jacob Kelbert's spiritual travel memoir 'Walks Around the Island' ('Прогулки по острову') in Cyprus from Russian to dignified, literary, contemplative English. Preserve Orthodox Christian terms, names (Papa Haralampios, Fr. Alexey, Anthony of Sourozh, Natalia Trauberg, Paphos, etc.), dialogue nuance, and formatting.

Translate the following items. Output ONLY valid JSON array with no extra markdown fences or surrounding commentary.
Format:
[{"id": 0, "en": "..."}]

Input:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}`;

    try {
      const raw = await callInteractions(prompt);
      const cleanJson = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed)) {
        parsed.forEach((item: any) => {
          if (item && typeof item.id === 'number' && item.en) {
            translations.set(item.id, item.en);
          }
        });
      }
    } catch (e: any) {
      console.error(`Batch ${i} error:`, e.message);
      // Wait slightly and retry once
      try {
        await new Promise(r => setTimeout(r, 2000));
        const raw = await callInteractions(prompt);
        const cleanJson = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            if (item && typeof item.id === 'number' && item.en) {
              translations.set(item.id, item.en);
            }
          });
        }
      } catch (err2: any) {
        console.error(`Retry failed for batch ${i}`);
      }
    }

    // Small delay between calls
    await new Promise(r => setTimeout(r, 500));
  }

  const enBlocks = ruBlocks.map((b: any, idx: number) => {
    if (b.type === 'image') {
      return {
        ...b,
        caption: translations.get(idx) || b.caption
      };
    } else if (b.type === 'divider') {
      return { ...b };
    } else {
      return {
        ...b,
        text: translations.get(idx) || b.text
      };
    }
  });

  fs.writeFileSync('en_blocks.json', JSON.stringify(enBlocks, null, 2));
  console.log(`Finished! Saved en_blocks.json (${enBlocks.length} blocks, translated: ${translations.size}/${textItems.length})`);
}

translateAll().catch(console.error);
