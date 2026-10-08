'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Counter from '@/components/fx/Counter';
import SplitWords from '@/components/fx/SplitWords';
import { ArrowRight, CalendarIcon, ClockIcon, SearchIcon, UserIcon } from '@/components/icons';
import { categories, categoryOf, posts, type CategoryId, type Post } from '@/lib/blog';
import PostCard, { PostImage } from './PostCard';

type Cat = 'tutti' | CategoryId;

const featured = posts.find((p) => p.featured)!;
const gridPosts = posts.filter((p) => !p.featured);

const matches = (p: Post, q: string) => (p.fullTitle + ' ' + p.title + ' ' + p.excerpt + ' ' + p.keywords).toLowerCase().includes(q.toLowerCase());

function highlight(text: string, q: string): ReactNode {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

function SearchBox({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => (query ? posts.filter((p) => matches(p, query)) : []), [query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const visible = open && !!query;

  return (
    <div ref={wrapRef} className={`blog-search-wrap intro-in ${visible ? 'search-open' : ''}`} style={{ '--d': '.5s' } as React.CSSProperties}>
      <span className="blog-search-icon">
        <SearchIcon />
      </span>
      <input
        type="text"
        className="blog-search-input"
        placeholder="Cerca articoli…"
        autoComplete="off"
        role="combobox"
        aria-expanded={visible}
        aria-controls="searchSuggestions"
        aria-autocomplete="list"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setFocus(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!visible) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocus((f) => Math.min(f + 1, results.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocus((f) => Math.max(f - 1, 0));
          } else if (e.key === 'Enter' && focus >= 0 && results[focus]) {
            e.preventDefault();
            router.push(`/blog/${results[focus].slug}`);
          } else if (e.key === 'Escape') {
            setOpen(false);
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            id="searchSuggestions"
            className="search-suggestions visible"
            role="listbox"
            data-lenis-prevent
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {results.length === 0 ? (
              <div className="sugg-empty">
                <SearchIcon />
                Nessun risultato per &ldquo;<strong>{query}</strong>&rdquo;
              </div>
            ) : (
              <>
                <div className="sugg-header">Risultati per &ldquo;{query}&rdquo;</div>
                {results.map((a, i) => {
                  const cat = categoryOf(a.cat);
                  return (
                    <motion.div key={a.slug} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link href={`/blog/${a.slug}`} className={`sugg-item ${focus === i ? 'focused' : ''}`} role="option" aria-selected={focus === i}>
                        <span className="sugg-thumb" style={{ background: a.gradient }}>
                          <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: a.icon }} />
                        </span>
                        <span className="sugg-body">
                          <span className="sugg-title">{highlight(a.fullTitle, query)}</span>
                          <span className="sugg-meta">
                            <span className="sugg-cat-dot" style={{ background: cat.color }} />
                            <span>{cat.label}</span>
                            <span>·</span>
                            <span>{a.readTime} lettura</span>
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="sugg-footer">
                  <span className="sugg-kbd">
                    <kbd>↑</kbd>
                    <kbd>↓</kbd> naviga
                  </span>
                  <span className="sugg-kbd">
                    <kbd>↵</kbd> apri
                  </span>
                  <span className="sugg-kbd">
                    <kbd>Esc</kbd> chiudi
                  </span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Newsletter() {
  const [state, setState] = useState<'idle' | 'ok'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <motion.div
      className="blog-newsletter"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 80, damping: 17 }}
    >
      <div className="blog-nl-text">
        <h3>Resta aggiornato sui nostri contenuti</h3>
        <p>Nuovi articoli su sanificazione, prevenzione virus e facility management ogni settimana.</p>
      </div>
      <div className="blog-nl-form">
        <input ref={inputRef} type="email" className="blog-nl-input" placeholder="La tua email…" aria-label="La tua email" />
        <motion.button
          className="blog-nl-btn"
          animate={{ backgroundColor: state === 'ok' ? '#27ae60' : '#E05E28' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = inputRef.current;
            if (el && el.value.includes('@')) {
              el.value = '';
              setState('ok');
              window.setTimeout(() => setState('idle'), 3000);
            } else el?.focus();
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={state} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} style={{ display: 'inline-block' }}>
              {state === 'ok' ? 'Iscritto! ✓' : 'Iscriviti →'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

/** Pagina blog interattiva: ricerca, filtri per categoria e griglia che si riordina con animazioni di layout */
export default function BlogExplorer() {
  const [cat, setCat] = useState<Cat>('tutti');
  const [query, setQuery] = useState('');

  const show = (p: Post) => (query ? matches(p, query) : cat === 'tutti' || p.cat === cat);
  const visibleGrid = gridPosts.filter(show);
  const showFeatured = show(featured);
  const featCat = categoryOf(featured.cat);

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-glow" aria-hidden />
        <div className="container blog-hero-inner">
          <div className="blog-hero-tag intro-in">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="14" height="14">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            AllUp Journal
          </div>
          <h1>
            <SplitWords text="Pulizia, Salute &" base={0.1} />
            <br />
            <em>
              <SplitWords text="Facility Management" base={0.3} />
            </em>
          </h1>
          <p className="intro-in" style={{ '--d': '.4s' } as React.CSSProperties}>
            Approfondimenti su virus, protocolli di sanificazione, consigli pratici di pulizia professionale e le ultime tendenze nel facility
            management integrato.
          </p>
          <SearchBox
            query={query}
            setQuery={(q) => {
              setQuery(q);
              setCat('tutti');
            }}
          />
          <div className="blog-stats intro-in" style={{ '--d': '.65s' } as React.CSSProperties}>
            <div className="blog-stat">
              <Counter className="blog-stat-num" value={posts.length} duration={1.4} />
              <span className="blog-stat-lbl">Articoli</span>
            </div>
            <div className="blog-stat">
              <Counter className="blog-stat-num" value={categories.length - 1} duration={1.4} />
              <span className="blog-stat-lbl">Categorie</span>
            </div>
            <div className="blog-stat">
              <Counter className="blog-stat-num" value={9} duration={1.4} />
              <span className="blog-stat-lbl">Min lettura media</span>
            </div>
            <div className="blog-stat">
              <Counter className="blog-stat-num" value={2026} duration={1.4} grouped={false} />
              <span className="blog-stat-lbl">Anno</span>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-filter">
        <LayoutGroup id="blog-cats">
          <div className="container blog-filter-inner" role="tablist" aria-label="Categorie">
            {categories.map((c) => {
              const active = !query && cat === c.id;
              return (
                <button
                  key={c.id}
                  className={`cat-pill ${active ? 'active' : ''}`}
                  data-cat={c.id}
                  role="tab"
                  aria-selected={active}
                  style={{ color: c.color }}
                  onClick={() => {
                    setQuery('');
                    setCat(c.id);
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill-bg"
                      className="cat-pill-bg"
                      style={{ background: c.id === 'consigli' ? '#27ae60' : c.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="cat-dot" />
                  <span className="cat-pill-label">{c.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <section className="blog-main">
        <div className="container">
          <AnimatePresence initial={false}>
            {showFeatured && (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, height: 0, marginBottom: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                style={{ overflow: 'hidden' }}
              >
                <Link href={`/blog/${featured.slug}`} className="blog-featured" data-cursor="Leggi">
                  <div className="blog-featured-img">
                    <PostImage post={featured} />
                    <span className="blog-featured-badge">In evidenza</span>
                  </div>
                  <div className="blog-featured-body">
                    <span className={`blog-feat-tag tag-${featured.cat}`}>
                      <span className="art-tag-dot" style={{ background: featCat.color, width: 7, height: 7 }} />
                      {featCat.label}
                    </span>
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <div className="blog-feat-meta">
                      <span>
                        <CalendarIcon /> {featured.date}
                      </span>
                      <span>
                        <ClockIcon /> {featured.readTime} lettura
                      </span>
                      <span>
                        <UserIcon /> Team AllUp
                      </span>
                    </div>
                    <span className="btn-read">
                      Leggi l&apos;articolo
                      <ArrowRight />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="blog-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleGrid.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="art-card-wrap"
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(6px)', transition: { duration: 0.25 } }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: (i % 3) * 0.06 }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleGrid.length === 0 && !showFeatured && (
              <motion.div className="blog-no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SearchIcon />
                <p>
                  Nessun articolo trovato per questa ricerca.
                  <br />
                  Prova con un termine diverso.
                </p>
              </motion.div>
            )}
          </motion.div>

          <Newsletter />
        </div>
      </section>
    </>
  );
}
