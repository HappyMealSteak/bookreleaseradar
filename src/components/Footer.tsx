import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { GENRES, GENRE_LABELS, type Genre } from '@/lib/types';
import { SERIES } from '@/lib/series';
import { ALL_READING_ORDER_SLUGS } from '@/lib/reading-orders';
import { getSeriesBySlug } from '@/lib/series';
import { getBooksLike } from '@/lib/recommendations';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-[var(--accent)] font-bold mb-3">
              <BookOpen size={18} />
              <span className="font-[family-name:var(--font-playfair)]">BookReleaseRadar</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[220px]">
              Track every upcoming book release. Never miss a new title from your favorite author.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">
              Genres
            </p>
            <ul className="space-y-2">
              {(GENRES.slice(0, 4) as Genre[]).map((genre) => (
                <li key={genre}>
                  <Link
                    href={`/genre/${genre}`}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {GENRE_LABELS[genre]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">
              More
            </p>
            <ul className="space-y-2">
              {(GENRES.slice(4) as Genre[]).map((genre) => (
                <li key={genre}>
                  <Link
                    href={`/genre/${genre}`}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {GENRE_LABELS[genre]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">
              Browse
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/new-releases" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  New Releases This Week
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Trending on BookTok
                </Link>
              </li>
              <li>
                <Link href="/most-anticipated" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Most Anticipated
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Release Calendar
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Search Books
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Popular Series
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Browse Authors
                </Link>
              </li>
              <li>
                <Link href="/books-like" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Books Like…
                </Link>
              </li>
              <li>
                <Link href={`/releases/${new Date().getFullYear()}`} className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  New Books {new Date().getFullYear()}
                </Link>
              </li>
              <li>
                <Link href={`/best-books/${new Date().getFullYear()}`} className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Best Books {new Date().getFullYear()}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">
              Reading Orders
            </p>
            <ul className="space-y-2">
              {ALL_READING_ORDER_SLUGS.slice(0, 8).map((slug) => {
                const s = getSeriesBySlug(slug);
                if (!s) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/series/${slug}/reading-order`}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      {s.shortName ?? s.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/series" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  All Series →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">
              Books Like…
            </p>
            <ul className="space-y-2">
              {['acotar', 'fourth-wing', 'harry-potter', 'dune', 'twilight', 'a-song-of-ice-and-fire', 'hunger-games', 'divergent'].map((slug) => {
                const rec = getBooksLike(slug);
                if (!rec) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/books-like/${slug}`}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      Books Like {rec.sourceShortName ?? rec.sourceTitle}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/books-like" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  All Recommendations →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-[var(--text-faint)]">
            © {new Date().getFullYear()} BookReleaseRadar. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[var(--text-faint)]">
              As an Amazon Associate, BookReleaseRadar earns from qualifying purchases.
            </p>
            <Link href="/disclosure" className="text-xs text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors whitespace-nowrap">
              Disclosure &amp; Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
