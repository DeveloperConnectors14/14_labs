import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import ActionLink from "@/components/ui/ActionLink";
import { getPricing } from "@/services/dataService";
import { color, font, radius } from "@/theme/tokens";

const pricing = getPricing();

// The middle column is the one most engagements actually take, so it carries
// the green. That is the emphasis doing a job, not decoration.
const FEATURED = 1;

function PricingSection() {
  return (
    <Section id="engagements">
      <SectionHead
        split
        eyebrow="Engagements"
        title="Three ways to start"
        lede="Most work begins with a pilot. It is deliberately small, ends in a written recommendation, and you keep the evaluation set whichever way it goes."
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 1.5, md: 2 },
          alignItems: "stretch",
        }}
      >
        {pricing.map((tier, i) => {
          const featured = i === FEATURED;
          const fg = featured ? color.onDeep : color.ink;
          const muted = featured ? color.onDeepMuted : color.inkMuted;
          const rule = featured ? color.ruleOnDeep : color.rule;

          return (
            <Box
              key={tier.title}
              sx={{
                backgroundColor: featured ? color.deep : color.sand05,
                border: featured ? "1px solid transparent" : "1px solid",
                borderColor: featured ? "transparent" : color.sand20,
                borderRadius: radius.lg,
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
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
                <Typography variant="h3" sx={{ color: fg }}>
                  {tier.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: featured ? color.deepAlt : color.inkMuted,
                    backgroundColor: featured ? color.lime : color.surface,
                    borderRadius: radius.pill,
                    px: 1.5,
                    py: 0.75,
                  }}
                >
                  {tier.duration}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 2.5,
                  fontSize: "1.125rem",
                  lineHeight: 1.45,
                  letterSpacing: "-0.016em",
                  color: featured ? color.lime : color.accent,
                }}
              >
                {tier.question}
              </Typography>

              <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 3.5, p: 0, flexGrow: 1 }}>
                {tier.details.split(",").map((point) => (
                  <Typography
                    key={point}
                    component="li"
                    variant="body2"
                    sx={{
                      color: muted,
                      paddingBlock: 1.5,
                      borderTop: "1px solid",
                      borderColor: rule,
                    }}
                  >
                    {point.trim()}
                  </Typography>
                ))}
              </Box>

              <Typography
                className="tabular"
                sx={{
                  mt: 4,
                  fontFamily: font.display,
                  fontWeight: 300,
                  fontSize: "2.25rem",
                  lineHeight: 1,
                  letterSpacing: "-0.045em",
                  color: fg,
                }}
              >
                {tier.pricing}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <ActionLink href="/contact" onDeep={featured}>
                  Start here
                </ActionLink>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Typography variant="body2" sx={{ mt: 3, color: color.inkFaint, maxWidth: "70ch" }}>
        Indicative ranges. Scope, data access and integration surface move the
        number more than duration does — we quote against a written brief.
      </Typography>
    </Section>
  );
}

export default PricingSection;
