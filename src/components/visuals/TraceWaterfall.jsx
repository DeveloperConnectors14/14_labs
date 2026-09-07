import { paletteFor } from "./palette";
import Tip from "./Tip";
import { n } from "./seed";

const W = 320;
const H = 220;
const PAD = { l: 78, r: 8, t: 18, b: 26 };
const TOTAL = 12.4;

/**
 * One request through an eleven-step system. `depth` is call nesting, `runs`
 * splits a span into the attempts it actually took — the HTTP tool succeeded
 * on the fourth, and four seconds of the twelve are that retry loop.
 */
const SPANS = [
  { name: "orchestrate", depth: 0, at: [[0.0, 1.0]] },
  { name: "plan", depth: 1, at: [[0.02, 0.1]] },
  { name: "retrieve", depth: 1, at: [[0.11, 0.24]] },
  { name: "rerank", depth: 2, at: [[0.24, 0.31]] },
  { name: "tool:sql", depth: 2, at: [[0.32, 0.41]] },
  {
    name: "tool:http",
    depth: 2,
    at: [[0.42, 0.48], [0.5, 0.56], [0.58, 0.64], [0.66, 0.73]],
    retries: 4,
  },
  { name: "critic", depth: 1, at: [[0.74, 0.79]] },
  { name: "synthesise", depth: 1, at: [[0.79, 0.88]] },
  { name: "guardrail", depth: 2, at: [[0.88, 0.92]] },
  { name: "format", depth: 1, at: [[0.92, 0.96]] },
  { name: "emit", depth: 1, at: [[0.96, 0.995]] },
];

const ROW = (H - PAD.t - PAD.b) / SPANS.length;
const BAR = 7;
const PLOT = W - PAD.l - PAD.r;

const x = (f) => PAD.l + f * PLOT;
const seconds = (span) =>
  span.at.reduce((sum, [a, b]) => sum + (b - a), 0) * TOTAL;

/**
 * One request drawn on a time axis rather than as a topology.
 *
 * A node graph tells you which agents exist; it cannot tell you that one of
 * them burned a third of the wall clock quietly retrying. Spans on a shared
 * clock is the view that makes a stall obvious without anyone having to
 * already suspect where it is.
 */
function TraceWaterfall({ tone = "light", ...rest }) {
  const p = paletteFor(tone);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A trace waterfall of eleven spans across twelve point four seconds; the HTTP tool span is split into four retry attempts"
      {...rest}
    >
      {[0, 0.5, 1].map((f) => (
        <line
          key={f}
          x1={n(x(f))}
          y1={PAD.t - 6}
          x2={n(x(f))}
          y2={H - PAD.b}
          stroke={p.grid}
          strokeWidth="1"
          strokeDasharray="2 5"
        />
      ))}

      {SPANS.map((span, i) => {
        const y = PAD.t + i * ROW + (ROW - BAR) / 2;
        const root = span.depth === 0;
        const hot = Boolean(span.retries);
        const dur = seconds(span);

        return (
          <g key={span.name} className="fx-hot" tabIndex={0}>
            <text
              x={6 + span.depth * 7}
              y={n(y + BAR / 2 + 2.8)}
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="0.02em"
              fill={hot ? p.labelStrong : p.label}
            >
              {span.name}
            </text>

            {span.at.map(([a, b], j) => (
              <rect
                key={j}
                className="fx-lift"
                x={n(x(a))}
                y={n(y)}
                width={n(Math.max((b - a) * PLOT, 2))}
                height={BAR}
                rx="1.5"
                fill={hot ? p.highlight : p.mark}
                opacity={root ? 0.28 : hot ? 1 - j * 0.16 : 0.8}
              />
            ))}

            {hot ? (
              <text
                x={n(x(span.at[span.at.length - 1][1]) + 6)}
                y={n(y + BAR / 2 + 2.8)}
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={p.labelStrong}
              >
                ×{span.retries}
              </text>
            ) : null}

            <rect
              x={0}
              y={n(PAD.t + i * ROW)}
              width={W}
              height={n(ROW)}
              fill="transparent"
            />
            <Tip
              x={n(x(span.at[0][0]) + 20)}
              y={n(y)}
              w={W}
              text={`${span.name} · ${dur.toFixed(1)}s`}
              p={p}
              above={i > 0}
            />
          </g>
        );
      })}

      <line
        x1={n(x(0))}
        y1={H - PAD.b}
        x2={n(x(1))}
        y2={H - PAD.b}
        stroke={p.axis}
        strokeWidth="1"
      />

      {[
        { f: 0, label: "0s", anchor: "start" },
        { f: 0.5, label: "6.2s", anchor: "middle" },
        { f: 1, label: "12.4s", anchor: "end" },
      ].map(({ f, label, anchor }) => (
        <text
          key={label}
          x={n(x(f))}
          y={H - PAD.b + 12}
          textAnchor={anchor}
          fontSize="8.5"
          fontFamily="var(--font-mono)"
          letterSpacing="0.06em"
          fill={p.label}
        >
          {label}
        </text>
      ))}

      <text
        x={6}
        y={PAD.t - 8}
        fontSize="8.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        11 spans · 1 request
      </text>
    </svg>
  );
}

export default TraceWaterfall;
