import QuoteForm from '@/components/forms/QuoteForm';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import Tilt from '@/components/fx/Tilt';
import { ChatIcon, PhoneIcon } from '@/components/icons';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/preventivo');

const benefits = [
  ['Risposta entro 2 ore lavorative', ' — nessuna attesa infinita, nessun centralino automatico.'],
  ['Preventivo trasparente', ' — nessun costo nascosto, nessuna voce ambigua.'],
  ['Sopralluogo gratuito', ' per interventi complessi o di grandi dimensioni.'],
  ['Zero impegno', ' — ricevi il preventivo e decidi tu se e quando procedere.'],
  ['Garanzia soddisfatti', ' — se non sei soddisfatto, rifacciamo il lavoro senza costi.'],
];

const reasons = [
  { icon: '⚡', title: 'Intervento rapido', text: 'Per urgenze, garantiamo sopralluogo o intervento entro 24 ore dalla richiesta, su tutto il territorio di Roma e Provincia.' },
  { icon: '🏅', title: 'Qualità certificata ISO 9001 e UNI EN 13549', text: 'Ogni nostro intervento segue processi documentati e verificati ogni anno da un ente terzo. Non solo promesse, ma procedure reali.' },
  { icon: '🌿', title: 'Prodotti sicuri e green', text: "Utilizziamo solo detergenti biodegradabili ed eco-certificati. Sicuri per bambini, animali domestici e l'ambiente." },
  { icon: '🔒', title: 'Team assicurato e verificato', text: 'Ogni professionista è selezionato, formato e coperto da polizza assicurativa. Lavoriamo con totale discrezione e rispetto.' },
  { icon: '💰', title: 'Nessun costo nascosto', text: 'Il preventivo che ricevi è definitivo. Nessuna voce aggiuntiva, nessuna sorpresa in fattura, mai.' },
  { icon: '🔄', title: 'Garanzia soddisfatti', text: 'Non sei soddisfatto del risultato? Torniamo e rifacciamo il lavoro, senza costi aggiuntivi e senza domande.' },
];

export default function PreventivoPage() {
  return (
    <PageTransition>
      <JsonLd route="/preventivo" />
      <PageBanner eyebrow="Preventivo Gratuito" title={'Scopri il costo del tuo\nintervento in pochi minuti'} crumb="Richiedi un Preventivo" />

      <section className="section">
        <div className="container">
          <div className="prev-layout">
            <div className="prev-info">
              <Reveal className="eyebrow" variant="left">
                Come funziona
              </Reveal>
              <SplitText>
                Preventivo gratuito,
                <br />
                risposta in 2 ore
              </SplitText>
              <Reveal as="p" className="s-text" variant="left" delay={0.1}>
                Compila il form con i dettagli del tuo spazio e delle tue esigenze. Ti risponderemo entro 2 ore lavorative con una proposta su misura,
                chiara e senza impegno.
              </Reveal>
              <Stagger className="prev-ben" gap={0.12} delay={0.2}>
                {benefits.map(([strong, rest]) => (
                  <StaggerItem key={strong} className="prev-ben-item" variant="left">
                    <div className="prev-ben-check">✓</div>
                    <span className="prev-ben-text">
                      <strong>{strong}</strong>
                      {rest}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal className="prev-contact-box" variant="blur" delay={0.2}>
                <h4>Preferisci chiamarci direttamente?</h4>
                <div className="prev-ct-item">
                  <PhoneIcon />
                  <span>+39 0670496958 · Lun–Ven 8–20</span>
                </div>
                <div className="prev-ct-item">
                  <ChatIcon />
                  <span>WhatsApp · Risposta in 30 min</span>
                </div>
              </Reveal>
            </div>

            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="sec-hd">
            <Reveal className="eyebrow">Perché scegliere AllUp</Reveal>
            <SplitText className="s-title">
              La differenza che noti
              <br />
              dal primo intervento
            </SplitText>
          </div>
          <div className="perche-grid">
            {reasons.map((r, i) => (
              <Tilt key={r.title} className="perche-card" reveal="bounce" delay={(i % 3) * 0.08}>
                <span className="perche-card-icon">{r.icon}</span>
                <h4>{r.title}</h4>
                <p>{r.text}</p>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
