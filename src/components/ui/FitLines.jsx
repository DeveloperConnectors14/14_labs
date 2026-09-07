"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Box } from "@mui/material";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Font size the measurement pass runs at. Large enough that sub-pixel
 *  rounding in the reported width is noise rather than a visible error. */
const MEASURE_PX = 200;

/**
 * Sets each line's font-size so the line spans the full width of its container.
 *
 * The whole point of the hero is that the type reaches both edges, and no
 * clamp() can promise that: a clamp is tuned against one string at one
 * viewport, and it drifts the moment either changes. So each line is measured
 * at a known size and scaled by the ratio it is off by — exact by construction,
 * for any copy, at any width, in any font.
 *
 * Before the script runs (server render, and the frame before hydration) the
 * lines are sized from a container-query estimate: character count times an
 * average advance. That is deliberately a slight under-estimate, so the first
 * paint is a hair small rather than overflowing, and the measured pass only
 * ever grows it.
 *
 * `maxVh` caps the result against viewport height. The hero has to fit one
 * screen — see DefocusOnScroll — and on a short, wide window the width fit
 * alone would run past the bottom.
 */
function FitLines({ lines, ratio = 0.45, maxVh, sx, lineSx, ...rest }) {
  const rootRef = useRef(null);
  const lineRefs = useRef([]);
  const lastWidthRef = useRef(0);

  const fit = useCallback((force = true) => {
    const root = rootRef.current;
    if (!root) return;

    const available = root.clientWidth;
    if (!available) return;

    // Resizing the type changes the block's height, which the observer below
    // also hears. Without this the two would trade notifications for a frame
    // every time a line is refitted.
    if (!force && available === lastWidthRef.current) return;
    lastWidthRef.current = available;

    const cap = maxVh ? (window.innerHeight * maxVh) / 100 : Infinity;

    lineRefs.current.forEach((line) => {
      const text = line?.firstElementChild;
      if (!text) return;

      // Measure, then set. Reading the width forces the layout the browser
      // would have done anyway on the next frame, so this is one reflow per
      // line, not two.
      line.style.fontSize = `${MEASURE_PX}px`;
      const natural = text.getBoundingClientRect().width;
      if (!natural) {
        // Nothing to measure against — leave the CSS estimate in place rather
        // than stranding the line at the measurement size.
        line.style.removeProperty("font-size");
        return;
      }

      line.style.fontSize = `${Math.min(
        (MEASURE_PX * available) / natural,
        cap
      ).toFixed(2)}px`;
    });

    // Second pass, once every line has its final size: publish where each line
    // sits inside the block, so a caller can address the block as one surface
    // even though it is drawing on n separate elements — see the light on the
    // hero headline. offsetTop is layout, not paint, so a line mid-animation
    // still reports where it will come to rest.
    lineRefs.current.forEach((line) => {
      if (!line) return;
      line.style.setProperty("--line-top", `${line.offsetTop - root.offsetTop}px`);
    });
  }, [maxVh]);

  useIsomorphicLayoutEffect(() => {
    fit();

    let frame = 0;
    const schedule = (force) => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        fit(force);
      });
    };

    // Width changes come from the observer, and only a real one is worth a
    // refit. Height changes move the maxVh cap instead, and those only ever
    // arrive as a window resize — so that one always refits.
    const observer = new ResizeObserver(() => schedule(false));
    if (rootRef.current) observer.observe(rootRef.current);

    const onResize = () => schedule(true);
    window.addEventListener("resize", onResize);

    // The first measurement can land on the fallback face while the webfont is
    // still in flight, and the two have different metrics.
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) fit();
    });

    return () => {
      live = false;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [fit, lines]);

  return (
    <Box
      ref={rootRef}
      {...rest}
      sx={{
        // The pre-hydration estimate below is written in cqw, which needs a
        // container to resolve against.
        containerType: "inline-size",
        width: "100%",
        ...sx,
      }}
    >
      {lines.map((line, i) => {
        // A line is either a plain string, or `{ chars, content }` when it
        // carries markup — `chars` is only ever the pre-hydration estimate.
        const content = line?.content ?? line;
        const chars =
          line?.chars ?? (typeof line === "string" ? line.length : 16);

        return (
          <Box
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            sx={{
              display: "block",
              whiteSpace: "nowrap",
              fontSize: `calc(100cqw / ${Math.max(1, chars * ratio)})`,
              ...lineSx,
            }}
          >
            <Box component="span" sx={{ display: "inline-block" }}>
              {content}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default FitLines;
