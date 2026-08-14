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
      const text = b.text || b.caption || '';
      if (text.trim() && text.trim() !== '***') {
        textItems.push({ index: idx, text, type: b.type });
      }
    }
  });

  const translations = new Map<number, string>();
  const batchSize = 10;
  const totalBatches = Math.ceil(textItems.length / batchSize);

  console.log(`Translating ${textItems.length} items in ${totalBatches} batches...`);

  for (let i = 0; i < textItems.length; i += batchSize) {
    const batchNum = Math.floor(i / batchSize) + 1;
    const chunk = textItems.slice(i, i + batchSize);
    console.log(`Executing batch ${batchNum}/${totalBatches}...`);

    const prompt = `You are a translator. Translate each numbered Russian passage below into natural, lyrical English. The passages are from Jacob Kelbert's travelogue memoir 'Walks Around the Island' in Cyprus.
Translate each passage faithfully.
Output format: You MUST return ONLY a valid JSON array of objects. Do not include markdown preamble, explanations, or commentary outside JSON.
Each element: {"id": <number>, "en": "<translated string>"}

Passages to translate:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}`;

    try {
      const raw = await callInteractions(prompt);
      // Extract JSON from output
      const match = raw.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        parsed.forEach((item: any) => {
          if (item && item.id !== undefined && item.en) {
            translations.set(item.id, item.en);
          }
        });
        console.log(`Batch ${batchNum} parsed successfully! Items so far: ${translations.size}`);
      } else {
        console.warn(`Batch ${batchNum} no json match found. Raw:`, raw.slice(0, 200));
      }
    } catch (e: any) {
      console.error(`Batch ${batchNum} error:`, e.message);
    }

    // Save intermediate progress
    const intermediateEn = ruBlocks.map((b: any, idx: number) => {
      if (b.type === 'image') {
        return { ...b, caption: translations.get(idx) || b.caption };
      } else if (b.type === 'divider') {
        return { ...b };
      } else {
        return { ...b, text: translations.get(idx) || b.text };
      }
    });
    fs.writeFileSync('en_blocks.json', JSON.stringify(intermediateEn, null, 2));

    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`DONE! Total translated: ${translations.size}/${textItems.length}`);
}

run().catch(console.error);
