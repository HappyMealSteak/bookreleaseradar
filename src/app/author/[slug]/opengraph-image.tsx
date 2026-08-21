import { ImageResponse } from 'next/og';
import { getAllAuthors } from '@/lib/db';
import { getAuthorBio } from '@/lib/author-bios';
import { authorSlug } from '@/lib/utils';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AuthorOGImage({ params }: Props) {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const name = authors.find((a) => authorSlug(a.name) === slug)?.name ?? slug;
  const bio = getAuthorBio(name);
  const bookCount = authors.find((a) => authorSlug(a.name) === slug)?.bookCount ?? 0;

  const bioSnippet = bio?.bio?.slice(0, 140) ?? null;

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
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'sans-serif' }}>
            Author
          </div>

          <div style={{ display: 'flex', width: '48px', height: '4px', background: '#c9a84c', marginBottom: '28px', borderRadius: '2px' }} />

          <div
            style={{
              display: 'flex',
              fontSize: name.length > 20 ? '52px' : '64px',
              fontWeight: 700,
              color: '#f8f9fa',
              lineHeight: 1.1,
              marginBottom: '24px',
              fontFamily: 'serif',
            }}
          >
            {name}
          </div>

          {bioSnippet && (
            <div style={{ display: 'flex', fontSize: '22px', color: '#9ca3af', lineHeight: 1.5, maxWidth: '900px', fontFamily: 'sans-serif' }}>
              {bioSnippet}{bio && bio.bio.length > 140 ? '…' : ''}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: '20px', color: '#6b7280', fontFamily: 'sans-serif' }}>
            {bookCount > 0 ? `${bookCount} books tracked` : ''}
          </div>
          <div style={{ display: 'flex', fontSize: '20px', color: '#6b7280', fontFamily: 'sans-serif' }}>
            bookreleaseradar.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
