import { GoogleGenAI, Type } from "@google/genai";
import { LogicResult, LogicMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTIONS = `<system_instructions>
  You are a Logic Router. Your ONLY job is to categorize and execute based on the user's grammar.
  
  <mode_definitions>
    <comparison>
      Trigger: "vs", "or", "compare".
      Action: 10-way philosopher vote.
    </comparison>
    <recommendation>
      Trigger: Nouns/Items/Media requests (e.g., "movie", "laptop").
      Action: Direct metadata + Price. NO FILLER.
    </recommendation>
    <decision>
      Trigger: "Should I", "Act/Wait".
      Action: Firm YES/NO + 1 sentence logic.
    </decision>
    <knowledge>
      Trigger: "What is", "Where is".
      Action: Ontological synthesis.
    </knowledge>
  </mode_definitions>

  <few_shot_examples>
    Input: "Tea or coffee?"
    Thought: User used 'or' between two nouns.
    Mode: COMPARISON
    Output: [Philosopher Vote Results]

    Input: "Movie for tonight"
    Thought: User is asking for a media item.
    Mode: RECOMMENDATION
    Output: [Title] ([Year]) - [Price]
  </few_shot_examples>

  <strict_constraints>
    - Never use introductory phrases like "Here is a recommendation" or "Prime offers..."
    - If the user says "Movie", you MUST provide a Title. If you talk about "diverse catalogs," you have failed.
    - Start every internal process by identifying the Mode.
  </strict_constraints>
</system_instructions>

Respond with JSON format.
Example schema:
{
  "mode": "COMPARISON | RECOMMENDATION | DECISION | KNOWLEDGE",
  "thought": "Internal reasoning process identifying the mode",
  "output": "The core response as described in the mode action",
  "metadata": {
    "title": "optional string (for recommendations)",
    "year": "optional string",
    "price": "optional string",
    "firmValue": "optional 'YES' | 'NO' (for decisions)",
    "logicSentence": "optional 1 sentence logic"
  }
}`;

export async function processLogic(input: string, chaosLevel: number = 0): Promise<LogicResult> {
  // We can use chaosLevel to adjust temperature or prompt emphasis if needed, 
  // but for the basic Router we stick to the core instructions first.
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp", // or latest available
    contents: [
      { role: "user", parts: [{ text: input }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS,
      responseMimeType: "application/json",
      temperature: chaosLevel / 100, // Chaos level maps to temperature
    }
  });

  try {
    const text = response.text || "";
    const data = JSON.parse(text);
    return {
      mode: data.mode as LogicMode,
      thought: data.thought,
      output: data.output,
      metadata: data.metadata ? {
        recommendation: data.mode === 'RECOMMENDATION' ? {
          title: data.metadata.title || '',
          year: data.metadata.year || '',
          price: data.metadata.price || ''
        } : undefined,
        decision: data.mode === 'DECISION' ? {
          firm: data.metadata.firmValue as 'YES' | 'NO',
          logic: data.metadata.logicSentence || ''
        } : undefined
      } : undefined
    };
  } catch (e) {
    console.error("Failed to parse logic router response", e, response.text);
    throw new Error("Logic Routing Fragmented.");
  }
}
