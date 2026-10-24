import { Box } from "@mui/material";

// The grid lives in a 1600 x 900 space scaled to cover the hero ("slice").
const VIEW_W = 1600;
const VIEW_H = 900;
const CELL = 75;

// Clear in the middle where the text sits, visible towards the edges.
const MASK = "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 25%, black 100%)";

const gridPath = (() => {
  const d = [];
  for (let x = 0; x <= VIEW_W; x += CELL) d.push(`M${x} 0V${VIEW_H}`);
  for (let y = 0; y <= VIEW_H; y += CELL) d.push(`M0 ${y}H${VIEW_W}`);
  return d.join("");
})();

// Faint, static grid behind the hero headline.
function HeroGrid() {
  return (
    <Box
      component="svg"
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      <path d={gridPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </Box>
  );
}

export default HeroGrid;
