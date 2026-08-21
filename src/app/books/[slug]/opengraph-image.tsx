import { ImageResponse } from 'next/og';
import { getBookBySlug } from '@/lib/db';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BookOGImage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  const title = book?.title ?? 'Book Release';
  const author = book?.authors[0] ?? '';
  const date = book?.publishedDate
    ? new Date(book.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null;

  let coverData: string | null = null;
  if (book?.coverUrl) {
    try {
      const res = await fetch(book.coverUrl, { next: { revalidate: 86400 } });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const base64 = Buffer.from(buf).toString('base64');
        const mime = res.headers.get('content-type') ?? 'image/jpeg';
        coverData = `data:${mime};base64,${base64}`;
      }
    } catch {
      // no cover
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1117',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flex: 1 }}>
          {coverData && (
            <img
              src={coverData}
              style={{
                width: '200px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                flexShrink: 0,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', width: '48px', height: '4px', background: '#c9a84c', marginBottom: '28px', borderRadius: '2px' }} />

            <div
              style={{
                display: 'flex',
                fontSize: title.length > 40 ? '42px' : '54px',
                fontWeight: 700,
                color: '#f8f9fa',
                lineHeight: 1.15,
                marginBottom: '20px',
                fontFamily: 'serif',
              }}
            >
              {title}
            </div>

            {author && (
              <div style={{ display: 'flex', fontSize: '26px', color: '#c9a84c', fontFamily: 'sans-serif', marginBottom: '16px' }}>
                {author}
              </div>
            )}

            {date && (
              <div style={{ display: 'flex', fontSize: '22px', color: '#9ca3af', fontFamily: 'sans-serif' }}>
                Releases {date}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', color: '#6b7280', fontSize: '18px', fontFamily: 'sans-serif' }}>
            bookreleaseradar.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
