import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import ActionLink from "@/components/ui/ActionLink";
import AgentGraph from "@/components/visuals/AgentGraph";
import EmbeddingField from "@/components/visuals/EmbeddingField";
import EvalCurve from "@/components/visuals/EvalCurve";
import SignalGrid from "@/components/visuals/SignalGrid";
import { getServices } from "@/services/dataService";
import { color, font, measure, motion, radius } from "@/theme/tokens";

const services = getServices();

/**
 * One figure per practice, keyed by the service number.
 *
 * These are drawings of the actual thing each practice does — a traced request
 * through a topology, a query and its neighbours, a diagonal-heavy matrix, two
 * eval scores diverging. That is the entire reason they are here instead of
 * stock imagery: a photograph of a server rack tells a reader nothing about
 * whether we know what we are doing, and a picture of a regression does.
 */
const FIGURES = {
  "01": AgentGraph,
  "02": EmbeddingField,
  "03": SignalGrid,
  "04": EvalCurve,
};

function ServicesSection() {
  return (
    <Section id="what-we-do" band="surface" inset>
      <SectionHead
        split
        eyebrow="What we do"
        title="Four practices, one engineering standard"
        lede="We work across the whole path from problem statement to production system. Most engagements touch more than one of these."
        action={<ActionLink href="/services">All capabilities</ActionLink>}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {services.map((service) => {
          const Figure = FIGURES[service.sNo];

          return (
            <Box
              key={service.sNo}
              sx={{
                backgroundColor: color.grey05,
                borderRadius: radius.lg,
                p: { xs: 2, md: 2.5 },
                display: "flex",
                flexDirection: "column",
                transition: `background-color ${motion.base}`,
                "&:hover": { backgroundColor: color.grey10 },
                "&:hover .service-plate": { backgroundColor: color.grey20 },
                "&:hover .service-index": { color: color.accent },
              }}
            >
              {Figure ? (
                <Box
                  className="service-plate"
                  sx={{
                    backgroundColor: color.grey10,
                    borderRadius: radius.md,
                    height: { xs: 160, md: 212 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    py: 1.5,
                    transition: `background-color ${motion.base}`,
                  }}
                >
                  <Figure
                    style={{ width: "auto", height: "100%", maxWidth: "100%" }}
                  />
                </Box>
              ) : null}

              <Box sx={{ px: { xs: 1, md: 1.5 }, pt: { xs: 3, md: 3.5 }, pb: 1.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 2.5 }}>
                  <Typography
                    className="service-index"
                    sx={{
                      fontFamily: font.display,
                      fontWeight: 300,
                      fontSize: "2rem",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: color.grey45,
                      transition: `color ${motion.base}`,
                    }}
                  >
                    {service.sNo}
                  </Typography>
                  <Typography variant="h3" sx={{ color: color.ink, maxWidth: "16ch" }}>
                    {service.title}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2.5,
                    color: color.inkMuted,
                    maxWidth: measure.body,
                    flexGrow: 1,
                  }}
                >
                  {service.desc}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    m: 0,
                    mt: 3,
                    p: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {service.tags.map((tag) => (
                    <Typography
                      key={tag}
                      component="li"
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
                      {tag}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}

export default ServicesSection;
