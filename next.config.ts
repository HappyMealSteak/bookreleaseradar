import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '/books/**',
      },
    ],
  },
  experimental: {
    // Keep the default model (no cacheComponents) for broad compatibility
  },
};

export default nextConfig;
