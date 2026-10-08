import { Reveal } from '@/components/fx/Reveal';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PageTransition from '@/components/PageTransition';
import RichContent from '@/components/RichContent';
import ScrollSpyToc from '@/components/ScrollSpyToc';

export type LegalDoc = {
  eyebrow: string;
  title: string;
  toc: { id: string; label: string }[];
  bodyHtml: string;
};

export default function LegalPage({ doc, route, after }: { doc: LegalDoc; route: string; after?: React.ReactNode }) {
  return (
    <PageTransition>
      <JsonLd route={route} />
      <PageBanner eyebrow={doc.eyebrow} title={doc.title} crumb={doc.title} />
      <section className="section">
        <div className="container">
          <div className="legal-layout">
            <Reveal as="aside" variant="left" className="legal-toc-wrap">
              <ScrollSpyToc items={doc.toc} className="legal-toc" titleClassName="legal-toc-title" title="Indice" />
            </Reveal>
            <Reveal className="legal-body" variant="blur" delay={0.1}>
              <RichContent html={doc.bodyHtml} sectionSelector=".legal-section" />
              {after}
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
