import type { MetadataRoute } from 'next';
import { getAllBooks } from '@/lib/db';
import { GENRES } from '@/lib/types';

const BASE = 'https://bookreleaseradar.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getAllBooks(1000);

  const bookUrls: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${BASE}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const genreUrls: MetadataRoute.Sitemap = GENRES.map((genre) => ({
    url: `${BASE}/genre/${genre}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/calendar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...genreUrls,
    ...bookUrls,
  ];
}
