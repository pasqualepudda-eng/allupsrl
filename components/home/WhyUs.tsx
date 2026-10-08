'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import Magnetic from '@/components/fx/Magnetic';
import { Reveal } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import { ClockIcon, PinIcon, ShieldCheckIcon, ShieldIcon } from '@/components/icons';

const feats: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <ClockIcon />,
    title: 'Intervento in 24 ore',
    text: 'Per le urgenze, garantiamo un sopralluogo o un intervento entro 24 ore dalla chiamata, senza costi aggiuntivi.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Garanzia di soddisfazione',
    text: 'Se il risultato non ti soddisfa, torniamo a completare il lavoro. Senza discussioni, senza costi extra.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Preventivo trasparente',
    text: 'Nessuna sorpresa in fattura. Il preventivo che ricevi è quello che paghi: chiaro, dettagliato e senza voci nascoste.',
  },
  {
    icon: <PinIcon />,
    title: 'Da Roma a tutta Italia',
    text: "Direzione generale a Roma e sede a Ivrea (TO): coordiniamo commesse in Lazio, Lombardia, Piemonte, Valle d'Aosta, Toscana, Marche ed Emilia-Romagna.",
  },
];

/** "Perché sceglierci": colonna sinistra fissa, a destra una linea che si riempie scorrendo */
export default function WhyUs() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="section bg-off why-section">
      <div className="container">
        <div className="g2 why-grid">
          <div className="why-sticky">
            <Reveal className="eyebrow">Perché sceglierci</Reveal>
            <SplitText className="s-title">Professionalità che si vede, igiene che si sente</SplitText>
            <Reveal as="p" className="s-text mt-3" delay={0.15}>
              Non basta che un ambiente sembri pulito: deve esserlo davvero. Noi lavoriamo per garantire risultati concreti, verificabili e
              duraturi, in ogni contesto e per ogni tipo di cliente.
            </Reveal>
            <Reveal className="mt-4" delay={0.25}>
              <Magnetic>
                <Link href="/preventivo" className="btn btn-primary">
                  Richiedi un preventivo gratuito
                </Link>
              </Magnetic>
            </Reveal>
          </div>
          <div className="why-feats" ref={listRef}>
            <div className="why-line" aria-hidden>
              <motion.span style={{ scaleY: progress }} />
            </div>
            {feats.map((f, i) => (
              <Reveal key={f.title} className="feat why-feat" variant="right" delay={i * 0.06} amount={0.6}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-body">
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
