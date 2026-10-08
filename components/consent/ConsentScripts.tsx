'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useConsent } from './useConsent';

// ID di Google Analytics 4 (variabile d'ambiente su Vercel). Senza ID non viene caricato nulla.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Script che richiedono consenso: partono solo dopo l'autorizzazione dell'utente */
export default function ConsentScripts() {
  const consent = useConsent();
  const analytics = !!consent?.analytics;

  // Revoca: blocca GA e rimuove i suoi cookie
  useEffect(() => {
    if (!GA_ID || analytics || consent === null) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    document.cookie.split('; ').forEach((c) => {
      const name = c.split('=')[0];
      if (/^_ga/.test(name)) {
        document.cookie = `${name}=; Max-Age=0; Path=/`;
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${location.hostname.replace(/^www\./, '')}`;
      }
    });
  }, [analytics, consent]);

  if (!GA_ID || !analytics) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window['ga-disable-${GA_ID}']=false;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
