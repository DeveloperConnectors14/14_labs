"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { color, radius } from "@/theme/tokens";

gsap.registerPlugin(ScrollTrigger);

/**
 * An image in a rounded frame that opens as it arrives and moves at its own
 * pace inside the frame while it passes.
 *
 *   - Unmask: the frame starts inset on all sides and opens to full size over
 *     the stretch where it comes up the screen.
 *   - Parallax: the picture is taller than its frame and slides the extra
 *     height across the whole time the frame is on screen.
 *
 * Both are scrubbed to scroll with GSAP ScrollTrigger, so scrolling back
 * reverses them. Nothing runs under reduced motion; the image just sits in its
 * frame.
 */
function ParallaxImage({ src, sizes, alt = "", sx }) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
      gsap.fromTo(
        frame,
        { clipPath: `inset(7% 7% 7% 7% round ${radius.card})` },
        {
          clipPath: `inset(0% 0% 0% 0% round ${radius.card})`,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top 95%", end: "top 50%", scrub: true },
        }
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={frameRef}
      sx={{
        position: "relative",
        aspectRatio: "16 / 10",
        borderRadius: radius.card,
        overflow: "hidden",
        backgroundColor: color.grey10,
        ...sx,
      }}
    >
      <Box ref={innerRef} sx={{ position: "absolute", insetInline: 0, top: "-8%", bottom: "-8%" }}>
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover" }} />
      </Box>
    </Box>
  );
}

export default ParallaxImage;
