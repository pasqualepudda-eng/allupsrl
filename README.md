# AllUp S.r.l. — Sito web

Sito di AllUp (Facility Management, Roma) realizzato con **Next.js 16** (App Router), **Motion** per le animazioni e **Lenis** per lo scorrimento fluido.

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://127.0.0.1:5500 (anche da rete locale: http://<IP-del-Mac>:5500)
npm run build    # build di produzione (tutte le pagine sono statiche)
npm start        # avvia la build di produzione sulla porta 5500
```

## Struttura

| Percorso | Contenuto |
| --- | --- |
| `app/` | Pagine (una cartella per URL), `sitemap.ts`, `robots.ts`, stili globali |
| `app/styles/` | `fx.css` (motore animazioni), `pages.css` (stili delle pagine), `blog.css` |
| `components/fx/` | Effetti riutilizzabili: ingressi allo scroll, titoli parola per parola, contatori, tilt 3D, pulsanti magnetici, cursore, intro, nastro reattivo allo scroll |
| `components/` | Header, footer, sezioni della home, form, blog |
| `content/` | Testi degli articoli, pagine legali e metadati SEO (estratti dal sito originale) |
| `lib/` | Dati condivisi: contatti e menu (`site.ts`), servizi, articoli del blog, SEO |

Per modificare telefono, email o numero WhatsApp: `lib/site.ts`.
Per i servizi: `lib/services.ts`. Per gli articoli del blog: `lib/blog.ts` (card) e `content/articles.ts` (testo).

## Note

- Le vecchie URL `.html` reindirizzano in modo permanente alle nuove (es. `/servizi.html` → `/servizi`, `/blog-ozono-sanificazione.html` → `/blog/ozono-sanificazione`).
- Le transizioni tra pagine usano la View Transitions API: nei browser che non la supportano la navigazione resta istantanea.
- Le animazioni rispettano l'impostazione di sistema "riduci movimento".
- Su Vercel il framework è impostato su Next.js tramite `vercel.json`.

## Cookie e consenso

- Il banner (`components/consent/`) segue le linee guida del Garante Privacy: "Accetta tutti" e "Rifiuta" hanno lo stesso peso, la X equivale a rifiutare, la scelta vale 6 mesi e si cambia dal link "Preferenze cookie" nel footer.
- La scelta è salvata nel cookie tecnico `allup_consent`. Per riproporre il banner a tutti (es. nuove categorie) aumentare `VERSION` in `lib/consent.ts`.
- La mappa di Google nella pagina Contatti si carica solo con il consenso "Marketing e contenuti di terze parti" (o con il pulsante "Mostra la mappa").
- Google Analytics 4 si attiva impostando la variabile d'ambiente `NEXT_PUBLIC_GA_ID` (es. `G-XXXXXXX`) su Vercel: viene caricato solo dopo il consenso ai cookie analitici.
