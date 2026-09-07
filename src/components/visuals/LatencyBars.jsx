import { paletteFor } from "./palette";
import Tip from "./Tip";
import { n, quantise, rng } from "./seed";

const W = 320;
const H = 220;
const PAD = { l: 10, r: 10, t: 30, b: 30 };
const BINS = 30;
const P50 = 9;
const P95 = 22;

/**
 * A response-time histogram with the two percentiles worth quoting marked on it.
 *
 * Latency is log-normal in practice, which is why the p95 marker sits so far
 * right of the mode, and why a mean would be a meaningless number to put in a
 * report. Drawing the distribution is faster than arguing about it.
 */
function LatencyBars({ tone = "light", seed = 31, ...rest }) {
  const p = paletteFor(tone);
  const next = rng(seed);

  const bars = Array.from({ length: BINS }, (_, i) => {
    const x = (i + 0.6) / BINS;
    const shape = Math.exp(-Math.pow(Math.log(x / 0.24), 2) / 0.55);
    return quantise(Math.max(0.04, shape * (0.85 + next() * 0.3)), 4);
  });

  const peak = Math.max(...bars);
  const total = bars.reduce((sum, value) => sum + value, 0);
  const barW = (W - PAD.l - PAD.r) / BINS;
  const markerX = (i) => PAD.l + (i + 0.5) * barW;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A long tailed response time histogram with the median and ninety fifth percentile marked"
      {...rest}
    >
      {bars.map((value, i) => {
        const h = (value / peak) * (H - PAD.t - PAD.b);
        const beyond = i > P95;
        const share = Math.round((value / total) * 100);

        return (
          <g key={i} className="fx-hot" tabIndex={0}>
            <rect
              className="fx-mark"
              x={n(PAD.l + i * barW)}
              y={n(H - PAD.b - h)}
              width={n(barW - 1.6)}
              height={n(h)}
              rx="1.5"
              fill={beyond ? p.series[1] : p.highlight}
              opacity={beyond ? 0.5 : i > P50 ? 0.62 : 0.9}
            />

            {/* Full-height hit column. Hovering a 4px-tall bar in the tail is
                otherwise a test of aim rather than an interaction. */}
            <rect
              x={n(PAD.l + i * barW)}
              y={PAD.t - 14}
              width={n(barW)}
              height={H - PAD.b - PAD.t + 14}
              fill="transparent"
            />
            <Tip
              x={n(PAD.l + (i + 0.5) * barW)}
              y={n(H - PAD.b - h)}
              w={W}
              text={`${share < 1 ? "<1" : share}% of calls`}
              p={p}
            />
          </g>
        );
      })}

      <line
        x1={PAD.l}
        y1={H - PAD.b}
        x2={W - PAD.r}
        y2={H - PAD.b}
        stroke={p.axis}
        strokeWidth="1"
      />

      {[
        { i: P50, label: "p50" },
        { i: P95, label: "p95" },
      ].map(({ i, label }) => (
        <g key={label}>
          <line
            x1={n(markerX(i))}
            y1={PAD.t - 12}
            x2={n(markerX(i))}
            y2={H - PAD.b}
            stroke={p.labelStrong}
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <text
            x={n(markerX(i))}
            y={PAD.t - 17}
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
            fill={p.labelStrong}
          >
            {label}
          </text>
        </g>
      ))}

      <text
        x={W - PAD.r}
        y={H - 10}
        textAnchor="end"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        tail
      </text>
    </svg>
  );
}

export default LatencyBars;
