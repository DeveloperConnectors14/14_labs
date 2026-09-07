import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { getFeatures } from "@/services/dataService";
import { color, font, measure } from "@/theme/tokens";

const features = getFeatures();

/**
 * Three working principles on a deep green slab — the page's second strong
 * colour block, placed so the run of grey and white sections is interrupted
 * before it becomes monotonous.
 */
function WhyChooseUs() {
  return (
    <Section band="deep" inset>
      <SectionHead
        split
        onDeep
        eyebrow="How we work"
        title="Three commitments you can hold us to"
        lede="Stated concretely enough that you could check them against us at the end of an engagement."
      />

      <Box
        sx={{
          mt: { xs: 6, md: 9 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 5, md: 6 },
        }}
      >
        {features.map((item, i) => (
          <Box
            key={item.sNo}
            sx={{
              pt: 4,
              pl: { md: i === 0 ? 0 : 4 },
              pr: { md: 2 },
              borderTop: "1px solid",
              borderLeft: { md: i === 0 ? 0 : "1px solid" },
              borderColor: color.ruleOnDeep,
            }}
          >
            <Typography
              sx={{
                fontFamily: font.display,
                fontWeight: 300,
                fontSize: "3rem",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: color.lime,
              }}
            >
              {item.sNo}
            </Typography>

            <Typography variant="h4" sx={{ mt: 3, color: color.onDeep, maxWidth: "18ch" }}>
              {item.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 2, color: color.onDeepMuted, maxWidth: measure.body }}
            >
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default WhyChooseUs;
