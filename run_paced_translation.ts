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

  // Populate existing translations
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

  console.log(`Pending translation items: ${pendingItems.length} (Already translated: ${translations.size})`);
  if (pendingItems.length === 0) {
    console.log("All items translated!");
    return;
  }

  // Chunks of 12
  const batchSize = 12;
  const totalBatches = Math.ceil(pendingItems.length / batchSize);

  for (let i = 0; i < pendingItems.length; i += batchSize) {
    const batchNum = Math.floor(i / batchSize) + 1;
    const chunk = pendingItems.slice(i, i + batchSize);
    console.log(`Batch ${batchNum}/${totalBatches} (${chunk.length} items)...`);

    const prompt = `Translate each Russian passage into natural, dignified, and lyrical English from Jacob Kelbert's pilgrimage memoir 'Walks Around the Island' in Cyprus.
Keep names and Orthodox terms faithful.
Return ONLY valid JSON array: [{"id": <number>, "en": "<translated text>"}]

Passages:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}`;

    let success = false;
    for (let attempt = 1; attempt <= 3 && !success; attempt++) {
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
          console.log(`Batch ${batchNum} parsed successfully! Total translated now: ${translations.size}`);
          success = true;
        } else {
          console.warn(`Batch ${batchNum} attempt ${attempt} no JSON found.`);
        }
      } catch (e: any) {
        console.warn(`Batch ${batchNum} attempt ${attempt} failed: ${e.message}. Waiting 15s...`);
        await new Promise(r => setTimeout(r, 15000));
      }
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

    // Rate pacing: 6s between requests to stay safely below 15 RPM
    await new Promise(r => setTimeout(r, 6000));
  }

  console.log(`COMPLETED! Final translated count: ${translations.size}`);
}

run().catch(console.error);
