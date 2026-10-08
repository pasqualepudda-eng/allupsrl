import { Reveal } from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';
import Tilt from '@/components/fx/Tilt';
import VelocityMarquee from '@/components/fx/VelocityMarquee';
import JobBoard from '@/components/jobs/JobBoard';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/lavora-con-noi');

const benefits = [
  { icon: '💼', title: 'Contratto Regolare', text: 'CCNL di settore' },
  { icon: '📚', title: 'Formazione Continua', text: 'Certificazioni incluse' },
  { icon: '📅', title: 'Orari Flessibili', text: 'Turni personalizzabili' },
  { icon: '🛡️', title: 'Copertura Assicurativa', text: 'Infortuni & RC' },
  { icon: '🚀', title: 'Crescita Interna', text: 'Percorsi meritocratici' },
];

const culture = [
  { icon: '🤝', title: 'Rispetto reciproco', text: 'Ogni persona nel team è trattata con rispetto e dignità. Un ambiente inclusivo dove le differenze sono un valore.' },
  { icon: '📈', title: 'Crescita continua', text: 'Investiamo nella formazione di ogni collaboratore. Percorsi di avanzamento chiari e meritocratici.' },
  { icon: '💡', title: 'Innovazione condivisa', text: 'Le migliori idee vengono spesso dal team operativo. Ascoltiamo tutti e implementiamo i suggerimenti utili.' },
];

export default function LavoraConNoiPage() {
  return (
    <PageTransition>
      <JsonLd route="/lavora-con-noi" />
      <PageBanner eyebrow="Lavora con Noi" title={'Entra nel team che sta\nridefinendo il settore'} crumb="Lavora con Noi" />

      {/* Vantaggi in scorrimento continuo */}
      <div className="bstrip">
        <VelocityMarquee baseVelocity={-1.4}>
          {benefits.map((b) => (
            <div key={b.title} className="bstrip-item">
              <span className="bstrip-icon">{b.icon}</span>
              <span className="bstrip-label">
                <strong>{b.title}</strong>
                {b.text}
              </span>
              <span className="bstrip-sep" />
            </div>
          ))}
        </VelocityMarquee>
      </div>

      <JobBoard>
        <section className="section bg-off">
          <div className="container">
            <div className="sec-hd">
              <Reveal className="eyebrow">La nostra cultura</Reveal>
              <SplitText className="s-title">
                Non solo un posto di lavoro.
                <br />
                Una squadra in cui crescere.
              </SplitText>
              <Reveal as="p" className="s-text" delay={0.1}>
                In AllUp crediamo che i risultati eccellenti nascano da persone che si sentono valorizzate, formate e motivate.
              </Reveal>
            </div>
            <div className="culture-grid">
              {culture.map((c, i) => (
                <Tilt key={c.title} className="culture-card" reveal="bounce" delay={i * 0.1}>
                  <span className="culture-icon">{c.icon}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </Tilt>
              ))}
            </div>
          </div>
        </section>
      </JobBoard>
    </PageTransition>
  );
}
