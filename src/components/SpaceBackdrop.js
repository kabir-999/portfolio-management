import React, { useEffect, useRef } from 'react';

/* ============================================================
   Ambient deep-space layer for planet pages: drifting starfield,
   shooting stars, silhouetted asteroids, accent-tinted dust and
   a distant ringed planet with a moon in orbit.
   ============================================================ */
export default function SpaceBackdrop({ accent = '#4fd1ff' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let raf = 0;

    const n = parseInt(accent.slice(1), 16);
    const AR = (n >> 16) & 255;
    const AG = (n >> 8) & 255;
    const AB = n & 255;
    const acc = (a) => `rgba(${AR},${AG},${AB},${a})`;

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

    const mobile = window.innerWidth < 768;
    const rand = (a, b) => a + Math.random() * (b - a);

    const stars = Array.from({ length: mobile ? 70 : 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.4, 1.4),
      tw: rand(1, 3.5),
      ph: rand(0, Math.PI * 2),
      spd: rand(2.5e-6, 8.3e-6),
    }));

    const dust = Array.from({ length: mobile ? 18 : 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.8, 2),
      vy: rand(8e-6, 2e-5),
      a: rand(0.05, 0.16),
    }));

    const asts = Array.from({ length: mobile ? 3 : 6 }, () => ({
      x: Math.random(),
      y: rand(0.06, 0.55),
      R: rand(14, 40),
      vx: rand(0, 1) > 0.5 ? rand(2e-6, 6e-6) : -rand(2e-6, 6e-6),
      rot: rand(0, Math.PI * 2),
      vr: rand(-3e-4, 3e-4),
      verts: Array.from({ length: 9 }, () => 0.7 + Math.random() * 0.3),
      craters: Array.from({ length: 3 }, () => ({
        x: rand(-0.4, 0.4),
        y: rand(-0.4, 0.4),
        r: rand(0.12, 0.28),
      })),
    }));

    let shoot = null;
    let nextShoot = rand(1500, 3500);

    const start = performance.now();
    let last = start;

    const frame = (now) => {
      const t = now - start;
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);

      // drifting, twinkling starfield
      for (const s of stars) {
        s.x = (s.x - s.spd * dt + 1) % 1;
        const a = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.001 * s.tw + s.ph));
        ctx.fillStyle = `rgba(215,232,255,${a.toFixed(3)})`;
        ctx.fillRect(s.x * W, s.y * H, s.r, s.r);
      }

      // accent-tinted dust rising slowly
      for (const d of dust) {
        d.y = (d.y - d.vy * dt + 1) % 1;
        ctx.fillStyle = acc(d.a);
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // distant ringed planet with an orbiting moon
      const pr = mobile ? 15 : 24;
      const px = W * 0.09;
      const py = H * 0.22 + Math.sin(t * 0.0003) * 6;
      const ringTilt = 0.32;
      const body = ctx.createRadialGradient(px - pr * 0.4, py - pr * 0.4, 0, px, py, pr);
      body.addColorStop(0, 'rgba(52,66,104,0.95)');
      body.addColorStop(1, 'rgba(10,16,31,0.95)');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = acc(0.3);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(px, py, pr + 1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = acc(0.38);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(px, py, pr * 1.9, pr * 1.9 * ringTilt, -0.45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = acc(0.16);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(px, py, pr * 2.3, pr * 2.3 * ringTilt, -0.45, 0, Math.PI * 2);
      ctx.stroke();
      const ma = t * 0.0006;
      const mx = px + Math.cos(ma) * pr * 2.7;
      const my = py + Math.sin(ma) * pr * 2.7 * ringTilt;
      ctx.fillStyle = 'rgba(207,217,238,0.9)';
      ctx.beginPath();
      ctx.arc(mx, my, 2.4, 0, Math.PI * 2);
      ctx.fill();

      // silhouetted asteroids drifting through the frame
      for (const a of asts) {
        a.x += a.vx * dt;
        a.rot += a.vr * dt;
        if (a.x < -0.12) a.x = 1.12;
        if (a.x > 1.12) a.x = -0.12;
        ctx.save();
        ctx.translate(a.x * W, a.y * H);
        ctx.rotate(a.rot);
        ctx.fillStyle = 'rgba(20,28,51,0.9)';
        ctx.beginPath();
        for (let i = 0; i < 9; i++) {
          const aa = (i / 9) * Math.PI * 2;
          const rr = a.R * a.verts[i];
          if (i === 0) ctx.moveTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
          else ctx.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = acc(0.14);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(5,8,16,0.6)';
        for (const c of a.craters) {
          ctx.beginPath();
          ctx.arc(c.x * a.R, c.y * a.R, c.r * a.R, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // the occasional shooting star
      if (!shoot && t > nextShoot) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        shoot = {
          x: rand(W * 0.2, W * 0.8),
          y: rand(-30, H * 0.15),
          vx: dir * rand(0.3, 0.55),
          vy: rand(0.35, 0.6),
          len: rand(80, 150),
          life: 0,
          maxLife: rand(700, 1100),
        };
      }
      if (shoot) {
        shoot.life += dt;
        shoot.x += shoot.vx * dt;
        shoot.y += shoot.vy * dt;
        if (shoot.life > shoot.maxLife || shoot.y > H * 0.8) {
          shoot = null;
          nextShoot = t + rand(2500, 6500);
        } else {
          const fade = Math.min(1, shoot.life / 150) * (1 - shoot.life / shoot.maxLife);
          const sp = Math.hypot(shoot.vx, shoot.vy);
          const tx = shoot.x - (shoot.vx / sp) * shoot.len;
          const ty = shoot.y - (shoot.vy / sp) * shoot.len;
          const grd = ctx.createLinearGradient(shoot.x, shoot.y, tx, ty);
          grd.addColorStop(0, `rgba(255,248,230,${0.85 * fade})`);
          grd.addColorStop(0.35, acc(0.35 * fade));
          grd.addColorStop(1, acc(0));
          ctx.strokeStyle = grd;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          ctx.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
          ctx.beginPath();
          ctx.arc(shoot.x, shoot.y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [accent]);

  return <canvas ref={canvasRef} className="overlay-space-canvas" aria-hidden="true" />;
}
