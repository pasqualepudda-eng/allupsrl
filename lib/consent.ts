// Consenso ai cookie (Linee guida Garante Privacy, 10 giugno 2021)

export type ConsentChoice = { analytics: boolean; marketing: boolean };
export type Consent = ConsentChoice & { v: number; necessary: true; ts: number };

const COOKIE = 'allup_consent';
// Aumentare la versione quando cambiano le categorie: il banner verrà riproposto a tutti
const VERSION = 1;
// La scelta vale 6 mesi: prima di allora il banner non va riproposto
const MAX_AGE = 60 * 60 * 24 * 180;

export const CONSENT_EVENT = 'allup:consent';
export const OPEN_PREFS_EVENT = 'allup:cookie-prefs';

export const ACCEPT_ALL: ConsentChoice = { analytics: true, marketing: true };
export const REJECT_ALL: ConsentChoice = { analytics: false, marketing: false };

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!m) return null;
  try {
    const c = JSON.parse(decodeURIComponent(m[1])) as Consent;
    if (c.v !== VERSION || Date.now() - c.ts > MAX_AGE * 1000) return null;
    return c;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): Consent {
  const c: Consent = { v: VERSION, necessary: true, analytics: choice.analytics, marketing: choice.marketing, ts: Date.now() };
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }));
  return c;
}

/** Riapre il pannello delle preferenze (link nel footer, privacy policy, mappa) */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFS_EVENT));
}
