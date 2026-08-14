import { getUpcomingBooks } from '@/lib/db';
import { formatReleaseDate } from '@/lib/utils';

export const revalidate = 86400;

export async function GET() {
  const books = await getUpcomingBooks(50);
  const BASE = 'https://bookreleaseradar.com';
  const now = new Date().toUTCString();

  const items = books
    .map((book) => {
      const url = `${BASE}/books/${book.slug}`;
      const pubDate = book.publishedDate ? new Date(book.publishedDate).toUTCString() : now;
      const desc = book.description
        ? book.description.slice(0, 300).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        : `${book.title} by ${book.authors.join(', ')} — ${formatReleaseDate(book.publishedDate)}`;
      const title = book.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const author = book.authors.join(', ').replace(/&/g, '&amp;');
      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${desc}</description>
      <author>${author}</author>
      <pubDate>${pubDate}</pubDate>
      ${book.coverUrl ? `<enclosure url="${book.coverUrl}" type="image/jpeg"/>` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BookReleaseRadar — Upcoming Book Releases</title>
    <link>${BASE}</link>
    <description>Track upcoming book releases by genre, author, and date.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/icon-192.png</url>
      <title>BookReleaseRadar</title>
      <link>${BASE}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
