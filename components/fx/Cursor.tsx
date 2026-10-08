'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

const INTERACTIVE =
  'a, button, [role="button"], label, select, summary, .srv-list-item, .srv-pill, .srv-card, .cert-item, .team-card, .review, .feat, .nav-link, .dd-item, .art-card, .blog-featured';

type CursorState = { hover: boolean; label: string | null; text: boolean; down: boolean; visible: boolean };

/** Cursore personalizzato: punto + anello elastico che mostra un'etichetta (data-cursor) */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [s, setS] = useState<CursorState>({ hover: false, label: null, text: false, down: false, visible: false });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const update = (patch: Partial<CursorState>) =>
      setS((prev) => {
        for (const k in patch) {
          if (prev[k as keyof CursorState] !== patch[k as keyof CursorState]) return { ...prev, ...patch };
        }
        return prev;
      });

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      update({ visible: true });
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      update({
        hover: !!t.closest(INTERACTIVE),
        label: t.closest('[data-cursor]')?.getAttribute('data-cursor') ?? null,
        text: !!t.closest('input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea'),
      });
    };
    const onDown = () => update({ down: true });
    const onUp = () => update({ down: false });
    const onLeave = () => update({ visible: false });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const cls = [
    s.visible && !s.text ? 'is-visible' : '',
    s.hover ? 'is-hover' : '',
    s.label ? 'has-label' : '',
    s.down ? 'is-down' : '',
  ].join(' ');

  return (
    <>
      <motion.div className={`cursor-dot ${cls}`} style={{ x, y }} aria-hidden />
      <motion.div className={`cursor-ring ${cls}`} style={{ x: rx, y: ry }} aria-hidden>
        <span className="cursor-label">{s.label}</span>
      </motion.div>
    </>
  );
}
