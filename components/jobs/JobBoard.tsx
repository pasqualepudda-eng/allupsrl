'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FormSuccess from '@/components/forms/FormSuccess';
import { useWhatsAppSubmit } from '@/components/forms/useWhatsAppSubmit';
import Magnetic from '@/components/fx/Magnetic';
import { useScrollLock } from '@/components/fx/useScrollLock';

const positions = [
  {
    type: 'Full-Time',
    title: 'Operatore di Pulizia Professionale',
    meta: ['📍 Roma e Provincia', '🕐 Lun – Sab', '💶 Retribuzione CCNL'],
    desc: 'Ricerchiamo operatori motivati per servizi di pulizia civile e industriale. Esperienza pregressa preferibile ma non indispensabile.',
  },
  {
    type: 'Full-Time',
    title: 'Tecnico Sanificazione & Ozono',
    meta: ['📍 Roma', '🕐 Orario Flessibile', '💶 Retribuzione CCNL + bonus'],
    desc: "Figura specializzata nell'utilizzo di macchinari per sanificazione e trattamento ozono. Formazione tecnica fornita dall'azienda.",
  },
  {
    type: 'Part-Time',
    title: 'Team Leader Operativo',
    meta: ['📍 Roma', '🕐 Turno Mattina', '💶 Retribuzione CCNL + indennità'],
    desc: 'Coordinamento squadre operative sul campo, gestione qualità e reportistica. Richiesta esperienza minima di 2 anni nel settore.',
  },
  {
    type: 'Full-Time',
    title: 'Responsabile Commerciale B2B',
    meta: ['📍 Roma', '🕐 Ufficio + Field', '💶 Fisso + provvigioni'],
    desc: 'Sviluppo portafoglio clienti aziendali, gestione trattative e contratti. Esperienza in vendita B2B e ottime doti relazionali.',
  },
];

const SPONTANEOUS = 'Candidatura Spontanea';

function ApplicationModal({ position, onClose }: { position: string; onClose: () => void }) {
  useScrollLock(true);
  const { status, onSubmit } = useWhatsAppSubmit('lav');
  const [file, setFile] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.div className="form-modal open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
      <div className="modal-overlay" onClick={onClose} />
      <motion.div
        className="modal-panel"
        data-lenis-prevent
        initial={{ opacity: 0, y: 80, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        <button className="modal-close" aria-label="Chiudi" onClick={onClose}>
          ✕
        </button>

        <motion.div className="modal-pos-banner" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <span className="modal-pos-label">Stai candidandoti per</span>
          <span className="modal-pos-name">{position}</span>
        </motion.div>

        <div className="modal-title" id="job-modal-title">
          Invia la tua candidatura
        </div>
        <div className="modal-sub">Compila il modulo e allega il tuo CV. Il team HR ti risponderà entro 48 ore lavorative.</div>

        <AnimatePresence mode="wait">
          {status !== 'sent' ? (
            <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="lav-nome">Nome *</label>
                  <input id="lav-nome" className="form-input" type="text" placeholder="Mario" autoComplete="given-name" required />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="lav-cognome">Cognome *</label>
                  <input id="lav-cognome" className="form-input" type="text" placeholder="Rossi" autoComplete="family-name" required />
                </div>
              </div>
              <div className="form-field mt-3">
                <label className="form-label" htmlFor="lav-email">Email *</label>
                <input id="lav-email" className="form-input" type="email" placeholder="mario@email.com" autoComplete="email" required />
              </div>
              <div className="form-field mt-3">
                <label className="form-label" htmlFor="lav-tel">Telefono *</label>
                <input id="lav-tel" className="form-input" type="tel" placeholder="+39 333 000 0000" autoComplete="tel" required />
              </div>
              <div className="form-field mt-3">
                <label className="form-label" htmlFor="positionSelect">Posizione di interesse</label>
                <select id="positionSelect" className="form-select" defaultValue={position}>
                  <option value="">Seleziona...</option>
                  {positions.map((p) => (
                    <option key={p.title} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                  <option value={SPONTANEOUS}>{SPONTANEOUS}</option>
                </select>
              </div>
              <div className="form-field mt-3">
                <label className="form-label" htmlFor="lav-disp">Disponibilità</label>
                <select id="lav-disp" className="form-select" defaultValue="">
                  <option value="">Seleziona...</option>
                  <option>Full-Time</option>
                  <option>Part-Time Mattina</option>
                  <option>Part-Time Pomeriggio</option>
                  <option>Weekend</option>
                  <option>Flessibile</option>
                </select>
              </div>
              <div className="form-field mt-3">
                <label className="form-label">Curriculum Vitae</label>
                <motion.div
                  className={`cv-upload-area ${drag ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
                  animate={{ scale: drag ? 1.02 : 1 }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    const f = e.dataTransfer.files[0];
                    if (f && inputRef.current) {
                      const dt = new DataTransfer();
                      dt.items.add(f);
                      inputRef.current.files = dt.files;
                      setFile(f.name);
                    }
                  }}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    className="cv-input"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
                  />
                  <motion.span className="cv-upload-icon" animate={{ y: drag ? -6 : 0, rotate: file ? 0 : drag ? -12 : 0 }}>
                    {file ? '✅' : '📎'}
                  </motion.span>
                  <div className="cv-upload-text">
                    Trascina il tuo CV qui o <strong>clicca per caricare</strong>
                  </div>
                  <div className="cv-upload-hint">PDF, DOC, DOCX · max 5 MB</div>
                  <AnimatePresence>
                    {file && (
                      <motion.div className="cv-file-name" style={{ display: 'block' }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        ✓ {file}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <div className="form-field mt-3">
                <label className="form-label" htmlFor="lav-about">Parlaci di te *</label>
                <textarea
                  id="lav-about"
                  className="form-ta"
                  style={{ height: 120 }}
                  placeholder="Racconta la tua esperienza e perché vorresti far parte di AllUp..."
                  required
                />
              </div>
              <div className="form-check mt-3">
                <input type="checkbox" id="gdpr-lav" required />
                <label htmlFor="gdpr-lav">
                  Ho letto e accetto la <Link href="/privacy-policy">Privacy Policy</Link> per il trattamento dei dati ai fini della selezione. *
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-lg mt-4 btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Inviato ✓' : 'Invia Candidatura'}
              </button>
              <p className="form-note">Risposta garantita entro 48 ore lavorative.</p>
            </motion.form>
          ) : (
            <FormSuccess
              key="ok"
              title="Candidatura ricevuta!"
              text="Grazie per il tuo interesse in AllUp. Il nostro team HR ti contatterà entro 48 ore lavorative."
              action={{ onClick: onClose, label: 'Chiudi' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/** Posizioni aperte + CTA candidatura spontanea, con modale di candidatura. I children vanno tra le due. */
export default function JobBoard({ children }: { children?: React.ReactNode }) {
  const [position, setPosition] = useState<string | null>(null);

  return (
    <>
      <section className="section">
        <div className="container">
          <motion.div
            className="pos-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 17 }}
          >
            <div className="pos-header-left">
              <div className="eyebrow">Unisciti al team</div>
              <h2 className="s-title">Posizioni aperte</h2>
              <p>Seleziona la posizione che ti interessa e invia la tua candidatura in pochi minuti.</p>
            </div>
            <span className="pos-tag">
              <span className="pos-tag-dot" />
              {positions.length} posizioni disponibili
            </span>
          </motion.div>

          <div className="pos-list">
            {positions.map((p, i) => (
              <motion.div
                key={p.title}
                className="pos-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: 'spring', stiffness: 80, damping: 17, delay: i * 0.08 }}
              >
                <div>
                  <div className="pos-card-type">{p.type}</div>
                  <div className="pos-card-title">{p.title}</div>
                  <div className="pos-card-meta">
                    {p.meta.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
                <div className="pos-card-desc">{p.desc}</div>
                <div>
                  <Magnetic>
                    <button className="btn btn-primary" onClick={() => setPosition(p.title)}>
                      Candidati →
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {children}

      <div className="cta-strip">
        <div className="container">
          <motion.div
            className="cta-strip-inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 17 }}
          >
            <div>
              <h2>Non trovi la posizione giusta?</h2>
              <p>Inviaci comunque il tuo curriculum — siamo sempre in cerca di nuovi talenti.</p>
            </div>
            <Magnetic>
              <button className="btn btn-primary btn-lg" onClick={() => setPosition(SPONTANEOUS)}>
                Candidatura Spontanea →
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>{position && <ApplicationModal key="modal" position={position} onClose={() => setPosition(null)} />}</AnimatePresence>
    </>
  );
}
