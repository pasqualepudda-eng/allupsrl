'use client';

import { motion, type Variants } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'bounce' | 'blur' | 'fade';

const spring = { type: 'spring', stiffness: 80, damping: 17, mass: 0.9 } as const;

export const revealVariants: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -70 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } },
  bounce: { hidden: { opacity: 0, y: 60, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } },
  blur: { hidden: { opacity: 0, y: 26, filter: 'blur(12px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

type Tag = 'div' | 'section' | 'li' | 'span' | 'p' | 'article' | 'aside' | 'h2' | 'h3' | 'h4' | 'ul' | 'figure';

type RevealProps = {
  as?: Tag;
  variant?: RevealVariant;
  delay?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
  [key: `data-${string}`]: string | undefined;
};

/** Elemento che entra in scena quando diventa visibile */
export function Reveal({ as = 'div', variant = 'up', delay = 0, amount = 0.15, children, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={revealVariants[variant]}
      transition={{ ...spring, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Contenitore che fa entrare i figli <StaggerItem> in sequenza */
export function Stagger({
  as = 'div',
  gap = 0.09,
  delay = 0,
  amount = 0.12,
  children,
  ...rest
}: Omit<RevealProps, 'variant'> & { gap?: number }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = 'div', variant = 'up', children, ...rest }: Omit<RevealProps, 'delay' | 'amount'>) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={revealVariants[variant]} transition={spring} {...rest}>
      {children}
    </Comp>
  );
}
