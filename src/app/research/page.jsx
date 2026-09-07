import { Box, Container, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import CallSection from "@/components/general/CallSection";
import LinkBox from "@/components/ui/LinkBox";
import ResearchList from "@/components/research/ResearchList";
import TopicFigure from "@/components/visuals/TopicFigure";
import { getResearch } from "@/services/dataService";
import { formatPostDate } from "@/services/format";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const posts = getResearch();
const [lead, ...rest] = posts;

export const metadata = {
  title: "Research",
  description:
    "Notes from 14Labs on retrieval, evaluation, multi-agent systems and applied machine learning — measurement methods, negative results and what turned out to matter.",
};

/** The index carries the same card metadata the list does, minus the body. */
const summarise = ({ slug, title, summary, topic, date, readingTime }) => ({
  slug,
  title,
  summary,
  topic,
  date,
  readingTime,
});

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
                Notes from the work
              </Typography>
              <Typography
                variant="lede"
                sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
              >
                Write-ups of things we learned building production AI systems. Mostly
                measurement methods, negative results and the parts of the problem that
                turned out to matter more than the model did.
              </Typography>
            </Box>

            {/* A ledger rather than an illustration. It says how much writing
                exists and how recent it is, which is the only thing a reader
                actually wants to know about an index before scrolling it. */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
              }}
            >
              {[
                { label: "Notes published", value: String(posts.length).padStart(2, "0") },
                { label: "Subjects", value: String(new Set(posts.map((p) => p.topic)).size).padStart(2, "0") },
                { label: "Most recent", value: formatPostDate(lead.date) },
                { label: "Longest read", value: posts.reduce((a, b) => (parseInt(b.readingTime, 10) > parseInt(a.readingTime, 10) ? b : a)).readingTime },
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

      {/* The newest note, given the room to actually be read as a headline
          rather than as row one of a table. */}
      <Box
        component="section"
        sx={{
          paddingInline: layout.gutter,
          paddingBottom: layout.gapY,
        }}
      >
        <Container disableGutters>
          <LinkBox
            href={`/research/${lead.slug}`}
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
                topic={lead.topic}
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
                  Latest
                </Typography>
                <Typography variant="caption" sx={{ color: color.onDeepMuted }}>
                  {lead.topic}
                </Typography>
                <Typography variant="caption" sx={{ color: color.onDeepMuted }}>
                  {formatPostDate(lead.date)}
                </Typography>
              </Box>

              <Typography
                className="lead-title"
                variant="h2"
                sx={{
                  mt: 3,
                  color: color.onDeep,
                  maxWidth: "18ch",
                  transition: `color ${motion.base}`,
                }}
              >
                {lead.title}
              </Typography>

              <Typography
                variant="lede"
                sx={{ mt: 3, color: color.onDeepMuted, maxWidth: measure.lede }}
              >
                {lead.kicker}
              </Typography>

              {/* Presentational, not a link: the whole card is already an
                  anchor, and nesting a second one inside it is invalid HTML
                  that screen readers announce as two overlapping targets. */}
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
                  Read the note
                </Typography>
                <Box component="span" aria-hidden sx={{ fontSize: "0.9375rem", lineHeight: 1 }}>
                  &#8594;
                </Box>
              </Box>
            </Box>
          </LinkBox>
        </Container>
      </Box>

      <Section tight>
        <SectionHead
          eyebrow="Archive"
          title="Everything else we have written"
          sx={{ mb: { xs: 4, md: 6 } }}
        />
        <ResearchList posts={rest.map(summarise)} />
      </Section>

      <CallSection contact />
    </>
  );
}

export default ResearchIndex;
