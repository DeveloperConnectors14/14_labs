import { paletteFor } from "./palette";
import Tip from "./Tip";
import { n } from "./seed";

const W = 320;
const H = 220;
const PAD = { l: 34, r: 12, t: 16, b: 28 };
const DOMAIN = [0.35, 0.95];

// Twelve releases of one system. Retrieval recall climbs steadily; grounded
// accuracy regresses at release 07 on a prompt change nobody would have caught
// by hand. The dip is the whole point of the figure.
const RECALL = [0.42, 0.48, 0.55, 0.58, 0.63, 0.69, 0.71, 0.74, 0.79, 0.82, 0.85, 0.88];
const GROUNDED = [0.51, 0.54, 0.58, 0.61, 0.66, 0.68, 0.55, 0.62, 0.71, 0.76, 0.79, 0.83];
const DIP = 6;

const sx = (i, len) => PAD.l + (i / (len - 1)) * (W - PAD.l - PAD.r);
const sy = (v) =>
  H - PAD.b - ((v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (H - PAD.t - PAD.b);

const line = (values) =>
  values.map((v, i) => `${i ? "L" : "M"} ${n(sx(i, values.length))} ${n(sy(v))}`).join(" ");

/**
 * Two evaluation scores across twelve releases, plotted separately.
 *
 * Both lines have to be present for the figure to say anything: end-to-end
 * quality was roughly flat at release 07 while one half of it fell off a cliff,
 * and a single blended number hides exactly that.
 */
function EvalCurve({ tone = "light", ...rest }) {
  const p = paletteFor(tone);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Retrieval recall and grounded accuracy across twelve releases, with a regression in grounded accuracy at release seven"
      {...rest}
    >
      {[0.4, 0.6, 0.8].map((v) => (
        <g key={v}>
          <line
            x1={PAD.l}
            y1={n(sy(v))}
            x2={W - PAD.r}
            y2={n(sy(v))}
            stroke={p.grid}
            strokeWidth="1"
            strokeDasharray="2 5"
          />
          <text
            x={PAD.l - 8}
            y={n(sy(v)) + 3.5}
            textAnchor="end"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill={p.label}
          >
            {v.toFixed(1)}
          </text>
        </g>
      ))}

      <line
        x1={PAD.l}
        y1={H - PAD.b}
        x2={W - PAD.r}
        y2={H - PAD.b}
        stroke={p.axis}
        strokeWidth="1"
      />

      {/* The regression, marked where it happened. */}
      <line
        x1={n(sx(DIP, GROUNDED.length))}
        y1={PAD.t}
        x2={n(sx(DIP, GROUNDED.length))}
        y2={H - PAD.b}
        stroke={p.series[1]}
        strokeWidth="1"
        strokeDasharray="2 4"
        opacity="0.7"
      />

      {/* The secondary series sits on `mark`, not on the palest series step —
          at 1.75px that step vanishes into the plate it is drawn on. */}
      <path d={line(RECALL)} fill="none" stroke={p.mark} strokeWidth="1.75" />
      <path
        d={line(GROUNDED)}
        fill="none"
        stroke={p.highlight}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />

      <circle
        cx={n(sx(DIP, GROUNDED.length))}
        cy={n(sy(GROUNDED[DIP]))}
        r="4.5"
        fill="none"
        stroke={p.series[1]}
        strokeWidth="1.75"
      />

      <text
        x={n(sx(DIP, GROUNDED.length)) + 9}
        y={n(sy(GROUNDED[DIP])) + 15}
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="0.05em"
        fill={p.labelStrong}
      >
        caught in CI
      </text>

      {/* One hit column per release. The dots are the figure's own tick marks
          when nobody is pointing at them, and the readout when somebody is. */}
      {GROUNDED.map((value, i) => (
        <g key={i} className="fx-hot" tabIndex={0}>
          <circle
            className="fx-grow"
            cx={n(sx(i, GROUNDED.length))}
            cy={n(sy(value))}
            r="2.4"
            fill={p.highlight}
          />
          <rect
            x={n(sx(i, GROUNDED.length)) - (W - PAD.l - PAD.r) / (GROUNDED.length * 2)}
            y={PAD.t}
            width={(W - PAD.l - PAD.r) / GROUNDED.length}
            height={H - PAD.t - PAD.b}
            fill="transparent"
          />
          <Tip
            x={n(sx(i, GROUNDED.length))}
            y={n(sy(value)) - 4}
            w={W}
            text={`r${String(i + 1).padStart(2, "0")} · ${value.toFixed(2)}`}
            p={p}
          />
        </g>
      ))}

      <text
        x={PAD.l}
        y={H - 8}
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        r01
      </text>
      <text
        x={W - PAD.r}
        y={H - 8}
        textAnchor="end"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        r12
      </text>
    </svg>
  );
}

export default EvalCurve;
