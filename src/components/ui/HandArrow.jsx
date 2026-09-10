"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Box } from "@mui/material";
import { color } from "@/theme/tokens";

/**
 * A pencil arrow that draws itself the first time it comes into view — the
 * stroke runs from tail to tip, then the head is flicked on, the way a hand
 * would do it.
 *
 * Pencil, not pen: an SVG filter roughens the edge (displacement) and breaks
 * the stroke up into graphite grain (noise used as an alpha mask). A second,
 * fainter pass offset by under a pixel is the doubled line a real pencil
 * leaves. `pathLength="1"` lets the dash animation work on any path without
 * measuring it.
 *
 * Under reduced motion the global transition collapse in globals.css makes
 * the arrow appear already drawn.
 *
 *   loop    sweeps left with a small curl, lands pointing down
 *   sweep   a long fall from the top right, lands pointing left
 *   rise    starts low on the left, climbs right, lands pointing up
 *   reach   a shallow belly from left to right, lands pointing right
 */
const PATHS = {
  loop: {
    viewBox: "0 0 200 150",
    d: "M190 36 C 160 8, 104 4, 80 30 C 64 48, 74 70, 92 64 C 108 58, 104 36, 84 38 C 56 42, 40 74, 36 128",
    head: "M23 113 L 36 130 L 50 116",
  },
  sweep: {
    viewBox: "0 0 110 190",
    d: "M84 6 C 118 54, 112 132, 30 176",
    head: "M44 159 L 28 178 L 53 183",
  },
  rise: {
    viewBox: "0 0 160 120",
    d: "M8 104 C 42 114, 94 106, 120 72 C 134 52, 138 32, 133 12",
    head: "M120 25 L 133 9 L 146 24",
  },
  reach: {
    viewBox: "0 0 160 80",
    d: "M6 30 C 30 66, 92 74, 142 44",
    head: "M126 33 L 144 43 L 130 59",
  },
};

const ease = "cubic-bezier(0.65, 0, 0.35, 1)";

function HandArrow({ variant = "loop", delay = 0, duration = 1100, sx }) {
  const p = PATHS[variant] ?? PATHS.loop;
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const filterId = `pencil-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Hidden outright until drawn: a round cap on a fully offset dash still
  // leaves a dot at the start of the path.
  const stroke = (wait, length) => ({
    strokeDasharray: 1,
    strokeDashoffset: drawn ? 0 : 1,
    opacity: drawn ? 1 : 0,
    transition: `stroke-dashoffset ${length}ms ${ease} ${wait}ms, opacity 1ms linear ${wait}ms`,
  });

  return (
    <Box
      component="svg"
      ref={ref}
      viewBox={p.viewBox}
      fill="none"
      aria-hidden
      sx={{ display: "block", color: color.inkMuted, overflow: "visible", ...sx }}
    >
      <defs>
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7" result="grain" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.45"
            result="tooth"
          />
          <feComposite in="rough" in2="tooth" operator="in" />
        </filter>
      </defs>

      <g
        filter={`url(#${filterId})`}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={p.d} pathLength="1" strokeWidth="1.9" style={stroke(delay, duration)} />
        <path
          d={p.d}
          pathLength="1"
          strokeWidth="1"
          transform="translate(0.9 0.7)"
          style={{ ...stroke(delay + 70, duration), opacity: drawn ? 0.5 : 0 }}
        />
        <path d={p.head} pathLength="1" strokeWidth="1.9" style={stroke(delay + duration * 0.9, 280)} />
      </g>
    </Box>
  );
}

export default HandArrow;
