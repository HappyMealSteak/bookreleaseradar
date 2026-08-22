import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ year: string }>;
}

export default async function OGImage({ params }: Props) {
  const { year } = await params;

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
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'sans-serif' }}>
            BookReleaseRadar
          </div>

          <div style={{ display: 'flex', width: '60px', height: '4px', background: '#c9a84c', marginBottom: '32px', borderRadius: '2px' }} />

          <div style={{ display: 'flex', fontSize: '64px', fontWeight: 700, color: '#f8f9fa', lineHeight: 1.1, maxWidth: '900px', marginBottom: '28px' }}>
            New Books {year}
          </div>

          <div style={{ display: 'flex', fontSize: '24px', color: '#9ca3af', maxWidth: '800px', lineHeight: 1.4, fontFamily: 'sans-serif' }}>
            All book releases of {year} — fantasy, romance, thriller, mystery &amp; more, with release dates and links.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', color: '#6b7280', fontSize: '20px', fontFamily: 'sans-serif' }}>
            bookreleaseradar.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
