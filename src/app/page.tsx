import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, TrendingUp, Zap, Library, BookMarked, ExternalLink } from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import { getUpcomingBooks, getBooksByGenre, getReleasingThisWeek } from '@/lib/db';
import { GENRES, GENRE_LABELS, type Genre } from '@/lib/types';
import { getNytList } from '@/lib/nyt';

const SPOTLIGHT_SERIES = [
  { slug: 'acotar', label: 'ACOTAR', sub: 'Sarah J. Maas' },
  { slug: 'fourth-wing', label: 'Fourth Wing', sub: 'Rebecca Yarros' },
  { slug: 'colleen-hoover', label: 'Colleen Hoover', sub: 'CoHo picks' },
  { slug: 'a-song-of-ice-and-fire', label: 'Game of Thrones', sub: 'George R.R. Martin' },
  { slug: 'stormlight-archive', label: 'Stormlight', sub: 'Brandon Sanderson' },
  { slug: 'mistborn', label: 'Mistborn', sub: 'Brandon Sanderson' },
];

export const revalidate = 86400; // refresh every 24h

export default async function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BookReleaseRadar',
    url: 'https://bookreleaseradar.com',
    description: 'Track upcoming book releases by genre, author, and date.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bookreleaseradar.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
  const [upcoming, thisWeek, trendingList, ...genreSamples] = await Promise.all([
    getUpcomingBooks(18),
    getReleasingThisWeek(),
    getNytList('young-adult-hardcover'),
    ...GENRES.map((g) => getBooksByGenre(g as Genre, 6)),
  ]);

  const featuredGenres = [...GENRES] as Genre[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-14">
      {/* Hero */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[var(--text)] mb-2">
            Upcoming Book Releases
          </h1>
          <p className="text-[var(--text-muted)] text-base max-w-xl">
            The next great reads, tracked before they hit shelves. Browse by genre, author, or release date.
          </p>
        </div>

        <BookGrid books={upcoming} emptyMessage="Run the seed script to populate books from Google Books API." />

        {upcoming.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline font-medium"
            >
              Browse all books <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* Releasing This Week */}
      {thisWeek.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Releasing This Week
              </h2>
            </div>
            <Link
              href={`/releases/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
            >
              See full month <ChevronRight size={13} />
            </Link>
          </div>
          <BookGrid books={thisWeek} />
        </section>
      )}

      {/* Popular Series Spotlight */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Library size={16} className="text-[var(--accent)]" />
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
              Popular Series
            </h2>
          </div>
          <Link href="/series" className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5">
            All series <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-5">
          {SPOTLIGHT_SERIES.map((s) => (
            <Link
              key={s.slug}
              href={`/series/${s.slug}`}
              className="group flex flex-col items-center text-center p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)] transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center mb-2">
                <BookMarked size={18} className="text-[var(--accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-0.5">{s.label}</span>
              <span className="text-[10px] text-[var(--text-faint)] leading-tight">{s.sub}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/series/acotar/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            ACOTAR Reading Order →
          </Link>
          <Link href="/series/fourth-wing/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Fourth Wing Reading Order →
          </Link>
          <Link href="/books-like/acotar" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Books Like ACOTAR →
          </Link>
          <Link href="/books-like" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            All Recommendations →
          </Link>
        </div>
      </section>

      {/* Trending on BookTok */}
      {trendingList && trendingList.books.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Trending on BookTok
              </h2>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gold)] bg-[var(--gold-light)] px-2 py-0.5 rounded-full">
                NYT YA
              </span>
            </div>
            <Link
              href="/trending"
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
            >
              Full charts <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {trendingList.books.slice(0, 5).map((book) => (
              <a
                key={book.isbn13 || book.title}
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
              >
                <div className="relative bg-[var(--surface-raised)]" style={{ aspectRatio: '2/3' }}>
                  {book.coverUrl && (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                    />
                  )}
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center shadow">
                    <span className="text-[11px] font-bold text-[var(--accent-fg)]">#{book.rank}</span>
                  </div>
                  {book.weeksOnList === 1 && (
                    <div className="absolute top-2 right-2 bg-[var(--gold)] text-[var(--accent-fg)] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-2.5 flex flex-col flex-1 gap-0.5">
                  <p className="font-[family-name:var(--font-playfair)] font-semibold text-xs leading-snug line-clamp-2 text-[var(--text)]">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">{book.author}</p>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-[9px] text-[var(--text-faint)]">
                      {book.weeksOnList === 1 ? 'New' : `${book.weeksOnList}wk`}
                    </span>
                    <ExternalLink size={10} className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Genre sections */}
      {featuredGenres.map((genre, i) => {
        const books = genreSamples[i] ?? [];
        if (!books.length) return null;
        return (
          <section key={genre}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[var(--accent)]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                  New in {GENRE_LABELS[genre]}
                </h2>
              </div>
              <Link
                href={`/genre/${genre}`}
                className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
              >
                See all <ChevronRight size={13} />
              </Link>
            </div>
            <BookGrid books={books} />
          </section>
        );
      })}

      {/* CTA banner */}
      <section className="rounded-xl bg-[var(--accent-light)] border border-[var(--border)] p-8 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-2 text-[var(--text)]">
          Never miss a release
        </h2>
        <p className="text-[var(--text-muted)] text-sm mb-4 max-w-md mx-auto">
          Browse by genre or use the calendar view to see everything releasing this month and beyond.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/calendar"
            className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            View Calendar
          </Link>
          <Link
            href="/search"
            className="px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-semibold hover:border-[var(--accent)] transition-colors"
          >
            Search Books
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
