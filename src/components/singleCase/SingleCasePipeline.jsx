import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import Tip from "@/components/visuals/Tip";
import { paletteFor } from "@/components/visuals/palette";
import { color, radius } from "@/theme/tokens";

const NODE_W = 152;
const NODE_H = 36;
const ROW_GAP = 30;
const COL_GAP = 26;
const PAD = 18;

/**
 * The stage colours in the data are a five-colour set from the original
 * diagram, and none of them are on this site's palette. They are mapped rather
 * than dropped: the colour carries which kind of stage a node is — input,
 * research, processing, gate, output — and that is worth keeping. What is not
 * worth keeping is five foreign hues on a page built from one green.
 */
const STAGE_TONES = {
  "#377BBB": { bg: color.surface, fg: color.ink, rule: color.green30 },
  "#00895E": { bg: color.green20, fg: color.ink, rule: color.green45 },
  "#BB7000": { bg: color.green05, fg: color.ink, rule: color.green30 },
  "#BC2831": { bg: color.accent, fg: color.onAccent, rule: color.accent },
  "#4B4DB6": { bg: color.deep, fg: color.onDeep, rule: color.deep },
};

const toneFor = (node) =>
  STAGE_TONES[node.color] ?? { bg: color.surface, fg: color.ink, rule: color.rule };

/**
 * The pipeline, drawn from the data rather than described in prose.
 *
 * Rows come from `layout`, connectors from `edges`, and every edge is drawn
 * from whichever end sits higher — the data lists a couple of them backwards,
 * and a diagram where two arrows point up the page is a diagram nobody trusts.
 *
 * Every node is hoverable and focusable: it names its stage number and its id,
 * which is what somebody reading the diagram against a repository actually
 * needs. It is CSS-only, like every other figure here.
 */
function SingleCasePipeline({ casePipeline }) {
  if (!casePipeline?.nodes?.length || !casePipeline?.layout?.length) return null;

  const p = paletteFor("light");
  const { nodes, edges = [], layout: rows } = casePipeline;
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  const maxCols = Math.max(...rows.map((row) => row.length));
  const W = PAD * 2 + maxCols * NODE_W + (maxCols - 1) * COL_GAP;
  const H = PAD * 2 + rows.length * NODE_H + (rows.length - 1) * ROW_GAP;

  const pos = {};
  rows.forEach((row, r) => {
    const rowWidth = row.length * NODE_W + (row.length - 1) * COL_GAP;
    const startX = (W - rowWidth) / 2;
    row.forEach((id, c) => {
      pos[id] = {
        x: startX + c * (NODE_W + COL_GAP) + NODE_W / 2,
        y: PAD + r * (NODE_H + ROW_GAP) + NODE_H / 2,
        row: r,
      };
    });
  });

  const connectors = edges
    .map(([a, b]) => {
      const from = pos[a];
      const to = pos[b];
      if (!from || !to || from.row === to.row) return null;

      const [head, tail] = from.row < to.row ? [from, to] : [to, from];
      const y1 = head.y + NODE_H / 2;
      const y2 = tail.y - NODE_H / 2;
      const mid = (y1 + y2) / 2;

      return {
        key: `${a}-${b}`,
        d:
          head.x === tail.x
            ? `M ${head.x} ${y1} V ${y2}`
            : `M ${head.x} ${y1} V ${mid} H ${tail.x} V ${y2}`,
      };
    })
    .filter(Boolean);

  return (
    <Section band="surface" inset>
      <SectionHead
        split
        eyebrow={casePipeline.label}
        title={casePipeline.title}
        lede={casePipeline.text}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.85fr 1.15fr" },
          columnGap: { md: 8 },
          rowGap: { xs: 4, md: 0 },
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ color: color.ink, maxWidth: "18ch" }}>
            Every stage the request passes through
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: color.inkMuted, maxWidth: "38ch" }}>
            Point at a node to read its stage number and the id it carries in the
            code. Branches rejoin where the data does.
          </Typography>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid",
              borderColor: color.rule,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="eyebrow" sx={{ color: color.inkFaint }}>
                Nodes
              </Typography>
              <Typography className="tabular" sx={{ mt: 0.5, fontSize: "1.25rem", fontWeight: 500 }}>
                {nodes.length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="eyebrow" sx={{ color: color.inkFaint }}>
                Stages
              </Typography>
              <Typography className="tabular" sx={{ mt: 0.5, fontSize: "1.25rem", fontWeight: 500 }}>
                {rows.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: color.green05,
            border: "1px solid",
            borderColor: color.green20,
            borderRadius: radius.lg,
            p: { xs: 2, md: 3 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Pipeline diagram: ${nodes
              .map((node) => node.label)
              .join(", ")}`}
            style={{ width: "100%", maxWidth: 440, height: "auto" }}
          >
            <defs>
              <marker
                id="pipeline-arrow"
                viewBox="0 0 8 8"
                refX="6"
                refY="4"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 1 L 7 4 L 0 7 z" fill={color.green45} />
              </marker>
            </defs>

            <g fill="none" stroke={color.green45} strokeWidth="1.25">
              {connectors.map((edge) => (
                <path key={edge.key} d={edge.d} markerEnd="url(#pipeline-arrow)" />
              ))}
            </g>

            {rows.map((row, r) =>
              row.map((id) => {
                const node = byId[id];
                if (!node) return null;

                const tone = toneFor(node);
                const at = pos[id];

                return (
                  <g key={id} className="fx-hot" tabIndex={0}>
                    <g className="fx-lift">
                      <rect
                        x={at.x - NODE_W / 2}
                        y={at.y - NODE_H / 2}
                        width={NODE_W}
                        height={NODE_H}
                        rx="8"
                        fill={tone.bg}
                        stroke={tone.rule}
                        strokeWidth="1"
                      />
                      <text
                        x={at.x}
                        y={at.y + 4}
                        textAnchor="middle"
                        fontSize="11.5"
                        fontFamily="var(--font-body)"
                        letterSpacing="-0.01em"
                        fill={tone.fg}
                      >
                        {node.label}
                      </text>
                    </g>

                    <Tip
                      x={at.x}
                      y={at.y - NODE_H / 2 - 1}
                      w={W}
                      text={`stage ${String(r + 1).padStart(2, "0")} · ${id}`}
                      p={p}
                      above={r > 0}
                    />
                  </g>
                );
              })
            )}
          </svg>
        </Box>
      </Box>
    </Section>
  );
}

export default SingleCasePipeline;
