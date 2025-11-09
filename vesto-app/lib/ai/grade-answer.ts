import { generateJSON } from './gemini-client';
import { buildGradingPrompt } from './prompts/grading-rubric';
import type { AIFeedback } from '@/types';

export async function gradeAnswer(
  question: string,
  studentAnswer: string,
  context: string
): Promise<AIFeedback> {
  const prompt = buildGradingPrompt(question, studentAnswer, context);
  
  try {
    const result = await generateJSON(prompt);
    return result as AIFeedback;
  } catch (error) {
    console.error('Error grading answer:', error);
    // Return default feedback if AI fails
    return {
      overall_score: 50,
      criteria: {
        clarity: { score: 10, feedback: 'Unable to grade automatically' },
        evidence: { score: 10, feedback: 'Unable to grade automatically' },
        completeness: { score: 10, feedback: 'Unable to grade automatically' },
        critical_thinking: { score: 10, feedback: 'Unable to grade automatically' },
        risk_analysis: { score: 10, feedback: 'Unable to grade automatically' }
      },
      summary: 'Automatic grading failed. Please try again.'
    };
  }
}

