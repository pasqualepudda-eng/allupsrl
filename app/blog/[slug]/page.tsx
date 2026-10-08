import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import ShareButtons from '@/components/blog/ShareButtons';
import PostCard from '@/components/blog/PostCard';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import SplitWords from '@/components/fx/SplitWords';
import { ArrowLeft, ArrowRight, CalendarIcon, ClockIcon } from '@/components/icons';
import JsonLd from '@/components/JsonLd';
import PageTransition from '@/components/PageTransition';
import RichContent from '@/components/RichContent';
import ScrollSpyToc from '@/components/ScrollSpyToc';
import { articles } from '@/content/articles';
import { postBySlug } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/blog/${slug}`);
}

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) notFound();
  const related = a.related.map(postBySlug).filter((p) => p !== undefined);

  return (
    <PageTransition>
      <JsonLd route={`/blog/${slug}`} />

      {/* Stesso nome della foto nella card: l'immagine si espande fino a diventare l'hero */}
      <ViewTransition name={`post-${slug}`} share="morph" default="none">
        <section className={`art-hero ${a.heroClass}`}>
          <div className="art-hero-shade" aria-hidden />
          <div className="container art-hero-inner">
            <Link href="/blog" className="art-back intro-in" style={d(0)}>
              <ArrowLeft /> Torna al Blog
            </Link>
            <span className="art-hero-cat intro-in" style={d(0.08)}>
              {a.category}
            </span>
            <h1>
              <SplitWords text={a.title} base={0.12} step={0.035} />
            </h1>
            <p className="art-hero-lead intro-in" style={d(0.45)} dangerouslySetInnerHTML={{ __html: a.lead }} />
            <div className="art-hero-meta intro-in" style={d(0.6)}>
              <span>
                <CalendarIcon /> {a.date}
              </span>
              <span className="art-hero-sep">·</span>
              <span>
                <ClockIcon /> {a.readTime}
              </span>
              <span className="art-hero-sep">·</span>
              <span>{a.author}</span>
            </div>
          </div>
        </section>
      </ViewTransition>

      <div className="container">
        <div className="art-layout">
          <article className="art-content">
            <RichContent html={a.bodyHtml} />
            <ShareButtons title={a.title} />
          </article>

          <aside className="art-sidebar">
            <Reveal variant="right">
              <ScrollSpyToc
                items={a.toc}
                className="sidebar-toc"
                titleClassName="sidebar-toc-title"
                linkClassName="toc-link"
                title={
                  <>
                    <svg viewBox="0 0 24 24">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                    </svg>{' '}
                    Indice
                  </>
                }
              />
            </Reveal>
            <Reveal className="sidebar-cta" variant="right" delay={0.12}>
              <div className="sidebar-cta-icon" dangerouslySetInnerHTML={{ __html: a.sidebarCta.iconSvg }} />
              <h4>{a.sidebarCta.title}</h4>
              <p>{a.sidebarCta.text}</p>
              <Link href={a.sidebarCta.href} className="btn-read">
                {a.sidebarCta.label} <ArrowRight />
              </Link>
            </Reveal>
          </aside>
        </div>
      </div>

      <section className="related-section">
        <div className="container">
          <Reveal as="h2">Articoli correlati</Reveal>
          <Stagger className="related-grid" gap={0.1}>
            {related.map((p) => (
              <StaggerItem key={p.slug} className="art-card-wrap" variant="up">
                <PostCard post={p} compact />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="art-cta-banner">
        <div className="container art-cta-banner-inner">
          <Reveal as="h2" variant="blur">
            {a.ctaBanner.title}
          </Reveal>
          <Reveal as="p" delay={0.1}>
            {a.ctaBanner.text}
          </Reveal>
          <Reveal delay={0.2}>
            <Link href={a.ctaBanner.href} className="btn-read">
              {a.ctaBanner.label} <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
