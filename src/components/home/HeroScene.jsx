"use client";

import { useEffect, useRef } from "react";
import { Box, Container } from "@mui/material";
import { color, layout } from "@/theme/tokens";

// The vocabulary of the work: short enough to sit inside a letter of the
// wordmark at 7px, specific enough that a reader recognises the field.
const WORDS = [
  "eval", "trace", "span", "p95", "top-k", "rerank", "embed", "chunk", "index", "agent",
  "tool", "retry", "guard", "prompt", "judge", "golden", "CI", "RAG", "BM25", "cost",
  "tokens", "cache", "queue", "router", "plan", "critic", "verify", "OTel", "vector", "hybrid",
  "context", "ground", "cite", "F1", "recall", "ablate", "label", "drift", "canary", "budget",
  "latency", "schema", "extract", "LoRA", "tune", "k=5", "fallback", "evals",
];

const COUNT = 420;
const FOCAL = 3.2; // perspective distance, in globe radii
const SPRING = 0.12; // how quickly a word chases its position — also the fly-in
const MORPH_FROM = 0.1; // share of the runway where the globe starts to become the wordmark
const MORPH_TO = 0.62; // …and where it has finished
const CRISP_FROM = 0.8; // morph progress where the words start being cut to the letters
const REACH = 90; // px around the cursor that words move away from
const PUSH = 34;
// Content box of /public/media/logo-ink.svg, in its own units.
const LOGO = { x: 2, y: 6.3, w: 83, h: 20.1 };

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

const readTheme = () => {
  const s = getComputedStyle(document.documentElement);
  const get = (name, fallback) => s.getPropertyValue(name).trim() || fallback;
  return {
    lime: get("--c-lime", "#14C9A5"),
    faint: get("--c-ink-faint", "#5B6270"),
    ink: get("--c-ink", "#11151C"),
    mono: get("--font-mono", "monospace"),
  };
};

/**
 * The hero, as a scene.
 *
 * A globe of words — the working vocabulary of the practice — turns slowly on
 * the right, nearer words larger and brighter. Words near the cursor move out
 * of its way. The copy sits on the left.
 *
 * Scroll, and the hero holds still (a sticky stage inside a taller runway)
 * while the copy lifts away and the words leave the globe and assemble into
 * the 14Labs wordmark — the "14" in teal and "Labs" in ink, sampled from the
 * logo file itself so the letters are the real ones. As they arrive the words
 * are cut to the letter outlines, over a faint fill of the logo, so the
 * wordmark reads as crisp letters made of words rather than as a cloud in
 * roughly the right shape. When the runway ends the wordmark scrolls up and
 * "Why 14Labs" follows it.
 *
 * All of it is one canvas and one rAF loop, paused whenever the stage is off
 * screen or the tab is hidden. Words are drawn with a per-word transform over
 * a single font setting, which keeps four hundred words cheap. Below `md` and
 * under reduced motion there is no runway: the globe simply sits under the copy
 * (and under reduced motion it does not turn).
 */
function HeroScene({ children, note }) {
  const runwayRef = useRef(null);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const text = textRef.current;
    const noteEl = noteRef.current;
    if (!runway || !wrap || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideQuery = window.matchMedia("(min-width: 900px)");

    let theme = readTheme();
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    const born = last;
    let spin = 0.6;
    let tiltX = 0;
    let tiltY = 0;
    let aimX = 0;
    let aimY = 0;
    let lastMove = -1e6;
    let targetSize = 7;
    let logoPaths = null;
    let markPath = null;
    let labsPath = null;
    let logoPath = null;
    const pointer = { x: -1e4, y: -1e4 };

    // Words on a Fibonacci sphere: even coverage, no clumps at the poles.
    const words = Array.from({ length: COUNT }, (_, i) => {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      return {
        ux: Math.cos(theta) * r,
        uy: y,
        uz: Math.sin(theta) * r,
        word: WORDS[(i * 7) % WORDS.length],
        big: Math.random() < 0.16,
        hot: Math.random() < 0.2,
        delay: Math.random() * 700,
        x: Math.random() * 1600,
        y: Math.random() * 900,
        tx: undefined,
        ty: undefined,
        onMark: false,
        size: 9,
        alpha: 0,
        intro: 0,
      };
    });

    // Fit the wordmark to the stage and give every word a place inside it.
    const layoutTargets = () => {
      if (!logoPaths || !W || !H) return;
      const width = Math.min(W * 0.64, 1000);
      const scale = width / LOGO.w;
      const ox = W / 2 - (LOGO.x + LOGO.w / 2) * scale;
      const oy = H * 0.46 - (LOGO.y + LOGO.h / 2) * scale;
      const fit = new DOMMatrix([scale, 0, 0, scale, ox, oy]);
      markPath = new Path2D();
      labsPath = new Path2D();
      logoPath = new Path2D();
      logoPaths.forEach(({ d, isMark }) => {
        const piece = new Path2D(d);
        (isMark ? markPath : labsPath).addPath(piece, fit);
        logoPath.addPath(piece, fit);
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const top = oy + LOGO.y * scale;
      const bottom = oy + (LOGO.y + LOGO.h) * scale;
      const left = ox + LOGO.x * scale;
      const right = ox + (LOGO.x + LOGO.w) * scale;

      // Words are wide, so columns are twice as far apart as rows. The step
      // is tuned over a couple of passes until the letters hold about as many
      // places as there are words.
      let step = Math.max(5, width / 95);
      let points = [];
      for (let pass = 0; pass < 4; pass++) {
        points = [];
        let row = 0;
        for (let y = top + step / 2; y < bottom; y += step, row++) {
          const shift = row % 2 ? step : 0;
          for (let x = left + shift; x < right; x += step * 2) {
            if (ctx.isPointInPath(markPath, x, y)) points.push({ x, y, mark: true });
            else if (ctx.isPointInPath(labsPath, x, y)) points.push({ x, y, mark: false });
          }
        }
        const ratio = points.length / COUNT;
        if (!points.length || (ratio > 0.92 && ratio < 1.12)) break;
        step *= Math.sqrt(ratio);
      }
      if (!points.length) return;

      targetSize = step * 0.8;
      points.sort((a, b) => a.x - b.x);
      words.forEach((w, i) => {
        const p = points[Math.floor((i / COUNT) * points.length)];
        w.tx = p.x;
        w.ty = p.y;
        w.onMark = p.mark;
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      layoutTargets();
    };

    // 0 while the stage first sticks, 1 as the runway runs out.
    const progress = () => {
      if (still || !wideQuery.matches) return 0;
      const rect = runway.getBoundingClientRect();
      const stage = window.innerHeight - layout.navHeight.md;
      const span = rect.height - stage;
      return span > 0 ? clamp01((layout.navHeight.md - rect.top) / span) : 0;
    };

    // One pass over every word, at `strength` of its current opacity.
    const paintWords = (m, strength) => {
      for (const w of words) {
        const k = w.size / 10;
        ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * w.x, dpr * w.y);
        const forming = w.tx !== undefined && m > 0;
        // Globe colours fade out as wordmark colours fade in.
        if (m < 1) {
          ctx.globalAlpha = w.alpha * (1 - m) * w.intro * strength;
          ctx.fillStyle = w.hot ? theme.lime : theme.faint;
          ctx.fillText(w.word, 0, 0);
        }
        if (forming) {
          ctx.globalAlpha = w.alpha * m * w.intro * strength;
          ctx.fillStyle = w.onMark ? theme.lime : theme.ink;
          ctx.fillText(w.word, 0, 0);
        }
      }
    };

    const draw = (now) => {
      if (!W || !H) return;
      const dt = Math.min(64, now - last);
      last = now;

      const p = progress();
      const m = ease(clamp01((p - MORPH_FROM) / (MORPH_TO - MORPH_FROM)));
      const crisp = logoPath ? ease(clamp01((m - CRISP_FROM) / (1 - CRISP_FROM))) : 0;

      // The copy lifts away over the first stretch of the runway.
      if (text) {
        const f = ease(clamp01(p / 0.28));
        text.style.opacity = f ? String(1 - f) : "";
        text.style.transform = f ? `translate3d(0, ${(-f * 90).toFixed(1)}px, 0)` : "";
        text.style.visibility = f > 0.98 ? "hidden" : "";
      }
      if (noteEl) noteEl.style.opacity = String(1 - ease(clamp01(p / 0.12)));

      if (!still) {
        spin += dt * 0.00016 * (1 - m);
        const idle = now - lastMove > 2500;
        tiltY += ((idle ? 0 : aimY) - tiltY) * 0.05;
        tiltX += ((idle ? Math.sin(now * 0.0003) * 0.12 : aimX) - tiltX) * 0.05;
      }

      const wide = wideQuery.matches;
      const cx = wide ? W * 0.74 : W / 2;
      const cy = H * 0.5;
      const R = wide ? Math.min(W * 0.2, H * 0.36) : Math.min(W, H) * 0.42;
      const cosY = Math.cos(spin + tiltY);
      const sinY = Math.sin(spin + tiltY);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      // Where every word is, how big and how bright.
      for (const w of words) {
        // Turn about the vertical axis, then tip about the horizontal one.
        const x1 = w.ux * cosY + w.uz * sinY;
        const z1 = -w.ux * sinY + w.uz * cosY;
        const y1 = w.uy * cosX - z1 * sinX;
        const z2 = w.uy * sinX + z1 * cosX;
        const s = FOCAL / (FOCAL - z2);
        const front = (z2 + 1) / 2;

        const gx = cx + x1 * R * s;
        const gy = cy + y1 * R * s;
        const gSize = (w.big ? 13.5 : 9) * s * (0.6 + 0.4 * front);
        const gAlpha = 0.07 + 0.93 * Math.pow(front, 1.8);

        const forming = w.tx !== undefined && m > 0;
        let hx = forming ? lerp(gx, w.tx, m) : gx;
        let hy = forming ? lerp(gy, w.ty, m) : gy;

        if (!still) {
          const dx = hx - pointer.x;
          const dy = hy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH * REACH) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / REACH) * PUSH;
            hx += (dx / d) * f;
            hy += (dy / d) * f;
          }
          w.x += (hx - w.x) * SPRING;
          w.y += (hy - w.y) * SPRING;
        } else {
          w.x = hx;
          w.y = hy;
        }

        w.size = forming ? lerp(gSize, targetSize, m) : gSize;
        w.alpha = forming ? lerp(gAlpha, 0.95, m) : gAlpha;
        w.intro = still ? 1 : clamp01((now - born - w.delay) / 900);
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `500 10px ${theme.mono}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Free-flying words, fading out as the letters take over.
      if (crisp < 1) paintWords(m, 1 - crisp);

      if (crisp > 0) {
        // A faint fill of the real letters, then the words again, cut to them.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = 0.09 * crisp;
        ctx.fillStyle = theme.lime;
        ctx.fill(markPath);
        ctx.globalAlpha = 0.06 * crisp;
        ctx.fillStyle = theme.ink;
        ctx.fill(labsPath);

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clip(logoPath);
        paintWords(m, crisp);
        ctx.restore();
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
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    if (still) draw(performance.now());
    else play();

    // The wordmark's own paths: teal ones are the "14", the rest are "Labs".
    let cancelled = false;
    fetch("/media/logo-ink.svg")
      .then((res) => res.text())
      .then((svg) => {
        if (cancelled) return;
        const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
        logoPaths = [...doc.querySelectorAll("path")].map((path) => ({
          d: path.getAttribute("d"),
          isMark: (path.getAttribute("fill") || "").toUpperCase() === "#00D3B1",
        }));
        layoutTargets();
      })
      .catch(() => {});

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) play();
      else pause();
    });
    io.observe(wrap);

    const onVisibility = () => (document.hidden || !visible ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    let sized = false;
    const ro = new ResizeObserver(() => {
      if (!sized) {
        sized = true;
        return;
      }
      resize();
      if (still) draw(performance.now());
    });
    ro.observe(wrap);

    const mo = new MutationObserver(() => {
      theme = readTheme();
      if (still) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onMove = (event) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      aimY = Math.max(-1, Math.min(1, (pointer.x / rect.width - 0.5) * 2)) * 0.5;
      aimX = -Math.max(-1, Math.min(1, (pointer.y / rect.height - 0.5) * 2)) * 0.3;
      lastMove = performance.now();
    };
    const onLeave = () => {
      pointer.x = -1e4;
      pointer.y = -1e4;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelled = true;
      pause();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (text) text.style.cssText = "";
    };
  }, []);

  const DOT_FIELD = "radial-gradient(ellipse 75% 65% at 50% 45%, #000 15%, transparent 78%)";

  return (
    <Box
      ref={runwayRef}
      component="section"
      aria-label="Introduction"
      sx={{
        position: "relative",
        height: { md: "210vh" },
        "@media (prefers-reduced-motion: reduce)": { height: "auto" },
      }}
    >
      <Box
        sx={{
          position: { md: "sticky" },
          top: { md: `${layout.navHeight.md}px` },
          height: { md: `calc(100vh - ${layout.navHeight.md}px)` },
          minHeight: { md: 620 },
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
          "@media (prefers-reduced-motion: reduce)": { position: "relative", height: "auto", py: 10 },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `radial-gradient(${color.ruleStrong} 1px, transparent 1.4px)`,
            backgroundSize: "26px 26px",
            maskImage: DOT_FIELD,
            WebkitMaskImage: DOT_FIELD,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `radial-gradient(30% 45% at 74% 50%, color-mix(in srgb, ${color.lime} 12%, transparent), transparent 72%)`,
          }}
        />

        <Container sx={{ position: "relative", zIndex: 1, pt: { xs: 6, md: 0 } }}>
          <Box ref={textRef} sx={{ maxWidth: { md: "56%", lg: "54%" } }}>
            {children}
          </Box>
        </Container>

        <Box
          ref={wrapRef}
          aria-hidden
          sx={{
            position: { xs: "relative", md: "absolute" },
            inset: { md: 0 },
            height: { xs: 340, md: "auto" },
            mt: { xs: 2, md: 0 },
            pointerEvents: "none",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </Box>

        {note ? (
          <Box
            ref={noteRef}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "absolute",
              left: "56%",
              bottom: "9%",
              zIndex: 1,
              pointerEvents: "none",
              "@media (hover: none)": { display: "none" },
            }}
          >
            {note}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default HeroScene;
