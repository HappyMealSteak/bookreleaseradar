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
  const today = new Date().toISOString().slice(0, 10);
  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const currentYear = new Date().getFullYear().toString();
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE genres LIKE ?
        AND (
          published_date IS NULL
          OR published_date >= ?
          OR (LENGTH(published_date) = 4 AND published_date >= ?)
        )
      ORDER BY
        CASE WHEN published_date IS NULL OR published_date >= ? THEN 0 ELSE 1 END ASC,
        CASE WHEN published_date >= ? THEN published_date END ASC,
        published_date DESC
      LIMIT ? OFFSET ?`,
    args: [`%"${genre}"%`, oneYearAgo, currentYear, today, today, limit, offset],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getBooksByAuthorSlug(authorSlug: string, limit = 24): Promise<Book[]> {
  const db = getClient();
  const result = await db.execute({
    sql: `SELECT * FROM books WHERE authors LIKE ? ORDER BY published_date DESC LIMIT ?`,
    args: [`%${authorSlug.replace(/-/g, '%')}%`, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getBooksByAuthorName(authorName: string, limit = 36): Promise<Book[]> {
  const db = getClient();
  const like = `%${authorName}%`;
  const today = new Date().toISOString().slice(0, 10);
  const result = await db.execute({
    sql: `SELECT * FROM books WHERE authors LIKE ?
      ORDER BY
        CASE WHEN published_date >= ? THEN 0 ELSE 1 END ASC,
        CASE WHEN published_date >= ? THEN published_date END ASC,
        published_date DESC
      LIMIT ?`,
    args: [like, today, today, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getUpcomingBooks(limit = 18): Promise<Book[]> {
  const db = getClient();
  const today = new Date().toISOString().slice(0, 10);
  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE (published_date >= ? OR (published_date >= ? AND published_date < ?))
         OR (LENGTH(published_date) = 4 AND CAST(published_date AS INTEGER) >= 2025)
      ORDER BY
        CASE WHEN published_date >= ? THEN 0 ELSE 1 END ASC,
        published_date ASC
      LIMIT ?`,
    args: [today, oneYearAgo, today, today, limit],
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

export async function getBooksByYear(year: number, limit = 200): Promise<Book[]> {
  const db = getClient();
  const prefix = `${year}-`;
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE published_date LIKE ? OR published_date = ?
      ORDER BY published_date ASC
      LIMIT ?`,
    args: [`${prefix}%`, String(year), limit],
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

export async function getSmartRelatedBooks(book: Book, limit = 6): Promise<{
  byAuthor: Book[];
  byGenre: Book[];
}> {
  const db = getClient();
  const genre = book.genres[0] ?? 'fiction';
  const author = book.authors[0];

  const [authorResult, genreResult] = await Promise.all([
    author
      ? db.execute({
          sql: `SELECT * FROM books
            WHERE id != ? AND authors LIKE ?
            ORDER BY
              CASE WHEN cover_url IS NOT NULL AND description IS NOT NULL THEN 0 ELSE 1 END ASC,
              published_date DESC
            LIMIT ?`,
          args: [book.id, `%${author}%`, limit],
        })
      : Promise.resolve({ rows: [] }),
    db.execute({
      sql: `SELECT * FROM books
        WHERE id != ? AND genres LIKE ?
          AND (? IS NULL OR authors NOT LIKE ?)
          AND cover_url IS NOT NULL
          AND description IS NOT NULL
        ORDER BY published_date DESC
        LIMIT ?`,
      args: [book.id, `%"${genre}"%`, author ?? null, author ? `%${author}%` : null, limit],
    }),
  ]);

  return {
    byAuthor: authorResult.rows.map((r) => rowToBook(r as Record<string, unknown>)),
    byGenre: genreResult.rows.map((r) => rowToBook(r as Record<string, unknown>)),
  };
}

export async function getReleasingThisWeek(): Promise<Book[]> {
  const db = getClient();
  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE published_date >= ? AND published_date <= ?
      ORDER BY published_date ASC
      LIMIT 12`,
    args: [today, nextWeek],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getRecentAndUpcomingBooks(): Promise<{
  justReleased: Book[];
  thisWeek: Book[];
  comingSoon: Book[];
}> {
  const db = getClient();
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const past14 = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const next7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const next60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [recentResult, upcomingResult] = await Promise.all([
    db.execute({
      sql: `SELECT * FROM books
        WHERE published_date >= ? AND published_date < ?
        ORDER BY published_date DESC
        LIMIT 40`,
      args: [past14, today],
    }),
    db.execute({
      sql: `SELECT * FROM books
        WHERE published_date >= ? AND published_date <= ?
        ORDER BY published_date ASC
        LIMIT 60`,
      args: [today, next60],
    }),
  ]);

  const recent = recentResult.rows.map((r) => rowToBook(r as Record<string, unknown>));
  const upcoming = upcomingResult.rows.map((r) => rowToBook(r as Record<string, unknown>));

  return {
    justReleased: recent,
    thisWeek: upcoming.filter((b) => b.publishedDate && b.publishedDate <= next7),
    comingSoon: upcoming.filter((b) => b.publishedDate && b.publishedDate > next7),
  };
}

export async function getBooksByMonth(year: number, month: number): Promise<Book[]> {
  const db = getClient();
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE published_date LIKE ?
      ORDER BY published_date ASC
      LIMIT 200`,
    args: [`${prefix}%`],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getPublishedMonths(): Promise<Array<{ year: number; month: number; count: number }>> {
  const db = getClient();
  const result = await db.execute(`
    SELECT
      CAST(SUBSTR(published_date, 1, 4) AS INTEGER) AS year,
      CAST(SUBSTR(published_date, 6, 2) AS INTEGER) AS month,
      COUNT(*) AS count
    FROM books
    WHERE LENGTH(published_date) >= 7
    GROUP BY year, month
    ORDER BY year, month
  `);
  return result.rows.map((r) => ({
    year: Number((r as Record<string, unknown>).year),
    month: Number((r as Record<string, unknown>).month),
    count: Number((r as Record<string, unknown>).count),
  }));
}

export async function cleanupPlaceholderBooks(): Promise<number> {
  const db = getClient();
  let removed = 0;
  const clauses = [
    `title LIKE '%Untitled%'`,
    `title LIKE '%To Be Announced%'`,
    `title LIKE '% TBA'`,
    `title LIKE '%TBA %'`,
    `title LIKE '%Novel 2025%' OR title LIKE '%Novel 2026%' OR title LIKE '%Novel 2027%' OR title LIKE '%Novel 2028%'`,
    `title LIKE '%Book 2025%' OR title LIKE '%Book 2026%' OR title LIKE '%Book 2027%' OR title LIKE '%Book 2028%'`,
    `title LIKE '%Title to Be%'`,
    `LENGTH(title) < 3`,
    // Box sets and anthology series (not individual novels)
    `title LIKE '%Box Set%' OR title LIKE 'Harlequin%' OR title LIKE '%Love Inspired%'`,
    // Academic/textbook titles
    `title LIKE '%Handbook of%' OR title LIKE '%Palgrave%' OR title LIKE '%Young Adult Literature in Action%'`,
    // Children's non-fiction identifiers
    `title LIKE 'Let%s Look Inside%' OR title LIKE 'Why Do%' OR title LIKE 'Do Fish%' OR title LIKE 'Can a %' OR title LIKE 'Being a Good%'`,
    // "Born in XXXX" series (year-tracking books, not novels)
    `title LIKE 'Born In 19%' OR title LIKE 'Born In 20%'`,
    // Best-of annual anthologies
    `title LIKE 'The Best American%' OR title LIKE 'Griffin Poetry Prize%' OR title LIKE 'Best Debut Short Stories%'`,
    // Author to be announced / placeholder author credit
    `title LIKE '%Author to be Announced%'`,
    // Harlequin monthly anthology bindings
    `title LIKE 'Modern Romance %'`,
    // Series-label subtitles (catalogue placeholders, not individual books)
    `title LIKE '%: A High-Stakes%Series%'`,
    // Literary criticism / academic suffixes
    `title LIKE '%Sartorial Spaces%' OR title LIKE '%Male World of Cold War%' OR title LIKE '%Golden Age Crime Writing%'`,
    // Exam prep and study guides
    `title LIKE '%Exam Prep%' OR title LIKE '%Exam Study Guide%' OR title LIKE '%CDL Exam%' OR title LIKE '%Certification Exam%'`,
    // Movie and media guides
    `title LIKE '%Movie Guide%' OR title LIKE '%MOVIE GUIDE%'`,
    // Trade catalogs
    `title LIKE 'Buzz Books%'`,
    // Large print and special edition duplicates
    `title LIKE '%Large Print%' OR title LIKE '%Deluxe%Edition%' OR title LIKE '%Novelization%'`,
    // No-author entries
    `authors = '[]'`,
  ];
  for (const clause of clauses) {
    const result = await db.execute(`DELETE FROM books WHERE ${clause}`);
    removed += Number(result.rowsAffected ?? 0);
  }
  return removed;
}

export async function getBestBooksByGenreYear(genre: string, year: number, limit = 36): Promise<Book[]> {
  const db = getClient();
  const prefix = `${year}-`;
  const result = await db.execute({
    sql: `SELECT * FROM books
      WHERE genres LIKE ? AND published_date LIKE ?
      ORDER BY
        CASE WHEN cover_url IS NOT NULL AND description IS NOT NULL THEN 0 ELSE 1 END ASC,
        CASE WHEN cover_url IS NOT NULL THEN 0 ELSE 1 END ASC,
        published_date ASC
      LIMIT ?`,
    args: [`%${genre}%`, `${prefix}%`, limit],
  });
  return result.rows.map((r) => rowToBook(r as Record<string, unknown>));
}

export async function getAllAuthors(): Promise<Array<{ name: string; bookCount: number }>> {
  const db = getClient();
  const result = await db.execute('SELECT authors FROM books');
  const counts = new Map<string, number>();
  for (const row of result.rows) {
    const authors: string[] = JSON.parse((row as Record<string, unknown>).authors as string);
    for (const a of authors) {
      if (a) counts.set(a, (counts.get(a) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, bookCount]) => ({ name, bookCount }))
    .sort((a, b) => b.bookCount - a.bookCount);
}

export async function getBookCount(): Promise<number> {
  const db = getClient();
  const result = await db.execute('SELECT COUNT(*) as count FROM books');
  return Number((result.rows[0] as Record<string, unknown>).count);
}

export async function getBookCountByGenre(genre: string): Promise<number> {
  const db = getClient();
  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const currentYear = new Date().getFullYear().toString();
  const result = await db.execute({
    sql: `SELECT COUNT(*) as count FROM books
      WHERE genres LIKE ?
        AND (
          published_date IS NULL
          OR published_date >= ?
          OR (LENGTH(published_date) = 4 AND published_date >= ?)
        )`,
    args: [`%"${genre}"%`, oneYearAgo, currentYear],
  });
  return Number((result.rows[0] as Record<string, unknown>).count);
}
