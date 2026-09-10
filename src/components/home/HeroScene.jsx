"use client";

import { useEffect, useRef } from "react";
import { Box, Container } from "@mui/material";
import { color, layout } from "@/theme/tokens";

// The vocabulary of the field, and only the field: short enough to stay small
// in the cloud and to settle cleanly into the letters of the wordmark.
const WORDS = [
  "LLM", "RAG", "agent", "prompt", "tokens", "embedding", "attention", "RLHF", "LoRA", "logits",
  "softmax", "eval", "rerank", "top-k", "few-shot", "grounding", "retrieval", "vector", "context",
  "fine-tune", "inference", "latent", "encoder", "decoder", "MoE", "distill", "quantize",
  "reasoning", "planner", "tool use", "guardrail", "benchmark", "recall@k", "BM25", "hybrid",
  "chunking", "judge", "trace", "span", "sampling", "KV cache", "RoPE", "SFT", "DPO", "reward",
  "policy", "CLIP", "classifier", "gradient", "loss", "epoch", "dataset", "ablation", "F1",
];

const COUNT = 420;
const FOCAL = 3.2; // perspective distance, in cloud radii
const VIEW_TILT = 0.25; // the cloud is seen from a little above
const SPRING = 0.16; // how quickly a word chases its position — also the fly-in
const FOLLOW = 0.12; // how quickly the scene follows the scroll position
const MORPH_FROM = 0.1; // share of the runway where words start leaving the cloud
const MORPH_TO = 0.86; // …and where the last of them has arrived
const SETTLE_FROM = 0.8; // where a faint body starts to show under the letters
const SETTLE_TO = 0.97; // …and where it is at full strength
const SPILL = 0.3; // how much of each word still shows past the letter edges
const REACH = 90; // px around the cursor that words move away from
const PUSH = 28;
// Content box of /public/media/logo-ink.svg, in its own units, and where its
// letters sit: the baseline and the cap height of the "L".
const LOGO = { x: 2, y: 6.3, w: 83, h: 20.1, baseline: 26, cap: 19.2 };

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => t * t * (3 - 2 * t);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// A lumpy radius, so the cloud's outline is never a clean circle.
const lump = (x, y, z) =>
  1 +
  0.26 * Math.sin(2.4 * x + 0.8) * Math.cos(1.9 * y - 0.3) +
  0.18 * Math.sin(3.3 * z + 1.7) +
  0.1 * Math.cos(4.1 * x * y + 0.5);

const readTheme = () => {
  const s = getComputedStyle(document.documentElement);
  const get = (name, fallback) => s.getPropertyValue(name).trim() || fallback;
  return {
    lime: get("--c-lime", "#14C9A5"),
    faint: get("--c-ink-faint", "#5B6270"),
    ink: get("--c-ink", "#11151C"),
    sans: get("--font-sans", "sans-serif"),
    // Dark words on a light ground render thinner than light on dark, so the
    // letters need more body under them in the light theme to read as well.
    underlay: document.documentElement.getAttribute("data-theme") === "dark" ? 0.2 : 0.38,
  };
};

/**
 * The hero, as a scene — and the heading of the section after it.
 *
 * A loose cloud of small words, the working vocabulary of AI engineering,
 * turns slowly on the right: a lumpy shape seen from a little above, nearer
 * words brighter, each word set from its left edge and bobbing a little on its
 * own. Words near the cursor move out of its way.
 *
 * Scroll, and the hero holds still (a sticky stage inside a taller runway)
 * while the copy lifts away and the words stream out of the cloud — each on
 * its own slight delay — and settle, at the foot of the stage on the page's
 * text column, into the 14Labs wordmark, with "Why" setting in beside it. The
 * wordmark stays made of them: as the last words arrive they are trimmed to the
 * letter shapes over a faint body, with a little of each still spilling past
 * the edges — rough on purpose, so it reads as built from the hero, the "14" in
 * teal and "Labs" in ink. The heading is finished as the stage lets go, and the
 * Why 14Labs statement follows directly underneath.
 *
 * Smoothness is the point, so nothing in it is tied to a raw scroll event: the
 * scene eases towards the scroll position every frame (FOLLOW), every word
 * springs towards its place (SPRING), and each word's journey is eased in and
 * out. One canvas, one rAF loop, paused whenever the stage is off screen or
 * the tab is hidden. Below `md` and under reduced motion there is no runway:
 * the cloud simply sits under the copy (and under reduced motion it does not
 * move).
 */
function HeroScene({ children, note }) {
  const runwayRef = useRef(null);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const noteRef = useRef(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const text = textRef.current;
    const noteEl = noteRef.current;
    const anchor = anchorRef.current;
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
    let shown = 0; // the scroll progress the scene is showing, eased
    let targetSize = 3;
    let logoPaths = null;
    let markPath = null;
    let labsPath = null;
    let lettersPath = null;
    // Where "Why" is set, beside the wordmark.
    const why = { x: 0, baseline: 0, size: 0 };
    const pointer = { x: -1e4, y: -1e4 };

    // Directions from a Fibonacci sphere, pushed out to a lumpy radius and
    // spread through the volume, then stretched a little wider than tall.
    const words = Array.from({ length: COUNT }, (_, i) => {
      const dy = 1 - (i / (COUNT - 1)) * 2;
      const ring = Math.sqrt(1 - dy * dy);
      const theta = i * 2.399963;
      const dx = Math.cos(theta) * ring;
      const dz = Math.sin(theta) * ring;
      const r = lump(dx, dy, dz) * (0.5 + 0.5 * Math.sqrt(Math.random()));
      return {
        ux: dx * r * 1.2,
        uy: dy * r * 0.88,
        uz: dz * r,
        word: WORDS[(i * 11) % WORDS.length],
        big: Math.random() < 0.12,
        hot: Math.random() < 0.18,
        phase: Math.random() * Math.PI * 2,
        delay: Math.random() * 700,
        lag: Math.random(), // when, within the morph, this word sets off
        x: Math.random() * 1600,
        y: Math.random() * 900,
        tx: undefined,
        ty: undefined,
        onMark: false,
        journey: 0,
        size: 7,
        alpha: 0,
        intro: 0,
      };
    });

    // Fit "Why 14Labs" to the foot of the stage, on the text column, at
    // section-heading size, and give every word a place in the wordmark.
    const layoutTargets = () => {
      if (!logoPaths || !W || !H) return;
      const wrapRect = wrap.getBoundingClientRect();
      const columnLeft = anchor ? anchor.getBoundingClientRect().left - wrapRect.left : W * 0.06;

      const scale = Math.min(W * 0.28, 420) / LOGO.w;
      const capPx = LOGO.cap * scale;
      why.size = capPx / 0.72; // Instrument Sans' cap height is about 0.72em
      why.baseline = H * 0.88;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = `400 ${why.size}px ${theme.sans}`;
      why.x = columnLeft;
      const whyWidth = ctx.measureText("Why ").width;

      const ox = columnLeft + whyWidth - LOGO.x * scale;
      const oy = why.baseline - LOGO.baseline * scale;
      const fit = new DOMMatrix([scale, 0, 0, scale, ox, oy]);
      markPath = new Path2D();
      labsPath = new Path2D();
      logoPaths.forEach(({ d, isMark }) => (isMark ? markPath : labsPath).addPath(new Path2D(d), fit));
      lettersPath = new Path2D();
      lettersPath.addPath(markPath);
      lettersPath.addPath(labsPath);

      const top = oy + LOGO.y * scale;
      const bottom = oy + (LOGO.y + LOGO.h) * scale;
      const left = ox + LOGO.x * scale;
      const right = ox + (LOGO.x + LOGO.w) * scale;

      // Places inside the letters, on a grid tuned over a few passes until it
      // holds about as many places as there are words.
      let step = Math.max(1.5, (LOGO.w * scale) / 95);
      let points = [];
      for (let pass = 0; pass < 5; pass++) {
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

      // At heading size the words are packed a little tighter than the grid,
      // so they overlap into a dense, rough texture that fills each letter.
      targetSize = Math.max(3, step * 1.25);
      points.sort((a, b) => a.x - b.x);
      words.forEach((w, i) => {
        const p = points[Math.floor((i / COUNT) * points.length)];
        w.tx = p.x - step * 0.4;
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

    const draw = (now) => {
      if (!W || !H) return;
      const dt = Math.min(64, now - last);
      last = now;

      // Follow the scroll position smoothly rather than jumping with it.
      const target = progress();
      shown = still ? target : shown + (target - shown) * FOLLOW;
      if (Math.abs(target - shown) < 0.0004) shown = target;
      const p = shown;

      const m = clamp01((p - MORPH_FROM) / (MORPH_TO - MORPH_FROM));
      const settle = markPath ? ease(clamp01((p - SETTLE_FROM) / (SETTLE_TO - SETTLE_FROM))) : 0;
      const whyIn = ease(clamp01((p - 0.5) / 0.35));

      // The copy lifts away over the first stretch of the runway.
      if (text) {
        const f = ease(clamp01(p / 0.3));
        text.style.opacity = f ? String(1 - f) : "";
        text.style.transform = f ? `translate3d(0, ${(-f * 70).toFixed(1)}px, 0)` : "";
        text.style.visibility = f > 0.98 ? "hidden" : "";
      }
      if (noteEl) noteEl.style.opacity = String(1 - ease(clamp01(p / 0.12)));

      if (!still) {
        spin += dt * 0.00013 * (1 - m);
        const idle = now - lastMove > 2500;
        tiltY += ((idle ? 0 : aimY) - tiltY) * 0.05;
        tiltX += ((idle ? Math.sin(now * 0.0003) * 0.08 : aimX) - tiltX) * 0.05;
      }

      const wide = wideQuery.matches;
      const cx = wide ? W * 0.72 : W * 0.46;
      const cy = H * 0.5;
      const R = wide ? Math.min(W * 0.2, H * 0.38) : Math.min(W, H) * 0.38;
      const cosY = Math.cos(spin + tiltY);
      const sinY = Math.sin(spin + tiltY);
      const cosX = Math.cos(VIEW_TILT + tiltX);
      const sinX = Math.sin(VIEW_TILT + tiltX);

      // Where every word is, how big and how bright.
      for (const w of words) {
        // Turn about the vertical axis, then tip about the horizontal one.
        const x1 = w.ux * cosY + w.uz * sinY;
        const z1 = -w.ux * sinY + w.uz * cosY;
        const y1 = w.uy * cosX - z1 * sinX;
        const z2 = w.uy * sinX + z1 * cosX;
        const s = FOCAL / (FOCAL - z2);
        const front = clamp01((z2 + 1.2) / 2.4);

        // Each word drifts a little on its own, so the cloud breathes.
        const bob = still ? 0 : Math.sin(now * 0.0007 + w.phase) * 3;
        const gx = cx + x1 * R * s;
        const gy = cy + y1 * R * s + bob;
        const gSize = (w.big ? 9.5 : 6.5) * s * (0.6 + 0.4 * front);
        const gAlpha = 0.06 + 0.94 * Math.pow(front, 1.7);

        // Each word's own journey, staggered and eased in and out.
        const forming = w.tx !== undefined;
        const j = forming ? easeInOut(clamp01(m * 1.4 - w.lag * 0.4)) : 0;
        w.journey = j;

        let hx = lerp(gx, forming ? w.tx : gx, j);
        let hy = lerp(gy, forming ? w.ty : gy, j);

        if (!still) {
          // The cursor stops disturbing a word as it settles.
          const reach = 1 - j;
          const dx = hx - pointer.x;
          const dy = hy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (reach > 0 && d2 < REACH * REACH) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / REACH) * PUSH * reach;
            hx += (dx / d) * f;
            hy += (dy / d) * f;
          }
          w.x += (hx - w.x) * SPRING;
          w.y += (hy - w.y) * SPRING;
        } else {
          w.x = hx;
          w.y = hy;
        }

        w.size = lerp(gSize, targetSize, j);
        w.alpha = lerp(gAlpha, 1, j);
        w.intro = still ? 1 : clamp01((now - born - w.delay) / 900);
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `500 10px ${theme.sans}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      // The words — cloud colours fading into wordmark colours along each
      // word's journey, and all of them fading into the letters at the end.
      // Near the end they are also trimmed to the letter outlines, so the
      // shapes read crisply before they ink in.
      const crisp = markPath ? ease(clamp01((m - 0.72) / 0.28)) : 0;
      const drawWords = (weight, arrivedOnly) => {
        for (const w of words) {
          if (arrivedOnly && w.journey <= 0) continue;
          const k = w.size / 10;
          ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * w.x, dpr * w.y);
          const base = w.alpha * w.intro * weight;
          if (w.journey < 1) {
            ctx.globalAlpha = base * (1 - w.journey);
            ctx.fillStyle = w.hot ? theme.lime : theme.faint;
            ctx.fillText(w.word, 0, 0);
          }
          if (w.journey > 0) {
            ctx.globalAlpha = base * w.journey;
            ctx.fillStyle = w.onMark ? theme.lime : theme.ink;
            ctx.fillText(w.word, 0, 0);
          }
        }
      };
      // A faint body under the letters, so the wordmark reads at a glance
      // while the words stay the thing it is made of.
      if (settle > 0) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = settle * theme.underlay;
        ctx.fillStyle = theme.lime;
        ctx.fill(markPath);
        ctx.fillStyle = theme.ink;
        ctx.fill(labsPath);
      }
      // Loose words everywhere until the letters take shape; once they have,
      // a little of that looseness is left spilling past the edges.
      drawWords(1 - crisp * (1 - SPILL), false);
      if (crisp > 0) {
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clip(lettersPath);
        drawWords(crisp, true);
        ctx.restore();
      }

      // "Why", setting in beside the wordmark as it forms.
      if (whyIn > 0 && why.size) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = whyIn;
        ctx.fillStyle = theme.ink;
        ctx.font = `400 ${why.size}px ${theme.sans}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText("Why", why.x, why.baseline + (1 - whyIn) * 10);
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
    shown = progress(); // a reload mid-runway starts where the page is
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
        // The heading is measured in the page font, so wait for it.
        document.fonts.ready.then(() => {
          if (!cancelled) layoutTargets();
        });
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
      aimY = Math.max(-1, Math.min(1, (pointer.x / rect.width - 0.5) * 2)) * 0.45;
      aimX = -Math.max(-1, Math.min(1, (pointer.y / rect.height - 0.5) * 2)) * 0.18;
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
        height: { md: "200vh" },
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
            backgroundImage: `radial-gradient(30% 45% at 72% 50%, color-mix(in srgb, ${color.lime} 11%, transparent), transparent 72%)`,
          }}
        />

        <Container sx={{ position: "relative", zIndex: 1, pt: { xs: 6, md: 0 } }}>
          {/* Marks the text column's left edge, which the heading lines up on. */}
          <Box ref={anchorRef} aria-hidden sx={{ height: 0 }} />
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
              bottom: "8%",
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
