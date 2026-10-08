'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import Magnetic from '@/components/fx/Magnetic';
import { Reveal } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';

type Cta = { href: string; label: string };

/** Sezione finale scura con luce che segue il mouse, blob morbidi e pulsanti magnetici */
export default function CtaSection({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  titleWidth = 640,
}: {
  eyebrow?: string;
  title: ReactNode;
  text: string;
  primary: Cta;
  secondary: Cta;
  titleWidth?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="cta-section"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${e.clientX - r.left}px`);
        el.style.setProperty('--sy', `${e.clientY - r.top}px`);
      }}
    >
      <div className="cta-spotlight" aria-hidden />
      <div className="deco-blob" style={{ width: 350, height: 350, background: 'rgba(224,94,40,.07)', top: -80, right: -80 }} />
      <div
        className="deco-blob"
        style={{ width: 220, height: 220, background: 'rgba(224,94,40,.05)', bottom: -50, left: -40, animationDelay: '4s' }}
      />
      <div className="container cta-inner">
        {eyebrow && (
          <Reveal className="eyebrow cta-eyebrow" variant="blur">
            <span>{eyebrow}</span>
          </Reveal>
        )}
        <SplitText className="s-title white" style={{ maxWidth: titleWidth, margin: '0 auto 1.2rem' }}>
          {title}
        </SplitText>
        <Reveal as="p" className="s-text white" delay={0.25} style={{ margin: '0 auto 2.5rem' }}>
          {text}
        </Reveal>
        <Reveal className="cta-btns" delay={0.4}>
          <Magnetic>
            <Link href={primary.href} className="btn btn-primary btn-lg">
              {primary.label}
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href={secondary.href} className="btn btn-outline-white btn-lg">
              {secondary.label}
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
