import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import CaseStudies from "@/components/home/CaseStudies";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { getCaseDetails, getcaseStudies } from "@/services/dataService";
import { color, measure } from "@/theme/tokens";

const studies = getcaseStudies();
const details = getCaseDetails();

export const metadata = {
  title: "Work",
  description:
    "Production AI systems 14Labs has designed and shipped — the architecture, what was measured, and where the design had to change.",
};

/** The index states its own terms before the grid: how many write-ups there
 *  are, which industries they cover, and how deep they go. */
const industries = [
  ...new Set(
    details
      .map((entry) => entry.hero?.stats?.find((s) => s.label === "Industry")?.value)
      .filter(Boolean)
  ),
];

const LEDGER = [
  { label: "Case studies", value: String(studies.length).padStart(2, "0") },
  { label: "Industries", value: industries.join(" · ") || "—" },
  {
    label: "Pipeline nodes documented",
    value: String(
      details.reduce((sum, entry) => sum + (entry.pipeline?.nodes?.length ?? 0), 0)
    ),
  },
  { label: "Written up in full", value: "Every one" },
];

// What a reader is promised before they click into one of these.
const COVERAGE = [
  {
    title: "The problem, as it was measured",
    desc: "What the work looked like before the system existed, in hours and error rates rather than adjectives.",
  },
  {
    title: "The architecture, node by node",
    desc: "The actual topology that shipped, including the stages that exist only because the first design failed.",
  },
  {
    title: "What changed, and what it cost",
    desc: "The figures that moved, the ones that did not, and the trade-offs we would make again.",
  },
];

function CaseStudiesPage() {
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
                Selected work
              </Typography>
              <Typography variant="h1" sx={{ color: color.ink, maxWidth: "15ch" }}>
                Systems running in production
              </Typography>
              <Typography
                variant="lede"
                sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
              >
                Each of these started as a workflow somebody was doing by hand.
                The write-ups cover the architecture, what we measured, and the
                places the design had to change once real data arrived.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
              }}
            >
              {LEDGER.map((row) => (
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

      <CaseStudies heading={false} />

      <Section band="alt">
        <SectionHead
          split
          eyebrow="How these are written"
          title="A case study is an engineering document"
          lede="Not a testimonial. If a system has a weakness we have not solved, it is in the write-up — that is the part a reader with the same problem actually needs."
        />

        <Box
          sx={{
            mt: { xs: 5, md: 8 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 0, md: 5 },
            borderTop: "1px solid",
            borderColor: color.ruleStrong,
          }}
        >
          {COVERAGE.map((item, i) => (
            <Box
              key={item.title}
              sx={{
                paddingBlock: { xs: 3.5, md: 4 },
                borderBottom: { xs: "1px solid", md: 0 },
                borderColor: color.rule,
              }}
            >
              <Typography variant="eyebrow" sx={{ color: color.grey45 }}>
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "1.0625rem",
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  color: color.ink,
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.25, color: color.inkMuted }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <CallSection contact />
    </>
  );
}

export default CaseStudiesPage;
