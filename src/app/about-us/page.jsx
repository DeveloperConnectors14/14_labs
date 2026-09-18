import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import LabTeam from "@/components/home/LabTeam";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import StatSlabs from "@/components/ui/StatSlabs";
import ResearchToProduct from "@/components/visuals/ResearchToProduct";
import { getPillars, getStats, getValues } from "@/services/dataService";
import { color, measure, radius } from "@/theme/tokens";

const stats = getStats();
const pillars = getPillars();
const values = getValues();

export const metadata = {
  title: "About",
  description:
    "14Labs is a software company working across Web, App, AI and Cyber Security, combining practical engineering with applied research.",
};

// How the practice actually works, stated as commitments rather than adjectives.
const HOW_WE_WORK = [
  {
    title: "We Start With the Problem",
    desc: "We first understand what needs to be solved and what success looks like before choosing the technology.",
  },
  {
    title: "We Measure What We Build",
    desc: "We define clear ways to evaluate the work so progress is based on results, not assumptions.",
  },
  {
    title: "You Own What We Build",
    desc: "We provide the code, documentation, infrastructure, and knowledge needed to run and maintain the system.",
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
                Software Engineering, Backed by Research.
              </Typography>

              <Typography
                variant="lede"
                sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
              >
                14Labs is a software company working across Web, App, AI, and
                Cyber Security. We build digital products and provide software
                services for local and international clients, combining practical
                engineering with applied research.
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
              <ResearchToProduct style={{ width: "100%", height: "auto" }} />
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
                Research → Engineering → Products. What holds up in research is
                engineered into products that ship. Point at a mark to read it.
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
          eyebrow="Commitments"
          title="How We Work"
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

      <LabTeam
        title="You Work Directly With the Team."
        lede="From the first discussion to delivery, you work directly with the people designing and building your system."
        showAboutLink={false}
      />

      <CallSection
        contact
        title="Have a Project in Mind?"
        lede="Tell us what you’re building, what you’re trying to solve, or where you need help. We’ll start from there."
      />
    </>
  );
}

export default AboutPage;
