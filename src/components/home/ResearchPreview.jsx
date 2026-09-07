import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import ActionLink from "@/components/ui/ActionLink";
import LinkBox from "@/components/ui/LinkBox";
import TopicFigure from "@/components/visuals/TopicFigure";
import { getResearch } from "@/services/dataService";
import { formatPostDate } from "@/services/format";
import { color, font, measure, motion, radius } from "@/theme/tokens";

const posts = getResearch().slice(0, 3);

const figureSx = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  transition: `opacity ${motion.base}`,
};

/**
 * Writing, as three cards that invert to deep green on hover.
 *
 * Each card carries the figure for its subject. Both tones of that figure are
 * rendered and cross-faded, because a chart drawn in dark green is invisible the
 * instant the card behind it turns dark green — and the alternative, freezing
 * the plate at one tone, throws away the inversion that makes the section feel
 * alive. Two inline SVGs of a few kilobytes is the cheaper trade.
 */
function ResearchPreview() {
  return (
    <Section id="research">
      <SectionHead
        split
        eyebrow="Research"
        title="Notes from the work"
        lede="Short write-ups of things we learned building these systems — mostly negative results, measurement methods and the parts that turned out to matter more than expected."
        action={<ActionLink href="/research">All notes</ActionLink>}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {posts.map((post, i) => (
          <LinkBox
            key={post.slug}
            href={`/research/${post.slug}`}
            sx={{
              backgroundColor: color.surface,
              borderRadius: radius.lg,
              p: { xs: 2, md: 2 },
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              minHeight: { md: 420 },
              transition: `background-color ${motion.base}`,
              "&:hover": { backgroundColor: color.deep },
              "&:hover .post-plate": { backgroundColor: color.deepAlt },
              "&:hover .post-title, &:hover .post-summary": { color: color.onDeep },
              "&:hover .post-meta": { color: color.onDeepMuted },
              "&:hover .post-topic, &:hover .post-index": { color: color.lime },
              "&:hover .fig-light": { opacity: 0 },
              "&:hover .fig-deep": { opacity: 1 },
            }}
          >
            <Box
              className="post-plate"
              sx={{
                position: "relative",
                height: { xs: 132, md: 150 },
                borderRadius: radius.md,
                backgroundColor: color.green10,
                overflow: "hidden",
                transition: `background-color ${motion.base}`,
              }}
            >
              <Box className="fig-light" sx={{ ...figureSx, opacity: 1 }}>
                <TopicFigure
                  topic={post.topic}
                  tone="light"
                  style={{ width: "auto", height: "100%", maxWidth: "100%" }}
                />
              </Box>
              <Box className="fig-deep" aria-hidden sx={{ ...figureSx, opacity: 0 }}>
                <TopicFigure
                  topic={post.topic}
                  tone="deep"
                  style={{ width: "auto", height: "100%", maxWidth: "100%" }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                px: { xs: 1, md: 1.5 },
                pt: 3,
                pb: 1.5,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography
                  className="post-topic"
                  variant="caption"
                  sx={{ color: color.accent, transition: `color ${motion.base}` }}
                >
                  {post.topic}
                </Typography>
                <Typography
                  className="post-index"
                  sx={{
                    fontFamily: font.display,
                    fontWeight: 300,
                    fontSize: "1.75rem",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: color.green45,
                    transition: `color ${motion.base}`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Typography>
              </Box>

              <Typography
                className="post-title"
                variant="h3"
                sx={{ mt: 2.5, color: color.ink, transition: `color ${motion.base}` }}
              >
                {post.title}
              </Typography>

              <Typography
                className="post-summary"
                variant="body2"
                sx={{
                  mt: 2,
                  color: color.inkMuted,
                  maxWidth: measure.body,
                  flexGrow: 1,
                  transition: `color ${motion.base}`,
                }}
              >
                {post.summary}
              </Typography>

              <Box
                className="post-meta"
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 2,
                  color: color.inkFaint,
                  transition: `color ${motion.base}`,
                }}
              >
                <Typography variant="caption" sx={{ color: "inherit" }}>
                  {formatPostDate(post.date)}
                </Typography>
                <Typography variant="caption" sx={{ color: "inherit" }}>
                  {post.readingTime} read
                </Typography>
              </Box>
            </Box>
          </LinkBox>
        ))}
      </Box>
    </Section>
  );
}

export default ResearchPreview;
