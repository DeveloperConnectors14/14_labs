"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A figure like "15+" or "95%" that counts up from zero the first time it is
 * mostly on screen.
 *
 * The server renders the real value, so without JavaScript — and for search
 * engines — the number is simply correct. On mount it is set to zero (a direct
 * DOM write, no re-render) and GSAP runs it back up when it is seen. Under
 * reduced motion it never moves.
 */
function CountUp({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const match = /^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/.exec(value);
    if (!el || !match) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const [, before, number, after] = match;
    const target = parseFloat(number);
    const decimals = number.includes(".") ? number.split(".")[1].length : 0;
    const write = (v) => {
      el.textContent = `${before}${v.toFixed(decimals)}${after}`;
    };

    write(0);
    let tween = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const state = { v: 0 };
        tween = gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => write(state.v),
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (tween) tween.kill();
      el.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export default CountUp;
