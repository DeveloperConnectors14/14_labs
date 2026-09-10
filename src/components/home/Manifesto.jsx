"use client";

import { Fragment, useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import SpeedOutlined from "@mui/icons-material/SpeedOutlined";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import InfoTip from "@/components/ui/InfoTip";
import LinkBox from "@/components/ui/LinkBox";
import { getCaseDetails, getcaseStudies, getResearch } from "@/services/dataService";
import { color, layout, motion, radius } from "@/theme/tokens";

gsap.registerPlugin(ScrollTrigger);

const posts = getResearch();
const latest = posts[0];
const details = getCaseDetails();
const caseTitles = getcaseStudies().map(
  (item) => details.find((d) => d.caseId === item.id)?.hero?.title ?? item.title
);

const monthYear = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

// The three things every system ships with. Same icons in the statement and
// in the proof points below it, so the eye can join them up.
const PROOF = {
  evaluation: {
    icon: InsightsOutlined,
    title: "Evaluation You Keep",
    body: "Golden sets and regression gates, built first and handed over with the system.",
  },
  traces: {
    icon: AccountTreeOutlined,
    title: "Traces You Can Read",
    body: "Every step of every request recorded, so a failure has an address.",
  },
  cost: {
    icon: SpeedOutlined,
    title: "Costs You Can Predict",
    body: "Latency and spend budgets agreed up front and watched in production.",
  },
};

// The statement, in runs:
//   link   a word that goes somewhere, with a tip that previews it
//   chip   a phrase that fills in as it is read, with a tip that explains it
//   line   the last phrase, underlined in pencil as the sentence lands
const RUNS = [
  { text: "We are engineers who measure. Our" },
  {
    link: "/research",
    text: "research",
    tip: {
      title: "Our Research",
      body: `${posts.length} published notes. Latest: ${latest.title} (${monthYear(latest.date)}).`,
    },
  },
  { text: "decides what we build, and every system in our" },
  {
    link: "/case-studies",
    text: "work",
    tip: {
      title: "Selected Work",
      body: `${caseTitles.length} case studies: ${caseTitles.join(" and ")}.`,
    },
  },
  { text: "ships with" },
  { chip: "evaluation", text: "the evaluation" },
  { text: "that proves it works," },
  { chip: "traces", text: "the traces" },
  { text: "that show why it didn't, and" },
  { chip: "cost", text: "a cost" },
  { text: "you can predict. That is the difference between a demo and" },
  { line: true, text: "a product." },
];

const STEP = 0.08; // timeline gap between one word and the next

// Where HeroScene assembles "Why 14Labs" out of its words: wide screens with
// motion allowed. Matches the hero's own runway conditions.
const HERO_FORMS_HEADING = "@media (min-width: 900px) and (prefers-reduced-motion: no-preference)";

// Present for screen readers, invisible on screen. Sizes are px strings on
// purpose: in MUI's sx a bare 1 means 100%, which made this "hidden" box as
// wide as the page and gave the whole site a horizontal scrollbar.
const VISUALLY_HIDDEN = {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  p: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const words = (text) =>
  text.split(" ").map((word, i, all) => (
    <Fragment key={`${word}-${i}`}>
      <span className="mf-word">{word}</span>
      {i < all.length - 1 ? " " : null}
    </Fragment>
  ));

/**
 * Why 14Labs: one large statement, read at the speed you scroll.
 *
 * Every word starts faint and comes up to full ink as the paragraph moves up
 * the screen. "research" and "work" are links with a dotted teal underline and
 * a small pulsing dot; hovering either unfolds a tip previewing what is behind
 * it — the latest note, the case studies. The three things we ship with every
 * system are inline chips that fill in at the moment they are reached, each
 * with a tip of its own, and "a product." is underlined in pencil as the
 * sentence lands. The reading effects are one GSAP timeline scrubbed to scroll
 * position, so scrolling back runs them backwards.
 *
 * Below, the same three icons open three short proof points — the same
 * information as the tips, for anyone on a screen without hover.
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
    <Box
      component="section"
      sx={{
        paddingBlock: layout.sectionY,
        // On desktop with motion, the hero's words have just assembled into
        // "Why 14Labs" at the foot of the stage — that is this section's
        // heading, so the statement starts right under it.
        [HERO_FORMS_HEADING]: { pt: "clamp(12px, 1.5vw, 24px)" },
      }}
    >
      <Container>
        {/* The label is kept for screen readers, and shown wherever the hero
            does not form the heading itself (phones, reduced motion). */}
        <Box sx={{ [HERO_FORMS_HEADING]: VISUALLY_HIDDEN }}>
          <Eyebrow>Why 14Labs</Eyebrow>
        </Box>

        <Typography
          ref={ref}
          sx={{
            mt: { xs: 3, md: 4 },
            [HERO_FORMS_HEADING]: { mt: 0 },
            fontSize: "clamp(1.625rem, 0.95rem + 2.3vw, 3.125rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.028em",
            color: color.ink,
            maxWidth: "30ch",
          }}
        >
          {RUNS.map((run, r) => {
            let node = words(run.text);

            if (run.link) {
              node = (
                <InfoTip title={run.tip.title} body={run.tip.body}>
                  <LinkBox
                    href={run.link}
                    sx={{
                      position: "relative",
                      color: "inherit",
                      textDecorationLine: "underline",
                      textDecorationStyle: "dotted",
                      textDecorationColor: color.lime,
                      textDecorationThickness: "0.07em",
                      textUnderlineOffset: "0.16em",
                      transition: `color ${motion.fast}`,
                      "&:hover, &:focus-visible": { color: color.accent, textDecorationStyle: "solid" },
                      // A small live dot: this word has something behind it.
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "0.12em",
                        right: "-0.22em",
                        width: "0.14em",
                        height: "0.14em",
                        borderRadius: "50%",
                        backgroundColor: color.lime,
                        "@keyframes mfPing": {
                          "0%": { boxShadow: `0 0 0 0 color-mix(in srgb, ${color.lime} 70%, transparent)` },
                          "80%, 100%": { boxShadow: `0 0 0 0.3em color-mix(in srgb, ${color.lime} 0%, transparent)` },
                        },
                        animation: "mfPing 2.2s ease-out infinite",
                      },
                    }}
                  >
                    {node}
                  </LinkBox>
                </InfoTip>
              );
            } else if (run.chip) {
              const proof = PROOF[run.chip];
              const Icon = proof.icon;
              node = (
                <InfoTip title={proof.title} body={proof.body}>
                  <Box
                    component="span"
                    tabIndex={0}
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
                      cursor: "help",
                      transition: `transform ${motion.base}`,
                      "&:hover, &:focus-visible": { transform: "translateY(-0.04em)" },
                      "&:hover .mf-fill, &:focus-visible .mf-fill": {
                        boxShadow: `inset 0 0 0 1px ${color.limeDeep}`,
                      },
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
                        transition: `box-shadow ${motion.fast}`,
                      }}
                    />
                    <Icon
                      className="mf-icon"
                      aria-hidden
                      sx={{ fontSize: "0.7em", color: color.accent, alignSelf: "center" }}
                    />
                    {node}
                  </Box>
                </InfoTip>
              );
            } else if (run.line) {
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
          {Object.values(PROOF).map(({ icon: Icon, title, body }) => (
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
