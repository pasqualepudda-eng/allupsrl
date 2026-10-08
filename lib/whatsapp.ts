import { waLink } from '@/lib/site';

const HEADERS = {
  prev: '🧹 *RICHIESTA PREVENTIVO — AllUp*',
  ct: '📩 *MESSAGGIO DI CONTATTO — AllUp*',
  lav: '💼 *CANDIDATURA LAVORO — AllUp*',
} as const;

export type FormKind = keyof typeof HEADERS;

/** Legge i campi del form (etichetta + valore) come faceva script.js */
function collectForm(form: HTMLFormElement) {
  const lines: string[] = [];
  form.querySelectorAll<HTMLElement>('.form-field').forEach((field) => {
    const labelEl = field.querySelector('.form-label');
    if (!labelEl) return;
    const lbl = (labelEl.textContent || '').replace(/\s*\*\s*$/, '').trim();

    const radioGroup = field.querySelector('.form-radio-group');
    if (radioGroup) {
      const checked = radioGroup.querySelector<HTMLInputElement>('input[type="radio"]:checked');
      if (checked) lines.push(`*${lbl}:* ${checked.value}`);
      return;
    }

    const checkGroup = field.querySelector('.form-check-group');
    if (checkGroup) {
      const vals = [...checkGroup.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked')].map((c) => c.value);
      if (vals.length) lines.push(`*${lbl}:* ${vals.join(', ')}`);
      return;
    }

    const fileInput = field.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      if (fileInput.files?.[0]) lines.push(`*${lbl}:* ${fileInput.files[0].name} _(da inviare separatamente)_`);
      return;
    }

    const input = field.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), select, textarea'
    );
    if (!input) return;
    let val = input.value.trim();
    if (!val) return;
    if (input.type === 'date') {
      try {
        val = new Date(val).toLocaleDateString('it-IT');
      } catch {}
    }
    if (input.tagName === 'TEXTAREA') lines.push(`\n*${lbl}:*\n${val}`);
    else lines.push(`*${lbl}:* ${val}`);
  });
  return lines;
}

export function sendFormToWhatsApp(form: HTMLFormElement, kind: FormKind) {
  const msg = `${HEADERS[kind]}\n\n${collectForm(form).join('\n')}\n\n_Inviato dal sito allupsrl.it_`;
  window.open(waLink(msg), '_blank');
}

export function sendQuickQuote(name: string, phone: string) {
  const msg = `${HEADERS.prev}\n\nNome: ${name}\nTelefono: ${phone}\n\n_Inviato dal sito allupsrl.it_`;
  window.open(waLink(msg), '_blank');
}
