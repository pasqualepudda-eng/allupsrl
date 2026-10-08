import Link from 'next/link';
import CtaSection from '@/components/CtaSection';
import ImageReveal from '@/components/fx/ImageReveal';
import Magnetic from '@/components/fx/Magnetic';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import ScrollFillNumber from '@/components/fx/ScrollFillNumber';
import SplitText from '@/components/fx/SplitText';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import ServicesNav from '@/components/services/ServicesNav';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata('/servizi');

const pillLabel: Record<string, string> = {
  sanificazione: 'Sanificazione a Ozono',
  pulizie: 'Pulizie Civili ed Industriali',
  disinfestazione: 'Disinfestazione e Derattizzazione',
  facchinaggio: 'Facchinaggio',
  portierato: 'Portierato e Reception',
  lavanolo: 'Servizi di Lavanolo',
  verde: 'Manutenzione del Verde',
};

export default function ServiziPage() {
  return (
    <PageTransition>
      <JsonLd route="/servizi" />
      <PageBanner eyebrow="I Nostri Servizi" title={'Professionalità certificata\nper ogni esigenza'} crumb="Servizi" />

      {/* ══ PANORAMICA ══ */}
      <section className="section-sm bg-off">
        <div className="container">
          <div className="sec-hd" style={{ marginBottom: '2.2rem' }}>
            <Reveal className="eyebrow">Cosa facciamo</Reveal>
            <SplitText className="s-title">
              Sette servizi, un unico standard:
              <br />
              la qualità AllUp
            </SplitText>
            <Reveal as="p" className="s-text" delay={0.1}>
              Ogni servizio è erogato da personale qualificato, con protocolli certificati ISO 9001 e HACCP, prodotti omologati e attrezzature
              professionali. Dalla residenza privata alla grande struttura industriale.
            </Reveal>
          </div>
          <Stagger className="srv-pills" gap={0.06} delay={0.15}>
            {services.map((s) => (
              <StaggerItem key={s.id} variant="bounce">
                <a href={`#${s.id}`} className="srv-pill">
                  <span className="srv-pill-dot" />
                  <span className="srv-pill-num">{s.num}</span>
                  <span className="srv-pill-label">{pillLabel[s.id]}</span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ServicesNav />

      {services.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <div key={s.id}>
            {i > 0 && <div className="srv-sep" />}
            <section className={`section ${reverse ? 'bg-off' : ''}`} id={s.id}>
              <div className="container">
                <div className={`srv-detail ${reverse ? 'reverse' : ''}`}>
                  <ImageReveal
                    className="srv-detail-visual"
                    src={s.detail.image}
                    alt={s.detail.alt}
                    from={reverse ? 'right' : 'left'}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  >
                    <Reveal className="srv-detail-badge" variant="up" delay={0.8}>
                      {s.detail.badge}
                    </Reveal>
                  </ImageReveal>
                  <div className="srv-detail-content">
                    <div className="srv-num-label">
                      <ScrollFillNumber value={s.num} className="srv-num-big" />
                      <Reveal as="span" className="srv-tag" variant="zoom" delay={0.1}>
                        {s.detail.tag}
                      </Reveal>
                    </div>
                    <SplitText as="h2">{s.title}</SplitText>
                    <Reveal as="p" className="lead" variant="blur" delay={0.1}>
                      {s.detail.lead}
                    </Reveal>
                    <Stagger className="srv-bullets" gap={0.05} delay={0.15}>
                      {s.detail.bullets.map((b) => (
                        <StaggerItem key={b} className="srv-bullet" variant={reverse ? 'right' : 'left'}>
                          {b}
                        </StaggerItem>
                      ))}
                    </Stagger>
                    <Reveal delay={0.2}>
                      <Magnetic>
                        <Link href="/preventivo" className="btn btn-primary">
                          Richiedi Preventivo →
                        </Link>
                      </Magnetic>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <CtaSection
        eyebrow="Parliamo del tuo progetto"
        title={
          <>
            Non hai trovato quello
            <br />
            che cerchi?
          </>
        }
        titleWidth={600}
        text="Ogni spazio ha esigenze uniche. Contattaci: ascoltiamo le tue necessità e costruiamo insieme la soluzione perfetta. Il preventivo è sempre gratuito."
        primary={{ href: '/preventivo', label: 'Richiedi Preventivo Gratuito' }}
        secondary={{ href: '/contatti', label: 'Parlaci delle tue esigenze' }}
      />
    </PageTransition>
  );
}
