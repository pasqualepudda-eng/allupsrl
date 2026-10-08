/** Esplosione di coriandoli dal punto indicato (es. invio di un form riuscito) */
export function burstConfetti(x: number, y: number, count = 46) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#E05E28', '#ff8a00', '#ffd000', '#ffffff', '#ff4444', '#4ade80', '#60a5fa'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const spd = 90 + Math.random() * 170;
    const size = 6 + Math.random() * 8;
    el.className = 'confetti';
    el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${4 + Math.random() * 5}px;background:${
      colors[Math.floor(Math.random() * colors.length)]
    };--dx:${Math.cos(angle) * spd}px;--dy:${Math.sin(angle) * spd - 90}px;`;
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), 1100);
  }
}
