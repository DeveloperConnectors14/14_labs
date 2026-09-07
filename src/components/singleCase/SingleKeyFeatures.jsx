import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { color, font, motion, radius } from "@/theme/tokens";

/**
 * What the system actually does, as a grid of plain cards.
 *
 * Numbered in the corner rather than iconed. There is no icon set that says
 * "geolocation verification" honestly, and a grid of near-random glyphs is how
 * a capability list starts looking like every other agency's.
 */
function SingleKeyFeatures({ keyFeatures }) {
  if (!keyFeatures?.list?.length) return null;

  return (
    <Section>
      <SectionHead
        split
        eyebrow={keyFeatures.label}
        title={keyFeatures.title}
        lede={keyFeatures.text}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {keyFeatures.list.map((item, i) => (
          <Box
            key={item.title}
            sx={{
              backgroundColor: color.surface,
              border: "1px solid",
              borderColor: color.rule,
              borderRadius: radius.lg,
              p: { xs: 3, md: 3.5 },
              display: "flex",
              flexDirection: "column",
              transition: `border-color ${motion.base}, transform ${motion.base}`,
              "&:hover": {
                borderColor: color.green30,
                transform: "translateY(-4px)",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: font.mono,
                fontSize: "0.75rem",
                letterSpacing: "0.11em",
                color: color.green45,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </Typography>

            <Typography variant="h3" sx={{ mt: 2.5, color: color.ink, maxWidth: "18ch" }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1.75, color: color.inkMuted }}>
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default SingleKeyFeatures;
