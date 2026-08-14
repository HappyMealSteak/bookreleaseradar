'use client';
import { useState, useEffect, useRef, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import BookGrid from '@/components/BookGrid';
import type { Book } from '@/lib/types';
import { GENRE_LABELS } from '@/lib/types';

const QUICK_SEARCHES = [
  { label: 'ACOTAR', q: 'Court of Thorns' },
  { label: 'Fourth Wing', q: 'Fourth Wing' },
  { label: 'Colleen Hoover', q: 'Colleen Hoover' },
  { label: 'Brandon Sanderson', q: 'Brandon Sanderson' },
  { label: 'Stormlight', q: 'Stormlight' },
  { label: 'Mistborn', q: 'Mistborn' },
  { label: 'Hunger Games', q: 'Hunger Games' },
];

export default function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [results, setResults] = useState<Book[]>([]);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActiveGenre(null);
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    const id = setTimeout(() => {
      startTransition(async () => {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.books ?? []);
        }
      });
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  const genresInResults = results.length > 0
    ? [...new Set(results.flatMap((b) => b.genres))].slice(0, 6)
    : [];

  const filtered = activeGenre
    ? results.filter((b) => b.genres.includes(activeGenre))
    : results;

  return (
    <>
      <div className="relative max-w-xl">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)] pointer-events-none"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, authors, series…"
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors text-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Genre filter chips */}
      {genresInResults.length > 1 && !isPending && (
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setActiveGenre(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              !activeGenre
                ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                : 'bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]'
            }`}
          >
            All ({results.length})
          </button>
          {genresInResults.map((g) => {
            const count = results.filter((b) => b.genres.includes(g)).length;
            return (
              <button
                key={g}
                onClick={() => setActiveGenre(g === activeGenre ? null : g)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeGenre === g
                    ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                    : 'bg-[var(--surface-raised)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                {GENRE_LABELS[g as keyof typeof GENRE_LABELS] ?? g} ({count})
              </button>
            );
          })}
        </div>
      )}

      {isPending && (
        <div className="text-sm text-[var(--text-muted)] mt-4">Searching…</div>
      )}

      {!isPending && query.trim().length >= 2 && (
        <div className="mt-4 text-sm text-[var(--text-muted)]">
          {filtered.length > 0
            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"${activeGenre ? ` in ${GENRE_LABELS[activeGenre as keyof typeof GENRE_LABELS] ?? activeGenre}` : ''}`
            : activeGenre
            ? `No ${GENRE_LABELS[activeGenre as keyof typeof GENRE_LABELS] ?? activeGenre} results for "${query}" — try clearing the filter`
            : `No results for "${query}"`}
        </div>
      )}

      {/* Empty state with quick searches */}
      {query.trim().length < 2 && !isPending && (
        <div className="py-10">
          <div className="flex items-center gap-3 mb-6">
            <Search size={36} className="text-[var(--text-faint)] opacity-30 shrink-0" />
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)] mb-0.5">Search the catalog</p>
              <p className="text-sm text-[var(--text-muted)]">Find books by title, author, or series name</p>
            </div>
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">Popular searches</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {QUICK_SEARCHES.map(({ label, q }) => (
              <button
                key={label}
                onClick={() => setQuery(q)}
                className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">Or browse by series</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/series/acotar" className="px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors font-medium">ACOTAR →</Link>
            <Link href="/series/fourth-wing" className="px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors font-medium">Fourth Wing →</Link>
            <Link href="/series/colleen-hoover" className="px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors font-medium">Colleen Hoover →</Link>
            <Link href="/series" className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">All Series →</Link>
          </div>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-6">
          <BookGrid books={filtered} />
        </div>
      )}
    </>
  );
}
