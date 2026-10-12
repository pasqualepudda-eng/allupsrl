import Image from 'next/image';

// Proporzioni di public/img/allup-logo.png (720×253, ricavato da allup.png)
const RATIO = 720 / 253;

/** Logo AllUp (spunta verde + scritta arancione): leggibile sia su fondo chiaro sia scuro */
export default function Logo({ height = 44, className = '', eager = false }: { height?: number; className?: string; eager?: boolean }) {
  return (
    <Image
      src="/img/allup-logo.png"
      alt="AllUp"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      loading={eager ? 'eager' : undefined}
      fetchPriority={eager ? 'high' : undefined}
    />
  );
}
