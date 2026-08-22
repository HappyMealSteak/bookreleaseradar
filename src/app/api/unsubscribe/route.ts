import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import { Resend } from 'resend';

function getDb() {
  return createClient({
    url: process.env.DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

async function syncUnsubscribeToResend(email: string) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId || !process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.contacts.update({ audienceId, email, unsubscribed: true }).catch(() => {});
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  const normalized = email.toLowerCase().trim();
  const db = getDb();
  await Promise.allSettled([
    db.execute({
      sql: `UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`,
      args: [normalized],
    }),
    syncUnsubscribeToResend(normalized),
  ]);

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) return NextResponse.redirect(new URL('/', req.url));

  const normalized = email.toLowerCase().trim();
  const db = getDb();
  await Promise.allSettled([
    db.execute({
      sql: `UPDATE subscribers SET status = 'unsubscribed' WHERE email = ?`,
      args: [normalized],
    }),
    syncUnsubscribeToResend(normalized),
  ]);

  return NextResponse.redirect(new URL('/unsubscribe?done=1', req.url));
}
