import { ViewTransition } from 'react';

/**
 * Transizione tra pagine con la View Transitions API (supporto nativo di Next.js 16).
 * La pagina uscente sfuma verso l'alto, quella entrante si apre a tendina dal basso.
 * Nei browser senza supporto la navigazione resta istantanea.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <main className="page-main">{children}</main>
    </ViewTransition>
  );
}
