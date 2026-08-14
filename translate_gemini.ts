import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ruBlocks = JSON.parse(fs.readFileSync('ru_blocks.json', 'utf-8'));

async function translate() {
  const ai = new GoogleGenAI({ apiKey });

  const textItems: { index: number; text: string; type: string }[] = [];
  ruBlocks.forEach((b: any, idx: number) => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' || (b.type === 'image' && b.caption)) {
      textItems.push({ index: idx, text: b.text || b.caption || '', type: b.type });
    }
  });

  console.log(`Translating ${textItems.length} text items using gemini-2.5-flash...`);
  const translations = new Map<number, string>();
  const batchSize = 12;

  for (let i = 0; i < textItems.length; i += batchSize) {
    const chunk = textItems.slice(i, i + batchSize);
    const prompt = `Translate the following items from Russian to lyrical, dignified English. The text is from Jacob Kelbert's spiritual travel memoir 'Walks Around the Island' ('Прогулки по острову') set in Cyprus.
Keep Orthodox Christian terms, Greek names, and proper nouns accurate (e.g. Papa Haralampios, Fr. Alexey, Anthony of Sourozh, Natalia Trauberg, St. Neophytos Enkleistra, Paphos, Limassol, Toni Hotel, Trooditissa, etc.).

Return ONLY a valid JSON array matching this format:
[
  {"id": 0, "en": "..."}
]

Input items:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}`;

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
  console.log(`Successfully generated and saved en_blocks.json (${enBlocks.length} blocks)!`);
}

translate().catch(console.error);
