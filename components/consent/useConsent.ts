'use client';

import { useEffect, useState } from 'react';
import { CONSENT_EVENT, readConsent, type Consent } from '@/lib/consent';

/** Consenso corrente (null finché l'utente non ha scelto) e aggiornamento in tempo reale */
export function useConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return consent;
}
