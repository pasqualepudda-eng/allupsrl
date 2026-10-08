import type { CSSProperties } from 'react';

type Props = {
  text: string;
  /** Ritardo iniziale in secondi (si somma al ritardo dell'intro) */
  base?: number;
  /** Ritardo tra una parola e la successiva */
  step?: number;
};

/**
 * Parole animate solo via CSS: partono al primo paint, senza attendere l'idratazione.
 * Usato sopra la piega (hero e banner) per non penalizzare l'LCP. "\n" va a capo.
 */
export default function SplitWords({ text, base = 0, step = 0.06 }: Props) {
  let i = 0;
  return (
    <>
      {text.split('\n').map((line, li) => (
        <span key={li}>
          {li > 0 && (
            <>
              {' '}
              <br className="sbr" />
            </>
          )}
          {line.split(/(\s+)/).map((part, pi) => {
            if (!part) return null;
            if (/^\s+$/.test(part)) return part;
            const style = { '--wd': `${base + i++ * step}s` } as CSSProperties;
            return (
              <span key={pi} className="cw">
                <span className="cw-i" style={style}>
                  {part}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}
