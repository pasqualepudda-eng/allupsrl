'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

// Fonte: presentazione aziendale (marzo 2026), visura camerale e certificati
const steps = [
  {
    year: '2011',
    title: 'La fondazione',
    text: "Nasce a Roma Nettoyage S.r.l., da un ramo d'azienda di una storica impresa di pulizie nazionale. Primo grande incarico: gli istituti scolastici delle province di Ragusa, Palermo e Trapani, con circa 300 operatori.",
  },
  {
    year: '2014',
    title: 'Nasce ALL UP',
    text: 'Conclusa la commessa siciliana e incassati tutti i crediti, la società si consolida, gestisce un parcheggio nel centro storico di Catania e cambia nome in ALL UP S.r.l., tornando a concentrarsi sui servizi di pulizia.',
  },
  {
    year: '2015',
    title: 'Expo Milano 2015',
    text: "Il nostro software gestionale per pianificare e monitorare le pulizie viene giudicato un elemento di eccellenza nella gara per il lotto principale di Expo. A noi accoglienza, presidio e pulizia di Palazzo Italia e dei Manufatti del Cardo.",
  },
  {
    year: '2016',
    title: 'Clienti diretti',
    text: "Proseguiamo con contratti diretti per il Ministero del Lavoro (uffici del Ministro), Credito Fondiario, Beni Stabili e SDA. A Milano curiamo l'approntamento delle auto a noleggio per Avis Budget.",
  },
  {
    year: '2017',
    title: 'Il real estate',
    text: 'Arrivano fondi e società di gestione immobiliare: Covivio, Investire SGR, BNP Paribas Real Estate, Cushman & Wakefield, Colliers, Kryalos SGR e molti altri, insieme a banche, enti e studi professionali.',
  },
  {
    year: '2023',
    title: 'Qualità certificata',
    text: "Otteniamo la certificazione ISO 9001:2015. Nel 2024 arriva l'asseverazione del modello di gestione della salute e sicurezza (D.Lgs. 81/08, art. 30).",
  },
  {
    year: '2025',
    title: 'FIGC, Giubileo e nuove certificazioni',
    text: 'Dal 1° agosto curiamo le sedi FIGC di Roma e il Centro Tecnico Federale di Coverciano. Lavoriamo per il Giubileo e otteniamo ISO 14001, ISO 45001, ISO 37001, SA 8000 e la certificazione per la parità di genere.',
  },
  {
    year: '2026',
    title: 'Oggi',
    text: 'Circa 140 persone, oltre 100 clienti in sette regioni, una sede a Ivrea (TO) e la certificazione UNI EN 13549 sulla qualità dei servizi di pulizia. Il prossimo traguardo: diventare Società Benefit.',
  },
];

/** Timeline con linea che si "disegna" scorrendo e tappe che si accendono */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 50%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  return (
    <div className="timeline" ref={ref}>
      <motion.span className="timeline-progress" style={{ scaleY }} aria-hidden />
      {steps.map((s, i) => (
        <motion.div
          key={s.year}
          className="tl-item"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6, margin: '0px 0px -10% 0px' }}
          transition={{ type: 'spring', stiffness: 90, damping: 18, delay: i === 0 ? 0.1 : 0 }}
        >
          <motion.span
            className="tl-dot"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 1, margin: '0px 0px -30% 0px' }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            aria-hidden
          />
          <div className="tl-year">{s.year}</div>
          <div className="tl-title">{s.title}</div>
          <p className="tl-text">{s.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
