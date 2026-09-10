"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Light smoothing on wheel scrolling, site-wide.
 *
 * `lerp` is the whole dial: 0.1 is Lenis's default and already reads as a
 * glide; 0.14 keeps the page feeling eased without the half-second lag that
 * makes heavy smooth-scroll sites feel like wading. Touch is left native —
 * phones already scroll with momentum, and re-simulating it feels wrong.
 *
 * Nothing runs under prefers-reduced-motion. The page scrolls natively, which
 * is exactly what the setting asks for.
 */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      anchors: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}

export default SmoothScroll;
