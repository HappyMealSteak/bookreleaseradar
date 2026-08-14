import { createClient } from '@libsql/client';
import type { Book } from './types';

function getClient() {
  const url = process.env.DATABASE_URL ?? 'file:./dev.db';
  const authToken = process.env.TURSO_AUTH_TOKEN;
  return createClient({ url, authToken });
}

export async function initDb() {
  const db = getClient();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      isbn TEXT,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      authors TEXT NOT NULL,
      published_date TEXT,
      description TEXT,
      cover_url TEXT,
      genres TEXT NOT NULL DEFAULT '[]',
      page_count INTEGER,
      publisher TEXT,
      amazon_url TEXT NOT NULL,
      google_url TEXT,
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch())
    )
  `);
  await db.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_books_slug ON books(slug)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_books_date ON books(published_date)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn)`);
}

function rowToBook(row: Record<string, unknown>): Book {
  return {
    id: row.id as string,
    isbn: row.isbn as string | null,
    slug: row.slug as string,
    title: row.title as string,
    authors: JSON.parse(row.authors as string),
    publishedDate: row.published_date as string | null,
    description: row.description as string | null,
    coverUrl: row.cover_url as string | null,
    genres: JSON.parse(row.genres as string),
    pageCount: row.page_count as number | null,
    publisher: row.publisher as string | null,
    amazonUrl: row.amazon_url as string,
    googleUrl: row.google_url as string | null,
  };
}

export async function upsertBook(book: Book) {
  const db = getClient();
  // Guarantee slug uniqueness: if a slug collision exists for a different book id,
  // append the first 6 chars of the Google Books id to differentiate.
  const existing = await db.execute({
    sql: 'SELECT id FROM books WHERE slug = ? LIMIT 1',
    args: [book.slug],
  });
  const slug =
    existing.rows.length > 0 && (existing.rows[0] as Record<string, unknown>).id !== book.id
      ? `${book.slug}-${book.id.slice(0, 6).toLowerCase()}`
      : book.slug;

  await db.execute({
    sql: `INSERT INTO books
      (id, isbn, slug, title, authors, published_date, description, cover_url, genres, page_count, publisher, amazon_url, google_url, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT(id) DO UPDATE SET
        isbn = excluded.isbn,
        slug = excluded.slug,
        title = excluded.title,
        authors = excluded.authors,
        published_date = excluded.published_date,
        description = excluded.description,
        cover_url = excluded.cover_url,
        genres = excluded.genres,
        page_count = excluded.page_count,
        publisher = excluded.publisher,
        amazon_url = excluded.amazon_url,
        google_url = excluded.google_url,
        updated_at = unixepoch()`,
    args: [
      book.id,
      book.isbn,
      slug,
      book.title,
      JSON.stringify(book.authors),
      book.publishedDate,
      book.description,
      book.coverUrl,
      JSON.stringify(book.genres),
      book.pageCount,
      book.publisher,
      book.amazonUrl,
      book.googleUrl,
    ],
  });
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const db = getClient();
  const result = await db.execute({
    sql: 'SELECT * FROM books WHERE slug = ? LIMIT 1',
    args: [slug],
  });
  if (!result.rows.length) return null;
  return rowToBook(result.rows[0] as Record<string, unknown>);
}

export async function getBooksByGenre(genre: string, limit = 24, offset = 0): Promise<Book[]> {
  const db = getClient();
  const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const currentYear = new Date().getFullYear().toString();
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE genres LIKE ?
        AND (
          published_date IS NULL
          OR published_date >= ?
          OR (LENGTH(published_date) = 4 AND published_date >= ?)
        )
      ORDER BY published_date DESC
      LIMIT ? OFFSET ?`,
    args: [`%"${genre}"%`, sixMonthsAgo, currentYear, limit, offset],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getBooksByAuthorSlug(authorSlug: string, limit = 24): Promise<Book[]> {
  const db = getClient();
  // Match author by reconstructing the slug pattern
  const result = await db.execute({
    sql: `SELECT * FROM books WHERE authors LIKE ? ORDER BY published_date DESC LIMIT ?`,
    args: [`%${authorSlug.replace(/-/g, '%')}%`, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getUpcomingBooks(limit = 18): Promise<Book[]> {
  const db = getClient();
  const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE published_date IS NULL
         OR published_date >= ?
         OR (LENGTH(published_date) = 4 AND CAST(published_date AS INTEGER) >= 2023)
      ORDER BY published_date DESC
      LIMIT ?`,
    args: [sixMonthsAgo, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getAllBooks(limit = 1000): Promise<Book[]> {
  const db = getClient();
  const result = await db.execute({
    sql: 'SELECT * FROM books ORDER BY published_date DESC LIMIT ?',
    args: [limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function searchBooks(query: string, limit = 24): Promise<Book[]> {
  const db = getClient();
  const like = `%${query}%`;
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE title LIKE ? OR authors LIKE ? OR description LIKE ?
      ORDER BY published_date DESC
      LIMIT ?`,
    args: [like, like, like, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getRelatedBooks(book: Book, limit = 6): Promise<Book[]> {
  const db = getClient();
  const genre = book.genres[0] ?? 'fiction';
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE id != ? AND genres LIKE ?
      ORDER BY RANDOM()
      LIMIT ?`,
    args: [book.id, `%"${genre}"%`, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getBookCount(): Promise<number> {
  const db = getClient();
  const result = await db.execute('SELECT COUNT(*) as count FROM books');
  return Number((result.rows[0] as Record<string, unknown>).count);
}

export async function getBookCountByGenre(genre: string): Promise<number> {
  const db = getClient();
  const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const currentYear = new Date().getFullYear().toString();
  const result = await db.execute({
    sql: `SELECT COUNT(*) as count FROM books
      WHERE genres LIKE ?
        AND (
          published_date IS NULL
          OR published_date >= ?
          OR (LENGTH(published_date) = 4 AND published_date >= ?)
        )`,
    args: [`%"${genre}"%`, sixMonthsAgo, currentYear],
  });
  return Number((result.rows[0] as Record<string, unknown>).count);
}
