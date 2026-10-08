'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useConsent } from '@/components/consent/useConsent';
import { PinIcon } from '@/components/icons';
import { openCookiePreferences } from '@/lib/consent';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.123!2d12.5114!3d41.8820!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b55c5b5b5b%3A0x0!2sVia+Lusitania%2C+4%2C+00183+Roma+RM!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit';
const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=Via+Lusitania+4+00183+Roma';

/** Google Maps imposta cookie di terze parti: la mappa si carica solo con il consenso (o su richiesta) */
export default function MapEmbed() {
  const consent = useConsent();
  const [loadOnce, setLoadOnce] = useState(false);

  if (consent?.marketing || loadOnce) {
    return (
      <motion.iframe
        src={MAP_SRC}
        width="100%"
        height="340"
        style={{ border: 0, borderRadius: 'var(--radius-l)', display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="AllUp S.r.l. · Via Lusitania, 4 Roma"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  return (
    <div className="map-ph">
      <div className="map-ph-grid" aria-hidden />
      <span className="map-ph-pin" aria-hidden>
        <PinIcon />
      </span>
      <p className="map-ph-text">
        <strong>Mappa di Google Maps</strong>
        Per mostrarla dobbiamo caricare contenuti di Google, che può impostare cookie di terze parti.
      </p>
      <div className="map-ph-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setLoadOnce(true)}>
          Mostra la mappa
        </button>
        <a className="btn btn-outline btn-sm" href={MAPS_LINK} target="_blank" rel="noopener">
          Apri in Google Maps
        </a>
      </div>
      <button type="button" className="map-ph-prefs" onClick={openCookiePreferences}>
        Gestisci preferenze cookie
      </button>
    </div>
  );
}
