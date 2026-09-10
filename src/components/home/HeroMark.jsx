"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

// The "14" exactly as drawn in /public/media/logo.svg, so the mark in the hero
// is the logo and not an approximation of it.
const MARK = [
  "M12.269 6.81918L9.08467 26H4.45804L6.93057 11.1461H6.81818L2.08854 13.7685L2.74413 9.75999L7.97016 6.81918H12.269Z",
  "M12.1309 22.5854L12.8052 18.5395L22.5454 6.40161H26.2168L25.3177 11.7962H23.2198L17.975 18.3896L17.9376 18.5395H23.8941L23.2198 22.5854H12.1309Z",
];
const BOUNDS = { x: 2.08, y: 6.4, w: 24.14, h: 19.62 };

const INTRO_MS = 1200;
const REACH = 70; // how far the cursor pushes, in px
const PUSH = 22;
const FOCAL = 900; // perspective distance, in px
const TILT_Y = 0.42; // furthest the mark turns left or right, radians
const TILT_X = 0.24; // furthest it tips up or down
const IDLE_MS = 2200; // after this long without the pointer, it sways on its own

// Teal for most points, the primary for about a quarter — navy on the light
// page, white on the dark one — read live from the theme variables.
const readColors = () => {
  const s = getComputedStyle(document.documentElement);
  return [
    s.getPropertyValue("--c-lime").trim() || "#14C9A5",
    s.getPropertyValue("--c-primary").trim() || "#0B1B36",
  ];
};

/**
 * The 14Labs mark, made of points, in three dimensions.
 *
 * The logo's paths are sampled on a jittered grid and every point is given a
 * depth, so the "14" is a slab of points rather than a picture of one. It is
 * turned in 3D towards the cursor — anywhere on the page, not just over the
 * mark — and projected with perspective: nearer points draw larger and
 * brighter, so the tilt reads as depth, not as a skew. Left alone it sways
 * slowly on its own.
 *
 * On first paint the points are scattered; they fly in and settle into the
 * mark. Under the cursor they part and spring back. One canvas, one rAF loop,
 * paused whenever the mark is off screen or the tab is hidden. Under reduced
 * motion it draws once, face on and assembled, and never animates.
 *
 * It is hand-rolled rather than three.js: a few hundred lines of maths is
 * lighter than a 3D engine for a thousand dots.
 */
function HeroMark({ sx }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let points = [];
    let colors = readColors();
    let raf = 0;
    let running = false;
    let visible = true;
    let introAt = performance.now();
    let tiltX = 0;
    let tiltY = 0;
    let aimX = 0;
    let aimY = 0;
    let lastMove = -1e6;
    const pointer = { x: -1e4, y: -1e4 };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (!W || !H) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      const scale = Math.min(W / BOUNDS.w, H / BOUNDS.h) * 0.84;
      const ox = (W - BOUNDS.w * scale) / 2 - BOUNDS.x * scale;
      const oy = (H - BOUNDS.h * scale) / 2 - BOUNDS.y * scale;
      const path = new Path2D();
      const fit = new DOMMatrix([scale, 0, 0, scale, ox, oy]);
      MARK.forEach((d) => path.addPath(new Path2D(d), fit));

      // Sampling happens with the identity transform, so the path and the
      // probe points are both in CSS pixels.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const step = Math.max(6, Math.round(W / 60));
      const depth = Math.min(W, H) * 0.075;
      const next = [];
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          const tx = x + (Math.random() - 0.5) * step * 0.45;
          const ty = y + (Math.random() - 0.5) * step * 0.45;
          if (!ctx.isPointInPath(path, tx, ty)) continue;
          const sx0 = Math.random() * W;
          const sy0 = Math.random() * H;
          next.push({
            lx: tx - W / 2,
            ly: ty - H / 2,
            lz: (Math.random() * 2 - 1) * depth,
            x: sx0,
            y: sy0,
            sx: sx0,
            sy: sy0,
            r: step * 0.17 + Math.random() * step * 0.1,
            tone: Math.random() < 0.26 ? 1 : 0,
            phase: Math.random() * Math.PI * 2,
            delay: (tx / W) * 520 + Math.random() * 380,
          });
        }
      }
      points = next;
    };

    const draw = (now) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const t = now - introAt;

      if (!still) {
        const idle = now - lastMove > IDLE_MS;
        const wantY = idle ? Math.sin(now * 0.00045) * 0.26 : aimY;
        const wantX = idle ? Math.sin(now * 0.00031 + 1.3) * 0.08 : aimX;
        tiltY += (wantY - tiltY) * 0.05;
        tiltX += (wantX - tiltX) * 0.05;
      }
      const cY = Math.cos(tiltY);
      const sY = Math.sin(tiltY);
      const cX = Math.cos(tiltX);
      const sX = Math.sin(tiltX);

      for (const p of points) {
        // Turn about the vertical axis, then tip about the horizontal one.
        const x1 = p.lx * cY + p.lz * sY;
        const z1 = -p.lx * sY + p.lz * cY;
        const y1 = p.ly * cX - z1 * sX;
        const z2 = p.ly * sX + z1 * cX;
        const s = FOCAL / (FOCAL + z2);

        let hx = W / 2 + x1 * s;
        let hy = H / 2 + y1 * s;

        const k = still ? 1 : Math.min(1, Math.max(0, (t - p.delay) / INTRO_MS));
        const e = 1 - Math.pow(1 - k, 3);

        if (!still) {
          hx += Math.sin(now * 0.0011 + p.phase) * 0.7;
          hy += Math.cos(now * 0.0009 + p.phase) * 0.7;
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH * REACH) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / REACH) * PUSH;
            hx += (dx / d) * f;
            hy += (dy / d) * f;
          }
        }

        if (k < 1) {
          p.x = p.sx + (hx - p.sx) * e;
          p.y = p.sy + (hy - p.sy) * e;
        } else {
          p.x += (hx - p.x) * 0.14;
          p.y += (hy - p.y) * 0.14;
        }

        // Nearer is brighter: the depth cue that makes the tilt read as 3D.
        // Floored at a half so the far side of the mark dims but never
        // disappears — the "1" has to stay legible when the mark turns away.
        const shade = Math.min(1, Math.max(0.5, 0.72 + (s - 1) * 4));
        ctx.globalAlpha = (still ? 1 : 0.15 + 0.85 * e) * shade;
        ctx.fillStyle = colors[p.tone];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now) => {
      draw(now);
      raf = running ? requestAnimationFrame(loop) : 0;
    };
    const play = () => {
      if (running || still) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    if (still) draw(performance.now());
    else play();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) play();
      else pause();
    });
    io.observe(wrap);

    const onVisibility = () => (document.hidden || !visible ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    // The first callback is the initial size, already built above.
    let sized = false;
    const ro = new ResizeObserver(() => {
      if (!sized) {
        sized = true;
        return;
      }
      build();
      introAt = -1e6; // no second fly-in: the points spring straight home
      if (still) draw(performance.now());
    });
    ro.observe(wrap);

    const mo = new MutationObserver(() => {
      colors = readColors();
      if (still) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Tilt follows the pointer anywhere on the page; the push only reaches
    // points near it.
    const onMove = (event) => {
      const rect = wrap.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.x = x;
      pointer.y = y;
      const nx = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));
      aimY = nx * TILT_Y;
      aimX = -ny * TILT_X;
      lastMove = performance.now();
    };
    const onLeave = () => {
      pointer.x = -1e4;
      pointer.y = -1e4;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <Box ref={wrapRef} aria-hidden sx={{ position: "relative", touchAction: "pan-y", ...sx }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </Box>
  );
}

export default HeroMark;
