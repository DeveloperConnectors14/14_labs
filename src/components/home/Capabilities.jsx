"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, Container, IconButton, Typography } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import TopicFigure from "@/components/visuals/TopicFigure";
import PillLink from "@/components/ui/PillLink";
import { getServices } from "@/services/dataService";
import { color, layout, motion, radius } from "@/theme/tokens";

const services = getServices();

// Service title to the figure vocabulary TopicFigure resolves.
const TOPIC = {
  "Multi-agent systems": "Multi-agent systems",
  "Retrieval & knowledge systems": "Retrieval",
  "Applied machine learning": "Applied ML",
  "Evaluation & reliability": "Evaluation",
};

// One line each. The full descriptions live on the services page; a card that
// makes you read a paragraph is not a card.
const TAGLINE = {
  "Multi-agent systems": "Pipelines of specialised agents, each with a contract, a budget and a trace.",
  "Retrieval & knowledge systems": "The right context in front of the model — measured, not guessed.",
  "Applied machine learning": "Models chosen for the decision they support, not for the hype cycle.",
  "Evaluation & reliability": "Golden sets, regression gates and tracing, so every change is measurable.",
};

const CARDS = [
  ...services.map((service) => ({
    key: service.sNo,
    title: service.title,
    tagline: TAGLINE[service.title],
    topic: TOPIC[service.title],
    href: "/services",
  })),
  {
    key: "research",
    title: "Research notes",
    tagline: "What we measured, what failed and what we would do again.",
    image: "/media/hero.png",
    href: "/research",
    cta: "Read the notes",
  },
];

const GAP_PX = 24;

// Lines the first card up with the container's left edge at every width, and
// lets the last one run to the viewport edge.
const TRACK_PAD = {
  xs: layout.gutter.xs,
  sm: layout.gutter.sm,
  md: layout.gutter.md,
  lg: `max(${layout.gutter.lg}, calc((100% - ${layout.maxWidth}px) / 2 + ${layout.gutter.lg}))`,
};

function Card({ card }) {
  return (
    <Box
      component="article"
      sx={{
        position: "relative",
        flex: "0 0 auto",
        width: { xs: "84vw", sm: 380, md: 420 },
        height: { xs: 500, md: 580 },
        borderRadius: radius.card,
        overflow: "hidden",
        backgroundColor: color.black,
        color: color.onBlack,
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {card.image ? (
        <>
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(max-width: 640px) 84vw, 420px"
            style={{ objectFit: "cover" }}
          />
          {/* A scrim only where the type sits, so the image keeps its middle. */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 42%, transparent 68%, rgba(0,0,0,0.55))",
            }}
          />
        </>
      ) : (
        <>
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(70% 45% at 50% 88%, color-mix(in srgb, ${color.lime} 22%, transparent), transparent 72%)`,
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              insetInline: 0,
              top: 176,
              bottom: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
            }}
          >
            <TopicFigure
              topic={card.topic}
              tone="black"
              style={{ width: "100%", height: "auto", maxHeight: "100%" }}
            />
          </Box>
        </>
      )}

      <Box sx={{ position: "relative", p: { xs: 3, md: 4 } }}>
        <Typography
          component="h3"
          sx={{ fontSize: "1.75rem", lineHeight: 1.15, letterSpacing: "-0.02em", color: color.onBlack }}
        >
          {card.title}
        </Typography>
        <Typography
          sx={{ mt: 1.25, fontSize: "1.0625rem", lineHeight: 1.45, color: color.onBlackMuted, maxWidth: "30ch" }}
        >
          {card.tagline}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", mt: "auto", p: { xs: 3, md: 4 }, display: "flex", gap: 1 }}>
        <PillLink href={card.href} variant="inverse" size="sm">
          {card.cta ?? "Learn more"}
        </PillLink>
        {card.image ? null : (
          <PillLink href="/contact" variant="inverseOutline" size="sm">
            Talk to us
          </PillLink>
        )}
      </Box>
    </Box>
  );
}

/**
 * What we build, as a row of tall cards you move through sideways — four
 * practices and the research that backs them.
 *
 * It is a native horizontal scroller with snap points, not a JS carousel: a
 * trackpad swipe, shift-wheel, a drag on touch and the arrow keys (once the
 * track has focus) all work without any code. The two buttons are the only
 * scripted part. `data-lenis-prevent-horizontal` hands sideways gestures back
 * to the browser; vertical wheel over the row still scrolls the page.
 */
function Capabilities() {
  const trackRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdge({ start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4 });
    };

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const distance = card ? card.getBoundingClientRect().width + GAP_PX : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const buttonSx = {
    width: 44,
    height: 44,
    color: color.ink,
    transition: `background-color ${motion.fast}`,
    "&:hover": { backgroundColor: color.ground },
    "&.Mui-disabled": { color: color.inkFaint, opacity: 0.45 },
  };

  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Typography variant="h2" sx={{ maxWidth: "14ch" }}>
            What we build
          </Typography>
          <PillLink href="/services" variant="outline">
            All services
          </PillLink>
        </Box>
      </Container>

      <Box
        ref={trackRef}
        data-lenis-prevent-horizontal
        role="region"
        aria-label="What we build"
        tabIndex={0}
        sx={{
          mt: { xs: 5, md: 7 },
          display: "flex",
          gap: `${GAP_PX}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollPaddingInline: TRACK_PAD,
          px: TRACK_PAD,
          pb: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "&:focus-visible": { outlineOffset: "-2px" },
        }}
      >
        {CARDS.map((card) => (
          <Card key={card.key} card={card} />
        ))}
      </Box>

      <Container>
        <Box
          sx={{
            mt: 3,
            display: "inline-flex",
            gap: 0.5,
            p: 0.5,
            borderRadius: radius.pill,
            backgroundColor: color.surfaceAlt,
          }}
        >
          <IconButton aria-label="Previous" onClick={() => step(-1)} disabled={edge.start} sx={buttonSx}>
            <ChevronLeft />
          </IconButton>
          <IconButton aria-label="Next" onClick={() => step(1)} disabled={edge.end} sx={buttonSx}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Capabilities;
