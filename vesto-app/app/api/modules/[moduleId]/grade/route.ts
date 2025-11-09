import { NextResponse } from 'next/server';
import { gradeAnswer } from '@/lib/ai/grade-answer';
import { saveUserAnswer, updateUserProgress } from '@/lib/supabase/queries';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await request.json();
    const { userId, questionId, questionText, answerText, context, symbol } = body;

    if (!userId || !questionId || !answerText || !questionText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Grade answer with AI
    const aiFeedback = await gradeAnswer(questionText, answerText, context || '');

    // Save answer to database
    const savedAnswer = await saveUserAnswer({
      user_id: userId,
      question_id: questionId,
      module_id: moduleId,
      symbol: symbol || '',
      answer_text: answerText,
      ai_score: aiFeedback.overall_score,
      ai_feedback: aiFeedback,
      is_correct: aiFeedback.overall_score >= 70,
      submitted_at: new Date().toISOString(),
      graded_at: new Date().toISOString()
    });

    // Update user progress (you might want to calculate this based on all answers)
    await updateUserProgress(userId, moduleId, {
      status: 'in_progress',
      last_accessed_at: new Date().toISOString()
    });

    return NextResponse.json({
      data: {
        answer: savedAnswer,
        feedback: aiFeedback
      }
    });
  } catch (error) {
    console.error('Error grading answer:', error);
    return NextResponse.json(
      { error: 'Failed to grade answer' },
      { status: 500 }
    );
  }
}

