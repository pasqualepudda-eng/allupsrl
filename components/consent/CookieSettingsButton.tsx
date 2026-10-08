'use client';

import { openCookiePreferences } from '@/lib/consent';

export default function CookieSettingsButton({ className = '', children = 'Preferenze cookie' }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={openCookiePreferences}>
      {children}
    </button>
  );
}
