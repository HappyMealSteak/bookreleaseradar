import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import { getBooksByAuthorName } from '@/lib/db';
import { SERIES, getSeriesBySlug } from '@/lib/series';
import { authorSlug } from '@/lib/utils';

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};

  const aliases = series.shortName ? `${series.shortName} / ` : '';
  const title = `${aliases}${series.name} — New Books & Release Dates`;
  const description = `Track upcoming ${series.name}${series.shortName ? ` (${series.shortName})` : ''} books by ${series.author}. Release dates, pre-order links, and all books in the series.`;

  return {
    title,
    description,
    keywords: [
      series.name,
      series.shortName,
      `${series.name} new book`,
      `${series.name} next book`,
      `${series.author} new release`,
      `${series.author} upcoming book`,
      series.shortName ? `${series.shortName} new book` : undefined,
      series.shortName ? `${series.shortName} series` : undefined,
    ].filter(Boolean) as string[],
    openGraph: { title, description },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const books = await getBooksByAuthorName(series.authorQuery, 36);
  const year = new Date().getFullYear();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Series', item: 'https://bookreleaseradar.com/series' },
      { '@type': 'ListItem', position: 3, name: series.name, item: `https://bookreleaseradar.com/series/${slug}` },
    ],
  };

  const bookSeriesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BookSeries',
    name: series.name,
    alternateName: series.shortName,
    author: {
      '@type': 'Person',
      name: series.author,
    },
    genre: series.genre,
    numberOfItems: books.length,
    url: `https://bookreleaseradar.com/series/${slug}`,
  };

  const upcoming = books.filter(
    (b) => b.publishedDate && new Date(b.publishedDate) >= new Date()
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSeriesJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/series" className="hover:text-[var(--accent)] transition-colors">Series</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)]">{series.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)]">
              Book Series
            </p>
            {series.shortName && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/30">
                {series.shortName}
              </span>
            )}
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
            {series.name}
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-1">
            by{' '}
            <Link
              href={`/author/${authorSlug(series.author)}`}
              className="text-[var(--accent)] hover:underline font-medium"
            >
              {series.author}
            </Link>
          </p>
          {upcoming.length > 0 && (
            <p className="text-sm text-[var(--text-muted)] mt-2">
              <span className="font-semibold text-[var(--accent)]">{upcoming.length} upcoming</span>
              {' '}release{upcoming.length !== 1 ? 's' : ''} for {year}–{year + 1}
            </p>
          )}
        </div>

        {/* Books */}
        <BookGrid
          books={books}
          emptyMessage={`No books found yet for ${series.name}. Check back after the next seed run.`}
        />

        {/* About section */}
        <div className="mt-12 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)] mb-3">
            About {series.shortName ?? series.name}
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{series.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/genre/${series.genre}`}
              className="px-3 py-1.5 text-xs rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20 hover:border-[var(--accent)]/60 transition-colors font-medium"
            >
              Browse {series.genre} →
            </Link>
            <Link
              href={`/author/${authorSlug(series.author)}`}
              className="px-3 py-1.5 text-xs rounded-full bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-colors font-medium"
            >
              All {series.author} books →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
