import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { getFeatures } from "@/services/dataService";
import { color, font, measure } from "@/theme/tokens";

const features = getFeatures();

/**
 * Three working principles on the soft indigo slab, placed so the run of white
 * sections is interrupted before it becomes monotonous. It is a wash rather
 * than a full-strength band on purpose: the solid primary is saved for the
 * closing band a few sections later, and two of them this close together would
 * make neither one the ending.
 */
function WhyChooseUs() {
  return (
    <Section band="soft" inset>
      <SectionHead
        split
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
              borderColor: color.ruleOnSoft,
            }}
          >
            <Typography
              sx={{
                fontFamily: font.display,
                fontWeight: 300,
                fontSize: "3rem",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: color.softMark,
              }}
            >
              {item.sNo}
            </Typography>

            <Typography variant="h4" sx={{ mt: 3, color: color.ink, maxWidth: "18ch" }}>
              {item.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 2, color: color.inkMuted, maxWidth: measure.body }}
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
