import Link from 'next/link';
import type { CSSProperties } from 'react';
import Magnetic from '@/components/fx/Magnetic';
import SplitWords from '@/components/fx/SplitWords';
import PageTransition from '@/components/PageTransition';

export const metadata = { title: 'Pagina non trovata | AllUp', robots: 'noindex, follow' };

// Bolle di sapone che salgono (posizioni fisse per un rendering stabile)
const bubbles = [
  [8, 34, 9], [18, 18, 12], [27, 46, 8], [39, 22, 14], [52, 30, 10], [63, 54, 11], [74, 20, 9], [86, 40, 13], [93, 26, 10],
];

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

export default function NotFound() {
  return (
    <PageTransition>
      <section className="nf">
        <div className="nf-bubbles" aria-hidden>
          {bubbles.map(([left, size, dur], i) => (
            <span key={i} style={{ left: `${left}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${-i * 1.3}s` }} />
          ))}
        </div>
        <div>
          <div className="nf-code intro-in" style={d(0)} aria-hidden>
            <span>4</span>
            <span className="is-zero">0</span>
            <span>4</span>
          </div>
          <h1>
            <SplitWords text="Questa pagina è stata pulita via." base={0.15} />
          </h1>
          <p className="intro-in" style={d(0.4)}>
            Forse il link è vecchio o l&apos;indirizzo è sbagliato. Nessun problema: ripartiamo da qui.
          </p>
          <div className="cta-btns intro-in" style={d(0.55)}>
            <Magnetic>
              <Link href="/" className="btn btn-primary btn-lg">
                Torna alla Home
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/servizi" className="btn btn-outline-white btn-lg">
                Scopri i servizi
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
