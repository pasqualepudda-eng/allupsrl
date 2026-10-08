'use client';

import { motion } from 'motion/react';
import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';

const word = {
  hidden: { y: '110%', rotate: 5, opacity: 0 },
  show: { y: '0%', rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 16, mass: 0.7 } },
} as const;

function Word({ children }: { children: ReactNode }) {
  return (
    <span className="sw">
      <motion.span className="sw-i" variants={word}>
        {children}
      </motion.span>
    </span>
  );
}

/** Divide il testo in parole animabili, mantenendo <br>, <em> e span decorativi */
function split(node: ReactNode, keyPrefix = 'w'): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part, i) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      return <Word key={`${keyPrefix}-${i}`}>{part}</Word>;
    });
  }
  if (Array.isArray(node)) return Children.map(node, (n, i) => split(n, `${keyPrefix}-${i}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode; className?: string }>;
    // A capo voluto su desktop; su mobile (.sbr nascosto) resta uno spazio e il testo scorre naturale
    if (el.type === 'br') return [' ', <br key={keyPrefix} className="sbr" />];
    // Il testo con gradiente (background-clip) si anima come blocco unico
    if (el.props.className?.includes('gradient-text')) return <Word key={keyPrefix}>{el}</Word>;
    return cloneElement(el, { children: split(el.props.children, keyPrefix) });
  }
  return node;
}

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  delay?: number;
};

/** Titolo che si compone parola per parola quando entra nel viewport */
export default function SplitText({ as = 'h2', className, style, children, delay = 0 }: Props) {
  const Comp = motion[as] as typeof motion.h2;
  return (
    <Comp
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {split(children)}
    </Comp>
  );
}
