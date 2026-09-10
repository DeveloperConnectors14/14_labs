"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const COLS = 72;
const ROWS = 24;
const Z_NEAR = 1.2;
const Z_FAR = 7.5;
const CAMERA = 1.5; // camera height above the surface, in world units

const readColor = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--c-lime").trim() || "#14C9A5";

/**
 * A field of points laid on a slowly rolling surface, seen in perspective —
 * the ground the closing card stands on.
 *
 * A grid in world space, heights from three overlapping sine waves, projected
 * with a pinhole camera: nearer rows spread wider, draw larger and brighter,
 * and the far rows fade into the card. Drawn back to front on one canvas,
 * paused whenever it is off screen or the tab is hidden. Under reduced motion
 * it draws once, still.
 */
function DotWave({ sx }) {
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
    let raf = 0;
    let running = false;
    let visible = false;
    let colour = readColor();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    };

    const draw = (now) => {
      if (!W || !H) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const t = still ? 0 : now;
      const fx = W * 0.3;
      const fy = H * 0.62;
      const horizon = H * 0.08;
      ctx.fillStyle = colour;

      for (let j = ROWS - 1; j >= 0; j--) {
        const z = Z_NEAR + (j / (ROWS - 1)) * (Z_FAR - Z_NEAR);
        const near = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR);
        ctx.globalAlpha = 0.1 + 0.8 * near * near;
        const r = Math.max(0.5, 2.1 / z);

        for (let i = 0; i < COLS; i++) {
          const x = (i / (COLS - 1) - 0.5) * 14;
          const px = W / 2 + (x / z) * fx;
          if (px < -4 || px > W + 4) continue;
          const y =
            0.26 * Math.sin(x * 0.75 + t * 0.0008) +
            0.2 * Math.sin(z * 1.25 - t * 0.0011) +
            0.1 * Math.sin((x + z) * 1.6 + t * 0.0005);
          const py = horizon + ((CAMERA - y) / z) * fy;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
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

    resize();
    draw(performance.now());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) play();
      else pause();
    });
    io.observe(wrap);

    const onVisibility = () => (document.hidden || !visible ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(wrap);

    const mo = new MutationObserver(() => {
      colour = readColor();
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <Box ref={wrapRef} aria-hidden sx={{ pointerEvents: "none", ...sx }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </Box>
  );
}

export default DotWave;
