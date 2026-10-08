'use client';

import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Magnetic from '@/components/fx/Magnetic';
import { useScrollLock } from '@/components/fx/useScrollLock';
import { ChevronDown, MailIcon, PhoneIcon, StarLogo, WhatsAppIcon } from '@/components/icons';
import { nav, site, waLink } from '@/lib/site';

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdown, setDropdown] = useState<number | null>(null);

  // Si nasconde scorrendo verso il basso e ricompare appena si torna su
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > prev && y > 260);
  });

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  // Gli elementi fissi (es. barra dei servizi) si riposizionano quando l'header sparisce
  useEffect(() => {
    document.documentElement.dataset.header = hidden && !open ? 'hidden' : 'visible';
  }, [hidden, open]);

  useScrollLock(open);

  const activeIdx = nav.findIndex((n) => isActive(pathname, n.href));
  const pillIdx = hovered ?? activeIdx;

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        style={{ viewTransitionName: 'site-header' }}
      >
        <div className="container nav-inner">
          <Link href="/" className="site-logo" aria-label="AllUp — Home">
            <div className="logo-icon">
              <StarLogo />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-name">
                All<em>Up</em>
              </span>
              <span className="logo-sub">Facility Management</span>
            </div>
          </Link>

          <LayoutGroup id="main-nav">
            <nav className="nav-menu" onMouseLeave={() => setHovered(null)} aria-label="Navigazione principale">
              {nav.map((item, i) => (
                <div
                  key={item.href}
                  className="nav-item"
                  onMouseEnter={() => {
                    setHovered(i);
                    setDropdown(item.children ? i : null);
                  }}
                  onMouseLeave={() => setDropdown(null)}
                  onFocus={() => setDropdown(item.children ? i : null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdown(null);
                  }}
                >
                  <Link href={item.href} className={`nav-link ${activeIdx === i ? 'active' : ''}`}>
                    {pillIdx === i && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="nav-link-text">{item.label}</span>
                    {item.children && <ChevronDown className={`nav-chevron ${dropdown === i ? 'is-open' : ''}`} />}
                  </Link>

                  <AnimatePresence>
                    {item.children && dropdown === i && (
                      <motion.div
                        className="dropdown"
                        initial={{ opacity: 0, y: -10, scale: 0.97, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -6, scale: 0.98, filter: 'blur(4px)' }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {item.children.map((c, ci) =>
                          c === 'sep' ? (
                            <div key={`sep-${ci}`} className="dd-sep" />
                          ) : (
                            <motion.div
                              key={c.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.025 * ci, duration: 0.25 }}
                            >
                              <Link href={c.href} className="dd-item" onClick={() => setDropdown(null)}>
                                {c.label}
                              </Link>
                            </motion.div>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </LayoutGroup>

          <Magnetic className="nav-btn-wrap" strength={0.35}>
            <Link href="/contatti" className={`nav-btn ${pathname === '/contatti' ? 'active' : ''}`}>
              Contatti
            </Link>
          </Magnetic>

          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mob-menu"
            data-lenis-prevent
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 66px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 66px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 66px)' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.18, 1] }}
            aria-label="Menu mobile"
          >
            <div className="mob-menu-links">
              {[...nav, { label: 'Contatti', href: '/contatti' }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
                  transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 120, damping: 16 }}
                >
                  <Link
                    href={item.href}
                    className={`mob-link ${isActive(pathname, item.href) ? 'active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="mob-link-num">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mob-menu-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55 }}
            >
              <a href={site.phoneHref}>
                <PhoneIcon /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`}>
                <MailIcon /> {site.email}
              </a>
              <a href={waLink()} target="_blank" rel="noopener" className="mob-wa">
                <WhatsAppIcon /> Scrivici su WhatsApp
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
