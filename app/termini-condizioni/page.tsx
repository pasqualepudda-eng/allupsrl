import LegalPage from '@/components/LegalPage';
import { legal } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/termini-condizioni');

export default function TerminiCondizioniPage() {
  return <LegalPage doc={legal['termini-condizioni']} route="/termini-condizioni" />;
}
