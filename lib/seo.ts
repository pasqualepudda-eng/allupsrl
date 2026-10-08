import type { Metadata } from 'next';
import { seo, sharedJsonLd } from '@/content/seo';
import { site } from '@/lib/site';

export type PageSeo = {
  title: string;
  description?: string;
  keywords?: string;
  robots: string;
  ogType: string;
  jsonLd?: Record<string, unknown>[];
};

export const absoluteUrl = (route: string) => site.domain + route;

export function pageMetadata(route: string): Metadata {
  const s = seo[route];
  if (!s) throw new Error(`SEO mancante per ${route}`);
  const url = absoluteUrl(route);
  return {
    title: { absolute: s.title },
    description: s.description,
    keywords: s.keywords,
    robots: s.robots,
    alternates: { canonical: url },
    openGraph: {
      type: s.ogType === 'article' ? 'article' : 'website',
      url,
      title: s.title,
      description: s.description,
      siteName: site.name,
      locale: 'it_IT',
      images: [`${site.domain}/og-image.jpg`],
    },
    twitter: { card: 'summary_large_image', title: s.title, description: s.description },
  };
}

/** Grafo JSON-LD della pagina: nodi condivisi (azienda, sito) + nodi specifici */
export function jsonLdFor(route: string) {
  const own = seo[route]?.jsonLd ?? [];
  const ownIds = new Set(own.map((n) => n['@id']).filter(Boolean));
  const shared = sharedJsonLd.filter((n) => !ownIds.has(n['@id']));
  return { '@context': 'https://schema.org', '@graph': [...shared, ...own] };
}
