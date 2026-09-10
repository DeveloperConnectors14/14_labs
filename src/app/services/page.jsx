import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import PricingSection from "@/components/home/PricingSection";
import SignalPanel from "@/components/home/SignalPanel";
import ActionLink from "@/components/ui/ActionLink";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import AgentGraph from "@/components/visuals/AgentGraph";
import EmbeddingField from "@/components/visuals/EmbeddingField";
import EvalCurve from "@/components/visuals/EvalCurve";
import SignalGrid from "@/components/visuals/SignalGrid";
import { getServices } from "@/services/dataService";
import { color, measure, motion, radius } from "@/theme/tokens";

const services = getServices();

export const metadata = {
  title: "What we do",
  description:
    "Multi-agent systems, retrieval and knowledge systems, applied machine learning, and evaluation and reliability — the four practices 14Labs works in.",
};

/** One drawing per practice — the same figures the home page uses, given room
 *  to be read here rather than sitting in a card. */
const FIGURES = {
  "01": AgentGraph,
  "02": EmbeddingField,
  "03": SignalGrid,
  "04": EvalCurve,
};

// What arrives at the end of an engagement, whichever practice it started in.
const DELIVERABLES = [
  {
    title: "Running code, in your repositories",
    desc: "Source, infrastructure and deployment land in your accounts as we go. Nothing depends on us being here next quarter.",
  },
  {
    title: "An evaluation set you keep",
    desc: "The cases that define whether the system is working, written down and runnable — the thing that makes the next change measurable.",
  },
  {
    title: "The write-up",
    desc: "What we built, what we tried that failed, and where the design will need attention as load grows.",
  },
];

function ServicesPage() {
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
                What we do
              </Typography>
              <Typography variant="h1" sx={{ color: color.ink, maxWidth: "16ch" }}>
                Four practices, one engineering standard
              </Typography>
              <Typography
                variant="lede"
                sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
              >
                We work across the whole path from problem statement to
                production system. Most engagements touch more than one of these,
                and all of them are held to the same bar: it ships, it is
                measured, and somebody other than us can run it.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
              }}
            >
              {services.map((service) => (
                <Box
                  key={service.sNo}
                  component="a"
                  href={`#practice-${service.sNo}`}
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 2.5,
                    py: 2,
                    borderBottom: "1px solid",
                    borderColor: color.rule,
                    textDecoration: "none",
                    color: color.ink,
                    transition: `color ${motion.fast}, padding-left ${motion.base}`,
                    "&:hover": { color: color.accent, paddingLeft: "8px" },
                  }}
                >
                  <Typography variant="caption" sx={{ color: color.grey45 }}>
                    {service.sNo}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
                    {service.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {services.map((service, i) => {
        const Figure = FIGURES[service.sNo];
        const flipped = i % 2 === 1;

        return (
          <Section
            key={service.sNo}
            id={`practice-${service.sNo}`}
            band={i % 2 === 0 ? "surface" : "ground"}
            inset={i % 2 === 0}
            tight
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                columnGap: { md: 8 },
                rowGap: { xs: 4, md: 0 },
                alignItems: "center",
              }}
            >
              <Box sx={{ order: { md: flipped ? 2 : 1 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    aria-hidden
                    sx={{ width: 28, height: "2px", backgroundColor: color.accent }}
                  />
                  <Typography variant="eyebrow" sx={{ color: color.accent }}>
                    Practice {service.sNo}
                  </Typography>
                </Box>

                <Typography
                  variant="h2"
                  sx={{ mt: 3, color: color.ink, maxWidth: "14ch" }}
                >
                  {service.title}
                </Typography>

                <Typography
                  variant="lede"
                  sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.lede }}
                >
                  {service.desc}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    m: 0,
                    mt: 4,
                    p: 0,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    borderTop: "1px solid",
                    borderColor: color.rule,
                  }}
                >
                  {service.tags.map((tag) => (
                    <Box
                      key={tag}
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1.75,
                        borderBottom: "1px solid",
                        borderColor: color.rule,
                      }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: radius.pill,
                          backgroundColor: color.grey45,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: color.inkMuted }}>
                        {tag}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {Figure ? (
                <Box
                  sx={{
                    order: { md: flipped ? 1 : 2 },
                    backgroundColor: i % 2 === 0 ? color.grey05 : color.surface,
                    border: "1px solid",
                    borderColor: i % 2 === 0 ? color.grey20 : color.rule,
                    borderRadius: radius.lg,
                    p: { xs: 2.5, md: 4 },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Figure style={{ width: "100%", maxWidth: 420, height: "auto" }} />
                </Box>
              ) : null}
            </Box>
          </Section>
        );
      })}

      <SignalPanel />

      <Section band="alt">
        <SectionHead
          split
          eyebrow="What you are left with"
          title="Everything we build, you own"
          lede="No wrapper platform, no per-seat licence, nothing that stops working when the engagement ends."
          action={<ActionLink href="/case-studies">See it in a real system</ActionLink>}
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
          {DELIVERABLES.map((item, i) => (
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

      <PricingSection />

      <CallSection contact />
    </>
  );
}

export default ServicesPage;
