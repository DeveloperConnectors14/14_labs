import { paletteFor } from "./palette";
import Tip from "./Tip";
import { n, rng } from "./seed";

const W = 460;
const H = 280;
const STEP = 20;
const MARK = 11;

/**
 * The signals worth an alert, at the positions they occupy in the drawing.
 *
 * The set is the point of the figure: none of these are model metrics. They are
 * the operational facts that decide whether a system is trustworthy at three in
 * the morning, and they are the reason the figure exists rather than a picture
 * of a dashboard.
 */
const SIGNALS = [
  { x: 80, y: 60, label: "retry loop · agent 3" },
  { x: 200, y: 40, label: "tool timeout" },
  { x: 340, y: 80, label: "token spend / request" },
  { x: 120, y: 160, label: "p95 latency" },
  { x: 380, y: 180, label: "eval pass rate" },
  { x: 180, y: 240, label: "cache hit rate" },
  { x: 300, y: 220, label: "schema errors" },
];

/**
 * Two signals are named on the face of the figure rather than on hover, with
 * the elbow that ties a label to its mark. Without them the figure is a grid of
 * squares that gives a reader nothing until they touch it — and a drawing that
 * only works on hover does not work in a screenshot, on a phone, or in print.
 */
const CALLOUTS = [
  {
    x: 258,
    y: 132,
    label: "groundedness drop",
    to: { x: 320, y: 132, ty: 122 },
    anchor: "start",
  },
  {
    x: 60,
    y: 210,
    label: "queue depth",
    to: { x: 60, y: 244, ty: 258 },
    anchor: "start",
  },
];

/**
 * An instrumentation map: a field of sampled signals with the ones we alert on
 * lit inside it.
 *
 * Weight is carried by brightness alone, on one colour, the way every other
 * figure on the site works — a second hue here would have to mean something,
 * and "this square is a different colour" is not a thing this drawing knows.
 */
function SignalMap({ tone = "deep", seed = 23, ...rest }) {
  const p = paletteFor(tone);
  const next = rng(seed);

  const texture = [];
  for (let y = STEP; y < H - STEP / 2; y += STEP) {
    for (let x = STEP; x < W - STEP / 2; x += STEP) {
      const v = next();
      if (v > 0.78) texture.push({ x, y, o: 0.1 + v * 0.16 });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A field of sampled production signals with seven instrumented ones lit inside it, including retry loops, tool timeouts, token spend, tail latency and schema errors"
      {...rest}
    >
      <g stroke={p.grid} strokeWidth="1" opacity="0.5">
        {Array.from({ length: Math.floor(H / 40) }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 40} x2={W} y2={(i + 1) * 40} />
        ))}
        {Array.from({ length: Math.floor(W / 40) }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2={H} />
        ))}
      </g>

      {texture.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x - 4}
          y={cell.y - 4}
          width="8"
          height="8"
          rx="1.5"
          fill={p.mark}
          opacity={n(cell.o)}
        />
      ))}

      {CALLOUTS.map((callout) => (
        <g key={callout.label}>
          <path
            d={`M ${callout.x} ${callout.y} H ${callout.to.x} V ${callout.to.y}`}
            fill="none"
            stroke={p.highlight}
            strokeWidth="1"
            opacity="0.5"
          />
          <rect
            x={callout.x - MARK / 2}
            y={callout.y - MARK / 2}
            width={MARK}
            height={MARK}
            rx="2"
            fill={p.highlight}
          />
          <text
            x={callout.to.x + 6}
            y={callout.to.ty}
            textAnchor={callout.anchor}
            fontSize="11"
            fontFamily="var(--font-mono)"
            letterSpacing="0.04em"
            fill={p.labelStrong}
          >
            {callout.label}
          </text>
        </g>
      ))}

      {SIGNALS.map((signal) => (
        <g key={signal.label} className="fx-hot" tabIndex={0}>
          <rect
            className="fx-grow"
            x={signal.x - MARK / 2}
            y={signal.y - MARK / 2}
            width={MARK}
            height={MARK}
            rx="2"
            fill={p.highlight}
          />
          <rect
            x={signal.x - 15}
            y={signal.y - 15}
            width="30"
            height="30"
            fill="transparent"
          />
          <Tip
            x={signal.x}
            y={signal.y - 8}
            w={W}
            text={signal.label}
            p={p}
            above={signal.y > 50}
          />
        </g>
      ))}
    </svg>
  );
}

export default SignalMap;
