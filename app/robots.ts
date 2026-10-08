import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// '$' evita che la regola per /sitemap blocchi anche /sitemap.xml
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/privacy-policy', '/termini-condizioni', '/sitemap$'] },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
