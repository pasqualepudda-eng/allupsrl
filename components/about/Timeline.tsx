'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    year: '2015',
    title: 'La fondazione',
    text: 'AllUp nasce a Roma con un piccolo team di tre persone e il desiderio di rivoluzionare i servizi di pulizia per i privati.',
  },
  {
    year: '2017',
    title: 'Prima certificazione ISO 9001',
    text: 'Otteniamo la certificazione ISO 9001:2015, formalizzando i protocolli di qualità che già seguivamo. Il team cresce a 12 persone.',
  },
  {
    year: '2019',
    title: 'Apertura al mercato B2B',
    text: 'Lanciamo la divisione aziendale: uffici, hotel, condomini. La clientela business supera quella privata per volumi.',
  },
  {
    year: '2021',
    title: 'Introduzione del trattamento a ozono',
    text: "In risposta alla pandemia, investiamo in tecnologie di sanificazione avanzata. Il trattamento all'ozono diventa uno dei nostri servizi più richiesti.",
  },
  {
    year: '2025',
    title: 'Oggi: 40 professionisti, 1.500+ clienti',
    text: 'Un team solido, una reputazione costruita sulla fiducia. Continuiamo a crescere rimanendo fedeli ai valori che ci hanno sempre guidati.',
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
