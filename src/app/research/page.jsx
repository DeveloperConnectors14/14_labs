import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import LinkBox from "@/components/ui/LinkBox";
import Publications from "@/components/research/Publications";
import TopicFigure from "@/components/visuals/TopicFigure";
import { getPublicationCounts, getPublishedPapers } from "@/services/dataService";
import { formatPostDate } from "@/services/format";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const papers = getPublishedPapers();
const lead = papers[0];
const counts = getPublicationCounts();
const pad = (n) => String(n).padStart(2, "0");

export const metadata = {
  title: "Research",
  description:
    "Peer-reviewed papers from 14Labs and our co-authors in renewable-energy forecasting, materials engineering and applied machine learning — published, under review and in progress.",
};

function ResearchIndex() {
  return (
    <>
      <Box
        component="section"
        sx={{
          paddingTop: { xs: "48px", md: "88px" },
          paddingBottom: { xs: "40px", md: "56px" },
        }}
      >
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.35fr 1fr" },
              gap: { xs: 5, md: 8 },
              alignItems: "end",
            }}
          >
            <Box>
              <Typography variant="eyebrow" sx={{ color: color.accent, mb: 4 }}>
                Research
              </Typography>
              <Typography variant="h1" sx={{ color: color.ink, maxWidth: "16ch" }}>
                Research From the Lab
              </Typography>
              <Typography
                variant="lede"
                sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
              >
                Peer-reviewed papers from 14Labs and our co-authors, across renewable-energy
                forecasting, materials engineering and applied machine learning — with the
                work under review and still in progress alongside it.
              </Typography>
            </Box>

            {/* A ledger rather than an illustration: how much of the work is
                out, how much is on its way, and how recent it is. */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
              }}
            >
              {[
                { label: "Papers published", value: pad(counts.published) },
                { label: "Under review", value: pad(counts.underReview) },
                { label: "In progress", value: pad(counts.inProgress) },
                { label: "Most recent", value: formatPostDate(lead.date) },
              ].map((row) => (
                <Box
                  key={row.label}
                  sx={{
                    py: 2.5,
                    pr: 2,
                    borderBottom: "1px solid",
                    borderColor: color.rule,
                  }}
                >
                  <Typography variant="caption" sx={{ color: color.inkFaint }}>
                    {row.label}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.75,
                      fontSize: "1.0625rem",
                      fontWeight: 500,
                      letterSpacing: "-0.014em",
                      color: color.ink,
                    }}
                  >
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* The newest paper, given the room to be read as a headline rather
          than as row one of a list. */}
      <Box
        component="section"
        sx={{
          paddingInline: layout.gutter,
          paddingBottom: layout.gapY,
        }}
      >
        <Container disableGutters>
          <LinkBox
            href={`/research/papers/${lead.slug}`}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
              alignItems: "stretch",
              backgroundColor: color.deep,
              borderRadius: { xs: radius.lg, md: radius.xl },
              overflow: "hidden",
              textDecoration: "none",
              "&:hover .lead-title, &:hover .lead-cue": { color: color.lime },
            }}
          >
            <Box
              sx={{
                backgroundColor: color.deepAlt,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: { xs: 210, md: 320 },
                p: { xs: 4, md: 6 },
              }}
            >
              <TopicFigure
                topic="Applied ML"
                tone="deep"
                style={{ width: "100%", height: "auto", maxHeight: 260 }}
              />
            </Box>

            <Box
              sx={{
                p: { xs: 3, md: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5 }}>
                <Typography variant="caption" sx={{ color: color.lime }}>
                  Latest paper
                </Typography>
                <Typography variant="caption" sx={{ color: color.onDeepMuted }}>
                  {lead.venue}
                </Typography>
                <Typography variant="caption" sx={{ color: color.onDeepMuted }}>
                  {formatPostDate(lead.date)}
                </Typography>
              </Box>

              {/* Kept exactly as published, so it is not title-cased. */}
              <Typography
                className="lead-title"
                variant="h3"
                component="h2"
                sx={{
                  mt: 3,
                  color: color.onDeep,
                  maxWidth: "32ch",
                  transition: `color ${motion.base}`,
                }}
              >
                {lead.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: 3, color: color.onDeepMuted, maxWidth: measure.lede }}
              >
                {lead.description}
              </Typography>

              {/* Presentational, not a link: the whole card is already an
                  anchor, and nesting a second one inside it is invalid HTML. */}
              <Box
                className="lead-cue"
                sx={{
                  mt: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: color.onDeep,
                  transition: `color ${motion.base}`,
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontSize: "0.9375rem", fontWeight: 500, letterSpacing: "-0.005em" }}
                >
                  Read the Summary
                </Typography>
                <Box component="span" aria-hidden sx={{ fontSize: "0.9375rem", lineHeight: 1 }}>
                  &#8594;
                </Box>
              </Box>
            </Box>
          </LinkBox>
        </Container>
      </Box>

      <Publications />

      <CallSection contact />
    </>
  );
}

export default ResearchIndex;
