import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getAllAuthors } from '@/lib/db';
import { authorSlug } from '@/lib/utils';
import { getAuthorBio } from '@/lib/author-bios';
import { GENRE_LABELS, type Genre } from '@/lib/types';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Browse Authors — Upcoming Books & New Releases',
  description:
    'Browse book authors on BookReleaseRadar. Find upcoming releases, new books, and complete reading lists from your favorite authors — fantasy, romance, thriller, sci-fi, and more.',
  keywords: [
    'book authors',
    'upcoming books by author',
    'new books by author',
    'Sarah J Maas upcoming books',
    'Brandon Sanderson new books',
    'Colleen Hoover new books',
    'Rebecca Yarros upcoming books',
    'author release dates',
    'new books from favorite authors',
  ],
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();
  const featured = authors.filter((a) => a.bookCount >= 2);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Authors', item: 'https://bookreleaseradar.com/authors' },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Book Authors on BookReleaseRadar',
    numberOfItems: featured.length,
    itemListElement: featured.slice(0, 50).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.name,
      url: `https://bookreleaseradar.com/author/${authorSlug(a.name)}`,
    })),
  };

  const withBios = featured.filter((a) => getAuthorBio(a.name));
  const withoutBios = featured.filter((a) => !getAuthorBio(a.name));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find upcoming books from my favorite author?',
        acceptedAnswer: { '@type': 'Answer', text: 'Search for an author on BookReleaseRadar to see their upcoming releases with confirmed publication dates and Amazon pre-order links. We track authors across fantasy, romance, thriller, mystery, sci-fi, and more.' },
      },
      {
        '@type': 'Question',
        name: 'Which authors have the most upcoming books tracked?',
        acceptedAnswer: { '@type': 'Answer', text: 'BookReleaseRadar tracks hundreds of authors across all genres. Featured authors with bios include Sarah J. Maas, Brandon Sanderson, Colleen Hoover, Rebecca Yarros, Leigh Bardugo, and many others.' },
      },
      {
        '@type': 'Question',
        name: 'Can I get notified when a new book from my favorite author comes out?',
        acceptedAnswer: { '@type': 'Answer', text: 'Subscribe to the BookReleaseRadar newsletter to get monthly updates on the biggest upcoming releases. You can also bookmark an author page and check back for new additions.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text)]">Authors</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Browse</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Authors
          </h1>
          <p className="text-[var(--text-muted)] text-base">
            {featured.length} authors tracked — see upcoming books, new releases, and complete reading lists.
          </p>
        </div>

        {/* Featured authors (with bios) */}
        {withBios.length > 0 && (
          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-5 text-[var(--text)]">
              Featured Authors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {withBios.map((author) => {
                const bio = getAuthorBio(author.name)!;
                const slug = authorSlug(author.name);
                return (
                  <Link
                    key={author.name}
                    href={`/author/${slug}`}
                    className="group flex flex-col p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-base group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {author.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-[var(--text-faint)] bg-[var(--surface-raised)] px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                        {author.bookCount} books
                      </span>
                    </div>
                    {bio.genre && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] mb-2">
                        {GENRE_LABELS[bio.genre as Genre] ?? bio.genre}
                      </span>
                    )}
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2 flex-1">
                      {bio.bio.slice(0, 120)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All other tracked authors */}
        {withoutBios.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-5 text-[var(--text)]">
              All Tracked Authors
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {withoutBios.map((author) => {
                const slug = authorSlug(author.name);
                return (
                  <Link
                    key={author.name}
                    href={`/author/${slug}`}
                    className="group flex flex-col p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors"
                  >
                    <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {author.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-faint)] mt-1">
                      {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
