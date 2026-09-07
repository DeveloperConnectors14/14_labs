import { Box } from "@mui/material";

/**
 * A single row of content, running slowly and forever.
 *
 * Two identical copies sit in one track and the track slides exactly one copy
 * width (`-50%`) before repeating, which is what makes the loop seamless — the
 * trailing gap lives inside each copy for the same reason, so the seam is
 * spaced like every other join.
 *
 * The second copy is hidden from assistive tech: it is the same sentence twice,
 * and a screen reader should hear the list once. Hovering pauses the track so a
 * reader can actually finish a line they are interested in, and reduced motion
 * stops it outright rather than merely slowing it down.
 */
function Marquee({ children, speed = 38, gap = 3.5, fade = 28, sx }) {
  const copySx = { display: "flex", alignItems: "center", gap, pr: gap };
  const edge = `linear-gradient(to right, transparent, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent)`;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minWidth: 0,
        maskImage: edge,
        WebkitMaskImage: edge,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          "@keyframes marqueeTrack": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
          animation: `marqueeTrack ${speed}s linear infinite`,
          "&:hover": { animationPlayState: "paused" },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        <Box sx={copySx}>{children}</Box>
        <Box aria-hidden sx={copySx}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Marquee;
