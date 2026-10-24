"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { SECTION_PX } from "@/theme/tokens";

// DeepMind reference measurements: 400px cards, 48px apart, in a row three cards wide.
const CARD_WIDTH = 400;
const CARD_GAP = 48;
const ROW_WIDTH = 3 * CARD_WIDTH + 2 * CARD_GAP;

// Arrows float over the cards, vertically centred on the track. They're hidden
// on touch screens (which swipe) and fade out at either end of the row.
const arrowSx = {
  display: { xs: "none", sm: "inline-flex" },
  position: "absolute",
  top: "50%",
  zIndex: 1,
  width: 52,
  height: 52,
  transform: "translateY(-50%)",
  border: 1,
  borderColor: "divider",
  color: "text.primary",
  backgroundColor: "background.paper",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.12)",
  transition: "all 0.3s ease",
  "&:hover": { backgroundColor: "background.paper", color: "secondary.main" },
  "&.Mui-disabled": { opacity: 0, backgroundColor: "background.paper" },
};

// Native scroll-snap track: touch swiping and keyboard scrolling come from
// the browser, and the server-rendered HTML already has the final layout.
function ResearchCarousel({ label, children }) {
  const theme = useTheme();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateArrows]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const slide = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Like the DeepMind reference: the first card starts at the left edge of a
  // centred row three cards wide, while the track bleeds to the screen edge so
  // the next card peeks in. `100%` is the section's content width here, so
  // `100% + 2 * section padding` is the full screen width.
  const bleed = Object.fromEntries(Object.entries(SECTION_PX).map(([bp, v]) => [bp, -v]));
  const inset = Object.fromEntries(Object.entries(SECTION_PX).map(([bp, v]) => {
    const pad = theme.spacing(v);
    return [bp, `max(${pad}, calc((100% + 2 * ${pad} - ${ROW_WIDTH}px) / 2))`];
  }));
  // Snap padding resolves `100%` against the track itself, which is already
  // full screen width, so the same inset needs no section padding added.
  const snapInset = Object.fromEntries(Object.entries(SECTION_PX).map(([bp, v]) => {
    const pad = theme.spacing(v);
    return [bp, `max(${pad}, calc((100% - ${ROW_WIDTH}px) / 2))`];
  }));

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton aria-label="Previous papers" onClick={() => scrollByCard(-1)} disabled={!canPrev} sx={{ ...arrowSx, left: 12 }}>
        <ArrowBack />
      </IconButton>
      <IconButton aria-label="Next papers" onClick={() => scrollByCard(1)} disabled={!canNext} sx={{ ...arrowSx, right: 12 }}>
        <ArrowForward />
      </IconButton>

      <Box
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={updateArrows}
        sx={{
          display: "flex",
          gap: { xs: 3, sm: `${CARD_GAP}px` },
          mx: bleed,
          px: inset,
          py: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollPaddingInline: snapInset,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "&:focus-visible": { outline: 2, outlineColor: "secondary.main", outlineOffset: -2 },
        }}
      >
        {Children.map(children, (child) => (
          // Fixed-width slides matching the reference cards; phones use 80% of the screen.
          <Box sx={{ flex: "0 0 auto", width: { xs: "80vw", sm: CARD_WIDTH }, scrollSnapAlign: "start" }}>
            {child}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ResearchCarousel;
