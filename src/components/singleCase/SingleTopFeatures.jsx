import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import { color, measure } from "@/theme/tokens";

/**
 * The three properties of the build worth stating flatly, as a ruled row.
 *
 * No cards here on purpose: this sits between two card grids, and a third one
 * would turn the page into a wall of boxes.
 */
function SingleTopFeatures({ topFeatures }) {
  if (!topFeatures?.length) return null;

  return (
    <Section tight>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: `repeat(${Math.min(topFeatures.length, 3)}, 1fr)` },
          gap: { xs: 0, md: 5 },
          borderTop: "1px solid",
          borderColor: color.ruleStrong,
        }}
      >
        {topFeatures.map((item) => (
          <Box
            key={item.title}
            sx={{
              paddingBlock: { xs: 3.5, md: 4 },
              borderBottom: { xs: "1px solid", md: 0 },
              borderColor: color.rule,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.0625rem",
                fontWeight: 500,
                letterSpacing: "-0.015em",
                color: color.ink,
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1.25, color: color.inkMuted, maxWidth: measure.body }}
            >
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default SingleTopFeatures;
