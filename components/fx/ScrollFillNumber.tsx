'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/** Numero grande "a contorno" che si riempie di colore mentre lo scorri */
export default function ScrollFillNumber({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 35%'] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']);

  return (
    <span ref={ref} className={`fill-num ${className}`} aria-hidden>
      <span className="fill-num-outline">{value}</span>
      <motion.span className="fill-num-solid" style={{ clipPath }}>
        {value}
      </motion.span>
    </span>
  );
}
