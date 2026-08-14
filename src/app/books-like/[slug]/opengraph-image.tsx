import { ImageResponse } from 'next/og';
import { getBooksLike, ALL_BOOKS_LIKE_SLUGS } from '@/lib/recommendations';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_BOOKS_LIKE_SLUGS.map((slug) => ({ slug }));
}

export default async function BooksLikeOGImage({ params }: Props) {
  const { slug } = await params;
  const entry = getBooksLike(slug);

  const name = entry?.sourceShortName ?? entry?.sourceTitle ?? slug;
  const tagline = entry?.tagline ?? 'Curated reading recommendations';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          background: '#0F0F11',
          padding: 64,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', marginBottom: 12 }}>
          <div
            style={{
              background: '#C9A84C',
              color: '#0F0F11',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: 4,
            }}
          >
            Reading Recommendations
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#F5F5F5',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Books Like {name}
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#9CA3AF',
            lineHeight: 1.4,
            maxWidth: 780,
            marginBottom: 40,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#6B7280',
            letterSpacing: '0.05em',
          }}
        >
          bookreleaseradar.com
        </div>
      </div>
    ),
    { ...size }
  );
}
