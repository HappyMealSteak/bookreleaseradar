import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TrendingOGImage() {
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
            BookTok + NYT Bestsellers
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
          Trending Books
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
          What BookTok is reading right now — updated weekly
        </div>
        <div style={{ fontSize: 18, color: '#6B7280', letterSpacing: '0.05em' }}>
          bookreleaseradar.com/trending
        </div>
      </div>
    ),
    { ...size }
  );
}
