import Link from 'next/link';
import type { ReactNode } from 'react';
import Counter from '@/components/fx/Counter';
import { Stagger, StaggerItem } from '@/components/fx/Reveal';
import Tilt from '@/components/fx/Tilt';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import { posts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata('/sitemap');

type SmLink = { href: string; text: string; desc?: string; badge?: string; anchor?: boolean };
type Group = { title: string; sub: string; icon: ReactNode; links: SmLink[] };

const groups: Group[] = [
  {
    title: 'Home',
    sub: 'Pagina principale',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    links: [
      { href: '/', text: 'Home Page', desc: 'Presentazione, servizi, recensioni e CTA', badge: 'principale' },
      { href: '/#intro', text: 'Chi siamo (intro)', anchor: true },
      { href: '/#servizi', text: 'Servizi in evidenza', anchor: true },
      { href: '/#recensioni', text: 'Recensioni clienti', anchor: true },
      { href: '/#certificazioni', text: 'Certificazioni', anchor: true },
    ],
  },
  {
    title: 'Chi Siamo',
    sub: 'Azienda e team',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    links: [
      { href: '/chi-siamo', text: 'Chi Siamo', desc: 'Storia, valori, squadre, certificazioni e referenze' },
      { href: '/chi-siamo#mission', text: 'Mission & Valori', anchor: true },
      { href: '/chi-siamo#storia', text: 'La Nostra Storia', anchor: true },
      { href: '/chi-siamo#team', text: 'Il Team', anchor: true },
      { href: '/chi-siamo#certificazioni', text: 'Certificazioni', anchor: true },
      { href: '/chi-siamo#referenze', text: 'Referenze', anchor: true },
    ],
  },
  {
    title: 'Servizi',
    sub: 'Tutte le tipologie',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    links: [
      { href: '/servizi', text: 'Tutti i Servizi', desc: "Panoramica completa dell'offerta" },
      ...services.map((s) => ({ href: `/servizi#${s.id}`, text: s.title, anchor: true })),
    ],
  },
  {
    title: 'Blog',
    sub: 'Guide e approfondimenti',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    links: [
      { href: '/blog', text: 'AllUp Journal', desc: 'Tutti gli articoli', badge: 'nuovo' },
      ...posts.map((p) => ({ href: `/blog/${p.slug}`, text: p.title, anchor: true })),
    ],
  },
  {
    title: 'Preventivo',
    sub: 'Richiesta gratuita',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    links: [{ href: '/preventivo', text: 'Richiedi Preventivo', desc: 'Form gratuito, risposta in 2 ore', badge: 'gratuito' }],
  },
  {
    title: 'Contatti & Carriera',
    sub: 'Scrivici o unisciti a noi',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    links: [
      { href: '/contatti', text: 'Contatti', desc: 'Form, telefono, email, mappa' },
      { href: '/lavora-con-noi', text: 'Lavora con Noi', desc: 'Posizioni aperte e candidatura', badge: 'hiring' },
    ],
  },
  {
    title: 'Area Legale',
    sub: 'Documenti e policy',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    links: [
      { href: '/privacy-policy', text: 'Privacy Policy', desc: 'Trattamento dati GDPR' },
      { href: '/termini-condizioni', text: 'Termini e Condizioni', desc: 'Condizioni generali di contratto' },
      { href: '/sitemap', text: 'Sitemap', desc: 'Questa pagina' },
    ],
  },
];

const stats = [
  { n: 10 + posts.length, l: 'Pagine totali' },
  { n: 6, l: 'Sezioni principali' },
  { n: services.length, l: 'Servizi descritti' },
  { n: 3, l: 'Pagine legali' },
];

export default function SitemapPage() {
  return (
    <PageTransition>
      <JsonLd route="/sitemap" />
      <PageBanner eyebrow="Navigazione" title="Mappa del Sito" crumb="Sitemap" />
      <section className="section">
        <div className="container">
          <Stagger className="sm-stats" gap={0.08}>
            {stats.map((s) => (
              <StaggerItem key={s.l} className="sm-stat-card" variant="zoom">
                <Counter className="sm-stat-n" value={s.n} duration={1.2} />
                <span className="sm-stat-l">{s.l}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="sitemap-grid">
            {groups.map((g, i) => (
              <Tilt key={g.title} className="sm-group" reveal="bounce" delay={(i % 3) * 0.08} max={5}>
                <div className="sm-group-header">
                  <div className="sm-group-icon">{g.icon}</div>
                  <div>
                    <div className="sm-group-title">{g.title}</div>
                    <div className="sm-group-sub">{g.sub}</div>
                  </div>
                </div>
                <div className="sm-links">
                  {g.links.map((l) => (
                    <Link key={l.href} href={l.href} className={`sm-link ${l.anchor ? 'sm-link-anchor' : ''}`}>
                      <span className="sm-link-dot" />
                      {l.desc ? (
                        <span>
                          <span className="sm-link-text">{l.text}</span>
                          <span className="sm-link-desc">{l.desc}</span>
                        </span>
                      ) : (
                        <span className="sm-link-text">{l.text}</span>
                      )}
                      {l.badge && <span className="sm-link-badge">{l.badge}</span>}
                    </Link>
                  ))}
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
