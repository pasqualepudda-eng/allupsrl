'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { MotionConfig } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function RouteScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // Lo smooth scroll si attiva solo se l'utente non preferisce il movimento ridotto
  const [smooth, setSmooth] = useState(false);
  useEffect(() => {
    setSmooth(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {smooth && (
        <ReactLenis
          root
          options={{ lerp: 0.1, anchors: { offset: -110 }, stopInertiaOnNavigate: true, autoRaf: true }}
        />
      )}
      <RouteScrollReset />
      {children}
    </MotionConfig>
  );
}
