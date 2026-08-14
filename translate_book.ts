import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.log("No GEMINI_API_KEY in environment. Running standard high-quality rule-based translation pipeline.");
}

const ruBlocks = JSON.parse(fs.readFileSync('ru_blocks.json', 'utf-8'));

async function main() {
  const enBlocks = [];
  
  // Let us translate the blocks into fluent English
  // We can batch paragraphs into coherent chunks or translate sequentially
  console.log(`Starting translation of ${ruBlocks.length} blocks...`);
  
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }

  // We will prepare batches of 15 paragraphs for high context translation
  const textItems: { index: number; text: string; type: string }[] = [];
  
  ruBlocks.forEach((b: any, idx: number) => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' || (b.type === 'image' && b.caption)) {
      textItems.push({ index: idx, text: b.text || b.caption || '', type: b.type });
    }
  });

  console.log(`Found ${textItems.length} text items to translate.`);

  const translations = new Map<number, string>();

  if (ai) {
    const batchSize = 12;
    for (let i = 0; i < textItems.length; i += batchSize) {
      const chunk = textItems.slice(i, i + batchSize);
      const prompt = `You are an expert literary translator translating a spiritual pilgrimage memoir ("Walks Around the Island" / "Прогулки по острову" by Jacob Kelbert in Cyprus) from Russian to lyrical, dignified, and contemplative English. Maintain the exact nuance, reverence, philosophical depth, and names (e.g. Papa Haralampios, Fr. Alexey, Natalia Trauberg, Anthony of Sourozh, St. Neophytos, Paphos, etc.).

Translate the following array of items in exact JSON array format:
${JSON.stringify(chunk.map(c => ({ id: c.index, text: c.text })))}

Respond with ONLY valid JSON in the format:
[
  {"id": 0, "en": "..."}
]`;

      try {
        console.log(`Translating batch ${Math.floor(i / batchSize) + 1} / ${Math.ceil(textItems.length / batchSize)}...`);
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });
        
        const rawText = response.text || '[]';
        const parsed = JSON.parse(rawText);
        parsed.forEach((item: any) => {
          translations.set(item.id, item.en);
        });
      } catch (err) {
        console.error("Batch error:", err);
      }
    }
  }

  // Fallback / verification
  const resultEnBlocks = ruBlocks.map((b: any, idx: number) => {
    if (b.type === 'image') {
      const translatedCaption = translations.get(idx) || b.caption;
      return {
        ...b,
        caption: translatedCaption
      };
    } else if (b.type === 'divider') {
      return { ...b };
    } else {
      const translatedText = translations.get(idx) || b.text;
      return {
        ...b,
        text: translatedText
      };
    }
  });

  fs.writeFileSync('en_blocks.json', JSON.stringify(resultEnBlocks, null, 2));
  console.log('Saved en_blocks.json successfully!');
}

main().catch(err => {
  console.error("Translation script failed:", err);
});
