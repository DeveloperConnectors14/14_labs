"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { color, layout } from "@/theme/tokens";

/**
 * A hairline under the navbar showing how far through a note you are.
 *
 * Written straight to the DOM on a rAF-throttled scroll listener rather than
 * through state: this updates on every frame of every scroll, and putting that
 * through React would re-render the whole article for one CSS transform.
 *
 * Progress is measured against the article element, not the document, so the
 * bar reaches full when the prose ends rather than when the footer does.
 */
function ReadingProgress({ targetId }) {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const article = document.getElementById(targetId);
    if (!bar || !article) return undefined;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const start = article.offsetTop;
      const distance = article.offsetHeight - window.innerHeight;
      if (distance <= 0) {
        bar.style.transform = "scaleX(1)";
        return;
      }
      const progress = (window.scrollY - start) / distance;
      const clamped = Math.min(1, Math.max(0, progress));
      bar.style.transform = `scaleX(${clamped.toFixed(4)})`;
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
    };
  }, [targetId]);

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        insetInline: 0,
        top: layout.navHeight,
        height: "2px",
        zIndex: 1301,
        pointerEvents: "none",
      }}
    >
      <Box
        ref={barRef}
        sx={{
          height: "100%",
          backgroundColor: color.limeDeep,
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </Box>
  );
}

export default ReadingProgress;
