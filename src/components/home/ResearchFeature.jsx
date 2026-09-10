import { Box, Container, Typography } from "@mui/material";
import EmbeddingField from "@/components/visuals/EmbeddingField";
import TopicFigure from "@/components/visuals/TopicFigure";
import HandArrow from "@/components/ui/HandArrow";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import { getResearch } from "@/services/dataService";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const posts = getResearch();

/**
 * Research, in the shape a research page uses: one statement beside one
 * picture, then the notes themselves as a quiet two-column index — a
 * thumbnail, the topic, the title. Nothing on a note moves but its title.
 */
function ResearchFeature() {
  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 10 },
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative", maxWidth: 560 }}>
            <Box
              sx={{
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
                right: -16,
                bottom: "16%",
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: color.lime,
              }}
            />
            <HandArrow
              variant="sweep"
              sx={{ display: { xs: "none", lg: "block" }, position: "absolute", width: 80, right: -104, top: -36 }}
            />
          </Box>

          <Box>
            <Typography variant="h2" sx={{ maxWidth: "15ch" }}>
              Research is how we de-risk the build
            </Typography>
            <Typography variant="lede" sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.lede }}>
              We publish the notes behind our engineering decisions — what we measured,
              what failed and what we would do again. The same work is what lets us tell
              you early whether a system is worth building at all.
            </Typography>
            <Box sx={{ mt: 4.5 }}>
              <PillLink href="/research" size="lg">
                Read the research
              </PillLink>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            columnGap: 8,
            rowGap: { xs: 4, md: 6 },
          }}
        >
          {posts.map((post) => (
            <LinkBox
              key={post.slug}
              href={`/research/${post.slug}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "88px 1fr", md: "112px 1fr" },
                gap: 3,
                alignItems: "center",
                textDecoration: "none",
                color: color.ink,
                "&:hover .note-title": { color: color.accent },
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
                <Typography variant="caption" sx={{ color: color.inkFaint }}>
                  {post.topic}
                </Typography>
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
            </LinkBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default ResearchFeature;
