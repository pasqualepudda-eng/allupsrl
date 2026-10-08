import { jsonLdFor } from '@/lib/seo';

export default function JsonLd({ route }: { route: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(route)).replace(/</g, '\\u003c') }}
    />
  );
}
