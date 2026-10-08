export type Service = {
  id: string;
  num: string;
  title: string;
  /** Testo breve della lista in home */
  short: string;
  /** Contenuti del dettaglio rapido (modale in home) */
  modal: { tag: string; lead: string; bullets: string[] };
  /** Contenuti della sezione nella pagina Servizi */
  detail: { tag: string; lead: string; bullets: string[]; image: string; alt: string; badge: string };
};

const img = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80&fit=crop`;

// Ordine della pagina Servizi
export const services: Service[] = [
  {
    id: 'sanificazione',
    num: '01',
    title: 'Sanificazione Ambientale a Ozono',
    short:
      'Eliminiamo batteri, virus, muffe e cattivi odori con ozono certificato al 99,9% di efficacia, senza residui chimici.',
    modal: {
      tag: 'Specializzato',
      lead: 'Eliminiamo batteri, virus, muffe e cattivi odori con ozono certificato al 99,9% di efficacia, senza residui chimici. Il metodo più avanzato per ambienti sanitari, alberghieri, residenziali e produttivi.',
      bullets: [
        'Efficace al 99,9% contro batteri e virus',
        'Eliminazione definitiva di muffe e odori',
        'Zero residui chimici o sostanze tossiche',
        'Trattamento certificato e documentato',
        'Ideale per ambienti sanitari e alberghieri',
        'Disponibile per uso residenziale e uffici',
        'Intervento rapido: 2–4 ore per ambiente',
        'Reportistica completa del trattamento',
      ],
    },
    detail: {
      tag: 'Igiene avanzata',
      lead: "L'ozono è l'agente sanificante più potente disponibile sul mercato: elimina batteri, virus, muffe, acari e odori persistenti al 99,9%, senza lasciare residui chimici e senza danneggiare superfici o tessuti. I nostri generatori professionali certificati raggiungono ogni angolo, ogni intercapedine, ogni fessura — dove i prodotti chimici tradizionali non arrivano.",
      bullets: [
        'Eliminazione batteri e virus al 99,9%',
        'Trattamento muffe e spore fungine',
        'Rimozione acari da materassi e tessuti',
        'Eliminazione odori persistenti',
        'Nessun residuo chimico',
        'Ambiente rioccupabile in poche ore',
        'Generatori certificati biocida UE',
        'Ideale post-covid, post-sinistro, food',
      ],
      image: img('photo-1584820927498-cfe5211fd8bf'),
      alt: 'Sanificazione ambientale a ozono',
      badge: '✓ Certificato biocida UE · Efficacia 99,9%',
    },
  },
  {
    id: 'pulizie',
    num: '02',
    title: 'Pulizie Civili ed Industriali',
    short:
      'Pulizie professionali per uffici, condomini, ospedali, scuole e stabilimenti. Protocolli HACCP e piani personalizzati.',
    modal: {
      tag: 'Servizio Base',
      lead: 'Pulizie professionali per ogni tipo di ambiente: condomini, uffici, ospedali, scuole, centri commerciali e stabilimenti produttivi. Protocolli HACCP rigorosi, personale formato e piani di pulizia su misura per ogni cliente.',
      bullets: [
        'Pulizie ordinarie e straordinarie',
        'Protocolli HACCP certificati',
        'Cere, cristallizzazioni e trattamenti pavimenti',
        'Pulizie post-cantiere e post-evento',
        'Sanificazione di uffici e ambienti di lavoro',
        'Pulizia condomini e spazi comuni',
        'Piani di pulizia personalizzati',
        'Reportistica e controllo qualità',
      ],
    },
    detail: {
      tag: 'Core business',
      lead: "Dalla pulizia quotidiana di un appartamento alla bonifica di un capannone industriale: gestiamo ogni tipologia di intervento con la stessa cura e lo stesso rigore professionale. Protocolli HACCP certificati, prodotti biodegradabili ad alta efficacia e attrezzature professionali per ogni superficie. Ordine e igiene garantiti, sempre.",
      bullets: [
        'Pulizia appartamenti, ville e condomini',
        'Uffici, showroom e centri commerciali',
        'Hotel e strutture ricettive (5 stelle)',
        'Strutture sanitarie (protocollo HACCP)',
        'Magazzini e stabilimenti industriali',
        'Pulizia post-cantiere e post-trasloco',
        'Scuole, palestre e centri sportivi',
        'Contratti continuativi o interventi spot',
      ],
      image: img('photo-1581578731548-c64695cc6952'),
      alt: 'Pulizie civili ed industriali',
      badge: '✓ Protocolli HACCP certificati',
    },
  },
  {
    id: 'disinfestazione',
    num: '03',
    title: 'Disinfestazione e Derattizzazione',
    short:
      'Interventi mirati contro insetti infestanti e roditori con prodotti a basso impatto ambientale e operatori abilitati.',
    modal: {
      tag: 'Specializzato',
      lead: 'Interventi professionali contro insetti infestanti e roditori con prodotti a basso impatto ambientale, operatori abilitati e piani di monitoraggio continuativi per ambienti civili e industriali.',
      bullets: [
        'Trattamenti antiblatta e antizanzare',
        'Derattizzazione con esche certificate',
        'Disinfestazione da cimici dei letti',
        'Trattamenti preventivi programmati',
        'Prodotti a basso impatto ambientale',
        'Operatori con patentino fitosanitario',
        'Monitoraggio continuativo e report',
        'Interventi in ambienti civili e industriali',
      ],
    },
    detail: {
      tag: 'Pest control',
      lead: "Blatte, topi, ratti, zanzare, formiche, mosche, tarme: ogni infestazione è un problema che va risolto alla radice, non solo in superficie. I nostri operatori qualificati applicano la tecnica IPM (Integrated Pest Management) per eliminare l'infestazione e prevenirne il ritorno, con prodotti biocidi certificati e sicuri per persone e animali domestici.",
      bullets: [
        'Disinfestazione insetti striscianti (blatte)',
        'Disinfestazione insetti volanti (mosche, zanzare)',
        'Derattizzazione e controllo roditori',
        'Trattamento tarme e parassiti tessili',
        'Tecnica IPM certificata',
        'Piano di monitoraggio e prevenzione',
        'Documentazione per food & beverage',
        'Interventi di emergenza entro 24h',
      ],
      image: img('photo-1558618666-fcd25c85cd64'),
      alt: 'Disinfestazione e derattizzazione professionale',
      badge: '✓ Tecnica IPM · Prodotti biocidi certificati',
    },
  },
  {
    id: 'facchinaggio',
    num: '04',
    title: 'Facchinaggio',
    short:
      'Traslochi, spostamenti interni, archiviazione e gestione logistica di materiali e arredi con cura e precisione.',
    modal: {
      tag: 'Logistica',
      lead: 'Traslochi, spostamenti interni, archiviazione e gestione logistica di materiali e arredi. Il nostro team specializzato gestisce ogni movimentazione con cura, precisione e rispetto degli spazi.',
      bullets: [
        'Traslochi aziendali e residenziali',
        'Spostamenti e riorganizzazione uffici',
        'Gestione e archiviazione documenti',
        'Imballaggio con materiali dedicati',
        'Smontaggio e rimontaggio arredi',
        'Stoccaggio temporaneo su richiesta',
        'Movimentazione attrezzature delicate',
        'Disponibile per eventi e allestimenti',
      ],
    },
    detail: {
      tag: 'Logistica',
      lead: 'Muoviamo tutto — con cura, precisione e totale rispetto per ciò che trasportiamo. Traslochi residenziali e aziendali, movimentazione di arredi e attrezzature, allestimento di eventi e spazi, smontaggio e rimontaggio mobili. Il nostro team è formato, attrezzato e assicurato per gestire carichi di ogni dimensione in piena sicurezza.',
      bullets: [
        'Traslochi residenziali e aziendali',
        'Movimentazione e riposizionamento arredi',
        'Allestimento sale riunioni ed eventi',
        'Smontaggio e rimontaggio mobili',
        'Imballaggio e protezione oggetti fragili',
        'Smaltimento materiali e arredi dismessi',
        'Gestione archivi e magazzini',
        'Pianificazione e coordinamento trasloco',
      ],
      image: img('photo-1600880292203-757bb62b4baf'),
      alt: 'Servizi di facchinaggio professionale',
      badge: '✓ Team assicurato · Attrezzatura professionale',
    },
  },
  {
    id: 'portierato',
    num: '05',
    title: 'Portierato e Reception',
    short:
      'Personale qualificato per gestione accessi, reception e presidio degli ambienti ogni giorno con professionalità.',
    modal: {
      tag: 'Presidio',
      lead: 'Personale qualificato per la gestione degli accessi, la reception e il presidio degli ambienti. Presenti ogni giorno con discrezione, professionalità e piena affidabilità.',
      bullets: [
        'Controllo accessi e gestione visitatori',
        'Reception e centralino professionale',
        'Presidio h24 su richiesta',
        'Sorveglianza e ronde interne',
        'Gestione corrispondenza e pacchi',
        'Piccoli servizi di supporto interno',
        'Personale formato e presentabile',
        'Copertura per assenze e sostituzioni',
      ],
    },
    detail: {
      tag: 'Accoglienza',
      lead: "Il personale di portierato e reception è il volto della tua struttura: la prima impressione che ogni visitatore, cliente o collaboratore riceve. I nostri addetti sono selezionati, formati e in divisa — professionisti che sanno gestire gli accessi con efficienza, accogliere con cortesia e rappresentare al meglio la tua immagine aziendale.",
      bullets: [
        'Gestione accessi e controllo visitatori',
        'Accoglienza e smistamento ospiti',
        'Controllo badge e registri presenze',
        'Gestione corrispondenza e pacchi',
        'Sorveglianza aree comuni',
        'Supporto centralino e prenotazioni',
        'Turni continuativi e flessibili',
        'Personale assicurato e in divisa',
      ],
      image: img('photo-1560179707-f14e90ef3623'),
      alt: 'Portierato e reception professionale',
      badge: '✓ Personale selezionato e in divisa',
    },
  },
  {
    id: 'lavanolo',
    num: '06',
    title: 'Servizi di Lavanolo',
    short:
      'Fornitura, lavaggio e gestione di biancheria, divise e tessili per strutture sanitarie, alberghiere e aziendali.',
    modal: {
      tag: 'Fornitura',
      lead: 'Fornitura, lavaggio e gestione completa di biancheria, divise e tessili per strutture sanitarie, alberghiere e aziendali. Cicli certificati, tracciabilità garantita e ritiro a domicilio.',
      bullets: [
        'Lavaggio biancheria piana e capi sartoriali',
        'Noleggio e fornitura divise aziendali',
        'Cicli di sterilizzazione certificati',
        'Raccolta e consegna programmata',
        'Tracciabilità RFID dei capi',
        'Servizio per hotel e strutture ricettive',
        'Fornitura per ambienti sanitari',
        'Gestione guardaroba e deposito',
      ],
    },
    detail: {
      tag: 'Tessile professionale',
      lead: 'Biancheria sempre impeccabile, divise sempre in ordine, ciclo sempre gestito da noi. Offriamo la fornitura, il lavaggio industriale e la gestione completa della biancheria professionale per hotel, ristoranti, strutture sanitarie, centri benessere e aziende. Dal ritiro alla riconsegna: pensiamo a tutto, nei tempi che ti servono.',
      bullets: [
        'Biancheria per hotel e strutture ricettive',
        'Lavaggio divise e indumenti da lavoro',
        'Biancheria per strutture sanitarie',
        'Tovagliato per ristoranti e catering',
        'Ritiro e riconsegna programmati',
        'Lavaggio industriale certificato',
        'Stiratura e confezionamento inclusi',
        'Conformità normative igienico-sanitarie',
      ],
      image: img('photo-1545173168-9f1947eebb7f'),
      alt: 'Servizi di lavanolo professionale',
      badge: '✓ Ciclo completo · Conformità igienico-sanitaria',
    },
  },
  {
    id: 'verde',
    num: '07',
    title: 'Manutenzione del Verde',
    short:
      "Cura di giardini, parchi condominiali e aree verdi aziendali. Interventi programmati per tutto l'anno.",
    modal: {
      tag: 'Esterno',
      lead: "Cura e manutenzione di giardini, parchi condominiali, aree verdi aziendali e spazi esterni. Interventi programmati per tutto l'anno con team di giardinieri specializzati.",
      bullets: [
        'Taglio e cura del prato',
        'Potatura di piante e siepi',
        'Impianti di irrigazione automatici',
        'Pulizia e cura di aree esterne',
        'Piantumazione stagionale',
        'Trattamenti fitosanitari',
        'Progettazione spazi verdi',
        'Manutenzione aree condominiali',
      ],
    },
    detail: {
      tag: 'Verde professionale',
      lead: "Il verde è parte integrante dell'immagine di una struttura e della qualità di vita di chi la abita. Curiamo giardini, aree verdi interne ed esterne, siepi, prati e zone paesaggistiche con competenza e rispetto per l'ambiente. Interventi programmati tutto l'anno, stagionali o continuativi: il tuo spazio verde sempre in ordine, sempre curato.",
      bullets: [
        'Taglio e cura del manto erboso',
        'Potatura siepi, arbusti e alberi',
        'Pulizia aree esterne e parcheggi',
        'Gestione impianti di irrigazione',
        'Trattamenti fitosanitari e antialghe',
        'Pulizia foglie e scarti stagionali',
        'Allestimenti floreali e aiuole',
        'Interventi straordinari post-intemperie',
      ],
      image: img('photo-1416879595882-3373a0480b5b'),
      alt: 'Manutenzione del verde professionale',
      badge: "✓ Interventi programmati tutto l'anno",
    },
  },
];

// Ordine della lista in home
export const homeServiceOrder = ['pulizie', 'sanificazione', 'disinfestazione', 'facchinaggio', 'portierato', 'lavanolo', 'verde'];

export const serviceById = (id: string) => services.find((s) => s.id === id)!;
