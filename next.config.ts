import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'www.viagora.com.br' },
      { protocol: 'https', hostname: 'storage.stwonline.com.br' },
    ],
  },
};

export default nextConfig;
