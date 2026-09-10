"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { titleCase } from "@/services/titleCase";
import { color } from "@/theme/tokens";

/**
 * A heading whose words rise into place, each from behind its own mask, the
 * first time it scrolls into view.
 *
 * `muted` is an optional continuation set in the faint ink after the main
 * phrase — "What We Build. Four Practices, One Standard." — so a heading can
 * say what the section is and why it matters in one line, without a separate
 * subtitle. Both parts are title-cased.
 *
 * The words are only hidden while scripting is available (`scripting:
 * enabled`), so without JavaScript the heading is simply there. Screen readers
 * get the whole heading once, from `aria-label`; the per-word spans are hidden
 * from them so it is not read word by word. Under reduced motion the global
 * transition collapse makes the words land instantly.
 */
function RevealText({ text, muted, component = "h2", variant = "h2", delay = 0, sx }) {
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

  const main = titleCase(text);
  const tail = muted ? titleCase(muted) : "";
  const words = [
    ...main.split(" ").map((word) => ({ word, faint: false })),
    ...(tail ? tail.split(" ").map((word) => ({ word, faint: true })) : []),
  ];

  return (
    <Typography
      ref={ref}
      component={component}
      variant={variant}
      aria-label={tail ? `${main} ${tail}` : main}
      sx={sx}
    >
      {words.map(({ word, faint }, i) => (
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
                color: faint ? color.inkFaint : "inherit",
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
