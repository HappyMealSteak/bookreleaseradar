import type { MetadataRoute } from 'next';
import { getAllBooks, getPublishedMonths } from '@/lib/db';
import { GENRES } from '@/lib/types';
import { SERIES } from '@/lib/series';
import { authorSlug } from '@/lib/utils';

const BASE = 'https://bookreleaseradar.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, months] = await Promise.all([getAllBooks(1000), getPublishedMonths()]);

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

  const uniqueAuthors = [
    ...new Set(books.flatMap((b) => b.authors).filter(Boolean)),
  ];
  const authorUrls: MetadataRoute.Sitemap = uniqueAuthors.map((author) => ({
    url: `${BASE}/author/${authorSlug(author)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const monthUrls: MetadataRoute.Sitemap = months.map(({ year, month }) => ({
    url: `${BASE}/releases/${year}/${String(month).padStart(2, '0')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const seriesUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/series`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...SERIES.map((s) => ({
      url: `${BASE}/series/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/most-anticipated`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/calendar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...seriesUrls,
    ...genreUrls,
    ...monthUrls,
    ...authorUrls,
    ...bookUrls,
  ];
}
