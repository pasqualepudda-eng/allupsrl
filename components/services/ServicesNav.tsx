'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/lib/services';

const short: Record<string, string> = {
  sanificazione: 'Ozono',
  pulizie: 'Pulizie',
  disinfestazione: 'Disinfestazione',
  facchinaggio: 'Facchinaggio',
  portierato: 'Portierato',
  lavanolo: 'Lavanolo',
  verde: 'Verde',
};

/**
 * Barra dei servizi che compare scorrendo i dettagli:
 * evidenzia (con un indicatore che scivola) il servizio che stai leggendo.
 */
export default function ServicesNav() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Su schermi stretti la barra scorre in orizzontale: porta al centro la voce attiva
  useEffect(() => {
    const track = trackRef.current;
    const link = track?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!track || !link || track.scrollWidth <= track.clientWidth) return;
    track.scrollTo({ left: link.offsetLeft - track.clientWidth / 2 + link.offsetWidth / 2, behavior: 'smooth' });
  }, [active, visible]);

  useEffect(() => {
    const sections = services.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));

    const onScroll = () => {
      const first = sections[0];
      const last = sections[sections.length - 1];
      if (!first || !last) return;
      const vh = window.innerHeight;
      setVisible(first.getBoundingClientRect().top < vh * 0.4 && last.getBoundingClientRect().bottom > vh * 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      spy.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const activeIndex = services.findIndex((s) => s.id === active);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="srv-nav"
          aria-label="Servizi"
          initial={{ y: -30, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: -30, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <LayoutGroup id="srv-nav">
            <div className="srv-nav-track" ref={trackRef}>
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={`srv-nav-link ${active === s.id ? 'is-active' : ''}`}>
                  {active === s.id && <motion.span layoutId="srv-nav-pill" className="srv-nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="srv-nav-num">{s.num}</span>
                  <span className="srv-nav-label">{short[s.id]}</span>
                </a>
              ))}
            </div>
          </LayoutGroup>
          <span className="srv-nav-progress" style={{ transform: `scaleX(${(activeIndex + 1) / services.length})` }} aria-hidden />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
