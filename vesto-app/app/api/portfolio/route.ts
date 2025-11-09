import { NextResponse } from 'next/server';
import { getUserPortfolio, addToPortfolio } from '@/lib/supabase/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const portfolio = await getUserPortfolio(userId);
    return NextResponse.json({ data: portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, symbol, companyName, shares, buyPrice } = body;

    if (!userId || !symbol || !shares || !buyPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const holding = await addToPortfolio({
      user_id: userId,
      symbol,
      company_name: companyName,
      shares,
      buy_price: buyPrice,
      buy_date: new Date().toISOString(),
      current_price: buyPrice,
      current_value: shares * buyPrice,
      gain_loss: 0,
      gain_loss_percent: 0
    });

    return NextResponse.json({ data: holding });
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to add to portfolio' },
      { status: 500 }
    );
  }
}

