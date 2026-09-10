/**
 * Send the weekly "out this week" digest to all active subscribers.
 * Run with: npx tsx src/scripts/send-weekly-digest.ts
 * Optional: --dry-run to print without sending
 */
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@libsql/client';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import WeeklyDigest from '../emails/WeeklyDigest';
import type { Book } from '../lib/types';

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 50;
const DELAY_MS = 1000;

const db = createClient({
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function rowToBook(row: Record<string, unknown>): Book {
  return {
    id: row.id as string,
    isbn: row.isbn as string | null,
    slug: row.slug as string,
    title: row.title as string,
    authors: JSON.parse(row.authors as string),
    publishedDate: row.published_date as string | null,
    description: row.description as string | null,
    coverUrl: row.cover_url as string | null,
    genres: JSON.parse(row.genres as string),
    pageCount: row.page_count as number | null,
    publisher: row.publisher as string | null,
    amazonUrl: row.amazon_url as string,
    googleUrl: row.google_url as string | null,
  };
}

async function getThisWeeksBooks(): Promise<Book[]> {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const end = new Date(today);
  end.setDate(end.getDate() + 7);
  const endStr = end.toISOString().split('T')[0];

  const result = await db.execute({
    sql: `SELECT * FROM books
          WHERE published_date >= ? AND published_date <= ?
            AND cover_url IS NOT NULL
          ORDER BY published_date ASC
          LIMIT 12`,
    args: [todayStr, endStr],
  });

  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

function formatDateRange(): string {
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(today)} – ${fmt(end)}`;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const dateRange = formatDateRange();

  console.log(`\n📬 BookReleaseRadar Weekly Digest — ${dateRange}`);
  if (DRY_RUN) console.log('  DRY RUN — no emails will be sent\n');

  const books = await getThisWeeksBooks();
  console.log(`  Books releasing this week: ${books.length}`);

  if (books.length < 1) {
    console.log('  No books releasing this week — aborting');
    process.exit(0);
  }

  const subscribers = await db.execute(
    `SELECT email FROM subscribers WHERE status = 'active' ORDER BY created_at ASC`
  );
  const emails = subscribers.rows.map((r) => (r as Record<string, unknown>).email as string);
  console.log(`  Subscribers: ${emails.length}\n`);

  if (emails.length === 0) {
    console.log('  No active subscribers');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log('  Subject: 📚 Out This Week: ' + books[0].title + (books.length > 1 ? ` + ${books.length - 1} more` : ''));
    console.log('  Books:', books.map((b) => b.title).join(', '));
    console.log('\n  Would send to:');
    emails.slice(0, 5).forEach((e) => console.log('    ' + e));
    if (emails.length > 5) console.log(`    ... and ${emails.length - 5} more`);

    const html = await render(WeeklyDigest({ dateRange, books, unsubscribeEmail: emails[0] }));
    const outPath = path.resolve(process.cwd(), 'weekly-digest-preview.html');
    const fs = await import('fs');
    fs.writeFileSync(outPath, html);
    console.log(`\n  Preview written to ${outPath}`);
    process.exit(0);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  let failed = 0;
  const subject = `📚 Out This Week: ${books[0].title}${books.length > 1 ? ` + ${books.length - 1} more` : ''}`;

  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (email) => {
        const html = await render(WeeklyDigest({ dateRange, books, unsubscribeEmail: email }));
        try {
          await resend.emails.send({
            from: 'BookReleaseRadar <newsletter@bookreleaseradar.com>',
            to: email,
            subject,
            html,
          });
          sent++;
        } catch (err) {
          console.error(`  Failed: ${email}`, err);
          failed++;
        }
      })
    );

    console.log(`  Sent ${sent}/${emails.length}…`);
    if (i + BATCH_SIZE < emails.length) await sleep(DELAY_MS);
  }

  console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
}

main().catch(console.error);
