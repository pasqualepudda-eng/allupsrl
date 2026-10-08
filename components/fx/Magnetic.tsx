'use client';

import { motion, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/** Avvolge un elemento che "attrae" il puntatore quando ci passi sopra */
export default function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cfg = { stiffness: 220, damping: 15, mass: 0.3 };
  const x = useSpring(0, cfg);
  const y = useSpring(0, cfg);

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
