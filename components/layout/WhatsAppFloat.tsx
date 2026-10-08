'use client';

import { motion } from 'motion/react';
import { WhatsAppIcon } from '@/components/icons';
import { waLink } from '@/lib/site';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      className="wa-float"
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 2.4 }}
      whileHover={{ scale: 1.12, rotate: -8 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="wa-pulse" aria-hidden />
      <WhatsAppIcon />
      <span className="wa-tip">Scrivici su WhatsApp</span>
    </motion.a>
  );
}
