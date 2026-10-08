'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useLayoutEffect, useRef } from 'react';

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Separatore delle migliaia all'italiana (1.500) */
  grouped?: boolean;
};

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Numero che conta da 0 al valore quando entra in vista (il valore reale resta nell'HTML per i crawler) */
export default function Counter({ value, suffix = '', prefix = '', duration = 2.2, className, grouped = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const fmt = (v: number) => prefix + (grouped ? Math.round(v).toLocaleString('it-IT') : String(Math.round(v))) + suffix;

  useIsoLayoutEffect(() => {
    if (ref.current && !inView) ref.current.textContent = fmt(0);
  }, []);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = fmt(v)),
      onComplete: () => {
        el.classList.add('count-done');
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}
