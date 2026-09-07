import { paletteFor } from "./palette";
import Tip from "./Tip";
import { gaussian, n, quantise, rng } from "./seed";

const W = 320;
const H = 220;

const CLUSTERS = [
  { x: 72, y: 62, sx: 22, sy: 17, count: 46 },
  { x: 214, y: 52, sx: 26, sy: 15, count: 42 },
  { x: 100, y: 162, sx: 19, sy: 20, count: 38 },
  { x: 236, y: 156, sx: 24, sy: 18, count: 44 },
];

const QUERY = { x: 188, y: 104 };
const K = 6;

/**
 * A query in an embedding space with its k nearest neighbours pulled out.
 *
 * The point of the figure is the thing the retrieval write-up argues: the
 * neighbours the query lands next to are drawn from two different clusters, so
 * "nearest" and "relevant" are not the same set. That is why the connectors
 * are drawn at all — without them it is just a scatter plot.
 */
function EmbeddingField({ tone = "light", seed = 7, ...rest }) {
  const p = paletteFor(tone);
  const next = rng(seed);

  const points = CLUSTERS.flatMap((c, ci) =>
    Array.from({ length: c.count }, () => ({
      // Quantised here rather than at render: these coordinates feed the
      // distance sort below, and a sort that disagrees between server and
      // client picks a different set of neighbours, not just a different pixel.
      x: quantise(c.x + gaussian(next) * c.sx),
      y: quantise(c.y + gaussian(next) * c.sy),
      c: ci,
      r: quantise(1.4 + next() * 1.5),
    }))
  ).filter((pt) => pt.x > 6 && pt.x < W - 6 && pt.y > 6 && pt.y < H - 6);

  const withDist = points
    .map((pt, i) => ({
      ...pt,
      i,
      d: quantise(Math.hypot(pt.x - QUERY.x, pt.y - QUERY.y), 4),
    }))
    .sort((a, b) => a.d - b.d);

  const near = new Set(withDist.slice(0, K).map((pt) => pt.i));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A query point in an embedding space with its six nearest neighbours highlighted across two clusters"
      {...rest}
    >
      {/* Axes as a hint of a coordinate space, not a chart frame. */}
      <g stroke={p.grid} strokeWidth="1" opacity="0.5">
        {[55, 110, 165].map((y) => (
          <line key={y} x1="0" y1={y} x2={W} y2={y} strokeDasharray="1 7" />
        ))}
        {[80, 160, 240].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2={H} strokeDasharray="1 7" />
        ))}
      </g>

      <g stroke={p.highlight} strokeWidth="0.8" opacity="0.55">
        {withDist.slice(0, K).map((pt) => (
          <line key={pt.i} x1={n(QUERY.x)} y1={n(QUERY.y)} x2={n(pt.x)} y2={n(pt.y)} />
        ))}
      </g>

      {points.map((pt, i) =>
        near.has(i) ? null : (
          <circle
            key={i}
            cx={n(pt.x)}
            cy={n(pt.y)}
            r={n(pt.r)}
            fill={p.mark}
            opacity={0.32 + (pt.c % 2) * 0.14}
          />
        )
      )}

      {/* The neighbours are the only hoverable marks here. Their rank, their
          distance and which cluster they came from is the entire argument the
          figure is making — that the nearest six are not one group. */}
      {withDist.slice(0, K).map((pt, rank) => (
        <g key={pt.i} className="fx-hot" tabIndex={0}>
          <circle
            className="fx-grow"
            cx={n(pt.x)}
            cy={n(pt.y)}
            r="3.1"
            fill={p.highlight}
          />
          <circle cx={n(pt.x)} cy={n(pt.y)} r="11" fill="transparent" />
          <Tip
            x={n(pt.x)}
            y={n(pt.y) - 3}
            w={W}
            text={`#${rank + 1} · d ${Math.round(pt.d)} · c${pt.c + 1}`}
            p={p}
            above={pt.y > 40}
          />
        </g>
      ))}

      <g className="fx-hot" tabIndex={0}>
        <circle
          cx={QUERY.x}
          cy={QUERY.y}
          r="13"
          fill="none"
          stroke={p.highlight}
          strokeWidth="1"
          opacity="0.45"
        />
        <circle className="fx-grow" cx={QUERY.x} cy={QUERY.y} r="4.4" fill={p.series[0]} />
        <circle cx={QUERY.x} cy={QUERY.y} r="14" fill="transparent" />
        <Tip x={QUERY.x} y={QUERY.y - 15} w={W} text="query" p={p} />
      </g>
    </svg>
  );
}

export default EmbeddingField;
