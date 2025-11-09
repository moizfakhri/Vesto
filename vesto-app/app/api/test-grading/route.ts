import { NextResponse } from 'next/server';
import { gradeAnswer } from '@/lib/ai/grade-answer';

export async function GET() {
  try {
    // Test with a simple grading scenario
    const testQuestion = 'What are the key financial metrics to analyze when evaluating a company?';
    const testAnswer = 'When evaluating a company, key financial metrics include P/E ratio, which shows valuation relative to earnings; EBITDA, which measures operating performance; ROE (Return on Equity), indicating how efficiently capital is used; and debt-to-equity ratio, showing financial leverage. These metrics help assess profitability, efficiency, and financial health.';
    const testContext = 'Sample company context for testing purposes.';

    console.log('Testing grading function...');
    const result = await gradeAnswer(testQuestion, testAnswer, testContext);
    
    return NextResponse.json({
      success: true,
      message: 'Grading test successful!',
      result: result
    });
  } catch (error: any) {
    console.error('Grading test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Unknown error',
        details: error?.stack || error?.toString()
      },
      { status: 500 }
    );
  }
}

