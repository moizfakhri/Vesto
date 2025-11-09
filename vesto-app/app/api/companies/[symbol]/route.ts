import { NextResponse } from 'next/server';
import { getCompanyBySymbol, getCompanyFundamentals, getCompanyQuote, getMock10KData } from '@/lib/supabase/queries';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params;
    
    const [company, fundamentals, quote, mock10k] = await Promise.all([
      getCompanyBySymbol(symbol),
      getCompanyFundamentals(symbol).catch(() => null),
      getCompanyQuote(symbol).catch(() => null),
      getMock10KData(symbol).catch(() => null)
    ]);

    return NextResponse.json({
      data: {
        company,
        fundamentals,
        quote,
        mock10k
      }
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company data' },
      { status: 500 }
    );
  }
}

