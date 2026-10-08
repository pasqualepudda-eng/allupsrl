'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/fx/Reveal';
import { certifications } from '@/lib/certifications';

export default function Certifications() {
  return (
    <section className="section-sm bg-off" id="certificazioni">
      <div className="container">
        <Reveal as="p" className="text-center certs-label" variant="blur">
          Certificazioni &amp; Conformità
        </Reveal>
        <motion.div
          className="certs-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              className="cert-item"
              variants={{ hidden: { opacity: 0, scale: 0.5, y: 30 }, show: { opacity: 1, scale: 1, y: 0 } }}
              transition={{ type: 'spring', stiffness: 160, damping: 14 }}
              whileHover={{ y: -10, scale: 1.08 }}
            >
              <Link href="/chi-siamo#certificazioni" className="cert-item-link">
                <div className="cert-float" style={{ animationDelay: `${-i * 0.9}s` }}>
                  <Image src={c.badge} alt={`${c.title} — ${c.area}`} width={80} height={92} style={{ height: 'auto' }} />
                </div>
                <span className="cert-name">{c.short}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <Reveal as="p" className="text-center certs-more" delay={0.2}>
          <Link href="/chi-siamo#certificazioni">Vedi e scarica tutti i certificati →</Link>
        </Reveal>
      </div>
    </section>
  );
}
