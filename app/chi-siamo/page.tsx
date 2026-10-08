import CertificateGrid from '@/components/about/CertificateGrid';
import Timeline from '@/components/about/Timeline';
import CtaSection from '@/components/CtaSection';
import Counter from '@/components/fx/Counter';
import ImageReveal from '@/components/fx/ImageReveal';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import Tilt from '@/components/fx/Tilt';
import { ShieldCheckIcon, ShieldIcon, UsersIcon } from '@/components/icons';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import { licenses } from '@/lib/certifications';
import { company, references, squads, yearsActive } from '@/lib/company';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/chi-siamo');

// Valori dichiarati nel Bilancio di Sostenibilità 2025
const values = [
  {
    title: 'Trasparenza',
    text: 'Preventivi chiari, comunicazione onesta e risultati rendicontati. Dal 2025 pubblichiamo volontariamente il nostro Bilancio di Sostenibilità.',
  },
  {
    title: 'Responsabilità',
    text: "Verso le persone e verso l'ambiente: sicurezza certificata ISO 45001, gestione ambientale ISO 14001 e prodotti concentrati per ridurre plastica e rifiuti.",
  },
  {
    title: 'Integrità',
    text: 'Un sistema anticorruzione certificato ISO 37001 e i principi di responsabilità sociale SA 8000 e di parità di genere UNI/PdR 125 guidano ogni scelta.',
  },
  {
    title: 'Qualità',
    text: 'Ogni servizio è progettato, erogato e verificato secondo ISO 9001 e UNI EN 13549, lo standard europeo per la qualità dei servizi di pulizia.',
  },
];

const teamFeats = [
  {
    icon: <ShieldIcon />,
    title: 'Formazione continua',
    text: "Corsi sulla sicurezza da 8 o 16 ore in base al rischio, antincendio, primo soccorso, lavori in quota, DPI e carrelli elevatori. Ogni anno oltre metà del personale segue un percorso formativo.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Sicurezza misurata',
    text: 'Nel 2025 gli infortuni sono scesi del 67% rispetto all’anno precedente. Monitoriamo i risultati e investiamo in prevenzione e strumenti adeguati.',
  },
  {
    icon: <UsersIcon />,
    title: 'Una direzione presente',
    text: `L'azienda è guidata dall'Amministratore Unico, dott. ${company.ceo}, preposto alla gestione tecnica ai sensi del D.M. 274/97, che già nel Giubileo del 2000 coordinava le pulizie delle strutture ecclesiastiche.`,
  },
];

export default function ChiSiamoPage() {
  return (
    <PageTransition>
      <JsonLd route="/chi-siamo" />
      <PageBanner eyebrow="Chi Siamo" title={"Dietro ogni spazio pulito\nc'è un team appassionato"} crumb="Chi Siamo" />

      {/* ══ MISSION ══ */}
      <section className="section" id="mission">
        <div className="container">
          <div className="g2">
            <div>
              <Reveal className="eyebrow">La nostra mission</Reveal>
              <SplitText className="s-title">
                Puliamo con amore.
                <br />
                Lavoriamo con metodo.
              </SplitText>
              <Reveal as="p" className="s-text mt-3" delay={0.1}>
                Dal {company.founded} generiamo valore attraverso i nostri servizi, garantendo qualità e attenzione al cliente nel rispetto delle
                persone, dell&apos;ambiente e del territorio. Operiamo con correttezza e perseguiamo una crescita sostenibile.
              </Reveal>
              <Reveal as="p" className="s-text mt-3" delay={0.2}>
                Oggi siamo circa 140 persone. Dalla direzione generale di Roma e dalla sede di Ivrea (TO) coordiniamo commesse per oltre{' '}
                {company.clients} clienti pubblici e privati, circa 955.000 m² di superfici, con un modello fondato su pianificazione,
                monitoraggio delle performance e ottimizzazione dei processi.
              </Reveal>
              <Stagger className="mission-stats" gap={0.12} delay={0.2}>
                <StaggerItem variant="zoom">
                  <Counter className="mission-stat-n" value={yearsActive} />
                  <span className="mission-stat-l">Anni di attività</span>
                </StaggerItem>
                <StaggerItem variant="zoom">
                  <Counter className="mission-stat-n" value={company.clients} suffix="+" />
                  <span className="mission-stat-l">Clienti attivi</span>
                </StaggerItem>
                <StaggerItem variant="zoom">
                  <Counter className="mission-stat-n" value={company.people} suffix="+" />
                  <span className="mission-stat-l">Persone nel team</span>
                </StaggerItem>
              </Stagger>
            </div>
            <ImageReveal
              className="mission-img"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fit=crop"
              alt="Professionisti al lavoro in un ufficio"
              from="right"
            >
              <div className="mission-img-caption">Facility management dal {company.founded}</div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ══ VALORI ══ */}
      <section className="section bg-off">
        <div className="container">
          <div className="sec-hd">
            <Reveal className="eyebrow">I nostri valori</Reveal>
            <SplitText className="s-title">
              I principi che guidano
              <br />
              ogni nostro intervento
            </SplitText>
            <Reveal as="p" className="s-text" delay={0.1}>
              Vogliamo essere un&apos;impresa dinamica e responsabile, capace di integrare innovazione, sostenibilità e qualità gestionale, e
              attenta agli effetti che il nostro lavoro ha sulle persone, sull&apos;economia e sull&apos;ambiente.
            </Reveal>
          </div>
          <div className="g4">
            {values.map((v, i) => (
              <Tilt key={v.title} className="value-card" reveal="bounce" delay={i * 0.08}>
                <div className="value-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STORIA ══ */}
      <section className="section" id="storia">
        <div className="container">
          <div className="g2-3">
            <div>
              <Reveal className="eyebrow">La nostra storia</Reveal>
              <SplitText className="s-title">
                Dal {company.founded} a oggi:
                <br />
                una crescita costante
              </SplitText>
              <Reveal as="p" className="s-text mt-3 mb-4" delay={0.1}>
                Siamo nati da un ramo d&apos;azienda di una storica impresa di pulizie nazionale. Da allora abbiamo lavorato per scuole, ministeri,
                grandi eventi, fondi immobiliari e industrie, crescendo commessa dopo commessa.
              </Reveal>
              <Timeline />
            </div>
            <div className="storia-sticky">
              <ImageReveal
                className="mission-img"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&fit=crop"
                alt="Ufficio direzionale"
                sizes="(max-width: 1100px) 100vw, 60vw"
              >
                <div className="mission-img-caption">Direzione generale a Roma · sede operativa a Ivrea (TO)</div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="section bg-off" id="team">
        <div className="container">
          <div className="sec-hd">
            <Reveal className="eyebrow">Il team</Reveal>
            <SplitText className="s-title">Le squadre dietro ogni intervento</SplitText>
            <Reveal as="p" className="s-text" delay={0.1}>
              Oltre 130 operatori organizzati in squadre locali, coordinati da Roma. Persone formate e seguite, che conoscono gli edifici in cui
              lavorano ogni giorno.
            </Reveal>
          </div>
          <Stagger className="squad-grid" gap={0.08}>
            {squads.map((sq) => (
              <StaggerItem key={sq.region} className="squad-card" variant="up">
                <Counter className="squad-n" value={sq.people} />
                <span className="squad-unit">operatori</span>
                <div className="squad-region">{sq.region}</div>
                <p className="squad-note">{sq.note}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="squad-feats" gap={0.1}>
            {teamFeats.map((f) => (
              <StaggerItem key={f.title} className="feat" variant="up">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-body">
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ CERTIFICAZIONI ══ */}
      <section className="section" id="certificazioni">
        <div className="container">
          <div className="sec-hd">
            <Reveal className="eyebrow">Certificazioni</Reveal>
            <SplitText className="s-title">
              La qualità che portiamo
              <br />
              è certificata e verificabile
            </SplitText>
            <Reveal as="p" className="s-text" delay={0.1}>
              Non promettiamo semplicemente eccellenza: la documentiamo. Ogni certificato è rilasciato da un ente indipendente, soggetto a
              sorveglianza annuale e consultabile qui sotto nella sua versione originale.
            </Reveal>
          </div>
          <CertificateGrid />
          <Stagger className="cert-licenses" gap={0.1}>
            {licenses.map((l) => (
              <StaggerItem key={l.title} className="cert-license" variant="up">
                <span className="cert-license-mark" aria-hidden>
                  ✓
                </span>
                <div>
                  <h4>{l.title}</h4>
                  <p>{l.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal as="p" className="cert-note" delay={0.1}>
            Puoi verificare la validità di ogni certificato con il codice QR stampato sul documento o contattando direttamente l&apos;ente che
            l&apos;ha rilasciato.
          </Reveal>
        </div>
      </section>

      {/* ══ REFERENZE ══ */}
      <section className="section bg-off" id="referenze">
        <div className="container">
          <div className="sec-hd">
            <Reveal className="eyebrow">Referenze</Reveal>
            <SplitText className="s-title">
              Chi ci ha scelto
              <br />
              e continua a farlo
            </SplitText>
            <Reveal as="p" className="s-text" delay={0.1}>
              Fondi immobiliari, banche, istituzioni e industrie: committenti che ci affidano sedi direzionali, stabilimenti, punti vendita e
              immobili storici, spesso da molti anni.
            </Reveal>
          </div>
          <Stagger className="ref-grid" gap={0.1}>
            {references.map((r) => (
              <StaggerItem key={r.group} className="ref-group" variant="up">
                <h3>{r.group}</h3>
                <ul className="ref-names">
                  {r.names.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaSection
        title="Vuoi conoscerci meglio? Inizia con un preventivo gratuito."
        titleWidth={600}
        text="Contattaci senza impegno. Ascoltiamo le tue esigenze e costruiamo insieme la soluzione giusta per il tuo spazio."
        primary={{ href: '/preventivo', label: 'Richiedi Preventivo' }}
        secondary={{ href: '/contatti', label: 'Scrivici' }}
      />
    </PageTransition>
  );
}
