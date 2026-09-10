"use client";

import { useEffect, useRef, useState } from "react";
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

// One figure per failure mode — the drawing is the evidence for the sentence.
const DETAIL = [
  { topic: "Production", Figure: LatencyBars, caption: "Median against tail latency, once the traffic is real." },
  { topic: "Evaluation", Figure: ReleaseDelta, caption: "Per-suite change across one release. The blend moved +0.01." },
  { topic: "Retrieval", Figure: RetrievalRank, caption: "Top-k retrieval for one query. The answer ranked twelfth." },
  { topic: "Multi-Agent Systems", Figure: TraceWaterfall, caption: "One request on a clock. Four of twelve seconds were retries." },
];

/**
 * One faint ground per failure mode, alternating the two brand hues at
 * different strengths so neighbours never match. Mixed into the page ground,
 * so they are theme-aware: a breath of teal or navy on the light page, a small
 * lift on the dark one.
 */
const TINTS = [
  `color-mix(in srgb, ${color.lime} 7%, ${color.ground})`,
  `color-mix(in srgb, ${color.primary} 5%, ${color.ground})`,
  `color-mix(in srgb, ${color.limeDeep} 10%, ${color.ground})`,
  `color-mix(in srgb, ${color.primary} 8%, ${color.ground})`,
];

// The section's ground fades in and out at its edges, so a tint is a wash
// rather than a band with hard lines.
const EDGE_FADE = "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)";

// Each tint rises from the bottom behind a soft edge 40% of the section tall,
// its height set by --reveal (0 to 1) — so there is never a hard line to see
// moving, only a wash coming up.
const RISING = "linear-gradient(to top, #000 calc(var(--reveal, 0) * 140% - 40%), transparent calc(var(--reveal, 0) * 140%))";

const fade = `opacity ${motion.slow}, transform ${motion.slow}`;

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
 * Where projects stall, told as a scroll: the list on the right scrolls
 * normally, and the panel on the left holds still and follows it — whichever
 * failure mode is in the middle of the screen is the one the panel shows.
 *
 * Each failure mode also has its own faint ground, and the grounds are tied to
 * scroll position rather than to the switch between items: as you scroll from
 * one item to the next, the next tint rises up the section behind a soft,
 * tall edge, and it sinks back as you scroll up. Because the position is
 * continuous there is no moment where anything jumps — the wash simply keeps
 * pace with the page. It is a CSS variable per layer, written in one rAF per
 * scroll, so no React render is involved.
 *
 * The left panel is sticky CSS, not a pinned runway, so the page never stops
 * scrolling and nothing is hijacked. An IntersectionObserver watching a thin
 * band across the middle of the viewport decides which item the panel shows;
 * the panel only cross-fades between states it has already rendered. A thin
 * progress bar on the panel fills as you go.
 *
 * The panel repeats what the list says, so it is hidden from assistive tech —
 * the list is the content. Below `md` there is no panel: each item carries its
 * own figure and the section is an ordinary list.
 */
function Stalls() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);
  const listRef = useRef(null);
  const tintRefs = useRef([]);

  // Which item the panel shows.
  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // How far each tint has risen, from scroll position.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // Continuous position along the list: 0 with the first item's middle at
      // the middle of the screen, 1 with the second's, and so on.
      const at = ((window.innerHeight / 2 - rect.top) / rect.height) * TINTS.length - 0.5;
      tintRefs.current.forEach((el, i) => {
        if (!el || i === 0) return;
        const raw = Math.min(1, Math.max(0, at - (i - 1)));
        const reveal = still ? (raw >= 0.5 ? 1 : 0) : raw * raw * (3 - 2 * raw);
        el.style.setProperty("--reveal", reveal.toFixed(4));
      });
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <Box
      component="section"
      sx={{ position: "relative", isolation: "isolate", paddingBlock: layout.sectionYTight }}
    >
      {/* The grounds, stacked in order; each one above the first rises over
          the one before it. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
      >
        {TINTS.map((tint, i) => (
          <Box
            key={tint}
            ref={(el) => {
              tintRefs.current[i] = el;
            }}
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: i,
              backgroundColor: tint,
              ...(i ? { maskImage: RISING, WebkitMaskImage: RISING } : null),
            }}
          />
        ))}
      </Box>

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

        <Box
          sx={{
            mt: { xs: 6, md: 10 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" },
            columnGap: { md: 8, lg: 12 },
          }}
        >
          {/* Left: holds still, follows the list. */}
          <Box aria-hidden sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "sticky", top: `calc(${layout.navHeight.md}px + 32px)` }}>
              <Box sx={{ height: "2px", backgroundColor: color.rule, mb: 4, overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: color.lime,
                    transformOrigin: "left",
                    transform: `scaleX(${(active + 1) / challenges.length})`,
                    transition: `transform ${motion.slow}`,
                  }}
                />
              </Box>

              <Box sx={{ display: "grid" }}>
                {challenges.map((item, i) => (
                  <Box
                    key={item.sNo}
                    sx={{
                      gridArea: "1 / 1",
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? "none" : "translateY(10px)",
                      transition: fade,
                    }}
                  >
                    <Typography
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
                    <Box sx={{ mt: 2, display: "flex", gap: 3, color: color.inkFaint, fontSize: "0.9375rem" }}>
                      <span>{DETAIL[i].topic}</span>
                      <span className="tabular">
                        {i + 1} of {challenges.length}
                      </span>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 4, display: "grid", aspectRatio: "4 / 3" }}>
                {challenges.map((item, i) => (
                  <Plate
                    key={item.sNo}
                    index={i}
                    sx={{
                      gridArea: "1 / 1",
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? "none" : "scale(0.985)",
                      transition: fade,
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ mt: 2, display: "grid" }}>
                {challenges.map((item, i) => (
                  <Typography
                    key={item.sNo}
                    variant="body2"
                    sx={{
                      gridArea: "1 / 1",
                      color: color.inkFaint,
                      opacity: i === active ? 1 : 0,
                      transition: fade,
                    }}
                  >
                    {DETAIL[i].caption}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right: the list, scrolling normally. */}
          <Box ref={listRef} component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {challenges.map((item, i) => (
              <Box
                component="li"
                key={item.sNo}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 120px" },
                  alignItems: "start",
                  columnGap: 3,
                  py: { xs: 4.5, md: 6 },
                  minHeight: { md: "46vh" },
                  borderTop: "1px solid",
                  borderColor: color.rule,
                  "&:last-of-type": { borderBottom: "1px solid", borderColor: color.rule },
                  opacity: { md: i === active ? 1 : 0.4 },
                  transition: `opacity ${motion.slow}`,
                }}
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      color: color.ink,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, color: color.inkMuted, maxWidth: "46ch" }}>
                    {item.desc}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: "0.9375rem",
                      color: color.inkFaint,
                    }}
                  >
                    <span>{DETAIL[i].topic}</span>
                    <LinkBox
                      href="/services"
                      sx={{
                        color: color.ink,
                        textDecoration: "none",
                        transition: `color ${motion.fast}`,
                        "&:hover": { color: color.accent },
                      }}
                    >
                      How We Fix It ›
                    </LinkBox>
                  </Box>

                  <Plate index={i} sx={{ display: { md: "none" }, mt: 3, aspectRatio: "4 / 3" }} />
                </Box>

                <Plate
                  index={i}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    width: 120,
                    height: 120,
                    p: 1.5,
                    borderRadius: radius.lg,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Stalls;
