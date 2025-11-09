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
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: { 
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up the text in case there's markdown code blocks
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    try {
      return JSON.parse(cleanedText);
    } catch (parseError: any) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response text:', text);
      console.error('Cleaned text:', cleanedText);
      throw new Error(`Failed to parse JSON response: ${parseError.message}. Raw response: ${text.substring(0, 200)}`);
    }
  } catch (error: any) {
    console.error('Error in generateJSON:', error);
    if (error.message?.includes('parse')) {
      throw error;
    }
    throw new Error(`Failed to generate JSON: ${error.message || 'Unknown error'}`);
  }
}

