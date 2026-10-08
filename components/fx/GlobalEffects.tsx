'use client';

import { useEffect } from 'react';

/** Effetto "onda" al click su tutti i pulsanti del sito */
export default function GlobalEffects() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest?.<HTMLElement>('.btn, .btn-read, .nav-btn, .ei-btn');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.4;
      const span = document.createElement('span');
      span.className = 'ripple';
      span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;`;
      btn.appendChild(span);
      span.addEventListener('animationend', () => span.remove());
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
