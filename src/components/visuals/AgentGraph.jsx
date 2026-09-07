import { paletteFor } from "./palette";
import Tip from "./Tip";

const W = 320;
const H = 220;

const BOX = { w: 68, h: 28 };
const COL = { router: 92, work: 204 };
const ROW = { top: 44, mid: 110, bottom: 176 };

const NODES = {
  in: { x: 24, y: ROW.mid },
  router: { x: COL.router, y: ROW.mid, label: "router" },
  search: { x: COL.work, y: ROW.top, label: "search" },
  extract: { x: COL.work, y: ROW.mid, label: "extract" },
  verify: { x: COL.work, y: ROW.bottom, label: "verify" },
  out: { x: 296, y: ROW.mid },
};

// The path one request actually took, which is the only reason to draw a
// topology at all.
const TRACED = new Set(["in", "router", "extract", "out"]);

// What each box is, for the reader who points at it. A topology diagram that
// cannot answer "what does that one do" is decoration.
const TIPS = {
  in: "request in",
  router: "routes by intent",
  search: "search · 2 calls",
  extract: "extract · traced",
  verify: "verify · schema",
  out: "response out",
};

const routerRight = COL.router + BOX.w / 2;
const workLeft = COL.work - BOX.w / 2;
const workRight = COL.work + BOX.w / 2;
const fanX = (routerRight + workLeft) / 2;
const mergeX = (workRight + NODES.out.x) / 2;

/**
 * Right angles, not diagonals. A topology drawn with straight diagonal links
 * reads as a mind map; elbows read as a pipeline, which is what this is.
 */
const fanOut = (y) =>
  y === ROW.mid
    ? `M ${routerRight} ${ROW.mid} H ${workLeft}`
    : `M ${routerRight} ${ROW.mid} H ${fanX} V ${y} H ${workLeft}`;

const fanIn = (y) =>
  y === ROW.mid
    ? `M ${workRight} ${ROW.mid} H ${NODES.out.x - 6}`
    : `M ${workRight} ${y} H ${mergeX} V ${ROW.mid} H ${NODES.out.x - 6}`;

/**
 * A branching agent pipeline with one traced request drawn through it, and the
 * retry loop on the step that actually retries.
 *
 * Everything unhighlighted is drawn in `mark` rather than `field`: field is a
 * fill tone, and at stroke width it disappears into the plate behind it — which
 * made the branches look like a rendering fault rather than a diagram.
 */
function AgentGraph({ tone = "light", ...rest }) {
  const p = paletteFor(tone);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A branching agent pipeline: a router fanning out to search, extract and verify steps and back to one output, with the traced request passing through extract and a retry loop on that step"
      {...rest}
    >
      <g fill="none">
        {[ROW.top, ROW.mid, ROW.bottom].map((y) => {
          const traced = y === ROW.mid;
          return (
            <g key={y}>
              <path
                d={fanOut(y)}
                stroke={traced ? p.highlight : p.mark}
                strokeWidth={traced ? 2 : 1.25}
              />
              <path
                d={fanIn(y)}
                stroke={traced ? p.highlight : p.mark}
                strokeWidth={traced ? 2 : 1.25}
              />
            </g>
          );
        })}

        <path
          d={`M ${NODES.in.x + 6} ${ROW.mid} H ${COL.router - BOX.w / 2}`}
          stroke={p.highlight}
          strokeWidth="2"
        />

        {/* Retry, as a loop clear above the box it belongs to. Drawn through
            the node — which is what it used to do — it read as a stray curve. */}
        <path
          d={`M ${COL.work - 14} ${ROW.mid - BOX.h / 2} C ${COL.work - 14} ${
            ROW.mid - 40
          }, ${COL.work + 14} ${ROW.mid - 40}, ${COL.work + 14} ${ROW.mid - BOX.h / 2}`}
          stroke={p.series[1]}
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />
      </g>

      <text
        x={COL.work}
        y={ROW.mid - 44}
        textAnchor="middle"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.series[1]}
      >
        retry
      </text>

      {Object.entries(NODES).map(([key, node]) => {
        const traced = TRACED.has(key);
        const terminal = key === "in" || key === "out";

        // The hit area is its own transparent shape, always larger than the
        // mark: a 6px dot is not a target anybody can hold a cursor on.
        if (terminal) {
          return (
            <g key={key} className="fx-hot" tabIndex={0}>
              <circle
                className="fx-grow"
                cx={node.x}
                cy={node.y}
                r="6"
                fill={p.highlight}
              />
              <circle cx={node.x} cy={node.y} r="15" fill="transparent" />
              <Tip x={node.x} y={node.y - 8} w={W} text={TIPS[key]} p={p} />
            </g>
          );
        }

        return (
          <g key={key} className="fx-hot" tabIndex={0}>
            <g className="fx-lift">
              <rect
                x={node.x - BOX.w / 2}
                y={node.y - BOX.h / 2}
                width={BOX.w}
                height={BOX.h}
                rx="7"
                fill={traced ? p.highlight : "none"}
                stroke={traced ? "none" : p.mark}
                strokeWidth="1.25"
              />
              <text
                x={node.x}
                y={node.y + 3.5}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={traced ? p.onHighlight : p.labelStrong}
              >
                {node.label}
              </text>
            </g>

            <rect
              x={node.x - BOX.w / 2}
              y={node.y - BOX.h / 2}
              width={BOX.w}
              height={BOX.h}
              fill="transparent"
            />
            <Tip
              x={node.x}
              y={node.y - BOX.h / 2 - 2}
              w={W}
              text={TIPS[key]}
              p={p}
              above={node.y > 60}
            />
          </g>
        );
      })}

    </svg>
  );
}

export default AgentGraph;
