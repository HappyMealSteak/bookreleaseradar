import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import { getUpcomingBooks } from '@/lib/db';
import { getMostAnticipated } from '@/lib/reading-orders';
import { getSeriesBySlug } from '@/lib/series';
import BookGrid from '@/components/BookGrid';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `Most Anticipated Books ${new Date().getFullYear()}`,
  description: `The most anticipated book releases of ${new Date().getFullYear()} and ${new Date().getFullYear() + 1}. Pre-order the biggest upcoming titles before they sell out.`,
  openGraph: {
    title: `Most Anticipated Books ${new Date().getFullYear()}`,
    description: `Pre-order the most anticipated upcoming books of ${new Date().getFullYear()}.`,
  },
};

export default async function MostAnticipatedPage() {
  const year = new Date().getFullYear();
  const [books, anticipated] = await Promise.all([
    getUpcomingBooks(48),
    Promise.resolve(getMostAnticipated()),
  ]);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: `Most Anticipated Books ${year}`, item: `https://bookreleaseradar.com/most-anticipated` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Most Anticipated Books ${year}`,
    description: `The biggest upcoming book releases of ${year}`,
    numberOfItems: books.slice(0, 20).length,
    itemListElement: books.slice(0, 20).map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: book.title,
      item: {
        '@type': 'Book',
        name: book.title,
        author: { '@type': 'Person', name: book.authors?.[0] ?? '' },
        datePublished: book.publishedDate ?? undefined,
        url: `https://bookreleaseradar.com/books/${book.slug}`,
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the most anticipated books of ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The most anticipated books of ${year} include new entries in major series like ACOTAR, The Wicked Powers, and more. BookReleaseRadar tracks confirmed release dates for all the biggest upcoming titles across fantasy, thriller, romance, and literary fiction.`,
        },
      },
      {
        '@type': 'Question',
        name: `What new book series continuations are coming out in ${year} and ${year + 1}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Upcoming series continuations include A Court of Thorns and Roses 7 by Sarah J. Maas (January 2027), The Last King of Faerie by Cassandra Clare (November 2026), and other major fantasy and romance series. BookReleaseRadar's Most Anticipated page tracks all confirmed release dates.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How can I pre-order upcoming books before they release?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every book on BookReleaseRadar includes an Amazon pre-order link. Pre-ordering locks in the release-day price and ensures you get the book on the day it launches. Most Amazon pre-orders can be cancelled any time before the release date.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Editor&apos;s Pick</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
            Most Anticipated Books {year}
          </h1>
          <p className="text-[var(--text-muted)] mb-3">
            The biggest upcoming book releases of {year} and {year + 1} — sorted by publication date so you never miss a launch.
          </p>
          <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
            From blockbuster thrillers and sweeping fantasy epics to debut literary fiction and groundbreaking non-fiction,
            these are the titles generating the most buzz ahead of release. Pre-order early to lock in the best prices and
            support your favorite authors from day one.
          </p>
        </div>

        {/* Curated most anticipated — from our tracked series */}
        {anticipated.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Biggest Series Continuations
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-5">
              These are the releases that millions of fans are actively waiting for — confirmed upcoming books in the biggest ongoing series.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {anticipated.map((book) => {
                const series = getSeriesBySlug(book.seriesSlug);
                return (
                  <Link
                    key={book.title}
                    href={`/series/${book.seriesSlug}/reading-order`}
                    className="group flex flex-col gap-2 p-5 rounded-xl border border-[var(--gold)]/30 bg-[var(--surface)] hover:border-[var(--gold)]/60 hover:bg-[var(--surface-raised)] transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-[var(--gold)] shrink-0" />
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gold)]">
                        {book.note && /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i.test(book.note)
                          ? (book.note.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4}/i) ?? book.note.match(/\d{4}/))?.[0] ?? 'Coming Soon'
                          : book.note?.match(/\d{4}/)?.[0] ?? 'Coming Soon'}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-playfair)] font-semibold text-sm leading-snug text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {book.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{book.author}</p>
                    <p className="text-[10px] text-[var(--text-faint)] italic">{book.note}</p>
                    {series && (
                      <div className="flex items-center gap-1 mt-auto pt-2 border-t border-[var(--border)]">
                        <span className="text-[10px] text-[var(--text-faint)]">{series.name}</span>
                        <ChevronRight size={10} className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* DB-driven upcoming — books with actual release dates */}
        {books.length > 0 && (
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)] mb-4">
              Upcoming Releases
            </h2>
            <BookGrid books={books} emptyMessage="Check back soon — new titles are added weekly." />
          </div>
        )}

        {books.length === 0 && anticipated.length === 0 && (
          <p className="text-[var(--text-muted)] text-center py-12">
            Check back soon — new titles are added weekly.
          </p>
        )}
      </div>

      <NewsletterSignup />
    </>
  );
}
