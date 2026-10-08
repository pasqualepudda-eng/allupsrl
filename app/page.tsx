import Link from 'next/link';
import CtaSection from '@/components/CtaSection';
import Counter from '@/components/fx/Counter';
import ImageReveal from '@/components/fx/ImageReveal';
import Magnetic from '@/components/fx/Magnetic';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import VelocityMarquee from '@/components/fx/VelocityMarquee';
import Certifications from '@/components/home/Certifications';
import ExitIntentPopup from '@/components/home/ExitIntentPopup';
import Hero from '@/components/home/Hero';
import Reviews from '@/components/home/Reviews';
import ServicesList from '@/components/home/ServicesList';
import WhyUs from '@/components/home/WhyUs';
import { BoxIcon, ShieldIcon, UsersIcon } from '@/components/icons';
import JsonLd from '@/components/JsonLd';
import PageTransition from '@/components/PageTransition';
import RotatingBadge from '@/components/RotatingBadge';
import { company, referenceMarquee, yearsActive } from '@/lib/company';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/');

const tickerItems = [
  '✦ Sanificazione a Ozono',
  'Pulizie Civili ed Industriali',
  '✦ Disinfestazione e Derattizzazione',
  'Facchinaggio Professionale',
  '✦ Portierato e Reception',
  'Oltre 100 Clienti in 7 Regioni',
  '✦ Servizi di Lavanolo',
  'Manutenzione del Verde',
  '✦ ISO 9001 · 14001 · 45001 · 37001',
  'Reperibilità h24',
  '✦ Preventivo Gratuito',
  'UNI EN 13549 · SA 8000 · Parità di Genere',
  '✦ Dal 2011 · Sede a Roma',
];

const introFeats = [
  {
    icon: <BoxIcon />,
    title: '7 servizi, un solo referente',
    text: 'Pulizie, sanificazione, disinfestazione, facchinaggio, portierato, lavanolo e verde: tutto coordinato da un unico team con un unico contratto.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Certificati ISO 9001, 14001, 45001 e 37001',
    text: 'Qualità, ambiente, sicurezza e anticorruzione verificati da enti terzi indipendenti, insieme a UNI EN 13549 per i servizi di pulizia, SA 8000 e parità di genere.',
  },
  {
    icon: <UsersIcon />,
    title: 'Oltre 130 operatori, formati e coordinati',
    text: 'Squadre locali a Roma, Milano, in Piemonte, Toscana e Marche, formate su sicurezza, antincendio e primo soccorso e coordinate da un unico referente.',
  },
];

const stats = [
  { value: company.clients, suffix: '+', label: 'Clienti attivi' },
  { value: yearsActive, suffix: '', label: 'Anni di attività' },
  { value: company.squareMeters, suffix: '', label: 'm² di superfici gestite' },
  { value: company.people, suffix: '+', label: 'Persone nel team' },
];

export default function HomePage() {
  return (
    <PageTransition>
      <JsonLd route="/" />
      <Hero />

      {/* Nastro che reagisce alla velocità dello scroll */}
      <div className="ticker-wrap">
        <VelocityMarquee baseVelocity={-2.4}>
          {tickerItems.map((t) => (
            <span key={t} className="ticker-item">
              {t} <span className="ticker-sep">·</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <div className="wave-sep" style={{ background: 'var(--dark)' }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C200,72 500,0 720,36 C940,72 1200,8 1440,30 L1440,72 L0,72 Z" fill="#F6F6F4" />
          <path d="M0,48 C300,12 600,65 900,32 C1100,8 1300,55 1440,38 L1440,72 L0,72 Z" fill="#F6F6F4" opacity=".45" />
        </svg>
      </div>

      {/* ══ INTRO ══ */}
      <section className="section bg-off" id="intro">
        <div className="container">
          <div className="g2">
            <div className="intro-visual">
              <ImageReveal
                className="intro-img"
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80&fit=crop"
                alt="Team AllUp al lavoro"
                from="left"
              >
                <Reveal className="intro-img-badge" variant="up" delay={0.7}>
                  <span>✦</span>&nbsp; Scelti dalla <span>FIGC</span> per Roma e Coverciano
                </Reveal>
              </ImageReveal>
              <RotatingBadge text={`DAL ${company.founded} · ROMA · FACILITY MANAGEMENT · `} className="intro-rot" />
            </div>
            <div>
              <Reveal className="eyebrow" variant="right">
                Chi siamo
              </Reveal>
              <SplitText className="s-title">Dal 2011 il partner unico per il tuo patrimonio immobiliare</SplitText>
              <Reveal as="p" className="s-text" variant="right" delay={0.15}>
                Nata a Roma nel 2011, AllUp oggi conta circa 140 persone che ogni giorno curano sedi direzionali, uffici, stabilimenti, punti
                vendita e immobili storici per oltre 100 clienti pubblici e privati, con commesse in sette regioni, dal Lazio alla Valle
                d&apos;Aosta.
              </Reveal>
              <Stagger className="intro-feats" gap={0.12} delay={0.2}>
                {introFeats.map((f) => (
                  <StaggerItem key={f.title} className="feat" variant="right">
                    <div className="feat-icon">{f.icon}</div>
                    <div className="feat-body">
                      <h4>{f.title}</h4>
                      <p>{f.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal variant="right" delay={0.3}>
                <Magnetic>
                  <Link href="/chi-siamo" className="btn btn-outline">
                    Scopri di più su di noi
                  </Link>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVIZI ══ */}
      <section className="section" id="servizi">
        <div className="container">
          <div className="sec-hd">
            <Reveal className="eyebrow">I nostri servizi</Reveal>
            <SplitText className="s-title">
              7 servizi, un unico partner
              <br />
              di fiducia a Roma
            </SplitText>
            <Reveal as="p" className="s-text" delay={0.15}>
              Dalla pulizia quotidiana alla sanificazione, dalla disinfestazione al verde: coordiniamo ogni esigenza del tuo spazio con personale
              formato, processi certificati e pronto intervento h24.
            </Reveal>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* ══ NUMERI ══ */}
      <div className="stats-strip">
        <div className="container">
          <Stagger className="stats-inner" gap={0.12}>
            {stats.map((s) => (
              <StaggerItem key={s.label} className="st-item" variant="zoom">
                <Counter className="st-n" value={s.value} suffix={s.suffix} />
                <span className="st-l">{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      <WhyUs />
      <Reviews />

      {/* ══ REFERENZE ══ */}
      <section className="clients-strip" aria-labelledby="clients-label">
        <div className="container">
          <Reveal as="p" className="text-center clients-label" variant="blur">
            <span id="clients-label">Hanno scelto AllUp</span>
          </Reveal>
        </div>
        <VelocityMarquee baseVelocity={1.6}>
          {referenceMarquee.map((n) => (
            <span key={n} className="clients-item">
              {n} <span className="clients-sep">✦</span>
            </span>
          ))}
        </VelocityMarquee>
        <Reveal as="p" className="text-center certs-more" delay={0.15}>
          <Link href="/chi-siamo#referenze">Tutte le referenze →</Link>
        </Reveal>
      </section>

      <Certifications />

      <CtaSection
        eyebrow="Inizia oggi"
        title={
          <>
            Hai un edificio da gestire o un servizio da <span className="gradient-text">ottimizzare?</span>
          </>
        }
        text="Richiedi un assessment gratuito: analizziamo la tua situazione e ti proponiamo la soluzione più efficiente. Nessun impegno, massima trasparenza."
        primary={{ href: '/preventivo', label: 'Richiedi Assessment Gratuito' }}
        secondary={{ href: '/contatti', label: 'Contattaci' }}
      />

      <ExitIntentPopup />
    </PageTransition>
  );
}
