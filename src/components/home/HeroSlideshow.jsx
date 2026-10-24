"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, ButtonBase, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import { getHeroSlides } from "@/services/dataService";

const slides = getHeroSlides();
const INTERVAL_MS = 7000;
const FADE_MS = 1500;

const fill = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

// Background photos for the homepage hero, crossfading slowly, with labelled
// progress bars (dots on phones) showing which theme is on screen.
//
// The active bar's fill animation drives the rotation: when it finishes, the
// next slide shows. Pausing the animation (hover, off screen, hidden tab)
// therefore pauses the slideshow too, and visitors who prefer reduced motion
// get no animation and so no automatic rotation. The first photo loads with
// priority; the others load in the background.
function HeroSlideshow() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(ref.current);
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const paused = hovered || !inView || tabHidden;
  const next = () => setActive((i) => (i + 1) % slides.length);

  return (
    <Box ref={ref} sx={{ position: "absolute", inset: 0 }}>
      <Box aria-hidden sx={{ position: "absolute", inset: 0 }}>
        {slides.map((slide, i) => (
          <Box
            key={slide.src}
            sx={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}
          >
            <Image src={`/media/${slide.src}`} alt="" fill priority={i === 0} sizes="100vw" style={{ objectFit: "cover" }} />
          </Box>
        ))}
      </Box>

      {slides.length > 1 && (
        <Box
          role="group"
          aria-label="Background themes"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            position: "absolute",
            zIndex: 2,
            display: "flex",
            gap: { xs: 1.5, md: 2 },
            // Phones: a row of dots above the logo strip. Desktop: labelled bars
            // stacked at the right edge, clear of the headline and the strip.
            flexDirection: { xs: "row", md: "column" },
            left: { xs: "50%", md: "auto" },
            right: { md: 40 },
            bottom: { xs: 168, md: "auto" },
            top: { md: "50%" },
            transform: { xs: "translateX(-50%)", md: "translateY(-50%)" },
          }}
        >
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <ButtonBase
                key={slide.src}
                onClick={() => setActive(i)}
                aria-label={`Show ${slide.theme} background`}
                aria-pressed={isActive}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 0.75,
                  p: 0.5,
                  borderRadius: 1,
                  "&:focus-visible": { outline: 2, outlineColor: "secondary.main" },
                }}
              >
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    display: { xs: "none", md: "block" },
                    color: "secondary.contrastText",
                    opacity: isActive ? 1 : 0.6,
                    textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                    transition: "opacity 0.3s",
                  }}
                >
                  {slide.theme}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    display: "block",
                    width: { xs: 8, md: 88 },
                    height: { xs: 8, md: 3 },
                    borderRadius: 4,
                    backgroundColor: "rgba(255,255,255,0.35)",
                  }}
                >
                  {isActive && (
                    <Box
                      component="span"
                      key={`${active}`}
                      onAnimationEnd={next}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "secondary.main",
                        transformOrigin: "left",
                        animation: `${fill} ${INTERVAL_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                        // Reduced motion: show the active bar full, without the
                        // animation, so the slideshow does not rotate on its own.
                        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                      }}
                    />
                  )}
                </Box>
              </ButtonBase>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default HeroSlideshow;
