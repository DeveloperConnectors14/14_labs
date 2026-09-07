import { Box, Container, Typography } from "@mui/material";
import ActionLink from "@/components/ui/ActionLink";
import SignalGrid from "@/components/visuals/SignalGrid";
import { getServices } from "@/services/dataService";
import { color, font } from "@/theme/tokens";

const services = getServices();

/**
 * The curtain. This is the first band that scrolls over the pinned hero, so it
 * runs full bleed in the darkest green on the site — the hero goes soft behind
 * a hard edge, which is the whole reason the defocus reads as depth instead of
 * as a smear.
 *
 * It used to be a rounded slab inside the hero. Moving it out is what let the
 * hero fit one viewport.
 */
function PracticeIndex() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: color.deep,
        color: color.onDeep,
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
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <SignalGrid tone="deep" seed={44} style={{ width: "100%", height: "auto" }} />
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
            borderColor: color.ruleOnDeep,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ color: color.onDeep, maxWidth: "34ch" }}
          >
            Four practices. One engineering standard applied across all of them.
          </Typography>
          <ActionLink href="/services" onDeep>
            What we do
          </ActionLink>
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
                borderColor: { md: color.ruleOnDeep },
              }}
            >
              <Typography
                sx={{
                  fontFamily: font.display,
                  fontWeight: 300,
                  fontSize: "2.25rem",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: color.lime,
                }}
              >
                {service.sNo}
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: color.onDeep,
                  letterSpacing: "-0.012em",
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: color.onDeepMuted, maxWidth: "26ch" }}
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
