import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { SERIES } from '@/lib/series';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Popular Book Series — New Books & Release Dates',
  description:
    'Track upcoming books in the most popular series: ACOTAR, Fourth Wing, GoT, Colleen Hoover, Mistborn, Stormlight Archive, and more. Release dates and pre-order links.',
  keywords: [
    'ACOTAR new book',
    'Fourth Wing new book',
    'GoT new book',
    'Winds of Winter release date',
    'Sarah J Maas new book',
    'Rebecca Yarros new book',
    'Colleen Hoover new book',
    'Brandon Sanderson new book',
    'popular book series new releases',
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
            <Link
              key={series.slug}
              href={`/series/${series.slug}`}
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
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {series.name}
                  </h2>
                </div>
                <BookOpen size={18} className="shrink-0 text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors mt-0.5" />
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                by {series.author}
              </p>
              <p className="text-xs text-[var(--text-faint)] leading-relaxed line-clamp-3 flex-1">
                {series.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--accent)]">
                View releases <ChevronRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
