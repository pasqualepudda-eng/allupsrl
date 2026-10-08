import BlogExplorer from '@/components/blog/BlogExplorer';
import JsonLd from '@/components/JsonLd';
import PageTransition from '@/components/PageTransition';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/blog');

export default function BlogPage() {
  return (
    <PageTransition>
      <JsonLd route="/blog" />
      <BlogExplorer />
    </PageTransition>
  );
}
