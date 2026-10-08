'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** Sovrapposizioni (badge, didascalie) */
  children?: ReactNode;
  /** Direzione dell'apertura a tendina */
  from?: 'bottom' | 'left' | 'right' | 'center';
};

const clipFrom = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  center: 'inset(18% 18% 18% 18%)',
};

/**
 * Immagine che si apre a tendina e scorre in parallasse dentro la sua cornice.
 * Il ritaglio sta su un livello interno: un elemento interamente ritagliato
 * non verrebbe mai considerato "visibile" dall'IntersectionObserver.
 */
export default function ImageReveal({ src, alt, className = '', style, sizes = '(max-width: 1100px) 100vw, 50vw', priority, children, from = 'bottom' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18]);

  return (
    <motion.div ref={ref} className={`img-reveal ${className}`} style={style} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.div
        className="img-reveal-clip"
        variants={{ hidden: { clipPath: clipFrom[from] }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1] }}
      >
        <motion.div className="img-reveal-layer" style={{ y, scale }}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
}
