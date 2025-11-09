import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

export async function generateContent(prompt: string) {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateJSON(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
  });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text);
}

