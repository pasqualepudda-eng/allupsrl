'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useScrollLock } from '@/components/fx/useScrollLock';
import { ChevronRight } from '@/components/icons';
import { homeServiceOrder, serviceById, type Service } from '@/lib/services';

const list = homeServiceOrder.map(serviceById);

function ServiceModal({ service, origin, onClose }: { service: Service; origin: { x: number; y: number }; onClose: () => void }) {
  useScrollLock(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.div
      className="srv-modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="srv-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="srv-modal"
        data-lenis-prevent
        // La modale nasce dal punto in cui si è cliccato
        initial={{ opacity: 0, scale: 0.4, x: origin.x, y: origin.y }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        <button ref={closeRef} className="srv-modal-close" aria-label="Chiudi" onClick={onClose}>
          ✕
        </button>
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}>
          <motion.div className="srv-modal-tag" variants={fadeUp}>
            {service.modal.tag}
          </motion.div>
          <motion.h2 id="srv-modal-title" className="srv-modal-title" variants={fadeUp}>
            {service.title}
          </motion.h2>
          <motion.div className="srv-modal-divider" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }} style={{ originX: 0 }} />
          <motion.p className="srv-modal-lead" variants={fadeUp}>
            {service.modal.lead}
          </motion.p>
          <motion.div className="srv-modal-bullets-title" variants={fadeUp}>
            Cosa include il servizio
          </motion.div>
          <div className="srv-modal-bullets">
            {service.modal.bullets.map((b) => (
              <motion.div key={b} className="srv-modal-bullet" variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}>
                {b}
              </motion.div>
            ))}
          </div>
          <motion.div className="srv-modal-actions" variants={fadeUp}>
            <Link href="/preventivo" className="btn btn-primary" onClick={onClose}>
              Richiedi Preventivo
            </Link>
            <Link href={`/servizi#${service.id}`} className="btn btn-outline" onClick={onClose}>
              Scopri di più
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

/** Lista servizi con anteprima fotografica che segue il cursore e dettaglio in modale */
export default function ServicesList() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<{ service: Service; origin: { x: number; y: number } } | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 180, damping: 22, mass: 0.6 });
  const hoveredService = hovered ? serviceById(hovered) : null;

  const openService = (s: Service, e: React.MouseEvent) => {
    setHovered(null);
    setOpen({ service: s, origin: { x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 } });
  };

  return (
    <>
      <motion.div
        className={`srv-list-wrap ${expanded ? 'expanded' : ''}`}
        initial={false}
        animate={{ height: expanded ? 'auto' : '36rem' }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        onPointerMove={(e) => {
          px.set(e.clientX);
          py.set(e.clientY);
        }}
      >
        <div className="srv-list" onPointerLeave={() => setHovered(null)}>
          {list.map((s, i) => (
            <motion.div
              key={s.id}
              className="srv-list-item"
              data-cursor="Apri"
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 80, damping: 17, delay: (i % 4) * 0.07 }}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(s.id)}
              onClick={(e) => openService(s, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const r = e.currentTarget.getBoundingClientRect();
                  setOpen({ service: s, origin: { x: r.left + r.width / 2 - window.innerWidth / 2, y: r.top + r.height / 2 - window.innerHeight / 2 } });
                }
              }}
            >
              <span className="srv-list-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="srv-list-body">
                <h3 className="srv-list-title">{s.title}</h3>
                <p className="srv-list-text">{s.short}</p>
              </div>
              <span className="srv-list-btn">
                Dettagli <ChevronRight />
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div className="srv-list-fade" animate={{ opacity: expanded ? 0 : 1 }} style={{ pointerEvents: expanded ? 'none' : 'auto' }}>
          <button className="btn btn-primary" onClick={() => setExpanded(true)}>
            Scopri tutti i servizi →
          </button>
        </motion.div>
      </motion.div>

      {/* Anteprima fotografica che segue il puntatore */}
      <motion.div
        className="srv-preview"
        style={{ x: sx, y: sy }}
        animate={{ scale: hoveredService ? 1 : 0, opacity: hoveredService ? 1 : 0, rotate: hoveredService ? -4 : -12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        aria-hidden
      >
        <AnimatePresence initial={false}>
          {hoveredService && (
            <motion.div
              key={hoveredService.id}
              className="srv-preview-img"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
            >
              <Image src={hoveredService.detail.image} alt="" fill sizes="280px" style={{ objectFit: 'cover' }} />
              <span className="srv-preview-tag">{hoveredService.modal.tag}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{open && <ServiceModal service={open.service} origin={open.origin} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
