/* AllUp — Interactive Script */

(function () {
  'use strict';

  /* ══════════════════════════════════════
     1. NAVBAR
  ══════════════════════════════════════ */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ══════════════════════════════════════
     2. ACTIVE NAV LINK
  ══════════════════════════════════════ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mob-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ══════════════════════════════════════
     3. BURGER / MOBILE DRAWER
  ══════════════════════════════════════ */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('mobDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ══════════════════════════════════════
     4. SCROLL REVEAL (all variants)
  ══════════════════════════════════════ */
  const rvObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); rvObs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-zoom, .rv-bounce').forEach(el => rvObs.observe(el));

  /* ══════════════════════════════════════
     5. COUNTER ANIMATION
  ══════════════════════════════════════ */
  function animCounter(el) {
    const raw = el.dataset.count;
    const suffix = raw.replace(/[\d.]+/, '');
    const target = parseFloat(raw);
    const duration = 2200;
    const startTime = performance.now();
    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.floor(val) : val.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else spawnSparkles(el);
    }
    requestAnimationFrame(tick);
  }
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animCounter(e.target); counterObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* ══════════════════════════════════════
     6. FORM HANDLER
  ══════════════════════════════════════ */
  /* ── WhatsApp number (sostituire con il numero reale) ── */
  const WA_NUMBER = '393514181029';

  const WA_HEADERS = {
    prev: '🧹 *RICHIESTA PREVENTIVO — AllUp*',
    ct:   '📩 *MESSAGGIO DI CONTATTO — AllUp*',
    lav:  '💼 *CANDIDATURA LAVORO — AllUp*'
  };

  function collectForm(form) {
    const lines = [];
    form.querySelectorAll('.form-field').forEach(field => {
      const labelEl = field.querySelector('.form-label');
      if (!labelEl) return;
      const lbl = labelEl.textContent.replace(/\s*\*\s*$/, '').trim();

      // Gruppo radio
      const radioGroup = field.querySelector('.form-radio-group');
      if (radioGroup) {
        const checked = radioGroup.querySelector('input[type="radio"]:checked');
        if (checked) lines.push('*' + lbl + ':* ' + checked.value);
        return;
      }

      // Gruppo checkbox
      const checkGroup = field.querySelector('.form-check-group');
      if (checkGroup) {
        const vals = [...checkGroup.querySelectorAll('input[type="checkbox"]:checked')].map(c => c.value);
        if (vals.length) lines.push('*' + lbl + ':* ' + vals.join(', '));
        return;
      }

      // File (CV)
      const fileInput = field.querySelector('input[type="file"]');
      if (fileInput) {
        if (fileInput.files && fileInput.files[0])
          lines.push('*' + lbl + ':* ' + fileInput.files[0].name + ' _(da inviare separatamente)_');
        return;
      }

      // Input / select / textarea standard
      const input = field.querySelector(
        'input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), select, textarea'
      );
      if (!input) return;
      let val = input.value.trim();
      if (!val) return;
      if (input.type === 'date') {
        try { val = new Date(val).toLocaleDateString('it-IT'); } catch(e) {}
      }
      if (input.tagName === 'TEXTAREA') {
        lines.push('\n*' + lbl + ':*\n' + val);
      } else {
        lines.push('*' + lbl + ':* ' + val);
      }
    });
    return lines;
  }

  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id  = form.dataset.form;
      const btn = form.querySelector('button[type="submit"]');

      const lines  = collectForm(form);
      const header = WA_HEADERS[id] || '*MESSAGGIO — AllUp*';
      const msg    = header + '\n\n' + lines.join('\n') + '\n\n_Inviato dal sito allupsrl.it_';

      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');

      if (btn) { btn.disabled = true; btn.textContent = 'Inviato ✓'; }
      setTimeout(() => {
        form.style.display = 'none';
        const suc = document.getElementById('success-' + id);
        if (suc) suc.style.display = 'block';
      }, 800);
    });
  });

  /* ══════════════════════════════════════
     7. SMOOTH SCROLL
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ══════════════════════════════════════
     8. SCROLL PROGRESS BAR
  ══════════════════════════════════════ */
  const prog = document.createElement('div');
  prog.className = 'scroll-progress';
  document.body.prepend(prog);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    prog.style.width = pct + '%';
  }, { passive: true });

  /* ══════════════════════════════════════
     9. (cursor handled at bottom of file)
  ══════════════════════════════════════ */

  /* ══════════════════════════════════════
     10. INTERACTIVE HERO CANVAS
         (dots connected by lines, react to mouse)
  ══════════════════════════════════════ */
  function initHeroCanvas(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const mouse = { x: -1000, y: -1000 };
    const pts = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    new ResizeObserver(resize).observe(canvas.parentElement);

    const hero = canvas.closest('.hero') || canvas.parentElement;
    hero.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    for (let i = 0; i < 75; i++) {
      pts.push({
        x: Math.random() * (W || 800),
        y: Math.random() * (H || 600),
        vx: (Math.random() - .5) * .6,
        vy: (Math.random() - .5) * .6,
        r: 1.8 + Math.random() * 3,
        baseR: 1.8 + Math.random() * 3,
      });
    }

    let raf;
    function tick() {
      ctx.clearRect(0, 0, W, H);

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Repel from mouse
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const d = Math.sqrt(d2);
          p.x += dx / d * 2.5;
          p.y += dy / d * 2.5;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224,94,40,.65)';
        ctx.fill();
      });

      // Point-to-point connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(224,94,40,${(1 - d / 115) * .22})`;
            ctx.lineWidth = .9;
            ctx.stroke();
          }
        }
        // Connect to mouse
        const dx = pts[i].x - mouse.x, dy = pts[i].y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 165) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(224,94,40,${(1 - d / 165) * .65})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }

      // Draw mouse point
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224,94,40,.5)';
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }
    tick();
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else tick(); });
  }
  initHeroCanvas(document.querySelector('.hero .particles-canvas'));

  /* ══════════════════════════════════════
     11. FLOATING PARTICLES (inner pages)
  ══════════════════════════════════════ */
  function initParticles(canvas) {
    if (!canvas || canvas.closest('.hero')) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const PALETTE = [[224,94,40],[255,140,60],[255,185,90],[200,75,25]];

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    resize();
    new ResizeObserver(resize).observe(canvas.parentElement);

    function mk(fromBottom) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return { x: Math.random()*W, y: fromBottom ? H+40 : Math.random()*H, r: 1.5+Math.random()*4.5, speed: .3+Math.random()*.8, drift:(Math.random()-.5)*.5, opacity:.15+Math.random()*.5, fade:.0007+Math.random()*.001, color:c };
    }
    for (let i = 0; i < 55; i++) particles.push(mk(false));

    let raf;
    function tick() {
      ctx.clearRect(0,0,W,H);
      particles.forEach((p,i) => {
        p.y-=p.speed; p.x+=p.drift; p.opacity-=p.fade;
        ctx.globalAlpha=Math.max(0,p.opacity);
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgb(${p.color[0]},${p.color[1]},${p.color[2]})`;
        ctx.fill();
        if(p.y<-10||p.opacity<=0) particles[i]=mk(true);
      });
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(tick);
    }
    tick();
    document.addEventListener('visibilitychange', () => { if(document.hidden) cancelAnimationFrame(raf); else tick(); });
  }
  document.querySelectorAll('.particles-canvas').forEach(initParticles);

  /* ══════════════════════════════════════
     12. CARD TILT + SPOTLIGHT
  ══════════════════════════════════════ */
  document.querySelectorAll('.srv-card, .review, .value-card, .cert-card').forEach(card => {
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';

    const spot = document.createElement('div');
    spot.className = 'card-spotlight';
    card.appendChild(spot);

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      const rotX = -(y - cy) / cy * 9;
      const rotY =  (x - cx) / cx * 9;
      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      card.style.transition = 'transform .05s';
      spot.style.background = `radial-gradient(300px at ${x}px ${y}px, rgba(224,94,40,.13), transparent 70%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .55s cubic-bezier(.34,1.3,.64,1), box-shadow .55s';
      spot.style.background = 'none';
    });
  });

  /* ══════════════════════════════════════
     13. BUTTON RIPPLE
  ══════════════════════════════════════ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.4;
      const span = document.createElement('span');
      span.className = 'ripple';
      span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;position:absolute;border-radius:50%;background:rgba(255,255,255,.3);transform:scale(0);animation:ripple-out .65s linear;pointer-events:none;`;
      btn.appendChild(span);
      span.addEventListener('animationend', () => span.remove());
    });
  });

  /* ══════════════════════════════════════
     14. CLICK PARTICLE EXPLOSION
  ══════════════════════════════════════ */
  function spawnExplosion(x, y, count, scale) {
    const colors = ['#E05E28','#ff8a00','#ffd000','#ffffff','#ffb347'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const angle = (i / count) * Math.PI * 2 + Math.random() * .4;
      const spd = (40 + Math.random() * 80) * (scale || 1);
      el.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:${(5+Math.random()*6)*(scale||1)}px;
        height:${(5+Math.random()*6)*(scale||1)}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        border-radius:50%;pointer-events:none;z-index:9999;
        --dx:${Math.cos(angle)*spd}px;--dy:${Math.sin(angle)*spd}px;
        animation:explode-out .7s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 720);
    }
  }

  // Mild explosion on any click
  document.addEventListener('click', e => {
    if (!e.target.closest('.btn, a, button')) {
      spawnExplosion(e.clientX, e.clientY, 6, 0.7);
    }
  });
  // Big explosion on buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => spawnExplosion(e.clientX, e.clientY, 14, 1));
  });

  /* ══════════════════════════════════════
     15. CONFETTI BURST (primary buttons)
  ══════════════════════════════════════ */
  function spawnConfetti(x, y) {
    const colors = ['#E05E28','#ff8a00','#ffd000','#ffffff','#ff4444','#4ade80','#60a5fa'];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      const angle = Math.random() * Math.PI * 2;
      const spd = 90 + Math.random() * 150;
      const size = 6 + Math.random() * 8;
      el.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:${size}px;height:${4+Math.random()*5}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        border-radius:2px;pointer-events:none;z-index:9999;
        --dx:${Math.cos(angle)*spd}px;--dy:${Math.sin(angle)*spd - 80}px;
        animation:confetti-fall 1s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }
  }
  document.querySelectorAll('.btn-primary, .cta-btns .btn').forEach(btn => {
    btn.addEventListener('click', e => spawnConfetti(e.clientX, e.clientY));
  });

  /* ══════════════════════════════════════
     16. COUNTER SPARKLE (fires when count ends)
  ══════════════════════════════════════ */
  function spawnSparkles(el) {
    const r = el.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const sp = document.createElement('div');
      sp.style.cssText = `
        position:fixed;
        left:${r.left + Math.random()*r.width}px;
        top:${r.top + Math.random()*r.height}px;
        width:7px;height:7px;background:var(--orange);border-radius:50%;
        pointer-events:none;z-index:9999;
        --dx:${(Math.random()-.5)*70}px;--dy:${-50-Math.random()*50}px;
        animation:explode-out .65s ease-out forwards;
      `;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 650);
    }
  }

  /* ══════════════════════════════════════
     17. TYPEWRITER
  ══════════════════════════════════════ */
  document.querySelectorAll('[data-typewriter]').forEach(el => {
    let lines;
    try { lines = JSON.parse(el.dataset.typewriter); } catch(e) { return; }
    if (!lines || !lines.length) return;

    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    el.parentNode.insertBefore(cursor, el.nextSibling);

    let li = 0, ci = 0, del = false;
    function tick() {
      const line = lines[li];
      if (!del) {
        el.textContent = line.slice(0, ++ci);
        if (ci >= line.length) { del = true; setTimeout(tick, 2400); return; }
      } else {
        el.textContent = line.slice(0, --ci);
        if (ci <= 0) { del = false; li = (li + 1) % lines.length; }
      }
      setTimeout(tick, del ? 52 : 88);
    }
    tick();
  });

  /* ══════════════════════════════════════
     18. HERO ENTRANCE (CSS-driven, no DOM split)
  ══════════════════════════════════════ */
  // Hero elements animate via CSS classes added here
  ['hero-eyebrow','hero-h1','hero-sub','hero-btns'].forEach((cls, i) => {
    const el = document.querySelector('.' + cls);
    if (el) {
      el.style.animationDelay = `${0.1 + i * 0.18}s`;
      el.classList.add('hero-anim-in');
    }
  });

  /* ══════════════════════════════════════
     19. MAGNETIC BUTTONS
  ══════════════════════════════════════ */
  document.querySelectorAll('.btn-primary, .nav-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
      btn.style.transform = `translate(${dx}px,${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ══════════════════════════════════════
     20. PARALLAX — HERO
  ══════════════════════════════════════ */
  const heroContent = document.querySelector('.hero-content');
  const heroCanvas  = document.querySelector('.hero .particles-canvas');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > window.innerHeight) return;
    if (heroContent) {
      heroContent.style.transform = `translateY(${y * 0.28}px)`;
      heroContent.style.opacity   = String(Math.max(0, 1 - y / 550));
    }
    if (heroCanvas) heroCanvas.style.transform = `translateY(${y * 0.5}px)`;
  }, { passive: true });

  /* ══════════════════════════════════════
     21. SECTION TITLE WORD REVEAL (TreeWalker)
  ══════════════════════════════════════ */
  function splitTitleWords(el) {
    if (el.dataset.wordsplit) return;
    el.dataset.wordsplit = '1';

    // Walk only text nodes — safe with <br>, <em>, <span> etc.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    let wi = 0;
    textNodes.forEach(tn => {
      const parts = tn.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part) {
          const outer = document.createElement('span');
          outer.className = 'word-w';
          outer.style.setProperty('--wi', wi++);
          const inner = document.createElement('span');
          inner.className = 'word-i';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        }
      });
      tn.replaceWith(frag);
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelectorAll('.word-i').forEach(w => w.classList.add('on'));
    }));
  }

  const wordObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        splitTitleWords(e.target);
        wordObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.s-title').forEach(el => wordObs.observe(el));

  /* ══════════════════════════════════════
     22. HOVER GLOW ON SECTION ICONS
  ══════════════════════════════════════ */
  document.querySelectorAll('.feat-icon, .srv-ic').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.boxShadow = '0 0 24px rgba(224,94,40,.5)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.boxShadow = '';
    });
  });

  /* ══════════════════════════════════════
     23. SECTION ENTRANCE SOUND (visual pulse)
  ══════════════════════════════════════ */
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('section-entered');
        sectionObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.section, .section-sm, .stats-strip, .cta-section').forEach(s => sectionObs.observe(s));

})();

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
(function () {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let visible = false;

  function place(el, x, y, half) {
    el.style.transform = `translate3d(${x - half}px,${y - half}px,0)`;
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    place(dot, mx, my, 4);
    if (!visible) {
      visible = true;
      dot.classList.add('cur-visible');
      ring.classList.add('cur-visible');
    }
  });

  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    place(ring, rx, ry, 18);
    requestAnimationFrame(loop);
  })();

  const targets = 'a, button, [role="button"], label, select, input, textarea, ' +
    '.srv-list-item, .srv-pill, .srv-card, .cert-item, .team-card, .review, ' +
    '.srv-ov-item, .feat, .stat-item, .nav-link, .dd-item';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(targets)) {
      dot.classList.add('cur-hover');
      ring.classList.add('cur-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(targets)) {
      dot.classList.remove('cur-hover');
      ring.classList.remove('cur-hover');
    }
  });

  document.addEventListener('mousedown', () => ring.classList.add('cur-click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('cur-click'));

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('cur-visible');
    ring.classList.remove('cur-visible');
  });
  document.addEventListener('mouseenter', () => {
    if (visible) {
      dot.classList.add('cur-visible');
      ring.classList.add('cur-visible');
    }
  });
})();
