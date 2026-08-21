import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

function getDb() {
  return createClient({
    url: process.env.DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  const db = getDb();
  await db.execute({
    sql: `UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`,
    args: [email.toLowerCase().trim()],
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) return NextResponse.redirect(new URL('/', req.url));

  const db = getDb();
  await db.execute({
    sql: `UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`,
    args: [email.toLowerCase().trim()],
  });

  return NextResponse.redirect(new URL('/unsubscribe?done=1', req.url));
}
