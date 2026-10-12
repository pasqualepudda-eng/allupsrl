import Image from 'next/image';

/** Bollino con testo circolare che ruota lentamente */
export default function RotatingBadge({ text, className = '' }: { text: string; className?: string }) {
  const id = `rb-${text.replace(/\W+/g, '').slice(0, 12)}`;
  return (
    <div className={`rot-badge ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="rot-badge-ring">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="rot-badge-core">
        <Image src="/img/allup-mark.png" alt="" width={28} height={22} />
      </span>
    </div>
  );
}
