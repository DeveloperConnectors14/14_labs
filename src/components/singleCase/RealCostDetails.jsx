import { Box, Container, Typography } from "@mui/material";
import { color, font, radius } from "@/theme/tokens";

/**
 * The cost of leaving it alone, set as a statement on black.
 *
 * This is the one paragraph in a case study that is an argument rather than a
 * description, so it is the one paragraph that gets a band of its own — serif,
 * large, and on the darkest ground on the site. Everything around it is
 * reporting; this is the case being made.
 */
function RealCostDetails({ costData }) {
  if (!costData?.text) return null;

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: color.black,
        color: color.onBlack,
        paddingBlock: "clamp(64px, 8vw, 128px)",
      }}
    >
      <Container>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: { xs: 4, md: 5 } }}>
          <Box
            aria-hidden
            sx={{ width: 28, height: "2px", backgroundColor: color.lime }}
          />
          <Typography variant="eyebrow" sx={{ color: color.lime }}>
            What it costs to leave it
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: font.serif,
            fontWeight: 400,
            fontSize: "clamp(1.375rem, 0.9rem + 1.9vw, 2.375rem)",
            lineHeight: 1.35,
            letterSpacing: "-0.015em",
            color: color.onBlack,
            maxWidth: "34ch",
            textWrap: "pretty",
          }}
        >
          {costData.text}
        </Typography>

        <Box
          aria-hidden
          sx={{
            mt: { xs: 5, md: 7 },
            height: "1px",
            width: "100%",
            maxWidth: 220,
            borderRadius: radius.pill,
            backgroundImage: `linear-gradient(to right, ${color.lime}, transparent)`,
          }}
        />
      </Container>
    </Box>
  );
}

export default RealCostDetails;
