import { paletteFor } from "./palette";
import Tip from "./Tip";
import { quantise, rng } from "./seed";

const COLS = 18;
const ROWS = 11;
const CELL = 16;
const GAP = 2;

const W = COLS * CELL;
const H = ROWS * CELL;

/**
 * A field with a strong diagonal band and a scatter of off-diagonal mass — the
 * shape an attention map or a confusion matrix actually has. Weight is carried
 * entirely by opacity, so the figure never leaves the one colour.
 */
function SignalGrid({ tone = "light", seed = 19, ...rest }) {
  const p = paletteFor(tone);
  const next = rng(seed);

  const cells = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      // Distance from the diagonal, normalised so a non-square grid still
      // reads as a diagonal rather than as a lopsided smear.
      const t = Math.abs(c / (COLS - 1) - r / (ROWS - 1));
      const band = Math.exp(-(t * t) / 0.012);
      const noise = next();
      // Quantised before the threshold below reads it, not after.
      const value = quantise(Math.min(1, band * (0.55 + noise * 0.6) + noise * 0.16));
      if (value > 0.05) cells.push({ r, c, value });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A matrix heat map with weight concentrated along the diagonal"
      {...rest}
    >
      {cells.map(({ r, c, value }) => {
        const cell = (
          <rect
            className="fx-mark"
            x={c * CELL}
            y={r * CELL}
            width={CELL - GAP}
            height={CELL - GAP}
            rx="2"
            fill={value > 0.62 ? p.highlight : p.series[2]}
            opacity={quantise(value > 0.62 ? 0.35 + value * 0.65 : 0.12 + value * 0.55)}
          />
        );

        // Only the cells carrying real weight are hoverable. Making a hundred
        // near-empty squares interactive would turn a figure into a minefield
        // of tooltips for nothing.
        if (value < 0.4) return <g key={`${r}-${c}`}>{cell}</g>;

        return (
          <g key={`${r}-${c}`} className="fx-hot" tabIndex={0}>
            {cell}
            <Tip
              x={c * CELL + (CELL - GAP) / 2}
              y={r * CELL + (r === 0 ? CELL - GAP : 0)}
              w={W}
              text={`${r}·${c} — ${value.toFixed(2)}`}
              p={p}
              above={r > 0}
            />
          </g>
        );
      })}

    </svg>
  );
}

export default SignalGrid;
