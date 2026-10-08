'use client';

import { useLenis } from 'lenis/react';
import { useEffect } from 'react';

/** Blocca lo scroll della pagina (es. modali aperte) */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (!locked) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [locked, lenis]);
}
