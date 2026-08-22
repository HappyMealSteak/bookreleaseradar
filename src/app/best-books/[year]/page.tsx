import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getBestBooksByGenreYear } from '@/lib/db';
import { GENRE_LABELS, GENRES, type Genre } from '@/lib/types';

export const revalidate = 86400;

const SUPPORTED_YEARS = [2025, 2026, 2027];
const MIN_BOOKS = 6;

interface Props {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const yearNum = parseInt(year);
  if (!SUPPORTED_YEARS.includes(yearNum)) return {};

  const title = `Best Books of ${year}`;
  const description = `The best books of ${year} by genre — top fantasy, romance, thriller, mystery, sci-fi, and literary fiction releases. Find release dates and Amazon links.`;

  return {
    title,
    description,
    keywords: [
      `best books ${year}`,
      `best books of ${year}`,
      `top books ${year}`,
      `must read books ${year}`,
      `new books ${year}`,
      `best fantasy books ${year}`,
      `best romance books ${year}`,
      `best thriller books ${year}`,
    ],
    openGraph: { title, description },
  };
}

const GENRE_ICONS: Partial<Record<Genre, string>> = {
  fantasy: '⚔️',
  romance: '💕',
  thriller: '🔪',
  mystery: '🔍',
  'sci-fi': '🚀',
  fiction: '📖',
  'self-help': '✨',
  'non-fiction': '🗞️',
};

export default async function BestBooksYearPage({ params }: Props) {
  const { year } = await params;
  const yearNum = parseInt(year);

  if (!SUPPORTED_YEARS.includes(yearNum)) notFound();

  // Fetch top books per genre in parallel
  const genreResults = await Promise.all(
    ([...GENRES] as Genre[]).map(async (genre) => {
      const books = await getBestBooksByGenreYear(genre, yearNum, 4);
      return { genre, books };
    })
  );

  const validGenres = genreResults.filter((g) => g.books.length >= MIN_BOOKS);
  if (validGenres.length === 0) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: `Best Books ${year}`, item: `https://bookreleaseradar.com/best-books/${year}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the best books of ${year}?`,
        acceptedAnswer: { '@type': 'Answer', text: `The best books of ${year} span fantasy, romance, thriller, mystery, sci-fi, and literary fiction. BookReleaseRadar tracks new and upcoming releases with confirmed publication dates, cover images, and Amazon pre-order links.` },
      },
      {
        '@type': 'Question',
        name: `What genres have the most new releases in ${year}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Fantasy and romance consistently have the largest number of new releases each year. BookReleaseRadar's Best Books ${year} page breaks down top picks by genre so you can browse what interests you most.` },
      },
      {
        '@type': 'Question',
        name: `Where can I find a list of the best books coming out in ${year}?`,
        acceptedAnswer: { '@type': 'Answer', text: `BookReleaseRadar's Best Books ${year} page lists the top upcoming and new releases across every major genre. Each entry shows the publication date, author, and a link to pre-order or buy on Amazon.` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-8 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text)]">Best Books {year}</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
            {yearNum <= new Date().getFullYear() ? `${year} Review` : `${year} Preview`}
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-4">
            Best Books of {year}
          </h1>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-2xl">
            BookReleaseRadar&apos;s guide to the best books of {year}, organized by genre. Browse by category or jump straight to the full list for your favorite genre.
          </p>
        </div>

        {/* Year navigation */}
        <div className="flex gap-2 mb-10">
          {SUPPORTED_YEARS.map((y) => (
            <Link
              key={y}
              href={`/best-books/${y}`}
              className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                y === yearNum
                  ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {/* Genre cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {validGenres.map(({ genre, books }) => (
            <div key={genre} className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="p-5 border-b border-[var(--border)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{GENRE_ICONS[genre] ?? '📚'}</span>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] mb-0.5">
                  Best {GENRE_LABELS[genre]} Books {year}
                </h2>
                <p className="text-xs text-[var(--text-muted)]">{books.length}+ titles tracked</p>
              </div>

              {/* Preview covers */}
              <div className="flex gap-2 p-4">
                {books.slice(0, 3).map((book) =>
                  book.coverUrl ? (
                    <div key={book.id} className="w-14 rounded overflow-hidden flex-shrink-0 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={book.coverUrl} alt={book.title} className="w-full aspect-[2/3] object-cover" />
                    </div>
                  ) : (
                    <div key={book.id} className="w-14 aspect-[2/3] rounded bg-[var(--surface)] flex-shrink-0 border border-[var(--border)]" />
                  )
                )}
              </div>

              <div className="px-4 pb-4">
                <Link
                  href={`/best-books/${year}/${genre}`}
                  className="block w-full text-center px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  See All {GENRE_LABELS[genre]} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border)] pt-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-4">Browse More</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/new-releases" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">New This Week →</Link>
            <Link href="/most-anticipated" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Most Anticipated →</Link>
            <Link href="/series" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Popular Series →</Link>
            <Link href={`/releases/${year}`} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">All {year} Releases →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
