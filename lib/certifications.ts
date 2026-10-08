// Certificazioni e attestazioni di ALL UP S.r.l. — dati presi dai certificati originali in public/certificazioni.
// Quando arriva un rinnovo: sostituire PDF e JPG (stesso nome) e aggiornare numero e date qui sotto.

export type Certification = {
  id: string;
  /** Sigla breve per chip e badge (footer, hero) */
  short: string;
  /** Norma completa */
  title: string;
  /** Ambito in una parola, mostrato sopra il titolo */
  area: string;
  kind: 'Certificazione' | 'Dichiarazione di conformità' | 'Asseverazione';
  text: string;
  number: string;
  issuer: string;
  /** Ente di accreditamento riportato sul certificato, se presente */
  accreditation?: string;
  /** Date in formato ISO (AAAA-MM-GG) */
  firstIssue: string;
  validUntil: string;
  badge: string;
  pdf: string;
  preview: string;
  /** Proporzioni dell'anteprima JPG */
  orientation: 'landscape' | 'portrait';
};

const files = (slug: string) => ({ pdf: `/certificazioni/${slug}.pdf`, preview: `/certificazioni/${slug}.jpg` });

// Campo di applicazione comune ai certificati SMC (IAF 35)
const SCOPE =
  'progettazione ed erogazione di servizi di pulizia, disinfezione, sanificazione, derattizzazione e disinfestazione, manutenzione del verde e facchinaggio';

export const certifications: Certification[] = [
  {
    id: 'iso-9001',
    short: 'ISO 9001',
    title: 'ISO 9001:2015',
    area: 'Qualità',
    kind: 'Certificazione',
    text: `Sistema di gestione per la qualità applicato a tutta la nostra attività: ${SCOPE}. Ogni processo è documentato, verificato e migliorato.`,
    number: 'CQ 7354',
    issuer: 'SMC Slovensko a.s.',
    accreditation: 'SNAS',
    firstIssue: '2023-10-25',
    validUntil: '2026-10-24',
    badge: '/img/iso-9001.svg',
    ...files('iso-9001-cq-7354'),
    orientation: 'landscape',
  },
  {
    id: 'iso-14001',
    short: 'ISO 14001',
    title: 'ISO 14001:2015',
    area: 'Ambiente',
    kind: 'Certificazione',
    text: "Sistema di gestione ambientale: monitoriamo consumi ed emissioni e usiamo prodotti concentrati per ridurre plastica, imballaggi e rifiuti in ogni cantiere.",
    number: 'CA 6220',
    issuer: 'SMC Slovensko a.s.',
    accreditation: 'SNAS',
    firstIssue: '2025-06-13',
    validUntil: '2028-05-16',
    badge: '/img/iso-14001.svg',
    ...files('iso-14001-ca-6220'),
    orientation: 'landscape',
  },
  {
    id: 'iso-45001',
    short: 'ISO 45001',
    title: 'ISO 45001:2018',
    area: 'Salute e sicurezza',
    kind: 'Certificazione',
    text: 'Sistema di gestione per la salute e la sicurezza sul lavoro (anche UNI EN ISO 45001:2023): prevenzione di infortuni e malattie professionali, formazione continua delle squadre.',
    number: 'CO 9065-IT',
    issuer: 'SMC Slovensko a.s.',
    accreditation: 'SNAS',
    firstIssue: '2025-06-13',
    validUntil: '2028-06-12',
    badge: '/img/iso-45001.svg',
    ...files('iso-45001-co-9065-it'),
    orientation: 'landscape',
  },
  {
    id: 'iso-37001',
    short: 'ISO 37001',
    title: 'ISO 37001:2016',
    area: 'Anticorruzione',
    kind: 'Certificazione',
    text: 'Sistema di gestione per la prevenzione della corruzione: integrità, trasparenza e conformità, i requisiti che committenti pubblici e multinazionali chiedono ai propri fornitori.',
    number: 'PC 8934-IT',
    issuer: 'SMC Slovensko a.s.',
    accreditation: 'SNAS',
    firstIssue: '2025-04-14',
    validUntil: '2028-04-13',
    badge: '/img/iso-37001.svg',
    ...files('iso-37001-pc-8934-it'),
    orientation: 'landscape',
  },
  {
    id: 'uni-en-13549',
    short: 'UNI EN 13549',
    title: 'UNI EN 13549:2003',
    area: 'Servizi di pulizia',
    kind: 'Certificazione',
    text: "Lo standard europeo sulla qualità dei servizi di pulizia: certifica come progettiamo ed eroghiamo ogni intervento, non solo come è organizzata l'azienda.",
    number: 'CP 9898-IT',
    issuer: 'SMC Slovensko a.s.',
    firstIssue: '2026-04-17',
    validUntil: '2029-04-16',
    badge: '/img/uni-en-13549.svg',
    ...files('uni-en-13549-cp-9898-it'),
    orientation: 'landscape',
  },
  {
    id: 'uni-pdr-125',
    short: 'UNI/PdR 125',
    title: 'UNI/PdR 125:2022',
    area: 'Parità di genere',
    kind: 'Certificazione',
    text: 'Sistema di gestione per la parità di genere: misure concrete per garantire pari opportunità in un team composto per oltre il 70% da donne.',
    number: 'A06925',
    issuer: 'Certitalia S.r.l.',
    accreditation: 'Accredia',
    firstIssue: '2025-04-14',
    validUntil: '2028-04-13',
    badge: '/img/uni-pdr-125.svg',
    ...files('uni-pdr-125-a06925'),
    orientation: 'portrait',
  },
  {
    id: 'sa-8000',
    short: 'SA 8000',
    title: 'SA 8000:2014',
    area: 'Responsabilità sociale',
    kind: 'Dichiarazione di conformità',
    text: "Conosciamo e applichiamo lo standard internazionale di responsabilità sociale d'impresa: condizioni di lavoro dignitose, diritti dei lavoratori, rapporti etici.",
    number: 'SA 8929-IT',
    issuer: 'SMC Slovensko a.s.',
    firstIssue: '2025-04-14',
    validUntil: '2028-04-13',
    badge: '/img/sa-8000.svg',
    ...files('sa-8000-sa-8929-it'),
    orientation: 'landscape',
  },
  {
    id: 'asseverazione-81-08',
    short: 'D.Lgs. 81/08 art. 30',
    title: 'Asseverazione D.Lgs. 81/08 art. 30',
    area: 'Modello di gestione della sicurezza',
    kind: 'Asseverazione',
    text: "Visto di asseverazione del modello di organizzazione e gestione della salute e sicurezza (SGSL conforme alle Linee Guida UNI-INAIL), per pulizia di stabili civili e industriali e disinfestazione.",
    number: 'RM0001/2024',
    issuer: 'E.LAV. Roma · Comitato paritetico',
    firstIssue: '2024-09-10',
    validUntil: '2028-09-09',
    badge: '/img/asseverazione-81-08.svg',
    ...files('asseverazione-elav-rm0001-2024'),
    orientation: 'landscape',
  },
];

/** Sigle per i chip compatti (hero, footer, nastro) */
export const certShortList = certifications.map((c) => c.short);

/** Abilitazioni iscritte al Registro Imprese (Camera di Commercio di Roma) */
export const licenses = [
  {
    title: 'D.M. 274/1997 · lettere a–e',
    text: 'Impresa abilitata a pulizia, disinfezione, disinfestazione, derattizzazione e sanificazione. Requisiti accertati dalla Camera di Commercio di Roma.',
  },
  {
    title: 'D.M. 221/2003',
    text: 'Impresa abilitata ai servizi di facchinaggio e movimentazione merci.',
  },
];

/** 2026-10-24 → 24/10/2026 (senza passare da Date, per evitare scarti di fuso orario) */
export const formatDate = (iso: string) => iso.split('-').reverse().join('/');
