import CookieSettingsButton from '@/components/consent/CookieSettingsButton';
import LegalPage from '@/components/LegalPage';
import { legal } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/privacy-policy');

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      doc={legal['privacy-policy']}
      route="/privacy-policy"
      after={
        <div className="legal-info-box cc-legal-box">
          <span>
            <strong>Il tuo consenso ai cookie</strong> Puoi rivedere o modificare in qualsiasi momento le scelte fatte nel banner.
          </span>
          <CookieSettingsButton className="btn btn-primary btn-sm">Gestisci preferenze cookie</CookieSettingsButton>
        </div>
      }
    />
  );
}
