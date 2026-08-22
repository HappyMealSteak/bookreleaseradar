import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen, List, Heart } from 'lucide-react';
import { SERIES } from '@/lib/series';
import { ALL_READING_ORDER_SLUGS } from '@/lib/reading-orders';
import { ALL_BOOKS_LIKE_SLUGS } from '@/lib/recommendations';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Popular Book Series — New Books & Release Dates',
  description:
    'Track upcoming books in the most popular series: ACOTAR, Fourth Wing, Dune, Eragon, Divergent, Vampire Academy, Maze Runner, Red Queen, GoT, Six of Crows, Percy Jackson, Red Rising, Outlander, and more. Release dates and reading orders.',
  keywords: [
    'ACOTAR new book',
    'Fourth Wing new book',
    'GoT new book',
    'Winds of Winter release date',
    'Sarah J Maas new book',
    'Rebecca Yarros new book',
    'Colleen Hoover new book',
    'Brandon Sanderson new book',
    'Six of Crows new book',
    'Percy Jackson new book',
    'Red Rising new book',
    'Outlander new book',
    'Shadowhunters new book',
    'Bridgerton books in order',
    'Doors of Stone release date',
    'Blood and Ash new book',
    'Inheritance Games new book',
    'Shatter Me new book',
    'Atlas Six new book',
    'Tahereh Mafi new book',
    'Olivie Blake new book',
    'Sunrise on the Reaping release date',
    'Hunger Games new book 2026',
    'Wheel of Time reading order',
    'Poppy War reading order',
    'Dark Tower reading order',
    'R.F. Kuang new book',
    'Stephen King Dark Tower new book',
    'Dune reading order',
    'Divergent reading order',
    'Eragon reading order',
    'Vampire Academy reading order',
    'Maze Runner reading order',
    'Red Queen reading order',
    'Legend Marie Lu reading order',
    'Selection reading order',
    'popular book series new releases',
    'book series reading orders',
    'book series release dates',
  ],
};

const GENRE_LABELS: Record<string, string> = {
  fantasy: 'Fantasy',
  romance: 'Romance',
  fiction: 'Fiction',
  'sci-fi': 'Sci-Fi',
  thriller: 'Thriller',
  mystery: 'Mystery',
};

export default function SeriesIndexPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Series', item: 'https://bookreleaseradar.com/series' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What book series can I track on BookReleaseRadar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `BookReleaseRadar tracks ${SERIES.length} popular series including ACOTAR, Fourth Wing, Bridgerton, Six of Crows, Kingkiller Chronicle, Outlander, The Stormlight Archive, Red Rising, and more. Each series page shows upcoming release dates and pre-order links.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find the reading order for a book series?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each tracked series on BookReleaseRadar has a dedicated reading order page listing all books in the recommended order. Click "Order" on any series card or navigate to the series page and follow the reading order link.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find books similar to a series I love?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Series cards on this page show a "Similar" link when there are curated book recommendations for that series. These pages list books with similar vibes, genres, and appeal — great for finding your next read while waiting for the next book in your current series.',
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
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
            Browse
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3">
            Popular Book Series
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Track new releases and upcoming books in the biggest series — ACOTAR, GoT, Fourth Wing, Colleen Hoover, Mistborn, and more. Get release dates and pre-order links the moment they're announced.
          </p>
        </div>

        {/* Series grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERIES.map((series) => (
            <div
              key={series.slug}
              className="group flex flex-col p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)] transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {series.shortName && (
                      <span className="shrink-0 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20">
                        {series.shortName}
                      </span>
                    )}
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--text-faint)]">
                      {GENRE_LABELS[series.genre] ?? series.genre}
                    </span>
                  </div>
                  <Link href={`/series/${series.slug}`}>
                    <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                      {series.name}
                    </h2>
                  </Link>
                </div>
                <BookOpen size={18} className="shrink-0 text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors mt-0.5" />
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                by {series.author}
              </p>
              <p className="text-xs text-[var(--text-faint)] leading-relaxed line-clamp-3 flex-1">
                {series.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/series/${series.slug}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  View releases <ChevronRight size={13} />
                </Link>
                {ALL_READING_ORDER_SLUGS.includes(series.slug) && (
                  <Link
                    href={`/series/${series.slug}/reading-order`}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors"
                  >
                    <List size={10} /> Order
                  </Link>
                )}
                {ALL_BOOKS_LIKE_SLUGS.includes(series.slug) && (
                  <Link
                    href={`/books-like/${series.slug}`}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Heart size={10} /> Similar
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
