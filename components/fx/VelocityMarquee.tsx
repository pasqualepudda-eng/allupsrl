'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { useRef, type ReactNode } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Nastro scorrevole che accelera e inverte la direzione seguendo la velocità dello scroll.
 * Il contenuto viene duplicato per un loop senza giunture.
 */
export default function VelocityMarquee({
  children,
  baseVelocity = -2.2,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  innerClassName?: string;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 0, 2500], [-6, 0, 6]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`vmarquee ${className}`}>
      <motion.div className={`vmarquee-track ${innerClassName}`} style={{ x, skewX: skew }}>
        <div className="vmarquee-group">{children}</div>
        <div className="vmarquee-group" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
