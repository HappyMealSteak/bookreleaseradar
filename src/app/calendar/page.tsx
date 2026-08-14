import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllBooks } from '@/lib/db';
import type { Book } from '@/lib/types';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Book Release Calendar',
  description: `See which books are releasing each month in ${new Date().getFullYear()}. Browse the full book release calendar with dates and covers.`,
};

function groupByMonth(books: Book[]): Map<string, Book[]> {
  const map = new Map<string, Book[]>();
  for (const book of books) {
    if (!book.publishedDate || book.publishedDate.length < 7) continue;
    const key = book.publishedDate.slice(0, 7); // "2026-09"
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(book);
  }
  return new Map([...map.entries()].sort());
}

function monthLabel(key: string): string {
  const [year, month] = key.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export default async function CalendarPage() {
  const books = await getAllBooks(1000);
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

  const relevant = books.filter((b) => {
    if (!b.publishedDate) return false;
    if (/^\d{4}$/.test(b.publishedDate)) return true;
    try {
      const normalized = b.publishedDate.replace('T00:00:00Z', '');
      const d = new Date(normalized.length === 7 ? normalized + '-01' : normalized);
      return d >= sixMonthsAgo;
    } catch {
      return false;
    }
  });

  const byMonth = groupByMonth(relevant);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Browse</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Release Calendar
        </h1>
        <p className="text-[var(--text-muted)]">
          Upcoming and recent book releases, organized by month.
        </p>
      </div>

      {byMonth.size === 0 ? (
        <div className="py-20 text-center text-[var(--text-muted)]">
          <p className="font-[family-name:var(--font-playfair)] text-xl mb-2">No releases found</p>
          <p className="text-sm">Run the seed script to populate book data.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Array.from(byMonth.entries()).map(([monthKey, monthBooks]) => {
            const isCurrentMonth = monthKey === now.toISOString().slice(0, 7);
            return (
              <section key={monthKey}>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                    {monthLabel(monthKey)}
                  </h2>
                  {isCurrentMonth && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--accent)] text-[var(--accent-fg)]">
                      This Month
                    </span>
                  )}
                  <span className="text-sm text-[var(--text-faint)]">
                    {monthBooks.length} release{monthBooks.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {monthBooks.map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.slug}`}
                      className="group flex flex-col gap-1"
                    >
                      <div className="relative rounded overflow-hidden border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors shadow-sm" style={{ aspectRatio: '2/3' }}>
                        {book.coverUrl ? (
                          <Image
                            src={book.coverUrl}
                            alt={book.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 120px"
                          />
                        ) : (
                          <div className="absolute inset-0 cover-placeholder flex flex-col items-center justify-center gap-1 p-2 text-center">
                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <rect x="5" y="3" width="18" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                              <rect x="8" y="3" width="15" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                              <line x1="11" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                              <line x1="11" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                              <line x1="11" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                            </svg>
                            <span className="text-[var(--text-faint)] text-[8px] leading-tight opacity-70">TBR</span>
                          </div>
                        )}
                        {book.publishedDate && book.publishedDate.length >= 10 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-[var(--accent)]/90 text-[var(--accent-fg)] text-[9px] font-bold text-center py-0.5">
                            {new Date(book.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-2 leading-tight group-hover:text-[var(--accent)] transition-colors">
                        {book.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
