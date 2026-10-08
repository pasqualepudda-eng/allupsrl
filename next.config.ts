import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // In sviluppo il sito si apre anche da telefono/altri dispositivi sulla rete locale
  // (127.0.0.1 compreso: senza, aprendo il sito da quell'indirizzo gli script vengono bloccati e i testi animati restano invisibili)
  allowedDevOrigins: ['127.0.0.1', 'localhost', '172.20.10.*', '192.168.*.*', '10.*.*.*', '*.local'],

  images: {
    // Unsplash ridimensiona le immagini on-the-fly: niente quota di ottimizzazione Vercel
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    qualities: [70, 75, 80],
  },

  // Le vecchie URL .html restano valide e passano il ranking alle nuove
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/blog-:slug.html', destination: '/blog/:slug', permanent: true },
      { source: '/:page.html', destination: '/:page', permanent: true },
    ];
  },

  // Header di sicurezza (prima in middleware.js)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
