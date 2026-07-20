import React, { useEffect, useRef, useState } from 'react';
import './SplashScreen.css';

/* ============================================================
   SPLASH: a meteor shower rains down, one big asteroid slams
   into the center — flash, shockwave, debris — and the solar
   system condenses out of the impact: a sun ignites and the
   planets settle into orbit. Then the real 3D system takes over.
   A slow cross-dissolve at the end hands off to the live scene
   so the cut never feels abrupt.
   ============================================================ */

const IMPACT_MS = 1450;
const FORM_MS = 900; // sun + orbits condense out of the blast
const HOLD_MS = 650; // beat on the fully-formed mini system
const GROW_MS = 1000; // sun swells to swallow the whole screen
const GROW_START = FORM_MS + HOLD_MS;
const TOTAL_MS = IMPACT_MS + GROW_START + GROW_MS + 150;
const FADE_MS = 900;

export default function SplashScreen({ onFinish }) {
  const canvasRef = useRef(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const holdTimer = setTimeout(() => setLeaving(true), TOTAL_MS);
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, TOTAL_MS + FADE_MS);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const ease = (x) => 1 - Math.pow(1 - x, 3);

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.4, 1.3),
      tw: rand(1.5, 4),
      ph: rand(0, Math.PI * 2),
    }));

    const meteors = [];
    const spawnMeteor = () => {
      meteors.push({
        x: rand(W * 0.15, W * 1.1),
        y: rand(-40, -10),
        vx: -rand(0.25, 0.5),
        vy: rand(0.5, 0.9),
        len: rand(70, 160),
        life: 0,
        maxLife: rand(900, 1500),
        size: rand(0.8, 2),
      });
    };

    const debris = [];
    const spawnDebris = (cx, cy) => {
      for (let i = 0; i < 70; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.05, 0.5);
        debris.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          r: rand(0.6, 2.4),
          life: 0,
          maxLife: rand(600, 1400),
          hue: rand(20, 45),
        });
      }
    };

    // matches the planet colors of the real solar system behind it
    const orbits = [
      { r: 0.15, color: '#38bdf8', size: 2.6, speed: 0.0026, ph: rand(0, 6) },
      { r: 0.23, color: '#8b7bff', size: 4.2, speed: 0.0019, ph: rand(0, 6) },
      { r: 0.31, color: '#2dd4bf', size: 3.4, speed: 0.0014, ph: rand(0, 6) },
      { r: 0.39, color: '#d78bfa', size: 2.8, speed: 0.0011, ph: rand(0, 6) },
    ];

    let impacted = false;
    let impactAt = 0;
    const start = performance.now();
    let last = start;

    const frame = (now) => {
      const t = now - start;
      const dt = Math.min(now - last, 50);
      last = now;
      const cx = W / 2;
      const cy = H * 0.42;
      const unit = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);

      // twinkling stars
      for (const s of stars) {
        const a = 0.35 + 0.6 * Math.abs(Math.sin(t * 0.001 * s.tw + s.ph));
        ctx.fillStyle = `rgba(205,231,255,${a.toFixed(3)})`;
        ctx.fillRect(s.x * W, s.y * H, s.r, s.r);
      }

      // meteor shower
      if (t < IMPACT_MS + 500 && Math.random() < 0.16) spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.life > m.maxLife || m.y > H + 60) {
          meteors.splice(i, 1);
          continue;
        }
        const fade = Math.min(1, m.life / 200) * (1 - m.life / m.maxLife);
        const sp = Math.hypot(m.vx, m.vy);
        const tailX = m.x - (m.vx / sp) * m.len;
        const tailY = m.y - (m.vy / sp) * m.len;
        const grd = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grd.addColorStop(0, `rgba(255,240,214,${0.9 * fade})`);
        grd.addColorStop(0.3, `rgba(124,196,255,${0.35 * fade})`);
        grd.addColorStop(1, 'rgba(124,196,255,0)');
        ctx.strokeStyle = grd;
        ctx.lineWidth = m.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // the big one rides in and hits dead center
      if (!impacted && t > 350) {
        const p = Math.min(1, (t - 350) / (IMPACT_MS - 350));
        const e = p * p; // accelerates as it falls
        const ax = W * 0.92 + (cx - W * 0.92) * e;
        const ay = -80 + (cy + 80) * e;
        const trail = ctx.createLinearGradient(ax, ay, ax + 180, ay - 180);
        trail.addColorStop(0, 'rgba(255,176,92,0.55)');
        trail.addColorStop(1, 'rgba(255,176,92,0)');
        ctx.strokeStyle = trail;
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + 170, ay - 170);
        ctx.stroke();
        // rocky, tumbling body
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(t * 0.004);
        ctx.fillStyle = '#8a7f74';
        ctx.beginPath();
        const R = 13;
        for (let i = 0; i < 9; i++) {
          const aa = (i / 9) * Math.PI * 2;
          const rr = R * (0.72 + 0.28 * Math.abs(Math.sin(i * 12.9898 + 4)));
          if (i === 0) ctx.moveTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
          else ctx.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
        }
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(40,32,26,0.5)';
        ctx.beginPath();
        ctx.arc(-3, 2, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(5, -4, 2.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        if (p >= 1) {
          impacted = true;
          impactAt = t;
          spawnDebris(cx, cy);
        }
      }

      if (impacted) {
        const it = t - impactAt;

        // white-hot flash
        if (it < 450) {
          const a = 1 - it / 450;
          const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, unit * 0.5);
          grd.addColorStop(0, `rgba(255,244,220,${0.85 * a})`);
          grd.addColorStop(1, 'rgba(255,244,220,0)');
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, W, H);
        }

        // expanding shockwave rings
        for (const [delay, speed, alpha] of [[0, 0.34, 0.5], [120, 0.26, 0.35]]) {
          const rt = it - delay;
          if (rt > 0 && rt < 1100) {
            ctx.strokeStyle = `rgba(255,214,150,${alpha * (1 - rt / 1100)})`;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(cx, cy, rt * speed, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // ejected debris
        for (let i = debris.length - 1; i >= 0; i--) {
          const d = debris[i];
          d.life += dt;
          if (d.life > d.maxLife) {
            debris.splice(i, 1);
            continue;
          }
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          d.vx *= 0.995;
          d.vy *= 0.995;
          const a = 1 - d.life / d.maxLife;
          ctx.fillStyle = `hsla(${d.hue | 0},90%,65%,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // a sun condenses out of the blast…
        const sp = ease(Math.min(1, it / FORM_MS));
        const formedR = 8 + 18 * sp;

        // …then, once formed, swells to swallow the whole screen
        const growP = Math.max(0, Math.min(1, (it - GROW_START) / GROW_MS));
        const growE = growP * growP * growP; // accelerates like falling in
        const maxR = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * 1.08;
        const sunR = formedR + (maxR - formedR) * growE;

        const glowR = Math.max(sunR * 4, sunR + 40);
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        glow.addColorStop(0, `rgba(255,214,140,${(0.6 + 0.3 * growE).toFixed(3)})`);
        glow.addColorStop(0.35, 'rgba(255,178,100,0.22)');
        glow.addColorStop(1, 'rgba(255,178,100,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fill();
        const body = ctx.createRadialGradient(
          cx - sunR * 0.3 * (1 - growE), cy - sunR * 0.3 * (1 - growE), 0,
          cx, cy, sunR
        );
        body.addColorStop(0, '#ffe9bc');
        body.addColorStop(1, '#f0a95a');
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
        ctx.fill();

        // the planets settle into orbit, then get swallowed as the sun grows
        const op = ease(Math.min(1, Math.max(0, (it - 350) / FORM_MS))) * (1 - growE);
        if (op > 0.02) {
          for (const o of orbits) {
            const orbR = o.r * unit * op;
            if (orbR < 2) continue;
            ctx.strokeStyle = `rgba(160,190,255,${0.16 * op})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cx, cy, orbR, orbR * 0.42, 0, 0, Math.PI * 2);
            ctx.stroke();
            const ang = o.ph + t * o.speed;
            const px = cx + Math.cos(ang) * orbR;
            const py = cy + Math.sin(ang) * orbR * 0.42;
            const halo = ctx.createRadialGradient(px, py, 0, px, py, o.size * 3);
            halo.addColorStop(0, o.color);
            halo.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalAlpha = 0.35 * op;
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(px, py, o.size * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = op;
            ctx.fillStyle = o.color;
            ctx.beginPath();
            ctx.arc(px, py, o.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`splash-overlay ${leaving ? 'splash-leaving' : ''}`}>
      <canvas ref={canvasRef} className="splash-canvas" aria-hidden="true" />
      <div className="splash-center">
        <div className="splash-brand">KABIR MATHUR</div>
        <div className="splash-tagline">Forging the solar system…</div>
        <div className="splash-loader-bar">
          <div className="splash-loader-progress"></div>
        </div>
      </div>
    </div>
  );
}
