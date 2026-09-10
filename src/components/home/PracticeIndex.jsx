import { Box, Container, Typography } from "@mui/material";
import ActionLink from "@/components/ui/ActionLink";
import SignalGrid from "@/components/visuals/SignalGrid";
import { getServices } from "@/services/dataService";
import { color, font } from "@/theme/tokens";

const services = getServices();

/**
 * The four practices, straight after the hero, on the alternate surface.
 *
 * This used to be a full-bleed band in the primary colour. It was the first
 * thing under the hero, which spent the primary on an index and made it the
 * colour of the page rather than the colour of its actions. It is now a quiet
 * step off the ground with indigo numerals, so the first strong colour a
 * reader meets below the fold is a button.
 */
function PracticeIndex() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: color.surfaceAlt,
        color: color.ink,
        paddingBlock: { xs: "56px", md: "clamp(64px, 8vw, 104px)" },
      }}
    >
      {/* Texture, not decoration: the same matrix figure used in the applied-ML
          card, run at low opacity so the band is not a flat rectangle. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          // Pulled up and out so it never sits behind the action link — a
          // texture that a reader has to read text through is not a texture.
          top: "-24%",
          right: "-10%",
          width: { xs: "80%", md: "38%" },
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <SignalGrid tone="light" seed={44} style={{ width: "100%", height: "auto" }} />
      </Box>

      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
            alignItems: "end",
            gap: { xs: 3, md: 6 },
            pb: { xs: 5, md: 7 },
            borderBottom: "1px solid",
            borderColor: color.ruleStrong,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ color: color.ink, maxWidth: "34ch" }}
          >
            Four practices. One engineering standard applied across all of them.
          </Typography>
          <ActionLink href="/services">What we do</ActionLink>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: `repeat(${services.length}, 1fr)`,
            },
            gap: { xs: 4, md: 0 },
          }}
        >
          {services.map((service, i) => (
            <Box
              key={service.sNo}
              sx={{
                pl: { md: i === 0 ? 0 : 4 },
                pr: { md: 3 },
                borderLeft: { md: i === 0 ? 0 : "1px solid" },
                borderColor: { md: color.ruleStrong },
              }}
            >
              <Typography
                sx={{
                  fontFamily: font.display,
                  fontWeight: 300,
                  fontSize: "2.25rem",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: color.accent,
                }}
              >
                {service.sNo}
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: color.ink,
                  letterSpacing: "-0.012em",
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: color.inkMuted, maxWidth: "26ch" }}
              >
                {service.tags[0]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default PracticeIndex;
