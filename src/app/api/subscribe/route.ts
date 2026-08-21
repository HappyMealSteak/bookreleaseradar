import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';

function getDb() {
  return createClient({
    url: process.env.DATABASE_URL ?? '',
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const db = getDb();

  try {
    await db.execute({
      sql: 'INSERT INTO subscribers (email) VALUES (?)',
      args: [email.toLowerCase().trim()],
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('UNIQUE')) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
    }
    console.error('DB error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);

    await Promise.allSettled([
      resend.emails.send({
        from: 'BookReleaseRadar <newsletter@bookreleaseradar.com>',
        to: email,
        subject: "You're on the list — BookReleaseRadar",
        react: WelcomeEmail({ email }),
      }).catch((err) => console.error('Welcome email failed:', err)),

      process.env.RESEND_AUDIENCE_ID
        ? resend.contacts.create({
            email: email.toLowerCase().trim(),
            audienceId: process.env.RESEND_AUDIENCE_ID,
            unsubscribed: false,
          }).catch((err) => console.error('Resend audience sync failed:', err))
        : Promise.resolve(),
    ]);
  }

  return NextResponse.json({ ok: true });
}
