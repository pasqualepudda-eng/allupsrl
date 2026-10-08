'use client';

import { animate } from 'motion/react';
import { useEffect, useRef } from 'react';

// Elementi interni che entrano in sequenza quando la loro sezione diventa visibile
const STAGGER = '.num-list li, .process-step, .err-item, .stat-card, .stat-highlight-item, .compare-table tbody tr, .pros-card, .cons-card, .checklist li, .legal-section li, .legal-section tr';

/**
 * Contenuto HTML statico (articoli, testi legali) animato allo scroll:
 * sezioni che emergono, liste in sequenza, contatori numerici.
 */
export default function RichContent({ html, sectionSelector = '.art-section', className }: { html: string; sectionSelector?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('rc-ready');

    root.querySelectorAll<HTMLElement>(sectionSelector).forEach((section) => {
      section.classList.add('rc-section');
      section.querySelectorAll<HTMLElement>(STAGGER).forEach((el, i) => {
        el.classList.add('rc-item');
        el.style.setProperty('--rc-i', String(Math.min(i, 12)));
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('visible');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(`${sectionSelector}, .art-cover-fig, .art-lead`).forEach((el) => io.observe(el));

    const stops: (() => void)[] = [];
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = Number(el.dataset.count);
          cio.unobserve(el);
          if (reduced || Number.isNaN(target)) {
            el.textContent = String(target);
            return;
          }
          const c = animate(0, target, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = String(Math.round(v))) });
          stops.push(() => c.stop());
        });
      },
      { threshold: 0.5 }
    );
    root.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
      stops.forEach((s) => s());
    };
  }, [html, sectionSelector]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
