'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { CheckDraw } from '@/components/icons';

type Props = {
  title: string;
  text: string;
  style?: React.CSSProperties;
  action?: { href: string; label: string } | { onClick: () => void; label: string };
};

/** Messaggio di conferma con spunta che si disegna */
export default function FormSuccess({ title, text, style, action }: Props) {
  return (
    <motion.div
      className="form-success"
      style={{ display: 'block', ...style }}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <CheckDraw className="check-anim" />
      <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        {title}
      </motion.h3>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
        {text}
      </motion.p>
      {action && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
          {'href' in action ? (
            <Link href={action.href} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              {action.label}
            </Link>
          ) : (
            <button type="button" className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={action.onClick}>
              {action.label}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
