"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import LatencyBars from "@/components/visuals/LatencyBars";
import ReleaseDelta from "@/components/visuals/ReleaseDelta";
import RetrievalRank from "@/components/visuals/RetrievalRank";
import TraceWaterfall from "@/components/visuals/TraceWaterfall";
import { getChallanges } from "@/services/dataService";
import { color, font, layout, measure, motion, radius } from "@/theme/tokens";

gsap.registerPlugin(ScrollTrigger);

const challenges = getChallanges();

/**
 * Panel tones walk one ramp: paper, grey, deep green, black. Keeping them on a
 * single ramp is what makes the sequence read as one idea getting heavier
 * rather than as four unrelated coloured slides — and the last step lands on
 * black rather than on a fourth green, which is where the page would otherwise
 * start repeating itself.
 *
 * `card` is the figure plate, always one step away from the panel it sits on —
 * a plate the same colour as its ground is not a plate.
 */
const PANEL_TONES = [
  { bg: color.surface, fg: color.ink, muted: color.inkMuted, faint: color.inkFaint, rule: color.rule, card: color.green05, cardRule: color.green20, fig: "light" },
  { bg: color.surfaceAlt, fg: color.ink, muted: color.inkMuted, faint: color.inkFaint, rule: color.ruleStrong, card: color.surface, cardRule: color.rule, fig: "light" },
  { bg: color.deep, fg: color.onDeep, muted: color.onDeepMuted, faint: color.lime, rule: color.ruleOnDeep, card: color.deepAlt, cardRule: color.ruleOnDeep, fig: "deep" },
  { bg: color.black, fg: color.onBlack, muted: color.onBlackMuted, faint: color.lime, rule: color.ruleOnBlack, card: color.blackAlt, cardRule: color.ruleOnBlack, fig: "black" },
];

/**
 * One figure per failure mode, and a line saying what the drawing is of.
 *
 * These panels used to be a headline, a paragraph and an oversized ghost
 * numeral on an otherwise empty screen — a full viewport spent on two
 * sentences. The figure is the evidence for the sentence beside it: the point
 * of "nobody can say whether it got better" lands differently next to a chart
 * where one score quietly regressed.
 *
 * Deliberately none of the four figures used by "What we do" further up the
 * page. Those draw the capability; these draw the failure — a diff instead of
 * a curve, a rank list instead of a point cloud, a clock instead of a
 * topology. Reusing the same drawing for both made the second section read as
 * a restatement of the first rather than as the problem it is answering.
 */
const FIGURES = {
  "01": {
    Figure: LatencyBars,
    caption: "Median against tail latency, once the traffic is real.",
  },
  "02": {
    Figure: ReleaseDelta,
    caption: "Per-suite change across one release. The blend moved +0.01.",
  },
  "03": {
    Figure: RetrievalRank,
    caption: "Top-k retrieval for one query. The answer ranked twelfth.",
  },
  "04": {
    Figure: TraceWaterfall,
    caption: "One request on a clock. Four of twelve seconds were retries.",
  },
};

const tone = (i) => PANEL_TONES[i % PANEL_TONES.length];

// Viewports of scrolling per panel transition, plus a hold so the final panel
// gets a full beat on screen before the sticky container releases. Without the
// hold the last panel arrives and is immediately scrolled away.
const SCROLL_PER_PANEL = 0.9;
const HOLD = 0.5;
const RUNWAY_VH = (challenges.length - 1) * SCROLL_PER_PANEL * 100 + 100 + HOLD * 100;

// useLayoutEffect warns during SSR; this is the standard isomorphic shim.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function PanelBody({ item, index, t, animated }) {
  const figure = FIGURES[item.sNo];
  const Figure = figure?.Figure;

  return (
    <Container
      /* The dimming of an outgoing panel is applied here rather than to the
         panel itself: the panel carries the opaque background that hides the
         panels stacked beneath it, and fading that background turns the whole
         stack translucent — which is how two panels' worth of headline ended
         up legible at once. */
      className="panel-body"
      sx={{
        height: animated ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
          columnGap: { md: 8 },
          rowGap: { xs: 5, md: 0 },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box>
          {/* Index and progress in one row: the numeral says which panel this
              is, the ticks say how many are left. On a pinned sequence that
              second half is the difference between reading and waiting. */}
          <Box
            className="panel-inner"
            sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: { xs: 3, md: 4 } }}
          >
            <Typography
              sx={{
                fontFamily: font.display,
                fontWeight: 300,
                fontSize: "2.25rem",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: t.faint,
              }}
            >
              {item.sNo}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {challenges.map((other, i) => (
                <Box
                  key={other.sNo}
                  aria-hidden
                  sx={{
                    height: "2px",
                    width: i === index ? 34 : 14,
                    backgroundColor: i === index ? t.faint : t.rule,
                    transition: `width ${motion.base}, background-color ${motion.base}`,
                  }}
                />
              ))}
            </Box>
          </Box>

          <Typography
            className="panel-inner"
            variant="h2"
            sx={{ color: t.fg, maxWidth: "16ch", textWrap: "balance" }}
          >
            {item.title}
          </Typography>

          <Typography
            className="panel-inner"
            variant="lede"
            sx={{ mt: { xs: 3, md: 4 }, color: t.muted, maxWidth: measure.lede }}
          >
            {item.desc}
          </Typography>
        </Box>

        {Figure ? (
          <Box
            className="panel-inner"
            sx={{
              backgroundColor: t.card,
              border: "1px solid",
              borderColor: t.cardRule,
              borderRadius: radius.lg,
              p: { xs: 2.5, md: 3.5 },
              transition: `border-color ${motion.base}, transform ${motion.base}`,
              "&:hover": { borderColor: t.faint, transform: "translateY(-3px)" },
            }}
          >
            <Figure
              tone={t.fig}
              style={{ width: "100%", height: "auto", maxHeight: "42vh" }}
            />

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 2.5,
                pt: 2.5,
                borderTop: "1px solid",
                borderColor: t.cardRule,
                color: t.muted,
              }}
            >
              {figure.caption}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}

function ChallengesSection() {
  const runwayRef = useRef(null);
  const panelRefs = useRef([]);
  const [animated, setAnimated] = useState(false);

  // Only enhance on pointer-capable wide viewports with motion allowed. On
  // phones a pinned stack costs four screens of scrolling and gains nothing.
  useEffect(() => {
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 900px)").matches;
    setAnimated(motionOk && wideEnough);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!animated || !runwayRef.current) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean);

      // Panel 0 stays put; every later panel slides up over the one before it.
      gsap.set(panels.slice(1), { yPercent: 100 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: runwayRef.current,
          start: "top top",
          // Ends one hold-length before the runway does, so the sequence is
          // finished while the container is still pinned.
          end: () =>
            "+=" +
            (challenges.length - 1) * SCROLL_PER_PANEL * window.innerHeight,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      panels.slice(1).forEach((panel, i) => {
        const outgoing = panels[i];

        timeline
          .to(panel, { yPercent: 0, ease: "none" }, i)
          // The outgoing panel drifts and its content dims, so the covering
          // motion reads as depth rather than as a sheet of paper sliding. The
          // panel keeps full opacity; only its contents fade.
          .to(outgoing, { yPercent: -12, ease: "none" }, i)
          .to(
            outgoing.querySelector(".panel-body"),
            { opacity: 0.55, ease: "none" },
            i
          );
      });
    }, runwayRef);

    return () => ctx.revert();
  }, [animated]);

  const heading = (
    <SectionHead
      split
      eyebrow="Where projects stall"
      title="Four ways an AI project quietly fails"
      lede="None of these are model problems. They are engineering problems that only show up after the demo goes well, which is why they are usually discovered late and expensively."
    />
  );

  if (!animated) {
    // Static fallback: the same content as a plain ruled list.
    return (
      <Section band="alt">
        {heading}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          {challenges.map((item) => (
            <Box
              key={item.sNo}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "48px 1fr 1.15fr" },
                gap: { xs: 1.5, md: 5 },
                paddingBlock: { xs: 3.5, md: 4.5 },
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
                "&:last-of-type": {
                  borderBottom: "1px solid",
                  borderColor: color.ruleStrong,
                },
              }}
            >
              <Typography variant="caption" sx={{ color: color.inkFaint }}>
                {item.sNo}
              </Typography>
              <Typography variant="h3" sx={{ color: color.ink, maxWidth: "22ch" }}>
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: color.inkMuted, maxWidth: measure.body }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>
    );
  }

  return (
    <Box component="section">
      <Box sx={{ backgroundColor: color.ground, paddingBlock: layout.gapY }}>
        <Container>{heading}</Container>
      </Box>

      {/* Scroll runway: one viewport of scrolling per panel. The inner element
          is sticky, so the browser handles the pinning and GSAP only drives the
          transforms — far more robust than letting ScrollTrigger pin the DOM. */}
      <Box
        ref={runwayRef}
        sx={{ height: `${RUNWAY_VH}vh`, position: "relative" }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {challenges.map((item, i) => {
            const t = tone(i);
            return (
              <Box
                key={item.sNo}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: t.bg,
                  borderTop: "1px solid",
                  borderColor: t.rule,
                  display: "flex",
                  alignItems: "center",
                  paddingTop: `${layout.navHeight.md}px`,
                  willChange: "transform",
                }}
              >
                <PanelBody item={item} index={i} t={t} animated />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ChallengesSection;
