'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Tilt from '@/components/fx/Tilt';
import { useScrollLock } from '@/components/fx/useScrollLock';
import { certifications, formatDate, type Certification } from '@/lib/certifications';

function CertMeta({ c }: { c: Certification }) {
  return (
    <dl className="cert-meta">
      <div>
        <dt>N°</dt>
        <dd>{c.number}</dd>
      </div>
      <div>
        <dt>Ente</dt>
        <dd>
          {c.issuer}
          {c.accreditation && <span className="cert-acc"> · accr. {c.accreditation}</span>}
        </dd>
      </div>
      <div>
        <dt>Valido fino al</dt>
        <dd>{formatDate(c.validUntil)}</dd>
      </div>
    </dl>
  );
}

/** Anteprima a tutto schermo del certificato originale */
function CertViewer({ cert, onClose }: { cert: Certification; onClose: () => void }) {
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

  const portrait = cert.orientation === 'portrait';

  return (
    <motion.div
      className="srv-modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-viewer-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`cert-viewer ${portrait ? 'is-portrait' : ''}`}
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        <button ref={closeRef} className="srv-modal-close" aria-label="Chiudi" onClick={onClose}>
          ✕
        </button>
        <div className="cert-viewer-head">
          <span className="cert-kind">
            {cert.kind} · {cert.area}
          </span>
          <h2 id="cert-viewer-title">{cert.title}</h2>
        </div>
        <div className="cert-viewer-img">
          <Image
            src={cert.preview}
            alt={`Certificato ${cert.title} n. ${cert.number} rilasciato ad ALL UP S.r.l.`}
            width={portrait ? 1000 : 1400}
            height={portrait ? 1414 : 989}
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
        <div className="cert-viewer-foot">
          <CertMeta c={cert} />
          <a href={cert.pdf} className="btn btn-primary" target="_blank" rel="noopener">
            Apri il PDF originale
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificateGrid() {
  const [open, setOpen] = useState<Certification | null>(null);

  return (
    <>
      <div className="cert-list">
        {certifications.map((c, i) => (
          <Tilt key={c.id} className="cert-card" reveal="zoom" delay={(i % 3) * 0.08}>
            <div className="cert-card-icon">
              <Image src={c.badge} alt="" width={100} height={116} style={{ height: 'auto' }} />
            </div>
            <span className="cert-kind">
              {c.kind} · {c.area}
            </span>
            <h4>{c.title}</h4>
            <p>{c.text}</p>
            <CertMeta c={c} />
            <div className="cert-actions">
              <button type="button" className="cert-btn" onClick={() => setOpen(c)}>
                Vedi certificato
              </button>
              <a href={c.pdf} className="cert-btn cert-btn--ghost" target="_blank" rel="noopener" aria-label={`Scarica il PDF del certificato ${c.title}`}>
                PDF ↓
              </a>
            </div>
          </Tilt>
        ))}
      </div>
      <AnimatePresence>{open && <CertViewer cert={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
