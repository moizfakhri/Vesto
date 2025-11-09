import { NextResponse } from 'next/server';
import { getAllCompanies } from '@/lib/supabase/queries';

export async function GET() {
  try {
    const companies = await getAllCompanies();
    return NextResponse.json({ data: companies });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

