'use client';

import { useState } from 'react';
import { burstConfetti } from '@/lib/confetti';
import { sendFormToWhatsApp, type FormKind } from '@/lib/whatsapp';

/** Invio del form via WhatsApp con stato "inviato" e coriandoli */
export function useWhatsAppSubmit(kind: FormKind) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    sendFormToWhatsApp(form, kind);
    setStatus('sending');
    const btn = form.querySelector('button[type="submit"]')?.getBoundingClientRect();
    if (btn) burstConfetti(btn.left + btn.width / 2, btn.top + btn.height / 2);
    window.setTimeout(() => setStatus('sent'), 800);
  };

  return { status, onSubmit, reset: () => setStatus('idle') };
}
