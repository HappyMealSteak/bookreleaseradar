const NYT_API_KEY = process.env.NYT_BOOKS_API_KEY;
const BASE = 'https://api.nytimes.com/svc/books/v3';
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? 'bookreleaseradar-20';

export interface NytBook {
  rank: number;
  rankLastWeek: number;
  weeksOnList: number;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  amazonUrl: string;
  isbn13: string;
  publisher: string;
}

export interface NytList {
  displayName: string;
  listNameEncoded: string;
  books: NytBook[];
  updatedAt: string;
}

export const NYT_LISTS = [
  { slug: 'young-adult-hardcover', label: 'YA Bestsellers', emoji: '✨' },
  { slug: 'hardcover-fiction', label: 'Fiction Bestsellers', emoji: '📚' },
  { slug: 'paperback-trade-fiction', label: 'Paperback Fiction', emoji: '🔖' },
] as const;

export type NytListSlug = (typeof NYT_LISTS)[number]['slug'];

function patchAffiliateTag(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('tag', AMAZON_TAG);
    return u.toString();
  } catch {
    return url.replace(/tag=[^&]+/, `tag=${AMAZON_TAG}`);
  }
}

export async function getNytList(listName: string): Promise<NytList | null> {
  if (!NYT_API_KEY) return null;
  try {
    const res = await fetch(
      `${BASE}/lists/current/${listName}.json?api-key=${NYT_API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const r = data.results;
    return {
      displayName: r.display_name as string,
      listNameEncoded: r.list_name_encoded as string,
      books: ((r.books ?? []) as Record<string, unknown>[]).map((b) => ({
        rank: b.rank as number,
        rankLastWeek: b.rank_last_week as number,
        weeksOnList: b.weeks_on_list as number,
        title: b.title as string,
        author: b.author as string,
        description: b.description as string,
        coverUrl: b.book_image as string,
        amazonUrl: patchAffiliateTag(b.amazon_product_url as string),
        isbn13: b.primary_isbn13 as string,
        publisher: b.publisher as string,
      })),
      updatedAt: r.last_modified as string,
    };
  } catch {
    return null;
  }
}

export async function getAllNytLists(): Promise<(NytList & { slug: string; label: string; emoji: string })[]> {
  const results = await Promise.all(
    NYT_LISTS.map(async (meta) => {
      const list = await getNytList(meta.slug);
      return list ? { ...list, ...meta } : null;
    })
  );
  return results.filter((r): r is NonNullable<typeof r> => r !== null);
}

export function getDebutBooks(lists: NytList[]): NytBook[] {
  const seen = new Set<string>();
  const debuts: NytBook[] = [];
  for (const list of lists) {
    for (const book of list.books) {
      const key = book.isbn13 || book.title;
      if (book.weeksOnList === 1 && !seen.has(key)) {
        seen.add(key);
        debuts.push(book);
      }
    }
  }
  return debuts;
}
