import { Box, Container, Typography } from "@mui/material";
import EmbeddingField from "@/components/visuals/EmbeddingField";
import TopicFigure from "@/components/visuals/TopicFigure";
import Eyebrow from "@/components/ui/Eyebrow";
import HandArrow from "@/components/ui/HandArrow";
import HandNote from "@/components/ui/HandNote";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import RevealText from "@/components/ui/RevealText";
import { getResearch } from "@/services/dataService";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const posts = getResearch();
const latest = posts[0];
const topics = [...new Set(posts.map((post) => post.topic))];

// Dates are stored as ISO days; read them as UTC so the server's zone never
// shifts a note into the previous month.
const monthYear = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

// Graph paper for the plate: a lab notebook, not a blank card.
const GRAPH = `color-mix(in srgb, ${color.ruleStrong} 55%, transparent)`;
const GRAPH_FADE = "radial-gradient(ellipse 80% 75% at 50% 50%, #000 40%, transparent 100%)";

// One sheet under the top note, offset and turned a little further each time.
const sheetSx = (turn, x, y, opacity) => ({
  position: "absolute",
  inset: 0,
  borderRadius: "18px",
  border: "1px solid",
  borderColor: color.rule,
  backgroundColor: color.surface,
  opacity,
  transform: `rotate(${turn}deg) translate(${x}px, ${y}px)`,
  transition: `transform ${motion.slow}`,
});

/**
 * Research, composed the way a research page lays out a finding.
 *
 * The desk: a figure on graph paper, and the newest note on top of a small
 * stack of them — hovering it lifts the top sheet and fans the others out —
 * with a pencil annotation pointing at it, drawn the first time the section
 * scrolls into view. Opposite: the argument, two plain facts about the notes,
 * the topics they are filed under (each a way in), and one action. Below: every
 * note as a dated index.
 *
 * Everything on it is real: the note on the desk is the newest one, the count
 * and the date come from the notes, and the topics are the notes' own.
 */
function ResearchFeature() {
  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" },
            gap: { xs: 7, md: 10 },
            alignItems: "center",
          }}
        >
          {/* The desk. */}
          <Box sx={{ position: "relative", pb: { xs: 14, sm: 10 }, pr: { sm: 6 } }}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: radius.card,
                backgroundColor: color.grey10,
                aspectRatio: "5 / 4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 3, md: 5 },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(${GRAPH} 1px, transparent 1px), linear-gradient(90deg, ${GRAPH} 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                  backgroundPosition: "-1px -1px",
                  maskImage: GRAPH_FADE,
                  WebkitMaskImage: GRAPH_FADE,
                }}
              />
              <EmbeddingField tone="light" style={{ position: "relative", width: "100%", height: "auto" }} />
            </Box>

            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: -14,
                top: 44,
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: color.lime,
              }}
            />

            {/* The stack of notes, newest on top. */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: { xs: "82%", sm: 320 },
                transform: "rotate(-3deg)",
                "&:hover .sheet-1": { transform: "rotate(5deg) translate(14px, -10px)" },
                "&:hover .sheet-2": { transform: "rotate(10deg) translate(26px, -18px)" },
                "&:hover .note-top": { transform: "rotate(1.5deg) translateY(-6px)" },
              }}
            >
              <Box aria-hidden className="sheet-2" sx={sheetSx(6, 12, -8, 0.55)} />
              <Box aria-hidden className="sheet-1" sx={sheetSx(3, 6, -4, 0.9)} />

              <LinkBox
                href={`/research/${latest.slug}`}
                className="note-top"
                sx={{
                  position: "relative",
                  display: "block",
                  p: 2.75,
                  borderRadius: "18px",
                  backgroundColor: color.ground,
                  border: "1px solid",
                  borderColor: color.ruleStrong,
                  color: color.ink,
                  textDecoration: "none",
                  transition: `transform ${motion.slow}`,
                  "&:hover .note-cta": { color: color.accent },
                }}
              >
                <Box sx={{ display: "flex", gap: 2, fontSize: "0.8125rem", color: color.inkFaint }}>
                  <span>{latest.topic}</span>
                  <span>{monthYear(latest.date)}</span>
                </Box>
                <Typography sx={{ mt: 1, fontSize: "1.1875rem", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                  {latest.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: color.inkMuted, ...clamp(3) }}>
                  {latest.summary}
                </Typography>
                <Typography
                  className="note-cta"
                  sx={{ mt: 1.75, fontSize: "0.875rem", fontWeight: 500, transition: `color ${motion.fast}` }}
                >
                  Read the Note ›
                </Typography>
              </LinkBox>
            </Box>

            {/* Pencil: a note and an arrow at the printout. */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "flex-start",
                gap: 0.5,
                position: "absolute",
                left: 8,
                bottom: 18,
                pointerEvents: "none",
              }}
            >
              <HandNote delay={900} rotate={-5}>
                our latest note
              </HandNote>
              <HandArrow variant="reach" delay={250} duration={900} sx={{ width: 104, mt: 1.5 }} />
            </Box>
          </Box>

          {/* The argument. */}
          <Box>
            <Eyebrow>Research</Eyebrow>
            <RevealText
              text="Research is how we de-risk the build."
              muted="Measure first, build second."
              sx={{ mt: 3, maxWidth: "17ch" }}
            />
            <Typography variant="lede" sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.lede }}>
              Before we write production code, we measure. We publish the notes behind
              our engineering decisions — what we tested, what failed and what we would
              do again — and the same work tells you early whether a system is worth
              building at all.
            </Typography>

            {/* Two plain facts about the notes. */}
            <Box
              component="dl"
              sx={{
                mt: 4,
                mb: 0,
                display: "flex",
                columnGap: 5,
                rowGap: 2,
                flexWrap: "wrap",
                pt: 3,
                borderTop: "1px solid",
                borderColor: color.rule,
              }}
            >
              {[
                { value: posts.length, label: "Notes Published" },
                { value: topics.length, label: "Topics Covered" },
                { value: monthYear(latest.date), label: "Latest Note" },
              ].map((fact) => (
                <Box key={fact.label}>
                  <Typography
                    component="dd"
                    className="tabular"
                    sx={{ m: 0, fontSize: "1.75rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: color.ink }}
                  >
                    {fact.value}
                  </Typography>
                  <Typography component="dt" variant="body2" sx={{ mt: 0.5, color: color.inkFaint }}>
                    {fact.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 3.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {topics.map((topic) => (
                <LinkBox
                  key={topic}
                  href="/research"
                  sx={{
                    px: 1.75,
                    py: 0.75,
                    borderRadius: radius.pill,
                    border: "1px solid",
                    borderColor: "transparent",
                    backgroundColor: color.surfaceAlt,
                    fontSize: "0.875rem",
                    color: color.inkMuted,
                    textDecoration: "none",
                    transition: `border-color ${motion.fast}, color ${motion.fast}, background-color ${motion.fast}`,
                    "&:hover": { borderColor: color.limeDeep, color: color.ink, backgroundColor: color.accentSoft },
                  }}
                >
                  {topic}
                </LinkBox>
              ))}
            </Box>

            <Box sx={{ mt: 4.5 }}>
              <PillLink href="/research" size="lg">
                Read the research
              </PillLink>
            </Box>
          </Box>
        </Box>

        {/* The index. */}
        <Box
          sx={{
            mt: { xs: 9, md: 13 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            columnGap: 8,
          }}
        >
          {posts.map((post) => (
            <LinkBox
              key={post.slug}
              href={`/research/${post.slug}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "80px 1fr", md: "104px 1fr auto" },
                gap: 3,
                alignItems: "center",
                py: 3,
                borderTop: "1px solid",
                borderColor: color.rule,
                textDecoration: "none",
                color: color.ink,
                "&:hover .note-title": { color: color.accent },
                "&:hover .note-go": { transform: "translateX(3px)", color: color.ink },
              }}
            >
              <Box
                sx={{
                  aspectRatio: "1",
                  borderRadius: radius.lg,
                  backgroundColor: color.grey10,
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TopicFigure topic={post.topic} tone="light" style={{ width: "100%", height: "auto" }} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", gap: 2, fontSize: "0.8125rem", color: color.inkFaint }}>
                  <span>{post.topic}</span>
                  <span>{monthYear(post.date)}</span>
                </Box>
                <Typography
                  className="note-title"
                  sx={{
                    mt: 0.5,
                    fontSize: "1.1875rem",
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                    transition: `color ${motion.fast}`,
                  }}
                >
                  {post.title}
                </Typography>
              </Box>
              <Box
                className="note-go"
                aria-hidden
                sx={{
                  display: { xs: "none", md: "block" },
                  color: color.inkFaint,
                  fontSize: "1.25rem",
                  transition: `transform ${motion.base}, color ${motion.fast}`,
                }}
              >
                ›
              </Box>
            </LinkBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default ResearchFeature;
