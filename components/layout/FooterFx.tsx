'use client';

import { useLenis } from 'lenis/react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUp } from '@/components/icons';

/** Scritta gigante che si "riempie" di arancione mentre il footer entra in vista */
export function FooterMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x = useTransform(scrollYProgress, [0, 1], ['-6%', '0%']);
  // Un solo elemento: contorno + riempimento a gradiente che avanza, sempre allineati
  const backgroundImage = useMotionTemplate`linear-gradient(90deg, #E05E28 0%, #ff9a5a ${fill}%, rgba(224,94,40,0) ${fill}%)`;
  // Il contorno sfuma mentre si riempie (il font ha tracciati sovrapposti che il contorno renderebbe visibili)
  const WebkitTextStrokeColor = useTransform(scrollYProgress, [0, 0.9], ['rgba(255,255,255,0.16)', 'rgba(255,255,255,0)']);

  return (
    <div ref={ref} className="footer-mark" aria-hidden>
      <motion.span className="footer-mark-text" style={{ x, backgroundImage, WebkitTextStrokeColor }}>
        allup
      </motion.span>
    </div>
  );
}

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      className="back-top"
      aria-label="Torna su"
      data-cursor="Su"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
    >
      <svg className="back-top-ring" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <path id="back-top-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href="#back-top-circle">TORNA SU · TORNA SU · TORNA SU ·</textPath>
        </text>
      </svg>
      <ArrowUp className="back-top-arrow" />
    </button>
  );
}
