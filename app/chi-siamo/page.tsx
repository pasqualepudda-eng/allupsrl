import Image from 'next/image';
import Timeline from '@/components/about/Timeline';
import CtaSection from '@/components/CtaSection';
import Counter from '@/components/fx/Counter';
import ImageReveal from '@/components/fx/ImageReveal';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import Tilt from '@/components/fx/Tilt';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/chi-siamo');

const values = [
  { title: 'Qualità senza compromessi', text: 'Ogni intervento è eseguito seguendo protocolli certificati. Non esiste un "basta così": o è fatto bene o si rifà.' },
  { title: 'Trasparenza totale', text: 'Preventivi chiari, comunicazione onesta, nessuna sorpresa in fattura. Il cliente sa sempre cosa sta pagando e perché.' },
  { title: 'Rispetto per le persone', text: 'Rispettiamo i tuoi spazi come fossero nostri. Il team è formato per lavorare in modo discreto, ordinato e professionale.' },
  { title: 'Sostenibilità ambientale', text: 'Solo prodotti biodegradabili ed eco-certificati. Pulire bene non significa inquinare — è possibile fare entrambe le cose.' },
];

const team = [
  {
    name: 'Alessandro Mori',
    role: 'CEO & Fondatore',
    img: 'photo-1560250097-0b93528c311a',
    bio: "Fondatore di AllUp, guida l'azienda con la stessa passione del primo giorno. Esperto di qualità e processi nel cleaning professionale.",
  },
  {
    name: 'Chiara Bianchi',
    role: 'Operations Manager',
    img: 'photo-1573497019940-1c28c88b4f3e',
    bio: 'Coordina il team operativo e garantisce che ogni intervento rispetti i più alti standard qualitativi. Certificata HACCP e ISO.',
  },
  {
    name: 'Roberto Farina',
    role: 'Responsabile Sanificazione',
    img: 'photo-1472099645785-5658abf4ff4e',
    bio: 'Specialista in trattamenti avanzati: ozono, sanificazione professionale e protocolli post-pandemia. Formazione scientifica e decennale esperienza.',
  },
  {
    name: 'Laura Conti',
    role: 'Responsabile Clienti',
    img: 'photo-1580489944761-15a19d654956',
    bio: 'Punto di riferimento per ogni cliente. Gestisce le relazioni, i preventivi e si assicura che nessuna richiesta rimanga senza risposta.',
  },
];

const certs = [
  {
    img: '/img/iso-9001.svg',
    alt: 'ISO 9001:2015 Quality Management System Certified',
    title: 'ISO 9001:2015',
    text: 'Certificazione internazionale per il sistema di gestione della qualità. Garantisce che ogni processo sia documentato, controllato e migliorato continuamente.',
  },
  {
    img: '/img/iso-27001.svg',
    alt: 'ISO 27001:2022 Information Security Management System Certified',
    title: 'ISO 27001:2022',
    text: 'Certificazione per la sicurezza delle informazioni. Tutti i dati dei nostri clienti vengono trattati e protetti secondo i più rigidi standard internazionali.',
  },
  {
    img: '/img/iso-14001.svg',
    alt: 'ISO 14001:2015 Environmental Management System Certified',
    title: 'ISO 14001:2015',
    text: "Certificazione per il sistema di gestione ambientale. Dimostriamo il nostro impegno concreto nella riduzione dell'impatto ambientale delle nostre attività.",
  },
  {
    img: '/img/haccp.svg',
    alt: 'HACCP Certified',
    title: 'HACCP',
    text: 'Conformità ai protocolli di sicurezza alimentare per la gestione igienica degli ambienti. Indispensabile per ristoranti, hotel e strutture food&beverage.',
  },
  {
    img: '/img/trustpilot.svg',
    alt: 'Trustpilot 4.9/5',
    title: 'Trustpilot 4.9/5',
    text: 'Oltre 1.000 recensioni verificate su Trustpilot e Google. Una reputazione costruita giorno per giorno con il lavoro e la fiducia dei clienti.',
  },
  {
    img: '/img/garanzia.svg',
    alt: 'Garanzia Happiness',
    title: 'Garanzia Happiness',
    text: 'Se non sei soddisfatto del risultato, torniamo a completare il lavoro senza costi aggiuntivi. La tua soddisfazione non è negoziabile.',
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
                Da oltre dieci anni la nostra missione è semplice: garantire ambienti davvero puliti, igienizzati e sicuri per le persone che li
                vivono. Non ci accontentiamo dell&apos;apparenza — puntiamo all&apos;igiene reale, quella che protegge la salute.
              </Reveal>
              <Reveal as="p" className="s-text mt-3" delay={0.2}>
                Ogni giorno il nostro team di 40 professionisti si impegna per fare la differenza: scegliendo i prodotti giusti, seguendo protocolli
                certificati e ascoltando le esigenze specifiche di ogni cliente. Perché la cura si vede nei dettagli.
              </Reveal>
              <Stagger className="mission-stats" gap={0.12} delay={0.2}>
                <StaggerItem variant="zoom">
                  <Counter className="mission-stat-n" value={10} suffix="+" />
                  <span className="mission-stat-l">Anni di esperienza</span>
                </StaggerItem>
                <StaggerItem variant="zoom">
                  <Counter className="mission-stat-n" value={1500} suffix="+" />
                  <span className="mission-stat-l">Clienti soddisfatti</span>
                </StaggerItem>
                <StaggerItem variant="zoom">
                  <Counter className="mission-stat-n" value={40} suffix="+" />
                  <span className="mission-stat-l">Professionisti nel team</span>
                </StaggerItem>
              </Stagger>
            </div>
            <ImageReveal
              className="mission-img"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fit=crop"
              alt="Il team AllUp al lavoro"
              from="right"
            >
              <div className="mission-img-caption">Il team AllUp — Roma, 2024</div>
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
                Dal 2015 a oggi:
                <br />
                una crescita costante
              </SplitText>
              <Reveal as="p" className="s-text mt-3 mb-4" delay={0.1}>
                Siamo partiti con tre persone e una sola certezza: che la pulizia professionale poteva essere fatta molto meglio. Anno dopo anno,
                cliente dopo cliente, abbiamo costruito un&apos;azienda di cui andiamo orgogliosi.
              </Reveal>
              <Timeline />
            </div>
            <div className="storia-sticky">
              <ImageReveal
                className="mission-img"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&fit=crop"
                alt="Sede operativa AllUp"
                sizes="(max-width: 1100px) 100vw, 60vw"
              >
                <div className="mission-img-caption">La sede operativa AllUp</div>
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
            <SplitText className="s-title">Le persone dietro ogni intervento</SplitText>
            <Reveal as="p" className="s-text" delay={0.1}>
              Selezionati con cura, formati continuamente, motivati dall&apos;amore per il lavoro ben fatto.
            </Reveal>
          </div>
          <Stagger className="team-grid" gap={0.1}>
            {team.map((m) => (
              <StaggerItem key={m.name} className="team-card" variant="up">
                <div className="team-avatar">
                  <Image src={`https://images.unsplash.com/${m.img}?w=400&q=80&fit=crop`} alt={m.name} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" />
                  <span className="team-avatar-shine" aria-hidden />
                </div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
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
              Non promettiamo semplicemente eccellenza — la documentiamo. Ogni certificazione è frutto di audit rigorosi e controlli periodici.
            </Reveal>
          </div>
          <div className="cert-list">
            {certs.map((c, i) => (
              <Tilt key={c.title} className="cert-card" reveal="zoom" delay={(i % 3) * 0.08}>
                <div className="cert-card-icon">
                  <Image src={c.img} alt={c.alt} width={100} height={100} />
                </div>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </Tilt>
            ))}
          </div>
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
