import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// Use gemini-pro-latest as it's confirmed working, with fallback to gemini-1.5-flash
const MODEL_NAME = 'gemini-pro-latest';

export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: MODEL_NAME });
}

export async function generateContent(prompt: string) {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateJSON(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: { responseMimeType: 'application/json' }
  });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text);
}

