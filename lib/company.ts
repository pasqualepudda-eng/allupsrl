// Dati aziendali usati nei testi del sito.
// Fonti: visura camerale, bilancio 2025, Bilancio di Sostenibilità 2025, presentazione aziendale (marzo 2026).

export const company = {
  /** Costituzione (come Nettoyage S.r.l.), atto del 04/03/2011 */
  founded: 2011,
  foundingDate: '2011-03-04',
  /** "Circa 140 persone" (Bilancio di Sostenibilità 2025); 136 nella distribuzione per squadre */
  people: 130,
  /** "Oltre 100 clienti" */
  clients: 100,
  /** Superficie gestita, circa */
  squareMeters: 955000,
  /** Regioni con commesse attive */
  regions: ['Lazio', 'Lombardia', 'Piemonte', 'Valle d’Aosta', 'Toscana', 'Marche', 'Emilia-Romagna'],
  offices: [
    { city: 'Roma', role: 'Direzione generale', address: 'Via Lusitania, 4 · 00183 Roma' },
    { city: 'Ivrea (TO)', role: 'Ufficio e magazzino', address: 'Piemonte' },
  ],
  ceo: 'Diego Voce',
};

export const yearsActive = new Date().getFullYear() - company.founded;

/** Squadre operative (presentazione aziendale, marzo 2026) */
export const squads = [
  { region: 'Roma', people: 61, note: 'Direzione generale. Sedi direzionali, fondi immobiliari, banche, FIGC, ambasciate e immobili storici.' },
  { region: 'Piemonte', people: 52, note: 'Sede di Ivrea. Pulizie civili e industriali per automotive, Dierre, Fonte Lauretana e supermercati Tigros.' },
  { region: 'Lombardia', people: 16, note: 'Milano. Cantieri e consegne con Gilardi, sale cinema e arene estive del circuito Anteo.' },
  { region: 'Toscana', people: 5, note: 'Centro Tecnico Federale FIGC di Coverciano.' },
  { region: 'Marche', people: 2, note: 'Presidio operativo locale.' },
];

/** Referenze (presentazione aziendale e Bilancio di Sostenibilità 2025) */
export const references: { group: string; names: string[] }[] = [
  {
    group: 'Real estate e fondi immobiliari',
    names: [
      'Covivio',
      'Investire SGR',
      'Revalo',
      'Atlantica Properties',
      'Cushman & Wakefield',
      'IPI Management Services',
      'Abaco',
      'Torre SGR',
      'Blue SGR',
      'BNP Paribas Real Estate',
      'Colliers International',
      'Castello SGR',
      'Kryalos SGR',
    ],
  },
  {
    group: 'Banche, assicurazioni ed enti',
    names: [
      'Banca CF+',
      'Gardant',
      'Bancomat S.p.A.',
      'Fondo Metasalute',
      'Prima Assicurazioni',
      'Consiglio Nazionale dei Geometri',
      'Fondo Pensioni BCC',
      'Fondo Mario Negri',
      'Società del Gruppo Snam',
      'Salerno Energia e Ambiente',
      'Speri S.p.A.',
    ],
  },
  {
    group: 'Sport, istituzioni e diplomazia',
    names: [
      'FIGC · sedi di Roma e Coverciano',
      'Ambasciata del Senegal presso la Santa Sede',
      'Ambasciata della Costa d’Avorio presso la Santa Sede',
      'Giubileo 2025 · parrocchie e strutture di accoglienza',
      'Ministero del Lavoro',
      'Expo Milano 2015 · Palazzo Italia',
    ],
  },
  {
    group: 'Industria, retail ed eventi',
    names: [
      'Dierre S.p.A.',
      'Util S.p.A.',
      'Osai S.p.A.',
      'Prasco S.p.A.',
      'Adler Evo S.p.A.',
      'Fonte Lauretana',
      'Acciaierie Cogne',
      'Tigros Supermercati',
      'Costruzioni Generali Gilardi',
      'Circuito cinema Anteo',
    ],
  },
];

/** Nomi per il nastro delle referenze in home */
export const referenceMarquee = [
  'FIGC',
  'BNP Paribas Real Estate',
  'Covivio',
  'Cushman & Wakefield',
  'Gruppo Snam',
  'Bancomat',
  'Investire SGR',
  'Colliers International',
  'Kryalos SGR',
  'Dierre',
  'Tigros',
  'Fonte Lauretana',
  'Anteo',
  'Gilardi · CityLife',
  'Fondo Mario Negri',
  'Castello SGR',
];
