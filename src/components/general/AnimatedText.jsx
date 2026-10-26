"use client";

import { Fragment } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const blurIn = keyframes`
  from { opacity: 0; filter: blur(6px); }
  to { opacity: 1; filter: blur(0); }
`;

// Reveals text letter by letter, each letter sharpening from a soft blur. It
// plays once, in CSS only, so the full text is in the server-rendered HTML and
// needs no JavaScript. Each word stays on one line (no mid-word wrapping).
//
// The letters are aria-hidden: give the parent element the full text as its
// `aria-label` so screen readers read it once, as words. Visitors who prefer
// reduced motion see the text straight away.
function AnimatedText({ text, stagger = 0.025, duration = 0.4, delay = 0.1 }) {
  // Every character, spaces included, takes one step of the stagger.
  let slot = 0;
  const words = text.split(" ").map((word) => {
    const letters = [...word].map((char) => ({ char, delay: (delay + slot++ * stagger).toFixed(2) }));
    slot++; // the space after the word
    return letters;
  });

  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        "& .word": { display: "inline-block", whiteSpace: "nowrap" },
        "& .letter": {
          display: "inline-block",
          animation: `${blurIn} ${duration}s cubic-bezier(0.2, 0.7, 0.2, 1) both`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        },
      }}
    >
      {words.map((letters, w) => (
        <Fragment key={w}>
          <span className="word">
            {letters.map(({ char, delay: d }, c) => (
              <span key={c} className="letter" style={{ animationDelay: `${d}s` }}>
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </Box>
  );
}

export default AnimatedText;
