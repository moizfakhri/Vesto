import { generateJSON } from './gemini-client';
import { buildPitchReviewPrompt } from './prompts/fund-manager';

interface PitchReview {
  status: 'approved' | 'rejected';
  score: number;
  feedback: string;
}

export async function reviewPitch(
  companyName: string,
  symbol: string,
  pitch: string,
  companyData: string
): Promise<PitchReview> {
  const prompt = buildPitchReviewPrompt(companyName, symbol, pitch, companyData);
  
  try {
    const result = await generateJSON(prompt);
    return result as PitchReview;
  } catch (error) {
    console.error('Error reviewing pitch:', error);
    // Return default rejection if AI fails
    return {
      status: 'rejected',
      score: 0,
      feedback: 'Unable to review pitch automatically. Please try again with more detail.'
    };
  }
}

