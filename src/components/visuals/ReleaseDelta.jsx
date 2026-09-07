import { paletteFor } from "./palette";
import Tip from "./Tip";
import { n } from "./seed";

const W = 320;
const H = 220;
const PAD = { l: 82, r: 42, t: 22, b: 26 };
const DOMAIN = [-0.13, 0.09];

/**
 * One release, broken out per suite. The blended score moved +0.01, which is
 * why the diff is the only honest way to draw it: two suites went backwards
 * far enough to matter and the average swallowed both.
 */
const SUITES = [
  { name: "grounded qa", delta: 0.06 },
  { name: "json valid", delta: 0.05 },
  { name: "multi-hop", delta: 0.04 },
  { name: "tool choice", delta: 0.03 },
  { name: "summarise", delta: 0.02 },
  { name: "pii redact", delta: -0.01 },
  { name: "refusal", delta: -0.03 },
  { name: "citation acc", delta: -0.11 },
];

const ROW = (H - PAD.t - PAD.b) / SUITES.length;
const BAR = 10;

const x = (v) =>
  PAD.l + ((v - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * (W - PAD.l - PAD.r);
const ZERO = x(0);

// U+2212, not a hyphen. A hyphen next to a mono digit reads as a list bullet.
const signed = (v) => `${v < 0 ? "\u2212" : "+"}${Math.abs(v).toFixed(2)}`;

/**
 * Per-suite change between two releases, as a diverging bar chart.
 *
 * A diff rather than a level on purpose: the question this panel is about is
 * "did it get better", and levels answer that only if you can hold twelve
 * numbers from last week in your head. Bars leaving the zero line to the left
 * are the regressions, and the worst one is labelled because it is the reason
 * the figure exists.
 */
function ReleaseDelta({ tone = "light", ...rest }) {
  const p = paletteFor(tone);
  const worst = SUITES.reduce((a, b) => (b.delta < a.delta ? b : a));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Per suite score change between two releases; five suites improved, three regressed, citation accuracy by eleven points"
      {...rest}
    >
      {SUITES.map((suite, i) => {
        const y = PAD.t + i * ROW + (ROW - BAR) / 2;
        const negative = suite.delta < 0;
        const isWorst = suite === worst;
        const x0 = negative ? x(suite.delta) : ZERO;
        const w = Math.abs(x(suite.delta) - ZERO);

        return (
          <g key={suite.name} className="fx-hot" tabIndex={0}>
            <text
              x={PAD.l - 10}
              y={n(y + BAR / 2 + 3)}
              textAnchor="end"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.02em"
              fill={isWorst ? p.labelStrong : p.label}
            >
              {suite.name}
            </text>

            <rect
              className="fx-lift"
              x={n(x0)}
              y={n(y)}
              width={n(Math.max(w, 1.5))}
              height={BAR}
              rx="1.5"
              fill={negative ? p.highlight : p.mark}
              opacity={negative ? (isWorst ? 1 : 0.72) : 0.85}
            />

            {/* Value column, parked at a fixed right edge. Labelling each bar
                at its own end puts the long negative labels straight into the
                suite names. */}
            <text
              x={W - 6}
              y={n(y + BAR / 2 + 3)}
              textAnchor="end"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.02em"
              fill={isWorst ? p.labelStrong : p.label}
            >
              {signed(suite.delta)}
            </text>

            {/* Full-width hit row: the +0.01 bars are 9px of target otherwise. */}
            <rect
              x={PAD.l - 74}
              y={n(PAD.t + i * ROW)}
              width={W - PAD.l + 74}
              height={n(ROW)}
              fill="transparent"
            />
            <Tip
              x={n(negative ? x0 + w / 2 : ZERO + w / 2)}
              y={n(y)}
              w={W}
              text={`${suite.name} ${signed(suite.delta)}`}
              p={p}
            />
          </g>
        );
      })}

      <line
        x1={n(ZERO)}
        y1={PAD.t - 8}
        x2={n(ZERO)}
        y2={H - PAD.b + 4}
        stroke={p.axis}
        strokeWidth="1"
      />

      <text
        x={n(ZERO)}
        y={PAD.t - 12}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        0
      </text>

      <text
        x={PAD.l - 74}
        y={H - 9}
        fontSize="8.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        r06 → r07
      </text>

      <text
        x={W - 6}
        y={H - 9}
        textAnchor="end"
        fontSize="8.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.labelStrong}
      >
        blended +0.01
      </text>
    </svg>
  );
}

export default ReleaseDelta;
