import type { GBResponse, GBVolume, Genre } from './types';
import { volumeToBook, isUpcoming } from './utils';
import type { Book } from './types';

const BASE = 'https://www.googleapis.com/books/v1/volumes';

// Multi-query strategy: keyword+year queries return actual recent/upcoming titles.
// subject: queries return reprints of classics sorted by Google Books index date.
function buildGenreQueries(genre: Genre): string[] {
  const yr = new Date().getFullYear();
  const nextYr = yr + 1;
  const base: Record<Genre, string[]> = {
    fiction:      ['literary fiction novel', 'debut fiction novel'],
    thriller:     ['thriller novel', 'psychological thriller'],
    mystery:      ['mystery novel', 'detective mystery'],
    fantasy:      ['fantasy novel', 'epic fantasy'],
    'sci-fi':     ['science fiction novel', 'sci-fi novel'],
    romance:      ['romance novel new releases', 'contemporary romance'],
    'self-help':  ['self-help book', 'personal development book'],
    'non-fiction':['nonfiction book', 'narrative nonfiction'],
  };
  const terms = base[genre];
  // Generate year-targeted and "new releases" variants for each base term
  return terms.flatMap((t) => [
    `${t} ${yr}`,
    `${t} ${nextYr}`,
    `new releases ${t}`,
  ]);
}

async function fetchPage(query: string, startIndex = 0, retries = 3): Promise<GBVolume[]> {
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const params = new URLSearchParams({
    q: query,
    orderBy: 'newest',
    printType: 'books',
    langRestrict: 'en',
    maxResults: '40',
    startIndex: String(startIndex),
    ...(key ? { key } : {}),
  });

  const url = `${BASE}?${params}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, { cache: 'no-store' });

    if (res.status === 429) {
      const backoff = (attempt + 1) * 2000;
      console.log(`  Rate limited, backing off ${backoff}ms...`);
      await delay(backoff);
      continue;
    }

    if (!res.ok) {
      console.error(`  Google Books API error ${res.status}`);
      return [];
    }

    const data: GBResponse = await res.json();
    return data.items ?? [];
  }

  return [];
}

export async function fetchUpcomingByGenre(genre: Genre, pages = 1): Promise<Book[]> {
  const books: Book[] = [];
  const seen = new Set<string>();
  const queries = buildGenreQueries(genre);

  for (const query of queries) {
    for (let page = 0; page < pages; page++) {
      const volumes = await fetchPage(query, page * 40);
      if (!volumes.length) break;

      for (const vol of volumes) {
        if (seen.has(vol.id)) continue;
        if (!vol.volumeInfo?.title) continue;
        const book = volumeToBook(vol);
        if (!isUpcoming(book.publishedDate)) continue;
        // Force-tag with the query genre — Google Books categories are often
        // just ["Fiction"] even for mystery/thriller/etc.
        if (!book.genres.includes(genre)) {
          book.genres = [genre, ...book.genres];
        }
        seen.add(vol.id);
        books.push(book);
      }

      if (page < pages - 1) await delay(500);
    }
    // Pause between queries to stay under rate limits
    await delay(800);
  }

  return books;
}

export async function searchGoogleBooks(query: string): Promise<Book[]> {
  const volumes = await fetchPage(query, 0);
  return volumes
    .filter((v) => v.volumeInfo?.title)
    .map(volumeToBook)
    .filter((b) => isUpcoming(b.publishedDate));
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
