'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import FormSuccess from './FormSuccess';
import { useWhatsAppSubmit } from './useWhatsAppSubmit';

type Field =
  | { t: 'number'; id: string; lbl: string; ph?: string; req?: boolean }
  | { t: 'select'; id: string; lbl: string; opts: string[] };
type GroupCfg = {
  label: string;
  rows: Field[][];
  checks?: { id: string; lbl: string; opts: string[] };
  radios?: { id: string; lbl: string; opts: string[] }[];
};

const serviceGroups: { label: string; options: string[] }[] = [
  {
    label: 'Pulizie Civili ed Industriali',
    options: [
      'Pulizia Appartamento',
      'Pulizia Villa / Grande Residenza',
      'Pulizia Uffici',
      'Pulizia Post-Trasloco',
      'Pulizia Post-Cantiere',
      'Condominio / Parti Comuni',
      'Magazzino / Stabilimento',
      'Struttura Sanitaria',
      'Hotel / Struttura Ricettiva',
    ],
  },
  {
    label: 'Sanificazione Ambientale a Ozono',
    options: [
      'Sanificazione a Ozono — Residenziale',
      'Sanificazione a Ozono — Ufficio / Azienda',
      'Sanificazione a Ozono — Struttura Sanitaria',
      'Sanificazione a Ozono — Hotel / B&B',
      'Sanificazione Post-Sinistro',
    ],
  },
  {
    label: 'Disinfestazione e Derattizzazione',
    options: ['Disinfestazione da Blatte / Insetti', 'Derattizzazione', 'Disinfestazione da Cimici dei Letti', 'Trattamento Antizanzare', 'Piano di Monitoraggio Continuativo'],
  },
  { label: 'Facchinaggio', options: ['Trasloco Residenziale', 'Trasloco Aziendale', 'Spostamenti Interni / Riorganizzazione', 'Archiviazione Documenti'] },
  { label: 'Portierato e Reception', options: ['Portierato — Condominio / Palazzo', 'Portierato — Ufficio / Azienda', 'Reception Professionale', 'Presidio h24'] },
  { label: 'Servizi di Lavanolo', options: ['Lavanolo — Hotel / Struttura Ricettiva', 'Lavanolo — Struttura Sanitaria', 'Lavanolo — Ristorante / Catering', 'Noleggio e Fornitura Divise'] },
  { label: 'Manutenzione del Verde', options: ['Manutenzione Giardino Privato', 'Verde Condominiale', 'Aree Verdi Aziendali', 'Potatura e Trattamenti Fitosanitari'] },
];

// Campi aggiuntivi mostrati in base al gruppo di servizio scelto
const cfg: Record<string, GroupCfg> = {
  'Pulizie Civili ed Industriali': {
    label: 'Dettagli — Pulizie',
    rows: [
      [
        { t: 'number', id: 'sup_mq', lbl: 'Superficie (mq) *', ph: 'Es. 120', req: true },
        { t: 'number', id: 'num_locali', lbl: 'N° locali / stanze', ph: 'Es. 5' },
      ],
      [
        { t: 'select', id: 'pavimento', lbl: 'Tipo di pavimento', opts: ['', 'Parquet / Legno', 'Ceramica / Gres', 'Marmo / Pietra', 'Resina / PVC', 'Moquette', 'Misto'] },
        { t: 'number', id: 'num_bagni', lbl: 'N° bagni / servizi', ph: 'Es. 2' },
      ],
      [{ t: 'select', id: 'freq_pul', lbl: 'Frequenza intervento', opts: ['', 'Una tantum', 'Settimanale', 'Bisettimanale', 'Mensile', 'Contratto continuativo'] }],
    ],
    checks: {
      id: 'incl_pul',
      lbl: 'Cosa vuoi includere nel servizio?',
      opts: ['Pulizia finestre', 'Cucina / Elettrodomestici', 'Cantina / Garage', 'Balconi / Terrazze', 'Sanificazione bagni', 'Rimozione calcare'],
    },
  },
  'Sanificazione Ambientale a Ozono': {
    label: 'Dettagli — Sanificazione a Ozono',
    rows: [
      [
        { t: 'number', id: 'sup_ozo', lbl: 'Superficie da trattare (mq) *', ph: 'Es. 80', req: true },
        { t: 'number', id: 'ambienti_ozo', lbl: 'N° di ambienti / locali', ph: 'Es. 4' },
      ],
      [
        {
          t: 'select',
          id: 'motivo_ozo',
          lbl: 'Motivo principale *',
          opts: ['', 'Odori persistenti', 'Presenza di muffe', 'Post-sinistro / Allagamento', 'Post-malattia / Virus', 'Prevenzione generale', 'Post-cantiere'],
        },
        { t: 'select', id: 'rientro_ozo', lbl: 'Quando si rientra dopo il trattamento?', opts: ['', 'Entro 2 ore', 'Entro 6 ore', 'Il giorno dopo', 'Non lo so ancora'] },
      ],
    ],
    radios: [
      { id: 'animali_ozo', lbl: 'Presenza di animali domestici?', opts: ['Sì', 'No'] },
      { id: 'trattato_ozo', lbl: "L'ambiente è già stato trattato in passato?", opts: ['Sì', 'No'] },
    ],
  },
  'Disinfestazione e Derattizzazione': {
    label: 'Dettagli — Disinfestazione',
    rows: [
      [
        {
          t: 'select',
          id: 'gravita_dis',
          lbl: 'Livello di infestazione',
          opts: ['', 'Lieve (pochi avvistamenti)', 'Moderata (presenza costante)', 'Grave (infestazione estesa)', 'Non so valutarlo'],
        },
        { t: 'number', id: 'sup_dis', lbl: 'Superficie approssimativa (mq)', ph: 'Es. 150' },
      ],
    ],
    radios: [
      { id: 'bambini_dis', lbl: 'Presenza di bambini o animali domestici?', opts: ['Sì', 'No'] },
      { id: 'accesso_dis', lbl: 'Accesso facilitato a tutti i locali?', opts: ['Sì', 'No', 'In parte'] },
      { id: 'monitor_dis', lbl: 'Interesse per piano di monitoraggio continuativo?', opts: ['Sì', 'No', 'Da valutare'] },
    ],
  },
  Facchinaggio: {
    label: 'Dettagli — Facchinaggio',
    rows: [
      [
        { t: 'number', id: 'piano_part', lbl: 'Piano di partenza', ph: 'Es. 3 (0 = piano terra)' },
        { t: 'number', id: 'piano_arr', lbl: 'Piano di arrivo', ph: 'Es. 1' },
      ],
      [
        { t: 'select', id: 'asc_facc', lbl: 'Ascensore disponibile?', opts: ['', 'Sì, in entrambi i luoghi', 'Solo nel luogo di partenza', 'Solo nel luogo di arrivo', 'No'] },
        { t: 'number', id: 'km_facc', lbl: 'Distanza approssimativa (km)', ph: 'Es. 10' },
      ],
      [{ t: 'number', id: 'stanze_facc', lbl: 'N° di stanze / uffici da spostare', ph: 'Es. 4' }],
    ],
    radios: [
      { id: 'fragili_facc', lbl: 'Presenza di oggetti fragili o di alto valore?', opts: ['Sì', 'No'] },
      { id: 'smontaggio_facc', lbl: 'Smontaggio e rimontaggio mobili richiesto?', opts: ['Sì', 'No', 'In parte'] },
    ],
  },
  'Portierato e Reception': {
    label: 'Dettagli — Portierato e Reception',
    rows: [
      [
        { t: 'select', id: 'ore_port', lbl: 'Ore di presidio al giorno *', opts: ['', '4 ore', '6 ore', '8 ore', '12 ore', '24 ore (h24)'] },
        { t: 'select', id: 'gg_port', lbl: 'Giorni a settimana', opts: ['', '5 giorni (Lun–Ven)', '6 giorni', '7 giorni'] },
      ],
      [
        { t: 'select', id: 'fascia_port', lbl: 'Fascia oraria preferita', opts: ['', 'Mattina (7–14)', 'Pomeriggio (14–21)', 'Mattina + Pomeriggio', 'Sera / Notte', 'Continuativo h24'] },
        { t: 'number', id: 'addetti_port', lbl: 'N° di addetti necessari', ph: 'Es. 1' },
      ],
    ],
    radios: [
      { id: 'divisa_port', lbl: 'È richiesta una divisa aziendale specifica?', opts: ['Sì', 'No'] },
      { id: 'centralino_port', lbl: 'Gestione centralino / telefonate inclusa?', opts: ['Sì', 'No', 'Da valutare'] },
    ],
  },
  'Servizi di Lavanolo': {
    label: 'Dettagli — Lavanolo',
    rows: [
      [
        { t: 'select', id: 'qty_lav', lbl: 'Quantità stimata a settimana', opts: ['', 'Meno di 10 kg', '10–50 kg', '50–100 kg', 'Oltre 100 kg'] },
        { t: 'select', id: 'ritiro_lav', lbl: 'Ritiro e consegna a domicilio?', opts: ['', 'Sì, entrambi', 'Solo ritiro', 'Solo consegna', 'No, porto io'] },
      ],
    ],
    checks: {
      id: 'tipo_lav',
      lbl: 'Tipo di biancheria / tessili',
      opts: ['Lenzuola / Biancheria piana', 'Asciugamani e accappatoi', 'Divise / Abiti da lavoro', 'Tovagliato / Grembiuli', 'Tende e tessili speciali'],
    },
    radios: [{ id: 'steril_lav', lbl: 'Necessità di sterilizzazione / cicli certificati?', opts: ['Sì', 'No'] }],
  },
  'Manutenzione del Verde': {
    label: 'Dettagli — Manutenzione del Verde',
    rows: [
      [
        { t: 'number', id: 'sup_verde', lbl: 'Superficie verde approssimativa (mq) *', ph: 'Es. 300', req: true },
        { t: 'select', id: 'freq_verde', lbl: 'Frequenza interventi desiderata', opts: ['', 'Settimanale', 'Ogni 2 settimane', 'Mensile', 'Stagionale', 'Una tantum'] },
      ],
      [
        {
          t: 'select',
          id: 'tipo_verde',
          lbl: 'Tipo di intervento principale',
          opts: ['', 'Taglio erba / prato', 'Potatura siepi e cespugli', 'Potatura alberi ad alto fusto', 'Pulizia aree esterne', 'Piantumazione / Riqualificazione', 'Trattamenti fitosanitari', 'Tutti i servizi'],
        },
      ],
    ],
    radios: [
      { id: 'irrigaz_verde', lbl: 'Impianto di irrigazione esistente?', opts: ['Sì, già presente', 'No', 'Da installare'] },
      { id: 'alberi_verde', lbl: 'Presenza di alberi ad alto fusto?', opts: ['Sì', 'No'] },
    ],
  },
};

const groupOf = (value: string) => serviceGroups.find((g) => g.options.includes(value))?.label ?? null;

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function ExtraFields({ group }: { group: GroupCfg }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
    >
      <div className="form-section-label">{group.label}</div>
      {group.rows.map((row, ri) => (
        <motion.div key={ri} className="form-row" style={{ marginTop: '1.2rem' }} variants={item}>
          {row.map((f) => (
            <div key={f.id} className="form-field">
              <label className="form-label" htmlFor={f.id}>{f.lbl}</label>
              {f.t === 'select' ? (
                <select id={f.id} className="form-select" defaultValue="">
                  {f.opts.map((o) => (
                    <option key={o} value={o}>
                      {o || 'Seleziona...'}
                    </option>
                  ))}
                </select>
              ) : (
                <input id={f.id} className="form-input" type="number" placeholder={f.ph ?? ''} min={0} required={f.req} />
              )}
            </div>
          ))}
        </motion.div>
      ))}
      {group.checks && (
        <motion.div className="form-field form-full" style={{ marginTop: '1.2rem' }} variants={item}>
          <label className="form-label">{group.checks.lbl}</label>
          <div className="form-check-group">
            {group.checks.opts.map((o) => (
              <label key={o} className="form-check-lbl">
                <input type="checkbox" name={group.checks!.id} value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}
      {group.radios?.map((r) => (
        <motion.div key={r.id} className="form-field form-full" style={{ marginTop: '1.2rem' }} variants={item}>
          <label className="form-label">{r.lbl}</label>
          <div className="form-radio-group">
            {r.opts.map((o) => (
              <label key={o} className="form-radio-lbl">
                <input type="radio" name={r.id} value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function QuoteForm() {
  const { status, onSubmit } = useWhatsAppSubmit('prev');
  const [service, setService] = useState('');
  const [progress, setProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const group = groupOf(service);

  // Percentuale di campi obbligatori compilati
  const measure = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    const req = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[required]')];
    const done = req.filter((el) => (el instanceof HTMLInputElement && el.type === 'checkbox' ? el.checked : el.value.trim() !== '')).length;
    setProgress(req.length ? done / req.length : 0);
  }, []);

  // Servizio preselezionato da ?servizio=...
  useEffect(() => {
    const srv = new URLSearchParams(window.location.search).get('servizio');
    if (srv && (groupOf(srv) || srv === 'altro')) setService(srv);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(measure, 50);
    return () => window.clearTimeout(id);
  }, [group, measure]);

  if (status === 'sent') {
    return (
      <FormSuccess
        title="Richiesta inviata con successo!"
        text="Grazie per averci contattato. Ti risponderemo entro 2 ore lavorative con il tuo preventivo personalizzato."
        action={{ href: '/', label: 'Torna alla Home' }}
      />
    );
  }

  const pct = Math.round(progress * 100);

  return (
    <motion.div
      className="form-box"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 17, delay: 0.1 }}
    >
      <div className="form-box-head">
        <div>
          <div className="form-box-title">Richiedi il tuo preventivo</div>
          <div className="form-box-sub">Tutti i campi con * sono obbligatori</div>
        </div>
        <div className="form-progress" aria-label={`Completamento ${pct}%`}>
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="19" className="form-progress-track" />
            <motion.circle cx="22" cy="22" r="19" className="form-progress-fill" animate={{ pathLength: progress }} transition={{ type: 'spring', stiffness: 90, damping: 18 }} />
          </svg>
          <span>{pct}%</span>
        </div>
      </div>

      <form ref={formRef} onSubmit={onSubmit} onInput={measure} onChange={measure}>
        <div className="form-section-label">Informazioni personali</div>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="pv-nome">Nome *</label>
            <input id="pv-nome" className="form-input" type="text" placeholder="Mario" autoComplete="given-name" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="pv-cognome">Cognome *</label>
            <input id="pv-cognome" className="form-input" type="text" placeholder="Rossi" autoComplete="family-name" required />
          </div>
        </div>
        <div className="form-row" style={{ marginTop: '1.2rem' }}>
          <div className="form-field">
            <label className="form-label" htmlFor="pv-email">Email *</label>
            <input id="pv-email" className="form-input" type="email" placeholder="mario@email.com" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="pv-tel">Telefono *</label>
            <input id="pv-tel" className="form-input" type="tel" placeholder="+39 333 000 0000" autoComplete="tel" required />
          </div>
        </div>

        <div className="form-section-label">Dettagli dell&apos;intervento</div>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="pv-cliente">Tipo di cliente *</label>
            <select id="pv-cliente" className="form-select" required defaultValue="">
              <option value="">Seleziona...</option>
              <option>Privato</option>
              <option>Azienda / Professionista</option>
              <option>Condominio / Amministratore</option>
              <option>Hotel / B&amp;B</option>
              <option>Altro</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="srvType">Tipo di servizio *</label>
            <select id="srvType" className="form-select" required value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Seleziona...</option>
              {serviceGroups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </optgroup>
              ))}
              <option value="altro">Altro / Non so ancora</option>
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {group && cfg[group] && (
            <motion.div
              key={group}
              className="extra-fields-wrap visible"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <ExtraFields group={cfg[group]} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="form-row" style={{ marginTop: '1.2rem' }}>
          <div className="form-field">
            <label className="form-label" htmlFor="pv-zona">Città / Zona *</label>
            <input id="pv-zona" className="form-input" type="text" placeholder="Es. Roma – Prati" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="pv-data">Data preferita</label>
            <input id="pv-data" className="form-input" type="date" />
          </div>
        </div>

        <div className="form-section-label">Dettagli aggiuntivi</div>
        <div className="form-field form-full">
          <label className="form-label" htmlFor="pv-desc">Descrivi la tua esigenza</label>
          <textarea
            id="pv-desc"
            className="form-ta"
            style={{ height: 130 }}
            placeholder="Descrivi lo stato dell'ambiente, eventuali problemi specifici, orari preferiti o qualsiasi altra informazione utile per un preventivo accurato..."
          />
        </div>
        <div className="form-row" style={{ marginTop: '1.2rem' }}>
          <div className="form-check form-full">
            <input type="checkbox" id="gdpr" required />
            <label htmlFor="gdpr">
              Ho letto e accetto la <Link href="/privacy-policy">Privacy Policy</Link> ai sensi del Regolamento EU 2016/679 (GDPR). *
            </label>
          </div>
        </div>

        <div style={{ marginTop: '1.8rem' }}>
          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? 'Inviato ✓' : 'Invia Richiesta di Preventivo'}
          </button>
          <p className="form-note">Ti risponderemo entro 2 ore lavorative. Nessun impegno richiesto.</p>
        </div>
      </form>
    </motion.div>
  );
}
