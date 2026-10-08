'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import FormSuccess from './FormSuccess';
import { useWhatsAppSubmit } from './useWhatsAppSubmit';

const row = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function ContactForm() {
  const { status, onSubmit } = useWhatsAppSubmit('ct');

  return (
    <AnimatePresence mode="wait">
      {status !== 'sent' ? (
        <motion.div
          key="form"
          className="ct-form-box"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
          transition={{ type: 'spring', stiffness: 80, damping: 17 }}
        >
          <div className="ct-form-title">Scrivici un messaggio</div>
          <div className="ct-form-sub">Ti risponderemo entro poche ore lavorative. Un team reale, nessun bot.</div>
          <motion.form
            onSubmit={onSubmit}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
          >
            <motion.div className="form-row" variants={row}>
              <div className="form-field">
                <label className="form-label" htmlFor="ct-nome">Nome *</label>
                <input id="ct-nome" className="form-input" type="text" placeholder="Mario" autoComplete="given-name" required />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="ct-cognome">Cognome *</label>
                <input id="ct-cognome" className="form-input" type="text" placeholder="Rossi" autoComplete="family-name" required />
              </div>
            </motion.div>
            <motion.div className="form-row mt-3" variants={row}>
              <div className="form-field">
                <label className="form-label" htmlFor="ct-email">Email *</label>
                <input id="ct-email" className="form-input" type="email" placeholder="mario@email.com" autoComplete="email" required />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="ct-tel">Telefono</label>
                <input id="ct-tel" className="form-input" type="tel" placeholder="+39 333 000 0000" autoComplete="tel" />
              </div>
            </motion.div>
            <motion.div className="form-field mt-3" variants={row}>
              <label className="form-label" htmlFor="ct-oggetto">Oggetto *</label>
              <select id="ct-oggetto" className="form-select" required defaultValue="">
                <option value="">Di cosa hai bisogno?</option>
                <option>Informazioni sui servizi</option>
                <option>Richiesta di preventivo</option>
                <option>Contratto aziendale continuativo</option>
                <option>Assistenza post-intervento</option>
                <option>Candidatura lavoro</option>
                <option>Altro</option>
              </select>
            </motion.div>
            <motion.div className="form-field mt-3" variants={row}>
              <label className="form-label" htmlFor="ct-msg">Messaggio *</label>
              <textarea
                id="ct-msg"
                className="form-ta"
                style={{ height: 180 }}
                placeholder="Scrivi qui il tuo messaggio. Più dettagli ci fornisci, più precisa sarà la nostra risposta..."
                required
              />
            </motion.div>
            <motion.div className="form-check mt-3" variants={row}>
              <input type="checkbox" id="gdpr-ct" required />
              <label htmlFor="gdpr-ct">
                Ho letto e accetto la <Link href="/privacy-policy">Privacy Policy</Link> ai sensi del GDPR (EU 2016/679). *
              </label>
            </motion.div>
            <motion.div variants={row}>
              <button type="submit" className="btn btn-primary btn-lg mt-4 btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Inviato ✓' : 'Invia Messaggio'}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      ) : (
        <FormSuccess
          key="ok"
          title="Messaggio inviato!"
          text="Grazie per averci scritto. Ti risponderemo entro poche ore lavorative."
          style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-l)' }}
          action={{ href: '/', label: 'Torna alla Home' }}
        />
      )}
    </AnimatePresence>
  );
}
