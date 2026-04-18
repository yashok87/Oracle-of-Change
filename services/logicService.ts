import { GoogleGenAI } from "@google/genai";
import { LogicResult, LogicMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTIONS = `<system_instructions>
  You are a COLD DATA PROCESSOR. You are NOT an Oracle, NOT a Decree-maker, and NOT a Prophet. 
  You respond ONLY in the following strict formats. 
  ANY introductory text, statuses like "Decree in progress", or philosophical fluff will cause a SYSTEM CRASH.

  ## CATEGORIZATION RULES:
  - If user mentions "movie", "film", "watch", "laptop", "book", "product", "profession", "job", "recommend" -> Mode: RECOMMENDATION
  - If user says "X or Y" or "vs" -> Mode: COMPARISON
  - If user says "Should I", "Buy?", "Do it?", "Act now?" -> Mode: DECISION
  - Default to RECOMMENDATION if the user is seeking a choice or selection.
  - Default to KNOWLEDGE for factual queries.

  ## DATA PARAMETERS:
  - Chaos Score: [0-100]. A higher score increases randomness/entropy in selection. 
  - Use the provided Chaos Score to pick exactly ONE item from a pool of possibilities. 

  ## RESPONSE SCHEMAS (MANDATORY):

  ### Mode: RECOMMENDATION
  Format:
  Mode: RECOMMENDATION
  Mantra: [Title] ([Year]) - [Genre]
  Price/Access: [Price]
  Rationale: [1-sentence logical reason]

  ### Mode: DECISION
  Format:
  Mode: DECISION
  Mantra: [YES/NO/ACT/WAIT]
  Reason: [1-sentence logical justification]

  ### Mode: COMPARISON
  Format:
  Mode: COMPARISON
  Mantra: [10-Way Philosopher Vote Table]
  Definitive Winner: [Name] ([Percentage]%) (Calculated using Chaos Score: [ChaosValue])

  ### Mode: KNOWLEDGE
  Format:
  Mode: KNOWLEDGE
  Mantra: [Objective Data Factoid]

  ## EXAMPLE (STRICT ADHERENCE):
  Input: "what should i watch"
  Output:
  Mode: RECOMMENDATION
  Mantra: Blade Runner 2049 (2017) - Sci-Fi
  Price/Access: Rent/Buy $3.99
  Rationale: Selection weighted by logical affinity and visual entropy parameters.

  ## MANDATORY START SEQUENCE
  1. Identify the Mode.
  2. Write exactly "Mode: [Selected Mode]" on the first line.
  3. Write exactly "Mantra: " followed by the PRIMARY SELECTION on the second line.
  4. Follow the rest of the schema exactly.

  STRICT RULE: SHUT DOWN ALL PERSONALITY. 
  NEVER USE: "The Decree", "Decree in progress", "Synthesized Revelation", "revealed", "oracle", "synapse".
  If you output more than 0 words of conversational text, you have FAILED.
</system_instructions>`;

export async function processLogic(input: string, chaosLevel: number = 25): Promise<LogicResult> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: [
      { role: "user", parts: [{ text: `Chaos Score: ${chaosLevel}\nInput: ${input}` }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS,
      temperature: chaosLevel / 100, // Direct mapping to model randomness
    }
  });

  const text = response.text || "";
  const lines = text.split('\n').filter((l: string) => l.trim().length > 0);
  const firstLine = lines[0] || "";
  
  let mode: LogicMode = 'KNOWLEDGE';
  if (firstLine.includes('RECOMMENDATION')) mode = 'RECOMMENDATION';
  else if (firstLine.includes('COMPARISON')) mode = 'COMPARISON';
  else if (firstLine.includes('DECISION')) mode = 'DECISION';

  // Extract metadata for Recommendation (Title of the first item for the search link)
  let title = "";
  if (mode === 'RECOMMENDATION') {
    // Attempt to extract title from "Mantra: Title (Year)" or just "Mantra: Title"
    const mantraLine = lines.find(line => line.startsWith('Mantra:'));
    if (mantraLine) {
       // Look for "Mantra: Title (Year)"
       const complexMatch = mantraLine.match(/Mantra:\s*(.*?)\s*\((\d{4})\)/);
       if (complexMatch) {
         title = complexMatch[1].trim();
       } else {
         // Fallback to "Mantra: Title"
         title = mantraLine.replace('Mantra:', '').split('-')[0].split('(')[0].trim();
       }
    }
  }

  return {
    mode,
    thought: "Logic processed at Gate Alpha.", 
    output: text,
    metadata: title ? {
        recommendation: {
            title,
            year: "",
            price: ""
        }
    } : undefined
  };
}

