import ContactForm from '@/components/forms/ContactForm';
import MapEmbed from '@/components/contact/MapEmbed';
import OpeningHours from '@/components/contact/OpeningHours';
import { Reveal, Stagger, StaggerItem } from '@/components/fx/Reveal';
import Tilt from '@/components/fx/Tilt';
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/icons';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import { pageMetadata } from '@/lib/seo';
import { site, waLink } from '@/lib/site';

export const metadata = pageMetadata('/contatti');

export default function ContattiPage() {
  return (
    <PageTransition>
      <JsonLd route="/contatti" />
      <PageBanner eyebrow="Contatti" title={'Siamo qui per aiutarti.\nScrivici o chiamaci.'} crumb="Contatti" />

      <section className="section">
        <div className="container">
          <div className="ct-layout">
            <div>
              <Reveal className="ct-info-card" variant="left">
                <div className="ct-info-header">
                  <h3>Come raggiungerci</h3>
                  <p>Sede operativa e informazioni di contatto</p>
                </div>
                <Stagger className="ct-info-body" gap={0.08} delay={0.2}>
                  <StaggerItem className="ct-row" variant="left">
                    <div className="ct-row-icon"><PhoneIcon /></div>
                    <div>
                      <div className="ct-row-label">Telefono</div>
                      <div className="ct-row-val"><a href={site.phoneHref}>{site.phone}</a></div>
                    </div>
                  </StaggerItem>
                  <StaggerItem className="ct-row" variant="left">
                    <div className="ct-row-icon"><MailIcon /></div>
                    <div>
                      <div className="ct-row-label">Email generica</div>
                      <div className="ct-row-val"><a href={`mailto:${site.email}`}>{site.email}</a></div>
                    </div>
                  </StaggerItem>
                  <StaggerItem className="ct-row" variant="left">
                    <div className="ct-row-icon"><PinIcon /></div>
                    <div>
                      <div className="ct-row-label">Sede operativa</div>
                      <div className="ct-row-val">{site.address}</div>
                    </div>
                  </StaggerItem>
                  <StaggerItem className="ct-row" variant="left">
                    <div className="ct-row-icon"><ChatIcon /></div>
                    <div>
                      <div className="ct-row-label">WhatsApp</div>
                      <div className="ct-row-val"><a href={waLink()} target="_blank" rel="noopener">Scrivici su WhatsApp →</a></div>
                    </div>
                  </StaggerItem>
                </Stagger>
              </Reveal>

              <Reveal className="ct-info-card" variant="left" delay={0.1}>
                <div className="ct-info-header">
                  <h3>Orari di disponibilità</h3>
                  <p>Per chiamate, email e sopralluoghi</p>
                </div>
                <div className="ct-info-body">
                  <OpeningHours />
                  <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '1rem' }}>Per urgenze fuori orario, scrivici su WhatsApp.</p>
                </div>
              </Reveal>

              <Reveal className="map-area" variant="blur" delay={0.15}>
                <div className="map-label">
                  <PinIcon width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} />
                  {site.address}
                </div>
                <MapEmbed />
              </Reveal>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm bg-off">
        <div className="container">
          <div className="quick-contacts">
            <Tilt className="qc-card" reveal="bounce">
              <span className="qc-icon">📞</span>
              <h4>Chiamaci</h4>
              <p>Per un confronto rapido o un&apos;urgenza, chiamaci direttamente. Risponde sempre una persona reale.</p>
              <a href={site.phoneHref}>{site.phone}</a>
            </Tilt>
            <Tilt className="qc-card" reveal="bounce" delay={0.1}>
              <span className="qc-icon">💬</span>
              <h4>WhatsApp</h4>
              <p>Il canale più veloce. Scrivi il tuo messaggio e ti risponderemo entro 30 minuti negli orari di disponibilità.</p>
              <a href={waLink()} target="_blank" rel="noopener">Apri WhatsApp →</a>
            </Tilt>
            <Tilt className="qc-card" reveal="bounce" delay={0.2}>
              <span className="qc-icon">✉️</span>
              <h4>Email</h4>
              <p>Per richieste dettagliate, allegati o documentazione. Risposta garantita entro 2 ore lavorative.</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </Tilt>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
