"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { heroDefocus, layout } from "@/theme/tokens";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Smoothstep. A linear ramp makes the blur arrive too fast at the top of the
 *  scroll and then crawl; this front-loads nothing and back-loads nothing. */
const ease = (t) => t * t * (3 - 2 * t);

/**
 * Pins a hero to the top of the viewport and pulls it out of focus as the page
 * scrolls over it — the depth-of-field move fin.ai opens with.
 *
 * Mechanically it is one sticky element and one scroll handler. The sections
 * after it are the ones that move; this stays put, going soft, until they have
 * covered it. That means everything downstream has to sit on an opaque
 * background above this in the stacking order — see the wrapper in page.jsx.
 *
 * Three things it deliberately does not do:
 *   - run below `md`, where a pinned hero costs a screen of scrolling and the
 *     blur is a pure GPU tax on the weakest devices;
 *   - run under `prefers-reduced-motion`, where scroll-linked transforms are
 *     exactly what the setting is asking us not to do;
 *   - keep compositing once it is hidden — past the end of the runway the
 *     element is taken out of painting entirely, so a 13px blur is not being
 *     maintained on a layer nobody can see for the rest of the page.
 */
function DefocusOnScroll({ children, sx }) {
  const stageRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  // Both conditions are watched, not sampled once. Sampling on mount leaves a
  // desktop visitor who narrows the window with a hero that is still being
  // blurred by script while CSS has already dropped it out of `sticky` — so it
  // scrolls away out of focus, which looks like a bug rather than an effect.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 900px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(wide.matches && !still.matches);

    sync();
    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);

    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = stageRef.current;
    if (!enabled || !el) return undefined;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const runway = window.innerHeight * heroDefocus.runway;
      const raw = Math.min(1, Math.max(0, window.scrollY / runway));
      const t = ease(raw);

      if (raw >= 0.995) {
        el.style.visibility = "hidden";
        return;
      }

      el.style.visibility = "visible";
      el.style.filter = `blur(${(t * heroDefocus.blurMax).toFixed(2)}px)`;
      el.style.opacity = (1 - t * (1 - heroDefocus.opacityMin)).toFixed(3);
      el.style.transform = `translate3d(0, ${(t * heroDefocus.liftMax).toFixed(
        1
      )}px, 0) scale(${(1 - t * (1 - heroDefocus.scaleMin)).toFixed(4)})`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.cssText = "";
    };
  }, [enabled]);

  return (
    <Box
      component="section"
      sx={{
        position: { md: "sticky" },
        top: { md: `${layout.navHeight.md}px` },
        zIndex: 0,
        ...sx,
      }}
    >
      <Box
        ref={stageRef}
        sx={{
          // Only promoted while the effect is live. Hinting a filter layer on
          // a static hero would cost memory and buy nothing.
          willChange: enabled ? "filter, transform, opacity" : "auto",
          transformOrigin: "50% 30%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DefocusOnScroll;
