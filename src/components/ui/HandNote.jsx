"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { color, font } from "@/theme/tokens";

/**
 * A few words in pencil, written beside a drawn arrow. It arrives the first
 * time it scrolls into view, after its arrow (`delay`), so the pair reads as
 * someone annotating the page rather than as a caption.
 *
 * Decorative by construction — whatever it says must also be true without
 * it — so it is hidden from assistive tech.
 */
function HandNote({ children, delay = 0, rotate = -4, sx }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      aria-hidden
      sx={{
        fontFamily: font.hand,
        fontWeight: 500,
        fontSize: "1.5rem",
        lineHeight: 1.1,
        color: color.inkMuted,
        whiteSpace: "nowrap",
        opacity: shown ? 1 : 0,
        transform: `rotate(${rotate}deg) translateY(${shown ? 0 : 6}px)`,
        transition: `opacity 500ms ease ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default HandNote;
