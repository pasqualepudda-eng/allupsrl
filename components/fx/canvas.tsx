'use client';

import { useEffect, useRef } from 'react';

type Scene = {
  init: (w: number, h: number) => void;
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number; y: number }) => void;
};

/** Gestisce resize, DPR, pausa fuori schermo / scheda nascosta e movimento ridotto */
function useCanvasScene(ref: React.RefObject<HTMLCanvasElement | null>, makeScene: () => Scene, trackMouse: boolean) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = makeScene();
    const mouse = { x: -1000, y: -1000 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    scene.init(w, h);

    const loop = () => {
      scene.draw(ctx, w, h, mouse);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    const onVis = () => start();
    document.addEventListener('visibilitychange', onVis);

    const host = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    if (trackMouse && host) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }

    if (reduced) scene.draw(ctx, w, h, mouse);
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      if (trackMouse && host) {
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [ref, makeScene, trackMouse]);
}

/* ── Rete di punti connessi che reagisce al mouse (hero home) ── */
const networkScene = (): Scene => {
  type P = { x: number; y: number; vx: number; vy: number; r: number };
  let pts: P[] = [];
  return {
    init(w, h) {
      const count = w < 700 ? 38 : 75;
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * (w || 800),
        y: Math.random() * (h || 600),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1.8 + Math.random() * 3,
      }));
    },
    draw(ctx, w, h, mouse) {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * 2.5;
          p.y += (dy / d) * 2.5;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224,94,40,.65)';
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(224,94,40,${(1 - d / 115) * 0.22})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
        const dx = pts[i].x - mouse.x;
        const dy = pts[i].y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 165) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(224,94,40,${(1 - d / 165) * 0.65})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224,94,40,.5)';
        ctx.fill();
      }
    },
  };
};

/* ── Particelle che salgono fluttuando (banner pagine interne) ── */
const floatScene = (): Scene => {
  const PALETTE = [
    [224, 94, 40],
    [255, 140, 60],
    [255, 185, 90],
    [200, 75, 25],
  ];
  type P = { x: number; y: number; r: number; speed: number; drift: number; opacity: number; fade: number; c: number[] };
  let ps: P[] = [];
  let W = 0;
  let H = 0;
  const mk = (fromBottom: boolean): P => ({
    x: Math.random() * W,
    y: fromBottom ? H + 40 : Math.random() * H,
    r: 1.5 + Math.random() * 4.5,
    speed: 0.3 + Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 0.5,
    opacity: 0.15 + Math.random() * 0.5,
    fade: 0.0007 + Math.random() * 0.001,
    c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
  });
  return {
    init(w, h) {
      W = w;
      H = h;
      ps = Array.from({ length: w < 700 ? 24 : 55 }, () => mk(false));
    },
    draw(ctx, w, h) {
      W = w;
      H = h;
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p, i) => {
        p.y -= p.speed;
        p.x += p.drift;
        p.opacity -= p.fade;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${p.c[0]},${p.c[1]},${p.c[2]})`;
        ctx.fill();
        if (p.y < -10 || p.opacity <= 0) ps[i] = mk(true);
      });
      ctx.globalAlpha = 1;
    },
  };
};

export function NetworkCanvas({ className = 'particles-canvas' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvasScene(ref, networkScene, true);
  return <canvas ref={ref} className={className} aria-hidden />;
}

export function FloatingParticles({ className = 'particles-canvas', opacity = 0.5 }: { className?: string; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvasScene(ref, floatScene, false);
  return <canvas ref={ref} className={className} style={{ opacity }} aria-hidden />;
}
