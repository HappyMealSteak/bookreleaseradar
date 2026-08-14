import { NextRequest, NextResponse } from 'next/server';
import { searchBooks } from '@/lib/db';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) {
    return NextResponse.json({ books: [] });
  }

  const books = await searchBooks(q, 24);
  return NextResponse.json({ books });
}
