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
    return `https://www.amazon.com/dp/${isbn}?tag=${tag}`;
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
