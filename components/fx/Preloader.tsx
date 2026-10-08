'use client';

import { animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { INTRO_KEY } from '@/lib/intro';

/**
 * Intro mostrata alla prima visita della sessione.
 * Le animazioni sono in CSS (partono subito, anche prima dell'idratazione);
 * qui si gestiscono solo il contatore e la rimozione.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro === 'seen' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {}
    const counter = animate(0, 100, {
      duration: 1.15,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(2, '0');
      },
    });
    const remove = window.setTimeout(() => setGone(true), 2300);
    // Dopo l'ingresso dell'hero le prossime pagine non devono più attendere l'intro
    const mark = window.setTimeout(() => html.setAttribute('data-intro', 'seen'), 3400);
    return () => {
      counter.stop();
      window.clearTimeout(remove);
      window.clearTimeout(mark);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" aria-hidden>
      <div className="preloader-panel preloader-panel--orange" />
      <div className="preloader-panel preloader-panel--dark">
        <div className="preloader-center">
          <div className="preloader-logo">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L19 6L15.45 11.25L21 13.5L15.36 14.9L17 21L12 17.27L7 21L8.64 14.9L3 13.5L8.55 11.25L5 6L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="preloader-word">
            {'AllUp'.split('').map((c, i) => (
              <span key={i} style={{ animationDelay: `${0.15 + i * 0.06}s` }} className={i >= 3 ? 'is-accent' : ''}>
                {c}
              </span>
            ))}
          </div>
          <div className="preloader-bar">
            <span />
          </div>
          <div className="preloader-meta">
            <span>Facility Management · Roma</span>
            <span>
              <span ref={countRef}>00</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
