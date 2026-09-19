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

// ---------------------------------------------------------------------------
// In-memory read layer
//
// Every page-facing read is answered from one snapshot of the `books` table
// (a few hundred rows). The old per-page SQL used unindexed LIKE scans, so each
// page re-read the whole table several times and a full build burned through
// the Turso row-read quota. One SELECT per process (per TTL) replaces that.
// ---------------------------------------------------------------------------

const SNAPSHOT_TTL_MS = 10 * 60 * 1000;

let snapshot: { books: Book[]; at: number } | null = null;
let inflight: Promise<Book[]> | null = null;

async function loadBooks(): Promise<Book[]> {
  const now = Date.now();
  if (snapshot && now - snapshot.at < SNAPSHOT_TTL_MS) return snapshot.books;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const db = getClient();
      const result = await db.execute('SELECT * FROM books');
      const books = result.rows.map((r) => rowToBook(r as Record<string, unknown>));
      snapshot = { books, at: Date.now() };
      return books;
    } catch (err) {
      // Serve the last good copy rather than failing a revalidation.
      if (snapshot) return snapshot.books;
      throw err;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

// SQLite orders NULL before every value ascending, and last descending.
function cmpAsc(a: string | null, b: string | null): number {
  if (a === null && b === null) return 0;
  if (a === null) return -1;
  if (b === null) return 1;
  return a < b ? -1 : a > b ? 1 : 0;
}
const cmpDesc = (a: string | null, b: string | null) => -cmpAsc(a, b);

const hasGenre = (b: Book, genre: string) =>
  b.genres.some((g) => g.toLowerCase() === genre.toLowerCase());
const genresContain = (b: Book, text: string) =>
  JSON.stringify(b.genres).toLowerCase().includes(text.toLowerCase());
const authorsContain = (b: Book, text: string) =>
  JSON.stringify(b.authors).toLowerCase().includes(text.toLowerCase());
const complete = (b: Book) => b.coverUrl != null && b.description != null;

function isUpcomingOrRecent(pd: string | null, today: string): boolean {
  return pd !== null && pd >= today;
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const books = await loadBooks();
  return books.find((b) => b.slug === slug) ?? null;
}

function genreVisible(b: Book, oneYearAgo: string, currentYear: string): boolean {
  const pd = b.publishedDate;
  return pd === null || pd >= oneYearAgo || (pd.length === 4 && pd >= currentYear);
}

export async function getBooksByGenre(genre: string, limit = 24, offset = 0): Promise<Book[]> {
  const books = await loadBooks();
  const today = isoDay(new Date());
  const oneYearAgo = isoDay(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  const currentYear = new Date().getFullYear().toString();
  return books
    .filter((b) => hasGenre(b, genre) && genreVisible(b, oneYearAgo, currentYear))
    .sort((a, b) => {
      const ga = a.publishedDate === null || a.publishedDate >= today ? 0 : 1;
      const gb = b.publishedDate === null || b.publishedDate >= today ? 0 : 1;
      if (ga !== gb) return ga - gb;
      const ka = isUpcomingOrRecent(a.publishedDate, today) ? a.publishedDate : null;
      const kb = isUpcomingOrRecent(b.publishedDate, today) ? b.publishedDate : null;
      const k = cmpAsc(ka, kb);
      return k !== 0 ? k : cmpDesc(a.publishedDate, b.publishedDate);
    })
    .slice(offset, offset + limit);
}

export async function getBooksByAuthorSlug(authorSlug: string, limit = 24): Promise<Book[]> {
  const books = await loadBooks();
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(authorSlug.split('-').map(escape).join('.*'), 'i');
  return books
    .filter((b) => pattern.test(JSON.stringify(b.authors)))
    .sort((a, b) => cmpDesc(a.publishedDate, b.publishedDate))
    .slice(0, limit);
}

export async function getBooksByAuthorName(authorName: string, limit = 36): Promise<Book[]> {
  const books = await loadBooks();
  const today = isoDay(new Date());
  return books
    .filter((b) => authorsContain(b, authorName))
    .sort((a, b) => {
      const ga = isUpcomingOrRecent(a.publishedDate, today) ? 0 : 1;
      const gb = isUpcomingOrRecent(b.publishedDate, today) ? 0 : 1;
      if (ga !== gb) return ga - gb;
      const ka = isUpcomingOrRecent(a.publishedDate, today) ? a.publishedDate : null;
      const kb = isUpcomingOrRecent(b.publishedDate, today) ? b.publishedDate : null;
      const k = cmpAsc(ka, kb);
      return k !== 0 ? k : cmpDesc(a.publishedDate, b.publishedDate);
    })
    .slice(0, limit);
}

export async function getUpcomingBooks(limit = 18): Promise<Book[]> {
  const books = await loadBooks();
  const today = isoDay(new Date());
  const oneYearAgo = isoDay(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  return books
    .filter((b) => {
      const pd = b.publishedDate;
      if (pd === null) return false;
      if (pd >= today || (pd >= oneYearAgo && pd < today)) return true;
      return pd.length === 4 && (parseInt(pd, 10) || 0) >= 2025;
    })
    .sort((a, b) => {
      const ga = isUpcomingOrRecent(a.publishedDate, today) ? 0 : 1;
      const gb = isUpcomingOrRecent(b.publishedDate, today) ? 0 : 1;
      return ga !== gb ? ga - gb : cmpAsc(a.publishedDate, b.publishedDate);
    })
    .slice(0, limit);
}

export async function getAllBooks(limit = 1000): Promise<Book[]> {
  const books = await loadBooks();
  return [...books].sort((a, b) => cmpDesc(a.publishedDate, b.publishedDate)).slice(0, limit);
}

export async function getBooksByYear(year: number, limit = 200): Promise<Book[]> {
  const books = await loadBooks();
  const prefix = `${year}-`;
  return books
    .filter((b) => b.publishedDate !== null && (b.publishedDate.startsWith(prefix) || b.publishedDate === String(year)))
    .sort((a, b) => cmpAsc(a.publishedDate, b.publishedDate))
    .slice(0, limit);
}

export async function searchBooks(query: string, limit = 24): Promise<Book[]> {
  const books = await loadBooks();
  const q = query.toLowerCase();
  return books
    .filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        JSON.stringify(b.authors).toLowerCase().includes(q) ||
        (b.description !== null && b.description.toLowerCase().includes(q)),
    )
    .sort((a, b) => cmpDesc(a.publishedDate, b.publishedDate))
    .slice(0, limit);
}

export async function getRelatedBooks(book: Book, limit = 6): Promise<Book[]> {
  const books = await loadBooks();
  const genre = book.genres[0] ?? 'fiction';
  const pool = books.filter((b) => b.id !== book.id && hasGenre(b, genre));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, limit);
}

export async function getSmartRelatedBooks(book: Book, limit = 6): Promise<{
  byAuthor: Book[];
  byGenre: Book[];
}> {
  const books = await loadBooks();
  const genre = book.genres[0] ?? 'fiction';
  const author = book.authors[0];

  const byAuthor = author
    ? books
        .filter((b) => b.id !== book.id && authorsContain(b, author))
        .sort((a, b) => {
          const ca = complete(a) ? 0 : 1;
          const cb = complete(b) ? 0 : 1;
          return ca !== cb ? ca - cb : cmpDesc(a.publishedDate, b.publishedDate);
        })
        .slice(0, limit)
    : [];

  const byGenre = books
    .filter(
      (b) =>
        b.id !== book.id &&
        hasGenre(b, genre) &&
        (!author || !authorsContain(b, author)) &&
        complete(b),
    )
    .sort((a, b) => cmpDesc(a.publishedDate, b.publishedDate))
    .slice(0, limit);

  return { byAuthor, byGenre };
}

export async function getReleasingThisWeek(): Promise<Book[]> {
  const books = await loadBooks();
  const today = isoDay(new Date());
  const nextWeek = isoDay(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  return books
    .filter((b) => b.publishedDate !== null && b.publishedDate >= today && b.publishedDate <= nextWeek)
    .sort((a, b) => cmpAsc(a.publishedDate, b.publishedDate))
    .slice(0, 12);
}

export async function getRecentAndUpcomingBooks(): Promise<{
  justReleased: Book[];
  thisWeek: Book[];
  comingSoon: Book[];
}> {
  const books = await loadBooks();
  const now = new Date();
  const today = isoDay(now);
  const past14 = isoDay(new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000));
  const next7 = isoDay(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
  const next60 = isoDay(new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000));

  const recent = books
    .filter((b) => b.publishedDate !== null && b.publishedDate >= past14 && b.publishedDate < today)
    .sort((a, b) => cmpDesc(a.publishedDate, b.publishedDate))
    .slice(0, 40);
  const upcoming = books
    .filter((b) => b.publishedDate !== null && b.publishedDate >= today && b.publishedDate <= next60)
    .sort((a, b) => cmpAsc(a.publishedDate, b.publishedDate))
    .slice(0, 60);

  return {
    justReleased: recent,
    thisWeek: upcoming.filter((b) => b.publishedDate && b.publishedDate <= next7),
    comingSoon: upcoming.filter((b) => b.publishedDate && b.publishedDate > next7),
  };
}

export async function getBooksByMonth(year: number, month: number): Promise<Book[]> {
  const books = await loadBooks();
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  return books
    .filter((b) => b.publishedDate !== null && b.publishedDate.startsWith(prefix))
    .sort((a, b) => cmpAsc(a.publishedDate, b.publishedDate))
    .slice(0, 200);
}

export async function getPublishedMonths(): Promise<Array<{ year: number; month: number; count: number }>> {
  const books = await loadBooks();
  const counts = new Map<string, { year: number; month: number; count: number }>();
  for (const b of books) {
    const pd = b.publishedDate;
    if (pd === null || pd.length < 7) continue;
    const year = parseInt(pd.slice(0, 4), 10) || 0;
    const month = parseInt(pd.slice(5, 7), 10) || 0;
    const key = `${year}-${month}`;
    const entry = counts.get(key);
    if (entry) entry.count += 1;
    else counts.set(key, { year, month, count: 1 });
  }
  return [...counts.values()].sort((a, b) => a.year - b.year || a.month - b.month);
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
  const books = await loadBooks();
  const prefix = `${year}-`;
  return books
    .filter((b) => genresContain(b, genre) && b.publishedDate !== null && b.publishedDate.startsWith(prefix))
    .sort((a, b) => {
      const ca = complete(a) ? 0 : 1;
      const cb = complete(b) ? 0 : 1;
      if (ca !== cb) return ca - cb;
      const va = a.coverUrl != null ? 0 : 1;
      const vb = b.coverUrl != null ? 0 : 1;
      return va !== vb ? va - vb : cmpAsc(a.publishedDate, b.publishedDate);
    })
    .slice(0, limit);
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
  const books = await loadBooks();
  const oneYearAgo = isoDay(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  const currentYear = new Date().getFullYear().toString();
  return books.filter((b) => hasGenre(b, genre) && genreVisible(b, oneYearAgo, currentYear)).length;
}
