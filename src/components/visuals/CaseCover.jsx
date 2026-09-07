import { paletteFor } from "./palette";
import { n } from "./seed";

const W = 320;
const H = 200;
const PAD = { l: 24, r: 24, t: 22, b: 34 };

const NODE = { w: 18, h: 9, r: 3.5 };

/**
 * The stage colours in the data are the five-colour set from the original
 * diagram and none of them belong to this palette. They are mapped rather than
 * dropped, exactly as SingleCasePipeline maps them: the colour carries what
 * kind of stage a node is, and that is the part worth keeping.
 */
const STAGE = {
  "#377BBB": "input",
  "#00895E": "research",
  "#BB7000": "process",
  "#BC2831": "gate",
  "#4B4DB6": "output",
};

/**
 * A case study's cover, drawn from the pipeline it actually shipped.
 *
 * These cards used to carry stock photographs — a purple brain mesh and a set
 * of yellow toy train tracks. They were the only colours on the site outside
 * the palette, and on a page whose whole argument is "we measure the parts
 * that are hard to demo", a stock brain is the least credible thing we could
 * put at the top of the card.
 *
 * So the cover is the system: every node and every edge from `pipeline`, laid
 * out left to right in the order the data moves. It is not decoration that
 * happens to look technical — change the pipeline in the data and the picture
 * changes with it.
 *
 * `layout` groups nodes into stages. Those are drawn as columns rather than
 * rows: eleven rows in a 16:10 plate gives each one eighteen pixels, and the
 * flow of a pipeline reads left to right anyway.
 *
 * `captions` off for thumbnail use. The counts are set at 9px in a 320-unit
 * viewBox, so in a 160px-wide plate they render at four and a half pixels —
 * texture pretending to be a readout.
 */
function CaseCover({ pipeline, tone = "deep", captions = true, ...rest }) {
  if (!pipeline?.nodes?.length || !pipeline?.layout?.length) return null;

  const p = paletteFor(tone);
  const { nodes, edges = [], layout: stages } = pipeline;
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  /* One column per stage, each node centred in its column's share of the
     height. A stage of one sits on the spine; a stage of two straddles it. */
  const pos = {};
  const step = stages.length > 1 ? innerW / (stages.length - 1) : 0;

  /* Spread rather than share. Dividing the height evenly between two nodes
     leaves them huddled either side of the spine and the plate reading as
     mostly empty; pushing them out from the centre uses the box the card
     actually gives us. Clamped so a three-wide stage still fits. */
  const SPREAD = 1.6;
  const half = innerH / 2;

  stages.forEach((stage, c) => {
    const x = stages.length > 1 ? PAD.l + c * step : W / 2;
    stage.forEach((id, i) => {
      const slot = (i + 1) / (stage.length + 1);
      const offset = (slot - 0.5) * innerH * SPREAD;
      const limit = half - NODE.h / 2;
      pos[id] = {
        x,
        y: PAD.t + half + Math.max(-limit, Math.min(limit, offset)),
      };
    });
  });

  const spine = PAD.t + innerH / 2;

  /* Elbows, not diagonals. A pipeline drawn with diagonal links reads as a
     mind map; right angles read as a flow, which is what this is. */
  const link = (a, b) => {
    if (!a || !b) return null;
    if (Math.abs(a.y - b.y) < 0.5) {
      return `M ${n(a.x + NODE.w / 2)} ${n(a.y)} H ${n(b.x - NODE.w / 2)}`;
    }
    const mid = n((a.x + b.x) / 2);
    return `M ${n(a.x + NODE.w / 2)} ${n(a.y)} H ${mid} V ${n(b.y)} H ${n(
      b.x - NODE.w / 2
    )}`;
  };

  /* The data lists a couple of edges back to front. Drawing every one from
     whichever end sits further left keeps the flow pointing one way. */
  const ordered = edges
    .map(([from, to]) => {
      const a = pos[from];
      const b = pos[to];
      if (!a || !b) return null;
      return a.x <= b.x ? [a, b] : [b, a];
    })
    .filter(Boolean);

  const fillFor = (stage) => {
    if (stage === "gate") return p.highlight;
    if (stage === "output" || stage === "research") return p.series[1];
    return "none";
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`The shipped pipeline: ${nodes.length} nodes across ${stages.length} stages, connected by ${edges.length} edges`}
      {...rest}
    >
      <rect x="0" y="0" width={W} height={H} fill={p.field} opacity="0.35" />

      {/* The spine the stages hang off, so a single-node stage still reads as
          being on a line rather than floating. */}
      <line
        x1={PAD.l}
        y1={spine}
        x2={W - PAD.r}
        y2={spine}
        stroke={p.axis}
        strokeWidth="1"
      />

      <g fill="none" stroke={p.mark} strokeWidth="1.1" opacity="0.85">
        {ordered.map(([a, b], i) => (
          <path key={i} d={link(a, b)} />
        ))}
      </g>

      {nodes.map((node) => {
        const at = pos[node.id];
        if (!at) return null;
        const stage = STAGE[node.color] ?? "process";
        const fill = fillFor(stage);

        return (
          <rect
            key={node.id}
            x={n(at.x - NODE.w / 2)}
            y={n(at.y - NODE.h / 2)}
            width={NODE.w}
            height={NODE.h}
            rx={NODE.r}
            fill={fill === "none" ? p.field : fill}
            stroke={fill === "none" ? p.mark : "none"}
            strokeWidth="1.1"
          />
        );
      })}

      {captions ? (
        <>
          <text
            x={PAD.l}
            y={H - 14}
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
            fill={p.label}
          >
            {nodes.length} nodes · {edges.length} edges · {stages.length} stages
          </text>

          <text
            x={W - PAD.r}
            y={H - 14}
            textAnchor="end"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
            fill={p.label}
          >
            shipped
          </text>
        </>
      ) : null}
    </svg>
  );
}

export default CaseCover;
