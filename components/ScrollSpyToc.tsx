'use client';

import { LayoutGroup, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type Props = {
  items: { id: string; label: string }[];
  title?: React.ReactNode;
  className: string;
  titleClassName: string;
  linkClassName?: string;
};

/** Indice laterale che segue la lettura con un indicatore che scivola sulla voce attiva */
export default function ScrollSpyToc({ items, title, className, titleClassName, linkClassName = '' }: Props) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={className} aria-label="Indice">
      <div className={titleClassName}>{title}</div>
      <LayoutGroup>
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className={`${linkClassName} toc-anim ${active === it.id ? 'active' : ''}`}>
            {active === it.id && <motion.span layoutId="toc-indicator" className="toc-indicator" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="toc-anim-label">{it.label}</span>
          </a>
        ))}
      </LayoutGroup>
    </nav>
  );
}
