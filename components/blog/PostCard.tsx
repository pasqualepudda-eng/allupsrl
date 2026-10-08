import Link from 'next/link';
import { ViewTransition } from 'react';
import { CalendarIcon, ClockIcon } from '@/components/icons';
import { categoryOf, type Post } from '@/lib/blog';

/** Immagine della card con lo stesso nome dell'hero dell'articolo: il browser la "trasforma" durante la navigazione */
export function PostImage({ post, className = '', children }: { post: Post; className?: string; children?: React.ReactNode }) {
  return (
    <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
      <div className={`art-img ${post.imgClass} ${className}`} style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </ViewTransition>
  );
}

export default function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const cat = categoryOf(post.cat);
  return (
    <Link href={`/blog/${post.slug}`} className="art-card" data-cursor="Leggi">
      <div className="art-card-img">
        <PostImage post={post} />
      </div>
      <div className="art-card-body">
        <span className={`art-tag tag-${post.cat}`}>
          <span className="art-tag-dot" style={{ background: cat.color }} /> {cat.label}
        </span>
        <h3>{post.title}</h3>
        {!compact && <p className="art-excerpt">{post.excerpt}</p>}
        <div className="art-meta">
          {!compact && (
            <>
              <span>
                <CalendarIcon /> {post.date}
              </span>
              <span className="art-meta-dot" />
            </>
          )}
          <span>
            <ClockIcon /> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
