import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import { getUpcomingBooks, getBooksByGenre } from '@/lib/db';
import { GENRES, GENRE_LABELS, type Genre } from '@/lib/types';

export const revalidate = 86400; // refresh every 24h

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BookReleaseRadar',
  url: 'https://bookreleaseradar.com',
  description: 'Track upcoming book releases by genre, author, and date.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://bookreleaseradar.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function HomePage() {
  const [upcoming, ...genreSamples] = await Promise.all([
    getUpcomingBooks(18),
    ...GENRES.map((g) => getBooksByGenre(g as Genre, 6)),
  ]);

  const featuredGenres = GENRES as Genre[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-14">
      {/* Hero */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[var(--text)] mb-2">
            Upcoming Book Releases
          </h1>
          <p className="text-[var(--text-muted)] text-base max-w-xl">
            The next great reads, tracked before they hit shelves. Browse by genre, author, or release date.
          </p>
        </div>

        <BookGrid books={upcoming} emptyMessage="Run the seed script to populate books from Google Books API." />

        {upcoming.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline font-medium"
            >
              Browse all books <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* Genre sections */}
      {featuredGenres.map((genre, i) => {
        const books = genreSamples[i] ?? [];
        if (!books.length) return null;
        return (
          <section key={genre}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[var(--accent)]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                  New in {GENRE_LABELS[genre]}
                </h2>
              </div>
              <Link
                href={`/genre/${genre}`}
                className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
              >
                See all <ChevronRight size={13} />
              </Link>
            </div>
            <BookGrid books={books} />
          </section>
        );
      })}

      {/* CTA banner */}
      <section className="rounded-xl bg-[var(--accent-light)] border border-[var(--border)] p-8 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-2 text-[var(--text)]">
          Never miss a release
        </h2>
        <p className="text-[var(--text-muted)] text-sm mb-4 max-w-md mx-auto">
          Browse by genre or use the calendar view to see everything releasing this month and beyond.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/calendar"
            className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            View Calendar
          </Link>
          <Link
            href="/search"
            className="px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-semibold hover:border-[var(--accent)] transition-colors"
          >
            Search Books
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
