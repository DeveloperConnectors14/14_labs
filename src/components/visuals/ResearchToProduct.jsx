import { paletteFor } from "./palette";
import Tip from "./Tip";

const W = 320;
const H = 230;
const MID = 106;

// Research: a loose field of candidate ideas. Only the few that hold up (the
// `kept` ones) are carried forward — the rest stay where they are.
const IDEAS = [
  { x: 22, y: 50 }, { x: 58, y: 40 }, { x: 40, y: 72, kept: "paper" },
  { x: 76, y: 66 }, { x: 18, y: 104 }, { x: 54, y: 98, kept: "experiment" },
  { x: 80, y: 124 }, { x: 30, y: 136 }, { x: 66, y: 142, kept: "benchmark" },
  { x: 20, y: 168 }, { x: 50, y: 172 }, { x: 82, y: 160 },
];
const MERGE_X = 100;

// Engineering: one stage, three steps, turning a finding into a system.
const ENG = { x: 116, w: 76, top: 58, rowH: 32 };
const STEPS = [
  { label: "design", tip: "design · scoped to the problem" },
  { label: "build", tip: "build · production code" },
  { label: "test", tip: "test · measured, not assumed" },
];
const engRight = ENG.x + ENG.w;

// Products: what ships, one lane per practice.
const PRODUCTS = [
  { label: "web", y: 46, tip: "web platforms" },
  { label: "app", y: 86, tip: "mobile apps" },
  { label: "ai", y: 126, tip: "AI systems" },
  { label: "security", y: 166, tip: "cyber security" },
];
const TILE = { x: 238, w: 72, h: 26 };
const FAN_X = (engRight + TILE.x) / 2;

const STAGES = [
  { label: "research", x: 52 },
  { label: "engineering", x: ENG.x + ENG.w / 2 },
  { label: "products", x: TILE.x + TILE.w / 2 },
];

/**
 * Research → Engineering → Products, as one flow: many ideas, a few that hold
 * up, one engineering stage, and the products it ships.
 *
 * Elbows rather than diagonals past the engineering stage, as in AgentGraph —
 * from there on it is a pipeline, not a sketch.
 */
function ResearchToProduct({ tone = "light", ...rest }) {
  const p = paletteFor(tone);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Research feeds engineering, and engineering ships products: a field of research ideas, three of which are carried into a design, build and test stage, which fans out to web, app, AI and security products"
      {...rest}
    >
      <g fill="none">
        {IDEAS.filter((idea) => idea.kept).map((idea) => (
          <path
            key={idea.kept}
            d={`M ${idea.x} ${idea.y} C ${MERGE_X - 8} ${idea.y}, ${MERGE_X - 20} ${MID}, ${MERGE_X} ${MID}`}
            stroke={p.highlight}
            strokeWidth="1.5"
          />
        ))}
        <path d={`M ${MERGE_X} ${MID} H ${ENG.x}`} stroke={p.highlight} strokeWidth="2" />

        {PRODUCTS.map((product) => (
          <path
            key={product.label}
            d={`M ${engRight} ${MID} H ${FAN_X} V ${product.y} H ${TILE.x}`}
            stroke={p.highlight}
            strokeWidth="1.5"
          />
        ))}

        <rect
          x={ENG.x}
          y={ENG.top - 12}
          width={ENG.w}
          height={STEPS.length * ENG.rowH + 20}
          rx="10"
          stroke={p.mark}
          strokeWidth="1.25"
        />
      </g>

      {IDEAS.map((idea) =>
        idea.kept ? (
          <g key={`${idea.x}-${idea.y}`} className="fx-hot" tabIndex={0}>
            <circle className="fx-grow" cx={idea.x} cy={idea.y} r="5" fill={p.highlight} />
            <circle cx={idea.x} cy={idea.y} r="13" fill="transparent" />
            <Tip x={idea.x} y={idea.y - 6} w={W} text={idea.kept} p={p} />
          </g>
        ) : (
          <circle key={`${idea.x}-${idea.y}`} cx={idea.x} cy={idea.y} r="3" fill={p.mark} opacity="0.7" />
        ),
      )}

      {STEPS.map((step, i) => {
        const y = ENG.top + i * ENG.rowH;
        const lead = i === 1;
        return (
          <g key={step.label} className="fx-hot" tabIndex={0}>
            <g className="fx-lift">
              <rect
                x={ENG.x + 8}
                y={y}
                width={ENG.w - 16}
                height={24}
                rx="6"
                fill={lead ? p.highlight : "none"}
                stroke={lead ? "none" : p.mark}
                strokeWidth="1.25"
              />
              <text
                x={ENG.x + ENG.w / 2}
                y={y + 15.5}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={lead ? p.onHighlight : p.labelStrong}
              >
                {step.label}
              </text>
            </g>
            <rect x={ENG.x + 8} y={y} width={ENG.w - 16} height={24} fill="transparent" />
            <Tip x={ENG.x + ENG.w / 2} y={y - 2} w={W} text={step.tip} p={p} />
          </g>
        );
      })}

      {PRODUCTS.map((product) => (
        <g key={product.label} className="fx-hot" tabIndex={0}>
          <g className="fx-lift">
            <rect
              x={TILE.x}
              y={product.y - TILE.h / 2}
              width={TILE.w}
              height={TILE.h}
              rx="7"
              fill="none"
              stroke={p.highlight}
              strokeWidth="1.5"
            />
            <text
              x={TILE.x + TILE.w / 2}
              y={product.y + 3.5}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
              fill={p.labelStrong}
            >
              {product.label}
            </text>
          </g>
          <rect x={TILE.x} y={product.y - TILE.h / 2} width={TILE.w} height={TILE.h} fill="transparent" />
          <Tip
            x={TILE.x + TILE.w / 2}
            y={product.y - TILE.h / 2 - 2}
            w={W}
            text={product.tip}
            p={p}
            above={product.y > 60}
          />
        </g>
      ))}

      {STAGES.map((stage, i) => (
        <text
          key={stage.label}
          x={stage.x}
          y={H - 10}
          textAnchor="middle"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="0.08em"
          fill={p.label}
        >
          {`${String(i + 1).padStart(2, "0")} ${stage.label}`}
        </text>
      ))}
      {STAGES.slice(1).map((stage, i) => {
        // Mono at 9px with its tracking runs ~6.1 units a character, so the
        // arrow can sit in the middle of the actual gap between two captions.
        const half = (s) => (`00 ${s.label}`.length * 6.1) / 2;
        const prev = STAGES[i];
        const x = (prev.x + half(prev) + stage.x - half(stage)) / 2;
        return (
          <path
            key={stage.label}
            d={`M ${x - 2.5} ${H - 16} l 5 3 l -5 3`}
            fill="none"
            stroke={p.label}
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

export default ResearchToProduct;
