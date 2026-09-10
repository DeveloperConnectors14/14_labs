"use client";

import { Fragment, useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import SpeedOutlined from "@mui/icons-material/SpeedOutlined";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import { color, layout, radius } from "@/theme/tokens";

gsap.registerPlugin(ScrollTrigger);

// The statement, in runs. Runs with an icon become inline chips that fill in
// as they are read; the last run is underlined in pencil.
const RUNS = [
  { text: "We are engineers who measure. Every system we ship comes with" },
  { text: "the evaluation", icon: InsightsOutlined },
  { text: "that proves it works," },
  { text: "the traces", icon: AccountTreeOutlined },
  { text: "that show why it didn't, and" },
  { text: "a cost", icon: SpeedOutlined },
  { text: "you can predict. That is the difference between a demo and" },
  { text: "a product.", underline: true },
];

// The three chips, made concrete. Same icons, so the eye can join them up.
const PROOF = [
  {
    icon: InsightsOutlined,
    title: "Evaluation You Keep",
    body: "Golden sets and regression gates, built first and handed over with the system.",
  },
  {
    icon: AccountTreeOutlined,
    title: "Traces You Can Read",
    body: "Every step of every request recorded, so a failure has an address.",
  },
  {
    icon: SpeedOutlined,
    title: "Costs You Can Predict",
    body: "Latency and spend budgets agreed up front and watched in production.",
  },
];

const STEP = 0.08; // timeline gap between one word and the next

const words = (text) =>
  text.split(" ").map((word, i, all) => (
    <Fragment key={`${word}-${i}`}>
      <span className="mf-word">{word}</span>
      {i < all.length - 1 ? " " : null}
    </Fragment>
  ));

/**
 * One large statement, read at the speed you scroll.
 *
 * Every word starts faint and comes up to full ink as the paragraph moves up
 * the screen. The three things we ship with every system — evaluation, traces,
 * a predictable cost — are inline chips: each one's tint and icon fill in at
 * the moment its words are reached, and "a product." is underlined in pencil
 * as the sentence lands. All of it is one GSAP timeline scrubbed to scroll
 * position, so scrolling back runs it backwards.
 *
 * Below, the same three icons open three short proof points.
 *
 * The text is all there from the first paint and the final state is the
 * default: only opacity, a tint and a stroke are animated, so nothing reflows,
 * a screen reader reads it normally, and under reduced motion nothing is dimmed
 * at all.
 */
function Manifesto() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const all = gsap.utils.toArray(el.querySelectorAll(".mf-word"));
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 42%", scrub: 0.4 },
      });

      tl.fromTo(all, { opacity: 0.14 }, { opacity: 1, ease: "none", duration: 0.3, stagger: STEP }, 0);

      el.querySelectorAll(".mf-chip").forEach((chip) => {
        const at = all.indexOf(chip.querySelector(".mf-word")) * STEP;
        tl.fromTo(
          chip.querySelector(".mf-fill"),
          { opacity: 0, scaleX: 0.4 },
          { opacity: 1, scaleX: 1, ease: "none", duration: 0.35 },
          at
        );
        tl.fromTo(chip.querySelector(".mf-icon"), { opacity: 0.15 }, { opacity: 1, ease: "none", duration: 0.2 }, at);
      });

      const line = el.querySelector(".mf-line");
      if (line) {
        tl.fromTo(
          line,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", duration: 0.45 },
          (all.length - 2) * STEP
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionY }}>
      <Container>
        <Eyebrow>Why 14Labs</Eyebrow>

        <Typography
          ref={ref}
          sx={{
            mt: { xs: 3, md: 4 },
            fontSize: "clamp(1.875rem, 1rem + 3.2vw, 4rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.03em",
            color: color.ink,
            maxWidth: "26ch",
          }}
        >
          {RUNS.map((run, r) => {
            let node = words(run.text);

            if (run.icon) {
              const Icon = run.icon;
              node = (
                <Box
                  component="span"
                  className="mf-chip"
                  sx={{
                    position: "relative",
                    isolation: "isolate",
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "0.2em",
                    px: "0.26em",
                    borderRadius: "0.3em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Box
                    component="span"
                    className="mf-fill"
                    aria-hidden
                    sx={{
                      position: "absolute",
                      inset: "0.1em 0 0",
                      zIndex: -1,
                      borderRadius: "inherit",
                      backgroundColor: color.accentSoft,
                      transformOrigin: "left center",
                    }}
                  />
                  <Icon
                    className="mf-icon"
                    aria-hidden
                    sx={{ fontSize: "0.7em", color: color.accent, alignSelf: "center" }}
                  />
                  {node}
                </Box>
              );
            } else if (run.underline) {
              node = (
                <Box component="span" sx={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                  {node}
                  <Box
                    component="svg"
                    aria-hidden
                    viewBox="0 0 200 16"
                    preserveAspectRatio="none"
                    sx={{
                      position: "absolute",
                      left: "-3%",
                      bottom: "-0.14em",
                      width: "106%",
                      height: "0.3em",
                      overflow: "visible",
                      color: color.lime,
                    }}
                  >
                    <path
                      className="mf-line"
                      d="M3 11 C 42 4, 92 3, 132 7 S 186 13, 197 5"
                      pathLength="1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
                    />
                  </Box>
                </Box>
              );
            }

            return (
              <Fragment key={r}>
                {node}
                {r < RUNS.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </Typography>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 4, md: 5 },
          }}
        >
          {PROOF.map(({ icon: Icon, title, body }) => (
            <Box key={title} sx={{ pt: 3, borderTop: "1px solid", borderColor: color.rule }}>
              <Box
                aria-hidden
                sx={{
                  width: 44,
                  height: 44,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: radius.md,
                  backgroundColor: color.accentSoft,
                  color: color.accent,
                }}
              >
                <Icon sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h4" component="h3" sx={{ mt: 2.5 }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: color.inkMuted, maxWidth: "36ch" }}>
                {body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Manifesto;
