import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

/* ============================================================
   MURMURATION — a generative flock painted on canvas.
   Boids follow classic alignment / cohesion / separation,
   plus a slow Lissajous anchor that pulls the flock in long
   ribbons across the sky, and a gentle aversion to the cursor
   so the flock parts around the visitor's hand.
   ============================================================ */
const COUNT = 150;
const NEIGHBOR_R = 52;
const SEP_R = 16;
const FEATHERS = 10;

export default function Murmuration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = (a, b) => a + Math.random() * (b - a);
    const boids = Array.from({ length: COUNT }, () => ({
      x: rand(0, W || 1200),
      y: rand(0, (H || 800) * 0.7),
      vx: rand(-1, 1),
      vy: rand(-0.5, 0.5),
      depth: Math.random(), // 0 far … 1 near
      flap: Math.random() * Math.PI * 2,
    }));

    const reduced = prefersReducedMotion();

    const drawBird = (b, angle) => {
      const s = 1.1 + b.depth * 1.9; // size by depth
      const a = 0.22 + b.depth * 0.55;
      const flapLift = reduced ? 0.35 : Math.sin(b.flap) * 0.45 + 0.5; // 0..1 wing position
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);
      ctx.globalAlpha = a;
      ctx.strokeStyle = b.depth > 0.75 ? '#f2c14e' : '#e9e2cf';
      ctx.lineWidth = Math.max(0.7, s * 0.42);
      ctx.lineCap = 'round';
      // a bird = two arcing wing strokes from a point, "M" silhouette
      const wing = s * 2.5;
      const lift = wing * (0.25 + flapLift * 0.55);
      ctx.beginPath();
      ctx.moveTo(-wing, -lift * 0.55);
      ctx.quadraticCurveTo(-wing * 0.35, lift * 0.28, 0, 0);
      ctx.quadraticCurveTo(wing * 0.35, lift * 0.28, wing, -lift * 0.55);
      ctx.stroke();
      ctx.restore();
    };

    /* slow-drifting golden feathers, rocking as they fall */
    const feathers = Array.from({ length: FEATHERS }, () => ({
      x: Math.random() * (W || 1200),
      y: Math.random() * (H || 800),
      vy: 0.14 + Math.random() * 0.22,
      sway: Math.random() * Math.PI * 2,
      swaySp: 0.006 + Math.random() * 0.008,
      size: 7 + Math.random() * 9,
      spin: Math.random() * Math.PI,
    }));

    const drawFeather = (f) => {
      const rock = Math.sin(f.sway) * 0.6;
      ctx.save();
      ctx.translate(f.x + Math.sin(f.sway) * 26, f.y);
      ctx.rotate(rock + f.spin * 0.2);
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#e8a33d';
      ctx.lineWidth = 1.1;
      ctx.beginPath(); // quill
      ctx.moveTo(0, -f.size);
      ctx.quadraticCurveTo(f.size * 0.2, 0, 0, f.size);
      ctx.stroke();
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = '#f2c14e';
      ctx.beginPath(); // vane
      ctx.moveTo(0, -f.size);
      ctx.quadraticCurveTo(f.size * 0.72, -f.size * 0.15, 0, f.size);
      ctx.quadraticCurveTo(-f.size * 0.55, -f.size * 0.15, 0, -f.size);
      ctx.fill();
      ctx.restore();
    };

    let t = 0;
    const step = () => {
      if (!running) return;
      t += 0.0022;
      // wandering anchor — long slow ribbons
      const ax = W * (0.5 + 0.34 * Math.sin(t * 1.7) + 0.08 * Math.sin(t * 4.3));
      const ay = H * (0.38 + 0.22 * Math.sin(t * 2.3 + 1.7) + 0.06 * Math.cos(t * 5.1));

      ctx.clearRect(0, 0, W, H);

      for (const f of feathers) {
        f.y += f.vy;
        f.sway += f.swaySp;
        if (f.y > H + 20) {
          f.y = -20;
          f.x = Math.random() * W;
        }
        drawFeather(f);
      }

      for (let i = 0; i < COUNT; i++) {
        const b = boids[i];
        let cx = 0, cy = 0, avx = 0, avy = 0, sx = 0, sy = 0, n = 0;
        for (let j = 0; j < COUNT; j++) {
          if (i === j) continue;
          const o = boids[j];
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < NEIGHBOR_R * NEIGHBOR_R) {
            cx += o.x; cy += o.y;
            avx += o.vx; avy += o.vy;
            n++;
            if (d2 < SEP_R * SEP_R && d2 > 0.01) {
              const inv = 1 / Math.sqrt(d2);
              sx -= dx * inv;
              sy -= dy * inv;
            }
          }
        }
        if (n > 0) {
          b.vx += ((cx / n - b.x) * 0.0016) + ((avx / n - b.vx) * 0.045) + sx * 0.09;
          b.vy += ((cy / n - b.y) * 0.0016) + ((avy / n - b.vy) * 0.045) + sy * 0.09;
        }
        // anchor pull
        b.vx += (ax - b.x) * 0.00045;
        b.vy += (ay - b.y) * 0.00045;
        // cursor aversion
        const mdx = b.x - mouse.x;
        const mdy = b.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 140 * 140 && md2 > 1) {
          const f = (1 - Math.sqrt(md2) / 140) * 0.6;
          const inv = 1 / Math.sqrt(md2);
          b.vx += mdx * inv * f;
          b.vy += mdy * inv * f;
        }
        // speed limits
        const sp = Math.hypot(b.vx, b.vy);
        const maxSp = 1.15 + b.depth * 0.7;
        if (sp > maxSp) {
          b.vx = (b.vx / sp) * maxSp;
          b.vy = (b.vy / sp) * maxSp;
        } else if (sp < 0.4) {
          b.vx = (b.vx / (sp || 1)) * 0.4;
          b.vy = (b.vy / (sp || 1)) * 0.4;
        }
        b.x += b.vx * (0.6 + b.depth * 0.7);
        b.y += b.vy * (0.6 + b.depth * 0.7);
        b.flap += 0.18 + b.depth * 0.12;

        // soft wrap
        if (b.x < -30) b.x = W + 30;
        if (b.x > W + 30) b.x = -30;
        if (b.y < -30) b.y = H + 30;
        if (b.y > H * 0.96) { b.y = H * 0.96; b.vy -= 0.15; }

        drawBird(b, Math.atan2(b.vy, b.vx) * 0.35);
      }
      raf = requestAnimationFrame(step);
    };

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    if (reduced) {
      // a still evening sky: draw one settled frame
      for (let k = 0; k < 240; k++) step === step; // no-op guard
      boids.forEach((b) => drawBird(b, rand(-0.3, 0.3)));
    } else {
      raf = requestAnimationFrame(step);
      canvas.parentElement.addEventListener('pointermove', onMouse);
      canvas.parentElement.addEventListener('pointerleave', onLeave);
    }

    const onVis = () => {
      running = document.visibilityState === 'visible';
      if (running && !reduced) raf = requestAnimationFrame(step);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      canvas.parentElement?.removeEventListener('pointermove', onMouse);
      canvas.parentElement?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="murmuration" aria-hidden="true" />;
}
