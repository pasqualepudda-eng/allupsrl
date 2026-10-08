'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { WhatsAppIcon } from '@/components/icons';

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.div className="art-share" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <span>Condividi:</span>
      <a className="share-btn wa-share" href={`https://wa.me/?text=${encodeURIComponent(`${title} - AllUp Blog`)}`} target="_blank" rel="noopener">
        <WhatsAppIcon />
        WhatsApp
      </a>
      <button
        className="share-btn"
        onClick={() => {
          navigator.clipboard?.writeText(window.location.href);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={String(copied)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {copied ? 'Copiato ✓' : 'Copia link'}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
