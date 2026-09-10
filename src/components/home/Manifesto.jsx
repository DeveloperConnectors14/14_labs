"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import { color, layout } from "@/theme/tokens";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "We are engineers who measure. Every system we ship comes with the evaluation that proves it works, the traces that show why it didn't, and a cost you can predict. That is the difference between a demo and a product.";

/**
 * One large statement, read at the speed you scroll: every word starts faint
 * and comes up to full ink as the paragraph moves up the screen, scrubbed to
 * scroll position with GSAP ScrollTrigger — so scrolling back dims it again.
 *
 * The text is all there from the first paint; only its opacity is animated, so
 * nothing reflows and a screen reader reads it normally. Under reduced motion
 * nothing is dimmed at all.
 */
function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".mf-word"),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.4 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const words = TEXT.split(" ");

  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionY }}>
      <Container>
        <Eyebrow>The part nobody demos</Eyebrow>
        <Typography
          ref={ref}
          sx={{
            mt: { xs: 3, md: 4 },
            fontSize: "clamp(1.875rem, 1rem + 3.2vw, 4rem)",
            lineHeight: 1.14,
            letterSpacing: "-0.03em",
            color: color.ink,
            maxWidth: "26ch",
          }}
        >
          {words.map((word, i) => (
            <Box component="span" key={`${word}-${i}`}>
              <span className="mf-word">{word}</span>
              {i < words.length - 1 ? " " : null}
            </Box>
          ))}
        </Typography>
      </Container>
    </Box>
  );
}

export default Manifesto;
