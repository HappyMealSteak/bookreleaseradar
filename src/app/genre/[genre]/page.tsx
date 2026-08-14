import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookGrid from '@/components/BookGrid';
import { getBooksByGenre, getBookCountByGenre } from '@/lib/db';
import { GENRES, GENRE_LABELS, GENRE_DESCRIPTIONS, type Genre } from '@/lib/types';

export const revalidate = 86400;

interface Props {
  params: Promise<{ genre: string }>;
}

export async function generateStaticParams() {
  return GENRES.map((genre) => ({ genre }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  if (!GENRES.includes(genre as Genre)) return {};

  const label = GENRE_LABELS[genre as Genre];
  const year = new Date().getFullYear();
  const title = `Upcoming ${label} Books ${year}`;
  const description = `Browse the latest upcoming ${label.toLowerCase()} book releases for ${year}. Find new ${label.toLowerCase()} titles with release dates and buy on Amazon.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function GenrePage({ params }: Props) {
  const { genre } = await params;
  if (!GENRES.includes(genre as Genre)) notFound();

  const [books, count] = await Promise.all([
    getBooksByGenre(genre, 100),
    getBookCountByGenre(genre),
  ]);
  const label = GENRE_LABELS[genre as Genre];
  const year = new Date().getFullYear();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: `${label} Books`, item: `https://bookreleaseradar.com/genre/${genre}` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Upcoming ${label} Books ${year}`,
    numberOfItems: books.length,
    itemListElement: books.slice(0, 20).map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: book.title,
      url: `https://bookreleaseradar.com/books/${book.slug}`,
      item: {
        '@type': 'Book',
        name: book.title,
        author: { '@type': 'Person', name: book.authors[0] ?? '' },
        datePublished: book.publishedDate ?? undefined,
        image: book.coverUrl ?? undefined,
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
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Genre</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Upcoming {label} Books
        </h1>
        <p className="text-[var(--text-muted)] mb-3">
          {count > 0 ? `${count} upcoming ` : ''}{label.toLowerCase()} releases for {year} and beyond.
        </p>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {GENRE_DESCRIPTIONS[genre as Genre]}
        </p>
      </div>

      <BookGrid
        books={books}
        emptyMessage={`No upcoming ${label.toLowerCase()} books found. Check back after running the seed script.`}
      />
    </div>
    </>
  );
}
