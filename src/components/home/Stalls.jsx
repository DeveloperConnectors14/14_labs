"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import LatencyBars from "@/components/visuals/LatencyBars";
import ReleaseDelta from "@/components/visuals/ReleaseDelta";
import RetrievalRank from "@/components/visuals/RetrievalRank";
import TraceWaterfall from "@/components/visuals/TraceWaterfall";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import RevealText from "@/components/ui/RevealText";
import { getChallanges } from "@/services/dataService";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const challenges = getChallanges();
const TOTAL = String(challenges.length).padStart(2, "0");

// One figure per failure mode — the drawing is the evidence for the sentence.
const DETAIL = [
  { topic: "Production", Figure: LatencyBars, caption: "Median against tail latency, once the traffic is real." },
  { topic: "Evaluation", Figure: ReleaseDelta, caption: "Per-suite change across one release. The blend moved +0.01." },
  { topic: "Retrieval", Figure: RetrievalRank, caption: "Top-k retrieval for one query. The answer ranked twelfth." },
  { topic: "Multi-Agent Systems", Figure: TraceWaterfall, caption: "One request on a clock. Four of twelve seconds were retries." },
];

/**
 * One faint ground per card, alternating the two brand hues at different
 * strengths so neighbours never match. Mixed into the page ground, so they are
 * opaque and theme-aware: a breath of teal or navy on the light page, a small
 * lift on the dark one.
 */
const TINTS = [
  `color-mix(in srgb, ${color.lime} 7%, ${color.ground})`,
  `color-mix(in srgb, ${color.primary} 5%, ${color.ground})`,
  `color-mix(in srgb, ${color.limeDeep} 10%, ${color.ground})`,
  `color-mix(in srgb, ${color.primary} 8%, ${color.ground})`,
];

// Where the deck sits: the first card sticks just under the nav and each later
// one a step lower, so the top edges of the cards behind show as a stack.
const STACK_TOP = layout.navHeight.md + 24;
const STACK_STEP = 16;
const stickAt = (i) => STACK_TOP + i * STACK_STEP;

// The dials. A card comes up tipped towards the reader by TILT and lays flat
// as it sticks; each card that lands on it then shrinks it by SHRINK, leans
// it back by RECLINE and darkens it by DIM. Its copy rises LIFT px into place,
// the meta line half as far, so the two separate into layers as they move.
const TILT = 8;
const RECLINE = 3;
const SHRINK = 0.05;
const DIM = 0.14;
const LIFT = 48;
const PERSPECTIVE = 1600;

const clamp01 = (t) => Math.min(1, Math.max(0, t));
// Where t sits between from and to, as 0 to 1.
const span = (t, from, to) => clamp01((t - from) / (to - from));
// Eases each motion in and out, so nothing starts or stops at full speed.
const ease = (t) => t * t * (3 - 2 * t);

// The layers inside a card that the scroll moves.
const PARTS = ["mark", "copy", "figure", "shade"];

/** A black plate holding one figure. */
function Plate({ index, sx }) {
  const { Figure } = DETAIL[index];
  return (
    <Box
      sx={{
        backgroundColor: color.black,
        borderRadius: radius.card,
        p: { xs: 3, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Figure tone="black" style={{ width: "100%", height: "auto", maxHeight: "100%" }} />
    </Box>
  );
}

/**
 * Where projects stall, told as a deck of cards: one card per failure mode,
 * each sticking a step below the last as the page scrolls, so the next one
 * slides up over it.
 *
 * Every card has two motions, both tied to scroll position:
 *
 *   - Arriving. It comes up tipped towards the reader and lays flat as it
 *     sticks. Inside it the copy, the meta line and the figure rise at
 *     different rates, so the card reads as layers settling.
 *   - Falling back. As the next card lands on it, it shrinks towards its top
 *     edge, leans away and darkens — further for each card on top of it.
 *     Scrolling up lifts it again.
 *
 * The stacking is sticky CSS, so the page never stops scrolling and nothing is
 * hijacked. The motion is one rAF per scroll that reads every card's position
 * first and then writes only `transform` and `opacity`, which the compositor
 * handles on its own; a write is skipped when the value has not changed. With
 * the site's Lenis smoothing on top, it glides. Cards turn about their top
 * edge, so the top a rect reports is the real one even mid-turn.
 *
 * Below `md` a card is taller than a phone can hold still, so the cards are an
 * ordinary list with nothing moving. Under reduced motion they still stack and
 * darken, but nothing turns, shrinks or rises.
 */
function Stalls() {
  const cardRefs = useRef([]);
  const partRefs = useRef([]);

  const bind = (i, part) => (el) => {
    partRefs.current[i] ??= {};
    partRefs.current[i][part] = el;
  };

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const parts = partRefs.current;
    const wide = window.matchMedia("(min-width: 900px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const written = new Map();
    let frame = 0;

    const set = (el, prop, value) => {
      if (!el) return;
      const last = written.get(el) ?? {};
      if (last[prop] === value) return;
      last[prop] = value;
      written.set(el, last);
      el.style[prop] = value;
    };

    const reset = () => {
      cards.forEach((card, i) => {
        set(card, "transform", "");
        PARTS.forEach((part) => {
          set(parts[i]?.[part], "transform", "");
          set(parts[i]?.[part], "opacity", "");
        });
      });
    };

    const paint = () => {
      frame = 0;
      if (!wide.matches) {
        reset();
        return;
      }

      // Reads.
      const vh = window.innerHeight;
      const tops = cards.map((card) => card.getBoundingClientRect().top);
      const heights = cards.map((card) => card.offsetHeight);

      // How far each card has come up the screen, from entering at the bottom
      // (0) to sticking (1).
      const risen = tops.map((top, i) => span(vh - top, 0, vh - stickAt(i)));

      // How far each card has landed on the one before it: from its top edge
      // reaching the bottom of that card (0) to sticking (1).
      const landed = tops.map((top, i) =>
        i === 0 ? 0 : ease(span(stickAt(i - 1) + heights[i - 1] - top, 0, heights[i - 1] - STACK_STEP))
      );

      // Writes.
      const moving = !still.matches;
      cards.forEach((card, i) => {
        const part = parts[i] ?? {};
        // Every card above this one pushes it further back.
        const depth = landed.slice(i + 1).reduce((sum, t) => sum + t, 0);
        const rise = ease(risen[i]);
        // The copy waits for the first third of the climb, then settles.
        const reveal = moving ? ease(span(risen[i], 0.3, 1)) : 1;

        const turn = (1 - rise) * TILT - Math.min(depth, 1) * RECLINE;
        const scale = 1 - depth * SHRINK;
        set(
          card,
          "transform",
          moving
            ? `perspective(${PERSPECTIVE}px) rotateX(${turn.toFixed(3)}deg) scale(${scale.toFixed(4)})`
            : ""
        );
        set(part.shade, "opacity", (Math.min(depth, 2) * DIM).toFixed(3));

        if (!moving) return;
        set(part.mark, "transform", `translateY(${((1 - reveal) * LIFT * 0.5).toFixed(2)}px)`);
        set(part.mark, "opacity", (0.25 + reveal * 0.75).toFixed(3));
        set(part.copy, "transform", `translateY(${((1 - reveal) * LIFT).toFixed(2)}px)`);
        set(part.copy, "opacity", (0.15 + reveal * 0.85).toFixed(3));
        set(part.figure, "transform", `translateY(${((1 - reveal) * LIFT * 0.6).toFixed(2)}px) scale(${(0.94 + reveal * 0.06).toFixed(4)})`);
        set(part.figure, "opacity", (0.35 + reveal * 0.65).toFixed(3));
      });
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    wide.addEventListener("change", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      wide.removeEventListener("change", request);
    };
  }, []);

  const layer = { willChange: { md: "transform, opacity" } };

  return (
    <Box component="section" sx={{ position: "relative", paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
            alignItems: "end",
            gap: 3,
          }}
        >
          <Box>
            <RevealText
              text="Where AI projects stall."
              muted="And how we keep yours moving."
              sx={{ maxWidth: "20ch" }}
            />
            <Typography variant="lede" sx={{ mt: 2.5, color: color.inkMuted, maxWidth: measure.lede }}>
              None of these are model problems. They are engineering problems that only
              show up after the demo goes well.
            </Typography>
          </Box>
          <PillLink href="/research" variant="outline" sx={{ justifySelf: { xs: "start", md: "auto" } }}>
            Read the research
          </PillLink>
        </Box>

        {/* The deck. The padding under the last card holds the finished stack
            on screen for a moment before it scrolls away. */}
        <Box
          component="ol"
          sx={{ listStyle: "none", m: 0, p: 0, mt: { xs: 6, md: 10 }, pb: { md: "12vh" } }}
        >
          {challenges.map((item, i) => (
            <Box
              component="li"
              key={item.sNo}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              sx={{
                position: { xs: "relative", md: "sticky" },
                top: { md: `${stickAt(i)}px` },
                height: { md: "clamp(440px, calc(100vh - 200px), 600px)" },
                mb: { xs: 2, md: "14vh" },
                "&:last-of-type": { mb: 0 },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.1fr)" },
                gridTemplateRows: { md: "minmax(0, 1fr)" },
                columnGap: { md: 6, lg: 8 },
                rowGap: 3,
                p: { xs: 3, md: 5 },
                overflow: "hidden",
                borderRadius: radius.card,
                border: "1px solid",
                borderColor: color.ruleStrong,
                backgroundColor: TINTS[i],
                boxShadow: "0 -24px 60px -40px rgba(0, 0, 0, 0.45)",
                transformOrigin: "50% 0",
                ...layer,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  ref={bind(i, "mark")}
                  sx={{ display: "flex", gap: 3, color: color.inkFaint, fontSize: "0.9375rem", ...layer }}
                >
                  <span className="tabular">
                    {item.sNo} / {TOTAL}
                  </span>
                  <span>{DETAIL[i].topic}</span>
                </Box>

                <Box ref={bind(i, "copy")} sx={{ mt: { xs: 2.5, md: "auto" }, ...layer }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: "clamp(1.75rem, 1.1rem + 1.6vw, 2.75rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      color: color.ink,
                      maxWidth: "18ch",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, color: color.inkMuted, maxWidth: "46ch" }}>
                    {item.desc}
                  </Typography>
                  <LinkBox
                    href="/services"
                    sx={{
                      display: "inline-block",
                      mt: 2.5,
                      fontSize: "0.9375rem",
                      color: color.ink,
                      textDecoration: "none",
                      transition: `color ${motion.fast}`,
                      "&:hover": { color: color.accent },
                    }}
                  >
                    How We Fix It ›
                  </LinkBox>
                </Box>
              </Box>

              <Box
                ref={bind(i, "figure")}
                sx={{ display: "grid", gridTemplateRows: { md: "minmax(0, 1fr) auto" }, rowGap: 1.5, ...layer }}
              >
                <Plate
                  index={i}
                  sx={{ minHeight: 0, borderRadius: radius.lg, aspectRatio: { xs: "4 / 3", md: "auto" } }}
                />
                <Typography variant="body2" sx={{ color: color.inkFaint }}>
                  {DETAIL[i].caption}
                </Typography>
              </Box>

              {/* Darkens the card as the ones above it land. */}
              <Box
                aria-hidden
                ref={bind(i, "shade")}
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  backgroundColor: "#000",
                  opacity: 0,
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Stalls;
