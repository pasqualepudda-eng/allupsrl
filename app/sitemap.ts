import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog';
import { site } from '@/lib/site';

const pages: { path: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/servizi', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contatti', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/preventivo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/chi-siamo', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/lavora-con-noi', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...pages.map((p) => ({ url: site.domain + p.path, lastModified, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...posts.map((p) => ({ url: `${site.domain}/blog/${p.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
