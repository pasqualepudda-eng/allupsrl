'use client';

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import Counter from '@/components/fx/Counter';
import Magnetic from '@/components/fx/Magnetic';
import SplitWords from '@/components/fx/SplitWords';
import { NetworkCanvas } from '@/components/fx/canvas';
import { ShieldIcon, StarLogo } from '@/components/icons';
import { certifications } from '@/lib/certifications';
import { company, yearsActive } from '@/lib/company';

const phrases = ['gestito con intelligenza.', 'in mani esperte.', 'senza pensieri.', 'valorizzato ogni giorno.'];
const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

const chVariants = {
  hidden: { y: '100%', opacity: 0, filter: 'blur(6px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)' },
  exit: { y: '-100%', opacity: 0, filter: 'blur(6px)' },
};

/** Seconda riga del titolo: le frasi si alternano lettera per lettera */
function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const seen = document.documentElement.dataset.intro === 'seen';
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => setI((v) => (v + 1) % phrases.length), 3400);
    }, seen ? 2600 : 4000);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, []);

  let n = 0;
  return (
    <span className="rotator intro-in" style={d(0.3)} aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <motion.em
          key={i}
          className="rotator-phrase"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.022 } }, exit: { transition: { staggerChildren: 0.01 } } }}
        >
          {phrases[i].split(' ').map((w, wi, arr) => (
            <Fragment key={wi}>
              <span className="rotator-word">
                {w.split('').map((ch) => (
                  <motion.span key={n++} className="rotator-ch" variants={chVariants} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                    {ch}
                  </motion.span>
                ))}
              </span>
              {wi < arr.length - 1 && ' '}
            </Fragment>
          ))}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}

/** Composizione 3D di card in vetro che seguono il mouse */
function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 16 });
  const sy = useSpring(my, { stiffness: 50, damping: 16 });
  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const rotateX = useTransform(sy, [-1, 1], [9, -9]);
  const near = { x: useTransform(sx, [-1, 1], [-26, 26]), y: useTransform(sy, [-1, 1], [-20, 20]) };
  const far = { x: useTransform(sx, [-1, 1], [14, -14]), y: useTransform(sy, [-1, 1], [10, -10]) };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <motion.div className="hero-visual" style={{ rotateX, rotateY, transformPerspective: 1200 }} aria-hidden>
      <div className="hv-glow" />
      <motion.div className="hv-star" style={far}>
        <div className="intro-in" style={d(0.5)}>
          <StarLogo />
        </div>
      </motion.div>

      <motion.div className="hv-card hv-card--main" style={near}>
        <div className="intro-in" style={d(0.55)}>
          <div className="hv-card-body anim-float">
            <div className="hv-head">
              <span className="hv-icon">
                <ShieldIcon />
              </span>
              <span>Sanificazione a ozono</span>
            </div>
            <div className="hv-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" className="hv-ring-track" />
                <circle cx="60" cy="60" r="52" className="hv-ring-fill" />
              </svg>
              <div className="hv-ring-val">
                99,9<small>%</small>
              </div>
            </div>
            <p className="hv-sub">efficacia certificata su batteri, virus e muffe</p>
            <div className="hv-bars">
              {[92, 78, 99].map((v, i) => (
                <span key={i} style={{ '--w': `${v}%`, '--bd': `${2 + i * 0.15}s` } as CSSProperties} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="hv-card hv-card--team" style={far}>
        <div className="intro-in" style={d(0.7)}>
          <div className="hv-card-body anim-float" style={{ animationDelay: '-1.5s' }}>
            <div className="hv-live">
              <span className="topbar-live-dot" /> Team operativo ora
            </div>
            <div className="hv-avatars">
              <span>MR</span>
              <span>GF</span>
              <span>LA</span>
              <span className="is-more">+{company.people}</span>
            </div>
            <div className="hv-small">Squadre a Roma, Milano, Piemonte, Toscana e Marche</div>
          </div>
        </div>
      </motion.div>

      <motion.div className="hv-card hv-card--cert" style={near}>
        <div className="intro-in" style={d(0.85)}>
          <div className="hv-card-body anim-float" style={{ animationDelay: '-3s' }}>
            <div className="hv-stars">
              ✦<b>{certifications.length} certificazioni e attestazioni</b>
            </div>
            <div className="hv-chips">
              <span>ISO 9001</span>
              <span>ISO 14001</span>
              <span>ISO 45001</span>
              <span>ISO 37001</span>
              <span>UNI EN 13549</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <NetworkCanvas />
        <div className="hero-aurora" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </motion.div>
      <div className="hero-bg-lines" />
      <div className="hero-accent" />

      <div className="hero-body">
        <div className="container">
          <div className="hero-inner">
            <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
              <div className="hero-eyebrow intro-in" style={d(0)}>
                Facility Management Integrato · Dal {company.founded}
              </div>
              <h1 className="hero-h1">
                <span className="sr-only">Il tuo edificio, gestito con intelligenza.</span>
                <span aria-hidden>
                  <SplitWords text="Il tuo edificio," base={0.08} step={0.08} />
                </span>
                <br />
                <Rotator />
              </h1>
              <p className="hero-sub intro-in" style={d(0.45)}>
                Dalla sanificazione a ozono alle pulizie quotidiane, dalla cura del verde al portierato: AllUp è il partner unico per ogni esigenza
                del tuo immobile. Un contratto, un referente, zero complicazioni.
              </p>
              <div className="hero-btns intro-in" style={d(0.6)}>
                <Magnetic>
                  <Link href="/preventivo" className="btn btn-primary btn-lg">
                    Richiedi Preventivo Gratuito
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/servizi" className="btn btn-outline-white btn-lg">
                    I Nostri Servizi
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="hero-stats-bar intro-in" style={d(0.8)}>
        <div className="container">
          <div className="hero-stats-inner">
            <div className="h-stat">
              <Counter className="h-stat-n" value={yearsActive} />
              <span className="h-stat-l">Anni di attività</span>
            </div>
            <div className="h-stat">
              <Counter className="h-stat-n" value={company.clients} suffix="+" />
              <span className="h-stat-l">Clienti attivi</span>
            </div>
            <div className="h-stat">
              <Counter className="h-stat-n" value={7} />
              <span className="h-stat-l">Servizi specializzati</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-n">h24</span>
              <span className="h-stat-l">Reperibilità e pronto intervento</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll intro-in" style={d(1.1)} aria-hidden>
        <span className="hero-scroll-line" />
        Scorri
      </div>
    </section>
  );
}
