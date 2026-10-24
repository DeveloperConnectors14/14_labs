import { Box } from "@mui/material";
import { TILE_RADIUS } from "@/theme/tokens";

const NAVY = "#0A3B60";
const TEAL = "#00D3B1";
const GREY = "#808080";

// Inline SVGs share the document's id namespace and several cards can show
// the same topic, so none of these drawings use ids or <defs>.
const art = {
  solar: (
    <>
      <circle cx="318" cy="78" r="30" fill={TEAL} opacity="0.9" />
      <circle cx="318" cy="78" r="46" fill="none" stroke={TEAL} strokeOpacity="0.4" strokeWidth="2" />
      <line x1="40" y1="260" x2="360" y2="260" stroke={GREY} strokeOpacity="0.5" strokeWidth="2" />
      <path d="M40 232 C90 214 120 150 170 148 S250 196 290 168 S340 120 360 118 L360 158 C340 160 320 196 290 206 S220 186 170 186 S90 246 40 252 Z" fill={NAVY} opacity="0.08" />
      <path d="M40 242 C90 226 120 166 170 166 S250 212 290 186 S340 138 360 138" fill="none" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 236 C92 222 124 156 172 160 S248 200 292 176 S342 128 360 126" fill="none" stroke={TEAL} strokeWidth="3" strokeDasharray="10 8" strokeLinecap="round" />
    </>
  ),
  materials: (
    <>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <circle key={`${row}-${col}`} cx={60 + col * 40} cy={150 + row * 36} r="7" fill={NAVY} opacity={0.15 + row * 0.08} />
        ))
      )}
      <path d="M60 150 H220 M60 186 H220 M60 222 H220 M60 258 H220 M60 150 V258 M100 150 V258 M140 150 V258 M180 150 V258 M220 150 V258" stroke={GREY} strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M150 50 C210 60 250 120 290 170 S340 240 370 250" fill="none" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      {[[168, 58], [228, 96], [268, 146], [306, 192], [344, 236]].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="7" fill={TEAL} />
      ))}
    </>
  ),
  nano: (
    <>
      {[[70, 210, 26], [118, 172, 16], [104, 248, 14], [160, 226, 22], [200, 266, 12], [56, 130, 12], [214, 190, 10]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={NAVY} opacity={0.2 + (i % 3) * 0.12} />
      ))}
      <circle cx="160" cy="226" r="40" fill="none" stroke={TEAL} strokeWidth="2.5" strokeDasharray="8 6" />
      <line x1="190" y1="198" x2="250" y2="140" stroke={TEAL} strokeWidth="2.5" strokeDasharray="8 6" />
      <circle cx="292" cy="104" r="70" fill="#ffffff" fillOpacity="0.6" stroke={TEAL} strokeWidth="3" />
      {[[270, 92, 22], [312, 84, 14], [300, 128, 18], [262, 132, 9]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={NAVY} opacity={0.35 + i * 0.12} />
      ))}
    </>
  ),
  vision: (
    <>
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => (
          <rect key={`${col}-${row}`} x={40 + col * 112} y={56 + row * 112} width="96" height="96" rx="10" fill={NAVY} opacity="0.06" stroke={GREY} strokeOpacity="0.4" strokeWidth="1.5" />
        ))
      )}
      <path d="M264 238 C246 220 252 196 268 182 C268 198 278 202 282 196 C292 210 298 226 286 240 C280 246 270 246 264 238 Z" fill={TEAL} />
      <rect x="236" y="164" width="80" height="92" rx="4" fill="none" stroke={TEAL} strokeWidth="3" strokeDasharray="10 6" />
      <rect x="236" y="132" width="92" height="26" rx="6" fill={NAVY} />
      <text x="282" y="150" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="'IBM Plex Mono', monospace">fire 0.94</text>
    </>
  ),
  environment: (
    <>
      {[120, 96, 72, 48, 24].map((r, i) => (
        <ellipse key={r} cx="200" cy="170" rx={r * 1.45} ry={r} fill="none" stroke={NAVY} strokeOpacity={0.15 + i * 0.12} strokeWidth="2.5" transform={`rotate(-12 200 170)`} />
      ))}
      {[[86, 112], [300, 96], [130, 250], [316, 232], [208, 168]].map(([cx, cy]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="16" fill={TEAL} opacity="0.25" />
          <circle cx={cx} cy={cy} r="7" fill={TEAL} />
        </g>
      ))}
    </>
  ),
};

function ResearchArt({ topic }) {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: TILE_RADIUS,
        background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 400 320"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        {art[topic] ?? art.solar}
      </svg>
    </Box>
  );
}

export default ResearchArt;
