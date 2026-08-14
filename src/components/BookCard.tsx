import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Book } from '@/lib/types';
import { formatReleaseDate, authorSlug } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
}

export default function BookCard({ book, size = 'md' }: BookCardProps) {
  const coverSizes = {
    sm: { w: 80, h: 120 },
    md: { w: 112, h: 168 },
    lg: { w: 140, h: 210 },
  };
  const { w, h } = coverSizes[size];

  return (
    <article className="group flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] hover:shadow-md transition-all duration-200">
      {/* Cover */}
      <Link href={`/books/${book.slug}`} className="block relative bg-[var(--surface-raised)]" style={{ aspectRatio: `${w}/${h}` }}>
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          />
        ) : (
          <div className="absolute inset-0 cover-placeholder flex flex-col items-center justify-center gap-2 p-3 text-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="5" y="3" width="18" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-faint)]" opacity="0.4"/>
              <rect x="8" y="3" width="15" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-faint)]" opacity="0.6"/>
              <line x1="11" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-[var(--text-faint)]" opacity="0.5"/>
              <line x1="11" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-[var(--text-faint)]" opacity="0.5"/>
              <line x1="11" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-[var(--text-faint)]" opacity="0.5"/>
            </svg>
            <span className="text-[var(--text-faint)] text-[9px] font-semibold tracking-wider uppercase leading-tight opacity-70">
              Cover not<br />yet released
            </span>
          </div>
        )}

        {/* Release date badge */}
        {book.publishedDate && (
          <div className="absolute top-2 left-2 bg-[var(--accent)] text-[var(--accent-fg)] text-[10px] font-bold px-1.5 py-0.5 rounded">
            {book.publishedDate.length === 4
              ? book.publishedDate
              : new Date(book.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <Link href={`/books/${book.slug}`} className="hover:text-[var(--accent)] transition-colors">
          <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-sm leading-snug line-clamp-2">
            {book.title}
          </h3>
        </Link>

        <div className="text-xs text-[var(--text-muted)]">
          {book.authors.slice(0, 2).map((author, i) => (
            <span key={author}>
              {i > 0 && ', '}
              <Link
                href={`/author/${authorSlug(author)}`}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {author}
              </Link>
            </span>
          ))}
        </div>

        <p className="text-[10px] text-[var(--text-faint)] mt-auto pt-1">
          {formatReleaseDate(book.publishedDate)}
        </p>

        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-2 flex items-center justify-center gap-1 w-full py-1.5 px-2 rounded bg-[var(--gold-light)] text-[var(--gold)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] text-xs font-semibold transition-colors"
        >
          <ExternalLink size={11} />
          {book.publishedDate && new Date(book.publishedDate) > new Date() ? 'Pre-order Now' : 'Buy on Amazon'}
        </a>
      </div>
    </article>
  );
}
