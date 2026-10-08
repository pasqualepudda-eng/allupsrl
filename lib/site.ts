export const site = {
  name: 'AllUp S.r.l.',
  domain: 'https://www.allupsrl.it',
  phone: '+39 0670496958',
  phoneHref: 'tel:+390670496958',
  email: 'amministrazione@allupsrl.it',
  address: 'Via Lusitania, 4, 00183 Roma RM',
  // Numero usato dai form (già presente in script.js): unico punto da aggiornare
  whatsapp: '393514181029',
  legalLine:
    '© Copyright 2026 AllUp S.r.l. · Via Lusitania, 4, 00183 Roma RM · Reg. Imprese Roma (C.C.I.A.A.) n° 1296094 · P.IVA 11346621003 · Capitale sociale € 10.000',
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
};

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export type NavChild = { label: string; href: string } | 'sep';
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Chi Siamo',
    href: '/chi-siamo',
    children: [
      { label: 'Mission & Valori', href: '/chi-siamo#mission' },
      { label: 'La Nostra Storia', href: '/chi-siamo#storia' },
      { label: 'Il Team', href: '/chi-siamo#team' },
      'sep',
      { label: 'Certificazioni', href: '/chi-siamo#certificazioni' },
    ],
  },
  {
    label: 'Servizi',
    href: '/servizi',
    children: [
      { label: 'Sanificazione a Ozono', href: '/servizi#sanificazione' },
      { label: 'Pulizie Civili ed Industriali', href: '/servizi#pulizie' },
      { label: 'Disinfestazione e Derattizzazione', href: '/servizi#disinfestazione' },
      'sep',
      { label: 'Facchinaggio', href: '/servizi#facchinaggio' },
      { label: 'Portierato e Reception', href: '/servizi#portierato' },
      { label: 'Servizi di Lavanolo', href: '/servizi#lavanolo' },
      { label: 'Manutenzione del Verde', href: '/servizi#verde' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Preventivo', href: '/preventivo' },
  { label: 'Lavora con Noi', href: '/lavora-con-noi' },
];
