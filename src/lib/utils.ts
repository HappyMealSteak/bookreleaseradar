import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Book, GBVolume, Genre } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export function buildAmazonUrl(isbn: string | null, title: string, authors: string[]): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG ?? 'bookreleaseradar-20';
  if (isbn) {
    // /dp/ only works with ISBN-10 (10 chars) or ASIN — ISBN-13 must use search
    if (isbn.length === 10) {
      return `https://www.amazon.com/dp/${isbn}?tag=${tag}`;
    }
    return `https://www.amazon.com/s?k=${isbn}&i=stripbooks&tag=${tag}`;
  }
  const query = encodeURIComponent(`${title} ${authors[0] ?? ''}`.trim());
  return `https://www.amazon.com/s?k=${query}&i=stripbooks&tag=${tag}`;
}

export function extractIsbn13(volume: GBVolume): string | null {
  const ids = volume.volumeInfo.industryIdentifiers ?? [];
  const isbn13 = ids.find((id) => id.type === 'ISBN_13');
  return isbn13?.identifier ?? null;
}

// Map Google Books categories → our 8 genres
const CATEGORY_MAP: Array<[RegExp, Genre]> = [
  [/thriller|suspense/i, 'thriller'],
  [/mystery|crime/i, 'mystery'],
  [/romance|love/i, 'romance'],
  [/fantasy/i, 'fantasy'],
  [/science fiction|sci-fi|scifi/i, 'sci-fi'],
  [/self.help|personal development|business|motivat/i, 'self-help'],
  [/biography|memoir|history|true crime|politics|economics|science|nature|travel|cooking/i, 'non-fiction'],
  [/fiction/i, 'fiction'],
];

export function mapCategories(raw: string[]): Genre[] {
  const found = new Set<Genre>();
  for (const cat of raw) {
    for (const [pattern, genre] of CATEGORY_MAP) {
      if (pattern.test(cat)) {
        found.add(genre);
        break;
      }
    }
  }
  return Array.from(found);
}

export function volumeToBook(volume: GBVolume): Book {
  const info = volume.volumeInfo;
  const isbn = extractIsbn13(volume);
  const slug = isbn ?? slugify(info.title ?? volume.id);
  const authors = info.authors ?? [];
  const cover = info.imageLinks?.thumbnail?.replace('http://', 'https://') ?? null;
  const genres = mapCategories(info.categories ?? []);

  return {
    id: volume.id,
    isbn,
    slug,
    title: info.title ?? 'Untitled',
    authors,
    publishedDate: info.publishedDate ?? null,
    description: info.description ? info.description.slice(0, 1000) : null,
    coverUrl: cover,
    genres: genres.length ? genres : ['fiction'],
    pageCount: info.pageCount ?? null,
    publisher: info.publisher ?? null,
    amazonUrl: buildAmazonUrl(isbn, info.title ?? '', authors),
    googleUrl: info.infoLink ?? null,
  };
}

export function formatReleaseDate(dateStr: string | null): string {
  if (!dateStr) return 'TBA';
  if (/^\d{4}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr + (dateStr.length === 7 ? '-01' : ''));
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

// Filter out placeholder/TBA titles and non-fiction junk that Google Books returns
const PLACEHOLDER_PATTERNS = [
  /\b(untitled|tba|tbd|to be announced|to be confirmed)\b/i,
  /\bnovel\s+\d{4}\b/i,          // "Author Novel 2027"
  /\bbook\s+\d{4}\b/i,           // "Author Book 2027"
  /\btitle\s+to\s+be\b/i,        // "Title to Be Announced"
  /\buntitled\s+\w+\s+\d{4}\b/i, // "Untitled Name 2027"
  /^\w[\w\s]*\s+\d{4}$/i,        // Bare "Author Name 2027" (title is just author + year)
  // Box sets and anthology series
  /\bbox set\b/i,
  /^harlequin\b/i,
  /\blove inspired\b/i,
  /\bBest American\b.*\b(mystery|science fiction|fantasy)\b/i,
  // Children's non-fiction identifiers
  /^(Let'?s Look Inside|Why Do|Do Fish|Can a |Being a Good Listener|Do Dogs)/i,
  // "Born In XXXX" tracking books
  /^Born In \d{4}$/i,
  // Academic/literary criticism in title
  /\bHandbook of\b/i,
  /\bPalgrave\b/i,
  // Author-to-be-announced placeholders
  /author to be announced/i,
  // Harlequin anthology monthly bindings
  /^Modern Romance\s+\w+\s+\d{4}\b/i,
  // Series-label subtitles (not individual novels)
  /:\s+A High-Stakes\b.*\bSeries\b/i,
  // Literary criticism and academic suffixes
  /\bSartorial Spaces\b/i,
  /\bMale World of Cold War\b/i,
  /\bGolden Age Crime Writing\b/i,
  // Exam prep, study guides, CDL manuals
  /\bExam Prep\b/i,
  /\bExam Study Guide\b/i,
  /\bCDL Exam\b/i,
  /\bCertification Exam\b/i,
  // Media tie-ins and promotional guides
  /\bMovie Guide\b/i,
  // Trade catalogs
  /^Buzz Books\b/i,
  // Large print and special editions (duplicates of existing books)
  /\bLarge Print\b/i,
  /\bDeluxe.*Edition\b/i,
  /\bSpecial Edition\b.*\bBook\b/i,
  // Companion-only or novelization labels in titles that signal low quality
  /\bNovelization\b/i,
];

export function hasQualityTitle(title: string): boolean {
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(title)) return false;
  }
  // Titles shorter than 3 chars or longer than 200 are suspicious
  if (title.trim().length < 3 || title.length > 200) return false;
  return true;
}

export function isUpcoming(dateStr: string | null): boolean {
  if (!dateStr) return true;
  // Year-only dates: only include recent/future years (2023+)
  if (/^\d{4}$/.test(dateStr)) return Number(dateStr) >= 2023;
  const now = new Date();
  // Include anything published in the last 6 months or in the future
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  try {
    const normalized = dateStr.replace('T00:00:00Z', '');
    const d = new Date(normalized.length === 7 ? normalized + '-01' : normalized);
    return d >= sixMonthsAgo;
  } catch {
    return true;
  }
}

export function authorSlug(name: string): string {
  return slugify(name);
}

/**
 * Merge duplicate editions (hardcover/paperback) of the same book into one entry.
 * Picks the best primary (has cover > earliest date), attaches others as `editions`.
 */
export function deduplicateBooks(books: Book[]): Book[] {
  const normalizeTitle = (t: string) =>
    t.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);

  const groups = new Map<string, Book[]>();
  for (const book of books) {
    const key = `${normalizeTitle(book.title)}||${book.authors[0]?.toLowerCase() ?? ''}`;
    const grp = groups.get(key);
    if (grp) grp.push(book);
    else groups.set(key, [book]);
  }

  const result: Book[] = [];
  for (const group of groups.values()) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }
    // Pick primary: prefer has cover, then earliest valid date
    const sorted = [...group].sort((a, b) => {
      const aCover = a.coverUrl ? 0 : 1;
      const bCover = b.coverUrl ? 0 : 1;
      if (aCover !== bCover) return aCover - bCover;
      const aDate = a.publishedDate ?? '9999';
      const bDate = b.publishedDate ?? '9999';
      return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
    });
    const [primary, ...others] = sorted;
    const editions = others.map((o) => ({
      publishedDate: o.publishedDate,
      publisher: o.publisher,
      amazonUrl: o.amazonUrl,
      slug: o.slug,
    }));
    result.push({ ...primary, editions });
  }
  return result;
}
