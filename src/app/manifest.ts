import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BookReleaseRadar',
    short_name: 'BookRadar',
    description: 'Track upcoming book releases by genre, author, and date.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1117',
    theme_color: '#d97706',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
