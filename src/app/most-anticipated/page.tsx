import type { Metadata } from 'next';
import { getUpcomingBooks } from '@/lib/db';
import BookGrid from '@/components/BookGrid';

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
  // Show the next 48 upcoming books — sorted by date, they're the most imminent/anticipated
  const books = await getUpcomingBooks(48);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
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

        <BookGrid books={books} emptyMessage="Check back soon — new titles are added weekly." />
      </div>
    </>
  );
}
