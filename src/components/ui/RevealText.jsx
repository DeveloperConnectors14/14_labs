"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

/**
 * A heading whose words rise into place, each from behind its own mask, the
 * first time it scrolls into view.
 *
 * The words are only hidden while scripting is available (`scripting:
 * enabled`), so without JavaScript the heading is simply there. Screen readers
 * get the sentence once, from `aria-label`; the per-word spans are hidden from
 * them so it is not read word by word. Under reduced motion the global
 * transition collapse makes the words land instantly.
 */
function RevealText({ text, component = "h2", variant = "h2", delay = 0, sx }) {
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
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Typography ref={ref} component={component} variant={variant} aria-label={text} sx={sx}>
      {words.map((word, i) => (
        <Box component="span" key={`${word}-${i}`}>
          <Box
            component="span"
            aria-hidden
            sx={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              // Room for descenders inside the mask, given back outside it.
              pb: "0.14em",
              mb: "-0.14em",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 55}ms`,
                "@media (scripting: enabled)": { transform: shown ? "none" : "translateY(110%)" },
              }}
            >
              {word}
            </Box>
          </Box>
          {i < words.length - 1 ? " " : null}
        </Box>
      ))}
    </Typography>
  );
}

export default RevealText;
