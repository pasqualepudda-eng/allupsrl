'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollLock } from '@/components/fx/useScrollLock';
import { CheckDraw } from '@/components/icons';
import { sendQuickQuote } from '@/lib/whatsapp';

const STORAGE_KEY = 'ei_shown';

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/** Popup "preventivo gratuito" all'uscita dalla pagina (o dopo 50 secondi) */
export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [seconds, setSeconds] = useState(600);
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  useScrollLock(open);

  const show = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setOpen(true);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) trigger();
    };
    const arm = window.setTimeout(() => document.addEventListener('mouseleave', onLeave), 5000);
    const fallback = window.setTimeout(trigger, 50000);
    return () => {
      window.clearTimeout(arm);
      window.clearTimeout(fallback);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [show]);

  useEffect(() => {
    if (!open || sent) return;
    const id = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [open, sent]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? '';
    const phone = phoneRef.current?.value.trim() ?? '';
    if (!name) {
      setErrors({ name: true });
      nameRef.current?.focus();
      return;
    }
    if (!phone) {
      setErrors({ phone: true });
      phoneRef.current?.focus();
      return;
    }
    setErrors({});
    sendQuickQuote(name, phone);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ei-popup-overlay open"
          role="dialog"
          aria-modal="true"
          aria-label="Offerta preventivo gratuito"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            className="ei-popup"
            data-lenis-prevent
            initial={{ y: 60, scale: 0.9, rotateX: 18, opacity: 0 }}
            animate={{ y: 0, scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ y: 40, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ transformPerspective: 900 }}
          >
            <button className="ei-close" aria-label="Chiudi" onClick={() => setOpen(false)}>
              ✕
            </button>
            <div className="ei-header">
              <span className="ei-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: -2, marginRight: 4 }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Offerta Limitata
              </span>
              <motion.span
                key={seconds}
                className="ei-timer"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                style={seconds === 0 ? { background: '#6b7280' } : undefined}
              >
                {seconds === 0 ? 'Scaduta' : fmt(seconds)}
              </motion.span>
            </div>

            <h2 className="ei-title">
              Aspetta — ottieni il tuo
              <br />
              <em>preventivo gratuito</em>
            </h2>
            <p className="ei-sub">
              Risposta garantita in 24 ore. Sopralluogo senza impegno.
              <br />
              Riservato ai visitatori di oggi.
            </p>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" className="ei-form" noValidate onSubmit={submit} exit={{ opacity: 0, y: -10 }}>
                  <input ref={nameRef} type="text" name="ei_name" placeholder="Nome e Cognome *" autoComplete="name" required className={errors.name ? 'ei-error' : ''} />
                  <input ref={phoneRef} type="tel" name="ei_phone" placeholder="Numero di telefono *" autoComplete="tel" required className={errors.phone ? 'ei-error' : ''} />
                  <button type="submit" className="ei-btn">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.775L0 32l8.47-2.016A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm8.186 22.396c-.347.977-2.02 1.867-2.774 1.985-.754.119-1.688.168-2.718-.17-1.03-.34-2.35-.794-4.04-1.558-3.565-1.585-5.893-5.198-6.071-5.439-.178-.24-1.457-1.938-1.457-3.697 0-1.758.921-2.623 1.248-2.978.327-.354.712-.443.95-.443l.684.013c.219.01.513-.083.803.614.298.714 1.013 2.473 1.103 2.651.09.178.15.387.03.625-.12.237-.18.387-.358.596-.178.208-.375.465-.534.625-.179.179-.365.373-.157.731.208.358.925 1.526 1.985 2.47 1.363 1.22 2.513 1.597 2.87 1.775.358.179.566.15.775-.09.208-.24.893-1.041 1.131-1.399.238-.358.476-.298.803-.179.327.12 2.079.98 2.437 1.159.357.178.595.267.685.415.09.148.09.858-.257 1.835z" />
                    </svg>
                    Ricevi Preventivo su WhatsApp
                  </button>
                </motion.form>
              ) : (
                <motion.div key="ok" className="ei-success" style={{ display: 'block' }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <CheckDraw className="check-anim" />
                  <p>
                    <strong>Richiesta inviata!</strong>
                    <br />
                    Ti risponderemo entro 24 ore.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button className="ei-dismiss" onClick={() => setOpen(false)}>
              No grazie, non voglio risparmiare
            </button>

            <div className="ei-trust">
              <span>🔒 ISO 9001</span>
              <span className="ei-trust-sep">·</span>
              <span>HACCP</span>
              <span className="ei-trust-sep">·</span>
              <span>Dal 2015</span>
              <span className="ei-trust-sep">·</span>
              <span>Roma</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
