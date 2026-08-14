import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { RECOMMENDATIONS } from '@/lib/recommendations';

export const revalidate = 2592000;

export const metadata: Metadata = {
  title: 'Books Like… — Reading Recommendations | BookReleaseRadar',
  description:
    'Find your next favorite series. Curated reading recommendations for fans of ACOTAR, Fourth Wing, Colleen Hoover, Game of Thrones, Mistborn, Wheel of Time, and more.',
  keywords: [
    'books like ACOTAR',
    'books like Fourth Wing',
    'books like Colleen Hoover',
    'books like Game of Thrones',
    'books like Mistborn',
    'books like Wheel of Time',
    'books like Hunger Games',
    'reading recommendations',
    'what to read next',
    'book recommendations',
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
    { '@type': 'ListItem', position: 2, name: 'Books Like…', item: 'https://bookreleaseradar.com/books-like' },
  ],
};

export default function BooksLikeIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)]">Books Like…</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Reading Recommendations</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3 leading-tight">
            Books Like Your Favorites
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-2xl leading-relaxed">
            Finished a series and don't know what to read next? Each guide below gives you 8 hand-picked recommendations with reasons why fans of the original series love them.
          </p>
        </div>

        {/* Recommendation cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDATIONS.map((entry) => (
            <Link
              key={entry.slug}
              href={`/books-like/${entry.slug}`}
              className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-1">If you liked</p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {entry.sourceShortName ?? entry.sourceTitle}
                  </h2>
                  {entry.sourceShortName && (
                    <p className="text-xs text-[var(--text-faint)] mt-0.5 line-clamp-1">{entry.sourceTitle}</p>
                  )}
                </div>
                <BookOpen size={18} className="shrink-0 mt-1 text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">{entry.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-faint)]">{entry.recommendations.length} picks</span>
                <span className="text-xs font-semibold text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse series CTA */}
        <div className="mt-12 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--text)] mb-1">Looking for a specific series?</p>
            <p className="text-sm text-[var(--text-muted)]">Browse all popular series pages for release dates, reading orders, and upcoming books.</p>
          </div>
          <Link
            href="/series"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
          >
            Browse All Series →
          </Link>
        </div>
      </div>
    </>
  );
}
