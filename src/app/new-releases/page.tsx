import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Flame, Clock, Calendar } from 'lucide-react';
import { getRecentAndUpcomingBooks } from '@/lib/db';
import BookGrid from '@/components/BookGrid';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 86400;

const now = new Date();
const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const metadata: Metadata = {
  title: `New Book Releases This Week — ${monthName}`,
  description: `Books that just came out and what's releasing this week in ${monthName}. Updated daily — find new fantasy, romance, thriller, and sci-fi releases with Amazon links.`,
  keywords: [
    'new book releases this week',
    'books out this week',
    'new books released this week',
    'what books came out this week',
    'new book releases today',
    `new book releases ${monthName}`,
    'just released books',
    'new fantasy releases this week',
    'new romance releases this week',
    'new thriller releases this week',
    'coming soon books',
    'books releasing soon',
  ],
};

export default async function NewReleasesPage() {
  const { justReleased, thisWeek, comingSoon } = await getRecentAndUpcomingBooks();

  const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const next7Str = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const next60Str = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'New Releases This Week', item: 'https://bookreleaseradar.com/new-releases' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What books came out this week?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: justReleased.length > 0
            ? `Books released in the past two weeks include: ${justReleased.slice(0, 5).map((b) => `${b.title} by ${b.authors[0] ?? 'unknown'}`).join(', ')}. BookReleaseRadar tracks new releases daily across fantasy, romance, thriller, mystery, sci-fi, and fiction.`
            : `BookReleaseRadar tracks new book releases daily. Check back for the latest titles across fantasy, romance, thriller, mystery, sci-fi, and fiction genres.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What new books are releasing soon?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: thisWeek.length > 0
            ? `Books releasing this week (by ${next7Str}) include: ${thisWeek.slice(0, 5).map((b) => `${b.title} by ${b.authors[0] ?? 'unknown'}`).join(', ')}. Pre-order links are available on each book's page.`
            : `BookReleaseRadar tracks upcoming releases across all genres. Check the coming soon section for books releasing in the next 60 days.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How often is BookReleaseRadar updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BookReleaseRadar updates its new releases list daily. The site tracks upcoming books across fantasy, romance, thriller, mystery, sci-fi, and literary fiction, pulling release dates from publisher and retailer data.',
        },
      },
    ],
  };

  const itemListJsonLd = [...justReleased, ...thisWeek].length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `New Book Releases — ${monthName}`,
        numberOfItems: justReleased.length + thisWeek.length,
        itemListElement: [...justReleased, ...thisWeek].slice(0, 20).map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.title,
          url: `https://bookreleaseradar.com/books/${b.slug}`,
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text)]">New Releases</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Updated Daily</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3">
            New Book Releases This Week
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-xl">
            Books that just came out and what's releasing next — across fantasy, romance, thriller, mystery, sci-fi, and more.
          </p>
        </div>

        {/* Just Released */}
        {justReleased.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <Flame size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Just Released
              </h2>
              <span className="text-xs text-[var(--text-muted)] ml-1">past 2 weeks</span>
            </div>
            <BookGrid books={justReleased} />
          </section>
        )}

        {/* This Week */}
        {thisWeek.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={16} className="text-[var(--accent)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Out This Week
              </h2>
              <span className="text-xs text-[var(--text-muted)] ml-1">through {next7Str}</span>
            </div>
            <BookGrid books={thisWeek} />
          </section>
        )}

        {/* Coming Soon */}
        {comingSoon.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <Calendar size={16} className="text-[var(--text-muted)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Coming Soon
              </h2>
              <span className="text-xs text-[var(--text-muted)] ml-1">through {next60Str}</span>
            </div>
            <BookGrid books={comingSoon} />
          </section>
        )}

        {justReleased.length === 0 && thisWeek.length === 0 && comingSoon.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">No releases found for this window. Check the <Link href="/calendar" className="text-[var(--accent)] hover:underline">release calendar</Link> for upcoming books.</p>
        )}

        {/* Browse more */}
        <div className="border-t border-[var(--border)] pt-8 mt-4">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-4">Browse More</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/most-anticipated" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Most Anticipated →</Link>
            <Link href="/trending" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Trending Now →</Link>
            <Link href="/calendar" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Release Calendar →</Link>
            <Link href="/genre/fantasy" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Fantasy →</Link>
            <Link href="/genre/romance" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Romance →</Link>
            <Link href="/genre/thriller" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Thriller →</Link>
          </div>
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
