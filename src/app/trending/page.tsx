import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, TrendingUp, Sparkles, ChevronRight, Info } from 'lucide-react';
import { getAllNytLists, getDebutBooks } from '@/lib/nyt';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Trending BookTok Books 2026 | NYT Bestsellers',
  description:
    'Discover what BookTok is reading right now. Browse NYT bestselling fiction, YA, and debut titles — updated weekly with Amazon links.',
  openGraph: {
    title: 'Trending BookTok Books 2026 | NYT Bestsellers',
    description: 'Weekly BookTok trends powered by NYT Bestseller data. See what everyone is reading.',
  },
};

function RankBadge({ rank, last }: { rank: number; last: number }) {
  const moved = last > 0 ? last - rank : 0;
  return (
    <div className="flex flex-col items-center min-w-[2.5rem]">
      <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--accent)] leading-none">
        {rank}
      </span>
      {moved > 0 && (
        <span className="text-[9px] text-emerald-500 font-semibold mt-0.5">▲{moved}</span>
      )}
      {moved < 0 && (
        <span className="text-[9px] text-[var(--text-faint)] font-semibold mt-0.5">▼{Math.abs(moved)}</span>
      )}
      {moved === 0 && last > 0 && (
        <span className="text-[9px] text-[var(--text-faint)] mt-0.5">—</span>
      )}
      {last === 0 && (
        <span className="text-[9px] text-[var(--gold)] font-semibold mt-0.5">NEW</span>
      )}
    </div>
  );
}

function TrendingRow({
  book,
}: {
  book: {
    rank: number;
    rankLastWeek: number;
    weeksOnList: number;
    title: string;
    author: string;
    description: string;
    coverUrl: string;
    amazonUrl: string;
  };
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-[var(--border)] last:border-0 group">
      <RankBadge rank={book.rank} last={book.rankLastWeek} />

      {book.coverUrl && (
        <div className="relative shrink-0 w-12 h-[72px] rounded overflow-hidden bg-[var(--surface-raised)]">
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-[family-name:var(--font-playfair)] font-semibold text-sm text-[var(--text)] leading-snug line-clamp-2">
              {book.title}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{book.author}</p>
          </div>
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--gold-light)] text-[var(--gold)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] text-[10px] font-semibold transition-colors"
          >
            Amazon <ExternalLink size={9} />
          </a>
        </div>
        {book.description && (
          <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-[var(--text-faint)]">
            {book.weeksOnList === 1
              ? 'New this week'
              : `${book.weeksOnList} weeks on list`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function TrendingPage() {
  const lists = await getAllNytLists();
  const debuts = lists.length > 0 ? getDebutBooks(lists) : [];
  const hasData = lists.length > 0;
  const year = new Date().getFullYear();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Trending Books', item: 'https://bookreleaseradar.com/trending' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What books are trending on BookTok in ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `BookReleaseRadar tracks trending books using NYT Bestseller data updated weekly. The trending page shows what BookTok is reading right now across fiction, young adult, and debut titles with Amazon links for every book.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the NYT Bestseller list for books?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The New York Times Bestseller lists track the best-selling books across multiple categories including Combined Print & E-Book Fiction, Young Adult Hardcover, and more. BookReleaseRadar displays the latest NYT rankings with cover images and direct Amazon links.',
        },
      },
      {
        '@type': 'Question',
        name: 'What debut novels are on the bestseller list?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BookReleaseRadar highlights debut novels making their first appearance on the NYT Bestseller lists — these are first-time appearances for books that have quickly risen to bestseller status. Check the Trending page for the current debut list.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">BookTok + NYT</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
            Trending Books {year}
          </h1>
          <p className="text-[var(--text-muted)] text-base max-w-xl">
            What BookTok is reading right now — powered by NYT Bestseller data, updated weekly. Find the next viral read before everyone else.
          </p>
        </div>

        {!hasData && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-6 mb-8 flex gap-3">
            <Info size={18} className="text-[var(--gold)] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[var(--text)] mb-1">NYT API key not configured</p>
              <p className="text-sm text-[var(--text-muted)]">
                Add <code className="bg-[var(--surface)] px-1 rounded text-xs">NYT_BOOKS_API_KEY</code> to your environment variables to show live bestseller data.{' '}
                <a
                  href="https://developer.nytimes.com/get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  Get a free key →
                </a>
              </p>
            </div>
          </div>
        )}

        {/* New to the list this week */}
        {debuts.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                New This Week
              </h2>
              <span className="text-xs text-[var(--text-faint)] bg-[var(--surface-raised)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                Debut on the list
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Books appearing on the NYT list for the first time — often the week a viral BookTok post sends them soaring.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {debuts.map((book) => (
                <div
                  key={book.isbn13 || book.title}
                  className="flex gap-3 p-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--surface)] hover:border-[var(--gold)]/60 transition-colors"
                >
                  {book.coverUrl && (
                    <div className="relative shrink-0 w-14 h-[84px] rounded overflow-hidden bg-[var(--surface-raised)]">
                      <Image src={book.coverUrl} alt={book.title} fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--gold)] bg-[var(--gold-light)] px-1.5 py-0.5 rounded">
                      NEW
                    </span>
                    <p className="font-[family-name:var(--font-playfair)] font-semibold text-sm text-[var(--text)] mt-1 line-clamp-2 leading-snug">
                      {book.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{book.author}</p>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--accent)] hover:underline"
                    >
                      Buy on Amazon <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* List sections */}
        {hasData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {lists.map((list) => (
              <section key={list.listNameEncoded}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{list.emoji}</span>
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)]">
                    {list.label}
                  </h2>
                </div>
                <p className="text-[10px] text-[var(--text-faint)] mb-3 uppercase tracking-wider">
                  NYT {list.displayName}
                </p>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 divide-y divide-[var(--border)]">
                  {list.books.slice(0, 10).map((book) => (
                    <TrendingRow key={book.isbn13 || book.title} book={book} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Placeholder skeleton when no API key */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {['YA Bestsellers', 'Fiction Bestsellers', 'Paperback Fiction'].map((label) => (
              <section key={label}>
                <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] mb-3">{label}</h2>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-4 border-b border-[var(--border)] last:border-0">
                      <div className="w-10 h-6 rounded bg-[var(--surface-raised)] animate-pulse" />
                      <div className="w-12 h-[72px] rounded bg-[var(--surface-raised)] animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 rounded bg-[var(--surface-raised)] animate-pulse w-3/4" />
                        <div className="h-3 rounded bg-[var(--surface-raised)] animate-pulse w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* For authors CTA */}
        <section className="mt-14 rounded-xl bg-[var(--accent-light)] border border-[var(--border)] p-8">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[var(--accent)]" />
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
              Publishing on Amazon?
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-4 max-w-xl">
            BookTok can launch a debut author overnight. The books above show what readers are buying right now — use these trends to find your genre, nail your cover, and time your launch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/genre/fantasy"
              className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
            >
              Fantasy trends <ChevronRight size={13} />
            </Link>
            <Link
              href="/genre/romance"
              className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
            >
              Romance trends <ChevronRight size={13} />
            </Link>
            <Link
              href="/most-anticipated"
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors flex items-center gap-1"
            >
              Most Anticipated <ChevronRight size={13} />
            </Link>
          </div>
        </section>

        {/* NYT attribution */}
        <p className="mt-6 text-[10px] text-[var(--text-faint)] text-center">
          Bestseller data sourced from the New York Times Books API. Updated weekly.
          BookReleaseRadar earns from qualifying Amazon purchases.
        </p>
      </div>
    </>
  );
}
