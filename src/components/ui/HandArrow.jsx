import { Box } from "@mui/material";
import { color } from "@/theme/tokens";

/**
 * A pencil arrow, the kind someone draws on a printout to point at the part
 * that matters. Two strokes, the second offset and fainter, is what makes it
 * read as drawn rather than as a vector icon.
 *
 *   loop    a loose arc that sweeps left and lands pointing down
 *   sweep   a long curve from the top right that lands pointing left
 */
const PATHS = {
  loop: {
    viewBox: "0 0 160 110",
    d: "M150 20 C 112 -2, 46 2, 24 50 C 16 68, 17 84, 25 98",
    head: "M13 85 L 25 99 L 37 87",
  },
  sweep: {
    viewBox: "0 0 100 180",
    d: "M70 4 C 106 52, 100 122, 22 166",
    head: "M35 150 L 20 167 L 43 172",
  },
};

function HandArrow({ variant = "loop", sx }) {
  const p = PATHS[variant] ?? PATHS.loop;

  return (
    <Box
      component="svg"
      viewBox={p.viewBox}
      fill="none"
      aria-hidden
      sx={{ display: "block", color: color.ink, overflow: "visible", ...sx }}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d={p.d} strokeWidth="1.3" />
        <path d={p.head} strokeWidth="1.3" />
        <g transform="translate(0.9 0.7)" opacity="0.4">
          <path d={p.d} strokeWidth="0.8" />
          <path d={p.head} strokeWidth="0.8" />
        </g>
      </g>
    </Box>
  );
}

export default HandArrow;
