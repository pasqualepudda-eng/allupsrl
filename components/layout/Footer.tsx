import Link from 'next/link';
import { Stagger, StaggerItem } from '@/components/fx/Reveal';
import { MailIcon, PhoneIcon, PinIcon } from '@/components/icons';
import CookieSettingsButton from '@/components/consent/CookieSettingsButton';
import { certShortList } from '@/lib/certifications';
import { nav, site, waLink } from '@/lib/site';
import { BackToTop, FooterMark } from './FooterFx';

const serviceLinks = nav.find((n) => n.href === '/servizi')!.children!.filter((c) => c !== 'sep');

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Stagger className="footer-grid" gap={0.1}>
          <StaggerItem className="footer-brand">
            <span className="f-logo">
              All<em>Up</em>
            </span>
            <p className="f-desc">
              Facility Management integrato per aziende, enti e condomini. Certificati, affidabili e attenti alla sostenibilità. Dal 2011,
              con sede a Roma e squadre operative in tutta Italia.
            </p>
            <div className="f-cert">
              {certShortList.map((c) => (
                <span key={c} className="f-badge">
                  {c}
                </span>
              ))}
            </div>
            <div className="f-socials">
              <a href={site.social.facebook} className="f-soc" aria-label="Facebook">fb</a>
              <a href={site.social.instagram} className="f-soc" aria-label="Instagram">ig</a>
              <a href={site.social.linkedin} className="f-soc" aria-label="LinkedIn">in</a>
              <a href={waLink()} className="f-soc" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="f-col-title">Azienda</div>
            <div className="f-links">
              <Link href="/chi-siamo">Chi Siamo</Link>
              <Link href="/chi-siamo#mission">Mission &amp; Valori</Link>
              <Link href="/chi-siamo#team">Il Team</Link>
              <Link href="/chi-siamo#certificazioni">Certificazioni</Link>
              <Link href="/chi-siamo#referenze">Referenze</Link>
              <Link href="/lavora-con-noi">Lavora con Noi</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="f-col-title">Servizi</div>
            <div className="f-links">
              {serviceLinks.map((s) => (
                <Link key={s.href} href={s.href}>
                  {s.label}
                </Link>
              ))}
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="f-col-title">Contatti</div>
            <div className="f-contact-row">
              <PhoneIcon />
              <span>
                <a href={site.phoneHref}>{site.phone}</a>
                <br />
                Lun–Ven · 8:00–20:00
              </span>
            </div>
            <div className="f-contact-row">
              <MailIcon />
              <span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                PEC: <a href={`mailto:${site.pec}`}>{site.pec}</a>
              </span>
            </div>
            <div className="f-contact-row">
              <PinIcon />
              <span>{site.address}</span>
            </div>
            <BackToTop />
          </StaggerItem>
        </Stagger>
      </div>
      <FooterMark />
      <div className="container footer-bottom">
        <span className="footer-bottom-copy">{site.legalLine}</span>
        <div className="footer-bottom-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/termini-condizioni">Termini e Condizioni</Link>
          <Link href="/sitemap">Sitemap</Link>
          <CookieSettingsButton className="footer-cookie-btn" />
        </div>
      </div>
    </footer>
  );
}
