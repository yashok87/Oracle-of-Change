import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
console.log("Using GEMINI_API_KEY:", !!apiKey);

const ruBlocks = JSON.parse(fs.readFileSync('ru_blocks.json', 'utf-8'));

async function translate() {
  const ai = new GoogleGenAI({ apiKey });

  const textItems: { index: number; text: string; type: string }[] = [];
  ruBlocks.forEach((b: any, idx: number) => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' || (b.type === 'image' && b.caption)) {
      textItems.push({ index: idx, text: b.text || b.caption || '', type: b.type });
    }
  });

  console.log(`Translating ${textItems.length} text items...`);
  const translations = new Map<number, string>();
  const batchSize = 10;

  for (let i = 0; i < textItems.length; i += batchSize) {
    const chunk = textItems.slice(i, i + batchSize);
    const prompt = `Translate the following array of items from Russian to lyrical, dignified English. The text is from a spiritual travel memoir 'Walks Around the Island' in Cyprus by Jacob Kelbert. Keep proper names intact.
Return ONLY a valid JSON array:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}

Format:
[{"id": 0, "en": "..."}]`;

    try {
      console.log(`Translating batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(textItems.length / batchSize)}...`);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text || '[]');
      parsed.forEach((item: any) => {
        translations.set(item.id, item.en);
      });
    } catch (e: any) {
      console.error(`Error on batch ${i}:`, e?.message || e);
    }
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
  console.log("Successfully wrote en_blocks.json!");
}

translate().catch(console.error);
