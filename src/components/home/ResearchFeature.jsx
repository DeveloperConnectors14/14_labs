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

/**
 * Research, composed the way a research page lays out a finding: a figure on a
 * plate, the latest note laid over its corner like a printout on a desk, and a
 * pencil annotation pointing at it — drawn the first time the section scrolls
 * into view. Opposite, the argument, the topics we write about, and one way
 * in. Below, the notes themselves as a dated index.
 *
 * Everything on the page is real: the note on the desk is the newest one, and
 * the topics are the topics the notes are filed under.
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
                borderRadius: radius.card,
                backgroundColor: color.grey10,
                aspectRatio: "5 / 4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 3, md: 5 },
              }}
            >
              <EmbeddingField tone="light" style={{ width: "100%", height: "auto" }} />
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

            <LinkBox
              href={`/research/${latest.slug}`}
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: { xs: "82%", sm: 320 },
                p: 2.75,
                borderRadius: "18px",
                backgroundColor: color.ground,
                border: "1px solid",
                borderColor: color.ruleStrong,
                color: color.ink,
                textDecoration: "none",
                transform: "rotate(-3deg)",
                transition: `transform ${motion.slow}`,
                "&:hover": { transform: "rotate(-1.5deg) translateY(-4px)" },
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

            <Box sx={{ mt: 3.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {topics.map((topic) => (
                <Box
                  key={topic}
                  component="span"
                  sx={{
                    px: 1.75,
                    py: 0.75,
                    borderRadius: radius.pill,
                    backgroundColor: color.surfaceAlt,
                    fontSize: "0.875rem",
                    color: color.inkMuted,
                  }}
                >
                  {topic}
                </Box>
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
