import { paletteFor } from "./palette";
import Tip from "./Tip";
import { n } from "./seed";

const W = 320;
const H = 220;
const PAD = { l: 30, r: 52, t: 20, b: 22 };
const SCALE = [0.3, 0.85];
const DEFAULT_K = 5;

// Fourteen candidate chunks for one question, ranked by similarity. The chunk
// that actually contains the answer is twelfth — inside the index, outside the
// window the model was handed.
const SCORES = [
  0.81, 0.78, 0.74, 0.71, 0.68, 0.63, 0.61, 0.58, 0.55, 0.52, 0.49, 0.47, 0.44, 0.41,
];
const ANSWER = 11;

const ROW = (H - PAD.t - PAD.b) / SCORES.length;
const BAR = 7;
const PLOT = W - PAD.l - PAD.r;

const width = (s) => ((s - SCALE[0]) / (SCALE[1] - SCALE[0])) * PLOT;
const rank = (i) => String(i + 1).padStart(2, "0");

/**
 * Top-k retrieval for a single question, as a ranked bar list.
 *
 * Drawn as ranks rather than as a point cloud because the failure is ordinal:
 * nothing is missing from the index, and no embedding is wrong. The right
 * passage simply scores below four near-duplicates of the wrong one, and the
 * cutoff line is where the model stopped being able to see it.
 *
 * `k` is a prop rather than a constant so the cutoff can be driven from
 * outside — RetrievalLab hands the reader the slider. The figure itself stays
 * a server component with no state of its own.
 */
function RetrievalRank({ tone = "light", k = DEFAULT_K, ...rest }) {
  const p = paletteFor(tone);
  const K = Math.max(1, Math.min(SCORES.length, k));
  const cutY = PAD.t + K * ROW;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Fourteen retrieved chunks ranked by similarity, with a top ${K} cutoff; the chunk containing the answer sits at rank twelve, ${
        ANSWER < K ? "inside" : "below"
      } the cutoff`}
      {...rest}
    >
      {SCORES.map((score, i) => {
        const y = PAD.t + i * ROW + (ROW - BAR) / 2;
        const isAnswer = i === ANSWER;
        const retrieved = i < K;
        const w = Math.max(width(score), 2);

        return (
          <g key={i} className="fx-hot" tabIndex={0}>
            <text
              x={PAD.l - 7}
              y={n(y + BAR / 2 + 2.8)}
              textAnchor="end"
              fontSize="7.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
              fill={isAnswer ? p.labelStrong : p.label}
            >
              {rank(i)}
            </text>

            <rect
              className="fx-lift"
              x={PAD.l}
              y={n(y)}
              width={n(w)}
              height={BAR}
              rx="1.5"
              fill={isAnswer ? p.highlight : p.mark}
              opacity={isAnswer ? 1 : retrieved ? 0.85 : 0.4}
            />

            <text
              x={W - 6}
              y={n(y + BAR / 2 + 2.8)}
              textAnchor="end"
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="0.02em"
              fill={isAnswer ? p.labelStrong : p.label}
            >
              {score.toFixed(2)}
            </text>

            {isAnswer ? (
              <text
                x={n(PAD.l + w + 8)}
                y={n(y + BAR / 2 + 3)}
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={p.labelStrong}
              >
                {i < K ? "← in the window" : "← holds the answer"}
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
              x={n(PAD.l + w / 2)}
              y={n(y)}
              w={W}
              text={`rank ${rank(i)} · ${score.toFixed(2)}`}
              p={p}
              above={i > 0}
            />
          </g>
        );
      })}

      {/* Everything above this line was passed to the model. Everything below
          it was retrieved, scored, and thrown away. */}
      <line
        x1={4}
        y1={n(cutY)}
        x2={W - 4}
        y2={n(cutY)}
        stroke={p.axis}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {/* The cutoff reads itself in the header rather than on the line. Sat
          beside the line it lands in the score column, and once `k` is a
          control the collision moves to a different row on every drag. */}
      <text
        x={W - 6}
        y={PAD.t - 8}
        textAnchor="end"
        fontSize="8.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.labelStrong}
      >
        top-k = {K}
      </text>

      <text
        x={4}
        y={PAD.t - 8}
        fontSize="8.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
        fill={p.label}
      >
        one query · {SCORES.length} candidates
      </text>
    </svg>
  );
}

export { SCORES, ANSWER, DEFAULT_K };
export default RetrievalRank;
