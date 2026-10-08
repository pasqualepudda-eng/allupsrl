export type Article = {
  slug: string;
  heroClass: string;
  category: string;
  title: string;
  lead: string;
  date: string;
  readTime: string;
  author: string;
  toc: { id: string; label: string }[];
  sidebarCta: { iconSvg: string; title: string; text: string; href: string; label: string };
  ctaBanner: { title: string; text: string; href: string; label: string };
  related: string[];
  bodyHtml: string;
};

export type CategoryId = 'virus' | 'sanificazione' | 'consigli' | 'facility';

export const categories: { id: 'tutti' | CategoryId; label: string; color: string }[] = [
  { id: 'tutti', label: 'Tutti gli articoli', color: 'var(--dark)' },
  { id: 'virus', label: 'Virus & Prevenzione', color: '#c0392b' },
  { id: 'sanificazione', label: 'Sanificazione', color: '#1a6aa0' },
  { id: 'consigli', label: 'Tips & Consigli', color: '#1e8449' },
  { id: 'facility', label: 'Facility Management', color: 'var(--orange)' },
];

export const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;

export type Post = {
  slug: string;
  cat: CategoryId;
  /** Titolo della card */
  title: string;
  /** Titolo completo mostrato nei suggerimenti di ricerca */
  fullTitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  imgClass: string;
  gradient: string;
  icon: string;
  keywords: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: 'virus-uffici',
    cat: 'virus',
    featured: true,
    title: 'Come i virus influenzali sopravvivono negli uffici (e come eliminarli)',
    fullTitle: 'Come i virus influenzali sopravvivono negli uffici (e come eliminarli)',
    excerpt:
      'Ogni anno i virus influenzali causano milioni di ore di lavoro perdute. Sulle tastiere, le maniglie e i telefoni i patogeni sopravvivono fino a 72 ore. Scopri i protocolli certificati AllUp per proteggere i tuoi spazi.',
    date: '15 Maggio 2026',
    readTime: '8 min',
    imgClass: 'art-img-virus',
    gradient: 'linear-gradient(135deg,#c0392b 0%,#922b21 55%,#1a252f 100%)',
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    keywords: 'virus influenza ufficio superficie tastiera maniglia sanificazione',
  },
  {
    slug: 'ozono-sanificazione',
    cat: 'sanificazione',
    title: 'Sanificazione a Ozono: come funziona e perché è superiore',
    fullTitle: 'Sanificazione a Ozono: come funziona e perché è superiore ai metodi tradizionali',
    excerpt:
      "L'ozono elimina il 99,99% di virus e batteri senza lasciare residui chimici. Scopri la scienza dietro il metodo più efficace per ambienti sicuri.",
    date: '10 Mag 2026',
    readTime: '10 min',
    imgClass: 'art-img-sanificazione',
    gradient: 'linear-gradient(135deg,#1a6aa0 0%,#1abc9c 60%,#0d3349 100%)',
    icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    keywords: 'ozono sanificazione virus batteri metodo efficace disinfestazione',
  },
  {
    slug: 'errori-pulizia-ufficio',
    cat: 'consigli',
    title: '5 errori di pulizia che trasformano il tuo ufficio in un incubatore di batteri',
    fullTitle: '5 errori di pulizia che trasformano il tuo ufficio in un incubatore di batteri',
    excerpt:
      'Stesso panno su superfici diverse, tastiere ignorate, tempi di contatto sbagliati: scopri gli errori più comuni e come correggerli subito.',
    date: '5 Mag 2026',
    readTime: '6 min',
    imgClass: 'art-img-consigli',
    gradient: 'linear-gradient(135deg,#27ae60 0%,#2ecc71 50%,#1a5276 100%)',
    icon: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    keywords: 'errori pulizia ufficio batteri panno aspirare tastiera detergente',
  },
  {
    slug: 'facility-management-futuro',
    cat: 'facility',
    title: "Facility Management 4.0: perché le aziende leader scelgono l'outsourcing",
    fullTitle: "Facility Management 4.0: perché le aziende leader scelgono l'outsourcing",
    excerpt:
      'Riduzione dei costi fino al 23%, compliance normativa garantita, produttività aumentata: i numeri del FM integrato parlano chiaro.',
    date: '28 Apr 2026',
    readTime: '12 min',
    imgClass: 'art-img-facility',
    gradient: 'linear-gradient(135deg,#E05E28 0%,#f39c12 55%,#1a252f 100%)',
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    keywords: 'facility management outsourcing costi azienda risparmio contratto',
  },
  {
    slug: 'norovirus-prevenzione',
    cat: 'virus',
    title: 'Norovirus negli ambienti condivisi: il nemico silenzioso e come sconfiggerlo',
    fullTitle: 'Norovirus negli ambienti condivisi: il nemico silenzioso e come sconfiggerlo',
    excerpt:
      "Resiste sulle superfici per settimane e non teme l'alcool comune. Scopri i protocolli specifici per eliminarlo dagli ambienti di lavoro.",
    date: '20 Apr 2026',
    readTime: '9 min',
    imgClass: 'art-img-norovirus',
    gradient: 'linear-gradient(135deg,#8e44ad 0%,#c0392b 55%,#1a252f 100%)',
    icon: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    keywords: 'norovirus ambienti condivisi prevenzione disinfezione protocollo batteri',
  },
  {
    slug: 'costi-facility',
    cat: 'facility',
    title: 'Come ridurre i costi di gestione immobiliare fino al 30%',
    fullTitle: 'Come ridurre i costi di gestione immobiliare fino al 30% con il FM integrato',
    excerpt:
      'Un unico fornitore, un unico contratto, un unico referente. Il modello integrato abbatte i costi e azzera i rischi di buchi normativi.',
    date: '12 Apr 2026',
    readTime: '7 min',
    imgClass: 'art-img-facility-rev',
    gradient: 'linear-gradient(135deg,#1a252f 0%,#E05E28 55%,#f39c12 100%)',
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    keywords: 'costi gestione immobiliare risparmio facility management integrato fornitore',
  },
  {
    slug: 'outsourcing-pulizie',
    cat: 'facility',
    title: 'Pulizie in outsourcing: pro, contro e statistiche per decidere',
    fullTitle: "Pulizie in outsourcing: perché affidarsi a un'azienda esterna conviene davvero",
    excerpt:
      'Il 65% delle PMI italiane gestisce le pulizie internamente pagando il 28% in più. Analisi completa con dati ANIP, OMS e Frost & Sullivan.',
    date: '20 Mag 2026',
    readTime: '9 min',
    imgClass: 'art-img-outsourcing',
    gradient: 'linear-gradient(135deg,#0f4c75 0%,#1b6ca8 45%,#16a085 100%)',
    icon: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    keywords: 'outsourcing pulizie aziendali esternalizzare vantaggi svantaggi pro contro statistiche PMI',
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
