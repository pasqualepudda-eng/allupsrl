'use client';

import { motion } from 'motion/react';
import { Reveal } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import Tilt from '@/components/fx/Tilt';

const reviews = [
  {
    text: 'Servizio impeccabile. Hanno pulito il mio appartamento dopo i lavori di ristrutturazione in modo straordinario. Puntualissimi e professionali. Li richiederò sicuramente.',
    initials: 'MR',
    name: 'Marco Rossi',
    role: 'Cliente Privato · Roma',
    from: 'left' as const,
  },
  {
    text: 'Collaboriamo con AllUp per la pulizia dei nostri uffici da tre anni. Affidabili, discreti, sempre al top. Non li cambieremmo per nessuna ragione.',
    initials: 'GF',
    name: 'Giulia Ferrari',
    role: 'Responsabile Uffici · Studio Legale',
    from: 'up' as const,
  },
  {
    text: 'Ho richiesto la sanificazione con ozono dopo un problema di umidità. Risultato eccellente, odori eliminati completamente. Risposta rapidissima e preventivo onesto.',
    initials: 'LA',
    name: 'Luca Andreotti',
    role: 'Proprietario · B&B Roma Centro',
    from: 'right' as const,
  },
];

export default function Reviews() {
  return (
    <section className="section" id="recensioni">
      <div className="container">
        <div className="sec-hd">
          <Reveal className="eyebrow">Dicono di noi</Reveal>
          <SplitText className="s-title">Le parole dei nostri clienti</SplitText>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <Tilt key={r.name} className="review" reveal={r.from} delay={i * 0.1} max={7}>
              <motion.div
                className="review-q"
                initial={{ scale: 0, rotate: -40 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.3 + i * 0.1 }}
              >
                &ldquo;
              </motion.div>
              <motion.div
                className="review-stars"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 + i * 0.1 } } }}
                aria-label="5 stelle su 5"
              >
                {[0, 1, 2, 3, 4].map((s) => (
                  <motion.span
                    key={s}
                    variants={{ hidden: { opacity: 0.15, scale: 0.4 }, show: { opacity: 1, scale: 1 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    ★
                  </motion.span>
                ))}
              </motion.div>
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="rev-av">{r.initials}</div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-role">{r.role}</div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
