'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { revealVariants, type RevealVariant } from './Reveal';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Inclinazione massima in gradi */
  max?: number;
  /** Ingresso allo scroll (se omesso la card è subito visibile) */
  reveal?: RevealVariant;
  delay?: number;
  as?: 'div' | 'article' | 'li';
};

/** Card con inclinazione 3D e riflesso luminoso che segue il mouse */
export default function Tilt({ children, className = '', style, max = 8, reveal, delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const cfg = { stiffness: 180, damping: 18, mass: 0.5 };
  const rx = useSpring(0, cfg);
  const ry = useSpring(0, cfg);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%, rgba(224,94,40,.14), transparent 70%)`;
  const Comp = motion[as] as typeof motion.div;

  const revealProps = reveal
    ? {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.2 },
        variants: revealVariants[reveal],
        transition: { type: 'spring' as const, stiffness: 80, damping: 17, delay },
      }
    : {};

  return (
    <Comp
      ref={ref}
      className={`tilt ${className}`}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 2 * max);
        rx.set(-(py - 0.5) * 2 * max);
        mx.set(px * 100);
        my.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      {...revealProps}
    >
      {children}
      <motion.span className="tilt-glow" style={{ background: glow }} aria-hidden />
    </Comp>
  );
}
