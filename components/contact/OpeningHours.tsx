'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Indice giorno come in Date.getDay(): 0 = domenica
const hours = [
  { day: 'Lunedì', d: 1, open: [8, 20] },
  { day: 'Martedì', d: 2, open: [8, 20] },
  { day: 'Mercoledì', d: 3, open: [8, 20] },
  { day: 'Giovedì', d: 4, open: [8, 20] },
  { day: 'Venerdì', d: 5, open: [8, 20] },
  { day: 'Sabato', d: 6, open: [9, 14] },
  { day: 'Domenica', d: 0, open: null },
] as const;

const label = (o: readonly [number, number] | null) => (o ? `${String(o[0]).padStart(2, '0')}:00 – ${o[1]}:00` : 'Chiuso');

/** Ora corrente a Roma, indipendentemente dal fuso del visitatore */
function romeNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, h: Number(get('hour')) + Number(get('minute')) / 60 };
}

/** Orari con il giorno corrente evidenziato e stato "aperto ora" in tempo reale */
export default function OpeningHours() {
  const [now, setNow] = useState<{ day: number; h: number } | null>(null);

  useEffect(() => {
    setNow(romeNow());
    const id = window.setInterval(() => setNow(romeNow()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const today = now ? hours.find((x) => x.d === now.day) : undefined;
  const isOpen = !!(today?.open && now && now.h >= today.open[0] && now.h < today.open[1]);

  return (
    <>
      {now && (
        <motion.div className={`open-status ${isOpen ? 'is-open' : 'is-closed'}`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
          <span className="open-status-dot" />
          {isOpen ? 'Aperto ora — rispondiamo subito' : 'Ora chiuso — scrivici su WhatsApp'}
        </motion.div>
      )}
      <motion.div
        className="orari-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {hours.map((x) => (
          <motion.div
            key={x.day}
            className={`orario-row ${now?.day === x.d ? 'is-today' : ''}`}
            style={x.d === 0 ? { gridColumn: '1/-1' } : undefined}
            variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
          >
            <span className="orario-day">{x.day}</span>
            <span className={x.open ? 'orario-time' : 'orario-closed'}>{label(x.open)}</span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
