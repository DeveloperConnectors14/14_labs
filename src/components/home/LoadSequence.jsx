"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SignalPanel from "@/components/home/SignalPanel";
import RetrievalLab from "@/components/home/RetrievalLab";
import { color, layout } from "@/theme/tokens";

gsap.registerPlugin(ScrollTrigger);

/**
 * The two black panels — what we instrument, and the one figure you can move —
 * read as one instrument, so they are scrolled through as one.
 *
 * Vertically they were two full-height black bands in a row, and the second
 * arrived looking like a restatement of the first. Sideways they read as two
 * screens of the same console: here is what we watch, now here is one of those
 * measurements with the control handed to you.
 *
 * How it is pinned: CSS `position: sticky` holds the rail, and GSAP only drives
 * the horizontal transform. That is the same division of labour the challenges
 * sequence uses further up the page, and it is far more robust than asking
 * ScrollTrigger to pin the DOM — the browser owns the hard part.
 *
 * The travel ends before the runway does. That trailing hold is not padding:
 * the second panel carries a slider, and releasing the pin the instant it
 * finishes sliding would put the control under the reader's cursor while the
 * page is still moving.
 */

/** Viewports of scroll: one to slide across, half to sit still afterwards. */
const TRAVEL_VH = 110;
const HOLD_VH = 55;
const RUNWAY_VH = 100 + TRAVEL_VH + HOLD_VH;

// useLayoutEffect warns during SSR; this is the standard isomorphic shim.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function LoadSequence() {
  const runwayRef = useRef(null);
  const trackRef = useRef(null);
  const dotRefs = useRef([]);
  const [animated, setAnimated] = useState(false);

  /* Only on pointer-capable wide viewports with motion allowed. A horizontal
     rail on a phone is two screens of content behind a gesture nobody asked
     for, so there it stays two ordinary stacked bands. */
  useEffect(() => {
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 1024px)").matches;
    setAnimated(motionOk && wideEnough);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!animated || !runwayRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        /* The track is two panels wide, so half of it is exactly one panel. */
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: runwayRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * (TRAVEL_VH / 100),
          scrub: 0.6,
          invalidateOnRefresh: true,
          /* The dots are driven off the same progress the track is, rather
             than off a second trigger that could disagree with it. */
          onUpdate: (self) => {
            const at = self.progress > 0.5 ? 1 : 0;
            dotRefs.current.forEach((dot, i) => {
              if (dot) dot.style.backgroundColor = i === at ? color.lime : color.ruleOnBlack;
            });
          },
        },
      });
    }, runwayRef);

    return () => ctx.revert();
  }, [animated]);

  if (!animated) {
    return (
      <>
        <SignalPanel />
        <RetrievalLab />
      </>
    );
  }

  return (
    <Box
      ref={runwayRef}
      component="section"
      sx={{ height: `${RUNWAY_VH}vh`, position: "relative" }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: color.black,
        }}
      >
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            width: "200%",
            height: "100%",
            willChange: "transform",
          }}
        >
          {[
            <SignalPanel key="signal" dense />,
            <RetrievalLab key="retrieval" dense />,
          ].map((panel, i) => (
            <Box
              key={i}
              sx={{
                width: "50%",
                height: "100%",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                /* The nav is fixed and sits over the rail. */
                paddingTop: `${layout.navHeight.md}px`,
                overflow: "hidden",
              }}
            >
              {panel}
            </Box>
          ))}
        </Box>

        {/* Which screen you are on, and that there is another one. Without it a
            pinned rail reads as the page having stopped responding. */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 24,
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          {[0, 1].map((i) => (
            <Box
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              sx={{
                height: "2px",
                width: 34,
                backgroundColor: i === 0 ? color.lime : color.ruleOnBlack,
                transition: "background-color 240ms ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LoadSequence;
