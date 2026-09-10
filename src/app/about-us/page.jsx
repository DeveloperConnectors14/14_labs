import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import LabTeam from "@/components/home/LabTeam";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import StatSlabs from "@/components/ui/StatSlabs";
import EmbeddingField from "@/components/visuals/EmbeddingField";
import { getPillars, getStats, getValues } from "@/services/dataService";
import { color, measure, radius } from "@/theme/tokens";

const stats = getStats();
const pillars = getPillars();
const values = getValues();

export const metadata = {
  title: "About",
  description:
    "14Labs is an AI engineering and applied machine learning practice: multi-agent systems, retrieval and research-grade infrastructure that runs in production.",
};

// How the practice actually works, stated as commitments rather than adjectives.
const HOW_WE_WORK = [
  {
    title: "We start from the decision, not the model",
    desc: "The first question is what has to be true for the output to be worth acting on. Model choice is downstream of that, and usually less interesting than it looks.",
  },
  {
    title: "We measure before we optimise",
    desc: "An evaluation set exists before the second version does. Without one, every change after the demo is an argument about taste.",
  },
  {
    title: "We hand it over properly",
    desc: "Code, infrastructure, evals and documentation land in your repositories as we go — so the system outlives the engagement.",
  },
];

function AboutPage() {
  return (
    <>
      <Box
        component="section"
        sx={{
          paddingTop: { xs: "48px", md: "88px" },
          paddingBottom: { xs: "40px", md: "64px" },
        }}
      >
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" },
              gap: { xs: 5, md: 8 },
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="eyebrow" sx={{ color: color.accent, mb: 4 }}>
                About
              </Typography>

              <Typography variant="h1" sx={{ color: color.ink, maxWidth: "14ch" }}>
                An Engineering Practice With a Research Habit
              </Typography>

              <Typography
                variant="lede"
                sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
              >
                14Labs builds AI systems that run in production: multi-agent
                pipelines, retrieval and knowledge infrastructure, and the
                evaluation work that decides whether any of it is trustworthy.
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.body }}
              >
                We are deliberately small and deliberately technical. The people
                who scope the work are the people who write it, and the write-up
                you get at the end says what did not work as clearly as what did.
              </Typography>

              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {pillars.map((pillar) => (
                  <Typography
                    key={pillar}
                    variant="caption"
                    sx={{
                      color: color.accent,
                      backgroundColor: color.surface,
                      border: "1px solid",
                      borderColor: color.grey20,
                      borderRadius: radius.pill,
                      px: 1.75,
                      py: 0.75,
                    }}
                  >
                    {pillar}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                backgroundColor: color.grey05,
                border: "1px solid",
                borderColor: color.grey20,
                borderRadius: radius.lg,
                p: 4,
              }}
            >
              <EmbeddingField style={{ width: "100%", height: "auto" }} />
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 3,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: color.grey20,
                  color: color.inkMuted,
                }}
              >
                A query and its nearest neighbours — the figure from our retrieval
                write-up. Point at a mark to read it.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section tight>
        <StatSlabs items={stats} />
      </Section>

      <Section band="alt">
        <SectionHead
          split
          eyebrow="How we work"
          title="Three commitments, and they are checkable"
          lede="Every one of these is something a client can hold us to at the end of an engagement rather than a value on a wall."
        />

        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          {HOW_WE_WORK.map((item, i) => (
            <Box
              key={item.title}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "auto 1fr 1.2fr" },
                columnGap: { md: 5 },
                rowGap: { xs: 1.5, md: 0 },
                alignItems: "start",
                paddingBlock: { xs: 3.5, md: 4.5 },
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
                "&:last-of-type": {
                  borderBottom: "1px solid",
                  borderColor: color.ruleStrong,
                },
              }}
            >
              <Typography variant="eyebrow" sx={{ color: color.grey45, minWidth: "3ch" }}>
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography variant="h3" sx={{ color: color.ink, maxWidth: "20ch" }}>
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: color.inkMuted, maxWidth: measure.body }}
              >
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <Section band="surface" inset>
        <SectionHead
          split
          eyebrow="What we bring"
          title="Who we are"
          lede="A team of AI engineers, researchers and product builders who have shipped this class of system before — and have the scars to prove which parts are hard."
        />

        <Box
          sx={{
            mt: { xs: 5, md: 8 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {values.map((value) => (
            <Box
              key={value.title}
              sx={{
                backgroundColor: color.grey05,
                borderRadius: radius.lg,
                p: { xs: 3, md: 3.5 },
              }}
            >
              <Typography variant="h3" sx={{ color: color.ink, maxWidth: "16ch" }}>
                {value.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: color.inkMuted }}>
                {value.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <LabTeam />

      <CallSection contact />
    </>
  );
}

export default AboutPage;
