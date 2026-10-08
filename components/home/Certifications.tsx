'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Reveal } from '@/components/fx/Reveal';

const certs = [
  { src: '/img/iso-9001.svg', alt: 'ISO 9001:2015 Certified', name: 'ISO 9001:2015' },
  { src: '/img/iso-27001.svg', alt: 'ISO 27001:2022 Certified', name: 'ISO 27001:2022' },
  { src: '/img/iso-14001.svg', alt: 'ISO 14001:2015 Certified', name: 'ISO 14001:2015' },
  { src: '/img/haccp.svg', alt: 'HACCP Certified', name: 'HACCP' },
  { src: '/img/trustpilot.svg', alt: 'Trustpilot 4.9/5', name: 'Trustpilot 4.9' },
];

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
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              className="cert-item"
              variants={{ hidden: { opacity: 0, scale: 0.5, y: 30 }, show: { opacity: 1, scale: 1, y: 0 } }}
              transition={{ type: 'spring', stiffness: 160, damping: 14 }}
              whileHover={{ y: -10, scale: 1.08 }}
            >
              <div className="cert-float" style={{ animationDelay: `${-i * 0.9}s` }}>
                <Image src={c.src} alt={c.alt} width={80} height={80} />
              </div>
              <span className="cert-name">{c.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
