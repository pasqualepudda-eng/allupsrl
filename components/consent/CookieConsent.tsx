'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollLock } from '@/components/fx/useScrollLock';
import { ACCEPT_ALL, OPEN_PREFS_EVENT, readConsent, REJECT_ALL, saveConsent, type ConsentChoice } from '@/lib/consent';

type Mode = 'hidden' | 'banner' | 'prefs';

const categories: { key: 'necessary' | keyof ConsentChoice; title: string; meta: string; text: string }[] = [
  {
    key: 'necessary',
    title: 'Necessari',
    meta: 'Sempre attivi · sessione / 6 mesi',
    text: 'Indispensabili per il funzionamento del sito: navigazione, sicurezza e memorizzazione delle tue scelte sui cookie. Non richiedono consenso.',
  },
  {
    key: 'analytics',
    title: 'Analitici',
    meta: 'Google Analytics · 13 mesi',
    text: 'Statistiche anonime e aggregate su come viene usato il sito (pagine visitate, durata delle visite), per migliorarlo nel tempo.',
  },
  {
    key: 'marketing',
    title: 'Marketing e contenuti di terze parti',
    meta: 'Google Maps e partner · fino a 90 giorni',
    text: 'Permettono di mostrare contenuti esterni, come la mappa di Google Maps nella pagina Contatti, ed eventuale pubblicità personalizzata.',
  },
];

function CookieIcon() {
  return (
    <motion.svg
      className="cc-icon"
      viewBox="0 0 48 48"
      aria-hidden
      animate={{ rotate: [0, -14, 10, -6, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
    >
      <path
        className="cc-icon-body"
        d="M24 4a20 20 0 1 0 20 20 6 6 0 0 1-7-6 6 6 0 0 1-6-7 6 6 0 0 1-7-7z"
      />
      {[
        [17, 18, 2.6],
        [28, 28, 3],
        [16, 31, 2.2],
        [33, 20, 1.8],
        [24, 38, 1.9],
      ].map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          className="cc-icon-chip"
          cx={cx}
          cy={cy}
          r={r}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 400, damping: 12 }}
        />
      ))}
    </motion.svg>
  );
}

function Toggle({ checked, disabled, onChange, label }: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`cc-toggle ${checked ? 'is-on' : ''}`}
      onClick={() => onChange?.(!checked)}
    >
      <motion.span className="cc-knob" layout transition={{ type: 'spring', stiffness: 600, damping: 32 }} />
    </button>
  );
}

/** Banner di consenso ai cookie + pannello preferenze */
export default function CookieConsent() {
  const [mode, setMode] = useState<Mode>('hidden');
  const [draft, setDraft] = useState<ConsentChoice>(REJECT_ALL);
  const hasConsent = useRef(false);
  useScrollLock(mode === 'prefs');

  useEffect(() => {
    const existing = readConsent();
    hasConsent.current = !!existing;

    const openPrefs = () => {
      const c = readConsent();
      setDraft(c ? { analytics: c.analytics, marketing: c.marketing } : REJECT_ALL);
      setMode('prefs');
    };
    window.addEventListener(OPEN_PREFS_EVENT, openPrefs);

    // Prima scelta: il banner arriva dopo l'intro animata
    let timer = 0;
    if (!existing) {
      const seen = document.documentElement.dataset.intro === 'seen';
      timer = window.setTimeout(() => setMode((m) => (m === 'hidden' ? 'banner' : m)), seen ? 900 : 2700);
    }
    return () => {
      window.removeEventListener(OPEN_PREFS_EVENT, openPrefs);
      window.clearTimeout(timer);
    };
  }, []);

  const decide = useCallback((choice: ConsentChoice) => {
    saveConsent(choice);
    hasConsent.current = true;
    setMode('hidden');
  }, []);

  // Chiudere le preferenze senza salvare riporta al banner se non c'è ancora una scelta
  const closePrefs = useCallback(() => setMode(hasConsent.current ? 'hidden' : 'banner'), []);

  useEffect(() => {
    if (mode !== 'prefs') return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePrefs();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mode, closePrefs]);

  return (
    <>
      <AnimatePresence>
        {mode === 'banner' && (
          <motion.section
            key="banner"
            className="cc-banner"
            role="dialog"
            aria-labelledby="cc-banner-title"
            aria-describedby="cc-banner-text"
            initial={{ y: 160, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 160, opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: 'spring', stiffness: 190, damping: 22 }}
          >
            <button className="cc-close" aria-label="Chiudi: continua senza accettare i cookie non necessari" onClick={() => decide(REJECT_ALL)}>
              ✕
            </button>
            <div className="cc-head">
              <CookieIcon />
              <h2 id="cc-banner-title">Questo sito usa i cookie</h2>
            </div>
            <p id="cc-banner-text" className="cc-text">
              Usiamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso, cookie analitici e di terze parti (come Google
              Maps). Puoi accettare, rifiutare o scegliere in dettaglio. Leggi la{' '}
              <Link href="/privacy-policy#cookie">Privacy Policy</Link>.
            </p>
            <div className="cc-actions">
              <motion.button className="cc-btn cc-btn--light" whileTap={{ scale: 0.96 }} onClick={() => decide(REJECT_ALL)}>
                Rifiuta
              </motion.button>
              <motion.button className="cc-btn cc-btn--primary" whileTap={{ scale: 0.96 }} onClick={() => decide(ACCEPT_ALL)}>
                Accetta tutti
              </motion.button>
            </div>
            <button
              className="cc-link"
              onClick={() => {
                setDraft(REJECT_ALL);
                setMode('prefs');
              }}
            >
              Personalizza le preferenze
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === 'prefs' && (
          <motion.div
            key="prefs"
            className="cc-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closePrefs()}
          >
            <motion.div
              className="cc-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cc-prefs-title"
              data-lenis-prevent
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <button className="cc-close cc-close--dark" aria-label="Chiudi" onClick={closePrefs}>
                ✕
              </button>
              <div className="cc-head">
                <CookieIcon />
                <h2 id="cc-prefs-title">Preferenze cookie</h2>
              </div>
              <p className="cc-text">
                Scegli quali cookie autorizzare. Puoi cambiare idea in qualsiasi momento dal link &ldquo;Preferenze cookie&rdquo; in fondo a ogni
                pagina.
              </p>

              <motion.div
                className="cc-cats"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
              >
                {categories.map((c) => {
                  const locked = c.key === 'necessary';
                  const on = locked ? true : draft[c.key as keyof ConsentChoice];
                  return (
                    <motion.div key={c.key} className={`cc-cat ${on ? 'is-on' : ''}`} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                      <div className="cc-cat-head">
                        <div>
                          <h3>{c.title}</h3>
                          <span className="cc-cat-meta">{c.meta}</span>
                        </div>
                        <Toggle
                          checked={on}
                          disabled={locked}
                          label={c.title}
                          onChange={(v) => setDraft((d) => ({ ...d, [c.key]: v }))}
                        />
                      </div>
                      <p>{c.text}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="cc-modal-actions">
                <button className="cc-btn cc-btn--outline" onClick={() => decide(REJECT_ALL)}>
                  Rifiuta tutti
                </button>
                <button className="cc-btn cc-btn--dark" onClick={() => decide(draft)}>
                  Salva preferenze
                </button>
                <button className="cc-btn cc-btn--primary" onClick={() => decide(ACCEPT_ALL)}>
                  Accetta tutti
                </button>
              </div>
              <Link href="/privacy-policy#cookie" className="cc-policy" onClick={closePrefs}>
                Leggi l&apos;informativa completa sui cookie →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
