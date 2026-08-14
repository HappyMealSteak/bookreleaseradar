import BookCard from './BookCard';
import type { Book } from '@/lib/types';

interface BookGridProps {
  books: Book[];
  emptyMessage?: string;
}

export default function BookGrid({ books, emptyMessage = 'No books found.' }: BookGridProps) {
  if (!books.length) {
    return (
      <div className="py-20 text-center text-[var(--text-muted)]">
        <p className="font-[family-name:var(--font-playfair)] text-xl mb-2">Nothing here yet</p>
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
