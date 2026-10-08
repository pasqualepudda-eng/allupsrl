import Link from 'next/link';
import type { CSSProperties } from 'react';
import { FloatingParticles } from '@/components/fx/canvas';
import SplitWords from '@/components/fx/SplitWords';

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

/** Intestazione delle pagine interne: particelle, aloni in movimento e titolo che si compone */
export default function PageBanner({ eyebrow, title, crumb }: { eyebrow: string; title: string; crumb: string }) {
  return (
    <section className="page-banner">
      <FloatingParticles />
      <div className="banner-orb banner-orb--a" aria-hidden />
      <div className="banner-orb banner-orb--b" aria-hidden />
      <div className="container page-banner-inner">
        <div className="pg-eyebrow intro-in" style={d(0)}>
          {eyebrow}
        </div>
        <h1>
          <SplitWords text={title} base={0.12} />
        </h1>
        <nav className="breadcrumb intro-in" style={d(0.55)} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="bc-sep">›</span>
          <span>{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
