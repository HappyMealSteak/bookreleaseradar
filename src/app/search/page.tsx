import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchContent from './SearchContent';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Search Books',
  description: 'Search upcoming book releases by title, author, or genre.',
};

export default function SearchPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Find</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-6">
            Search Books
          </h1>
          <Suspense>
            <SearchContent />
          </Suspense>
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
