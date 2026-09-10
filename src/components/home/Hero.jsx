import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import HandArrow from "@/components/ui/HandArrow";
import PillLink from "@/components/ui/PillLink";
import { color, type } from "@/theme/tokens";

/**
 * The page's one orchestrated moment: each piece rises into place once, in
 * reading order, and nothing moves again. Reduced motion is handled globally
 * (globals.css collapses the duration) and `both` keeps the end state, so the
 * setting removes the movement rather than the content.
 */
const rise = (delay) => ({
  "@keyframes heroRise": {
    from: { opacity: 0, transform: "translateY(0.16em)" },
    to: { opacity: 1, transform: "none" },
  },
  animation: `heroRise 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
});

const lineSx = {
  display: "block",
  fontSize: type.display,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "-0.045em",
  color: color.ink,
};

const DOT_FIELD = "radial-gradient(ellipse 70% 60% at 50% 42%, #000 15%, transparent 75%)";

/**
 * Two lines of type, staggered across the width — the first set left, the
 * second set right — and the page's claim is the gap between them: the
 * practice lives in the distance from a research result to a system in
 * production.
 *
 * On wide screens the two corners the lines leave empty are used: a small
 * image, one green dot and a pencil arrow top right, beside the first line;
 * the lede bottom left, beside the second. Both are sized to their line's
 * height — the second line drops by a third of an em so the image clears it,
 * and the lede is held to three lines so it never climbs into the first. Below
 * `lg` all of it stacks and the decoration goes, since the type alone fills
 * the screen.
 */
function Hero() {
  return (
    <Box
      component="section"
      sx={{ position: "relative", overflow: "hidden", pt: { xs: 7, md: 11 }, pb: { xs: 9, md: 13 } }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(${color.ruleStrong} 1px, transparent 1.4px)`,
          backgroundSize: "26px 26px",
          maskImage: DOT_FIELD,
          WebkitMaskImage: DOT_FIELD,
        }}
      />

      <Container sx={{ position: "relative" }}>
        <Box sx={{ position: "relative", fontSize: type.display }}>
          <Box component="h1" sx={{ m: 0, fontWeight: 400 }}>
            <Box component="span" sx={{ ...lineSx, ...rise(60) }}>
              From research,
            </Box>
            <Box
              component="span"
              sx={{
                ...lineSx,
                textAlign: { lg: "right" },
                mt: { xs: "0.06em", lg: "0.34em" },
                ...rise(170),
              }}
            >
              to production.
            </Box>
          </Box>

          {/* Top right, inside the first line's height. */}
          <Box
            aria-hidden
            sx={{
              display: { xs: "none", lg: "block" },
              position: "absolute",
              top: 0,
              right: 0,
              width: 220,
              height: "1.28em",
              ...rise(340),
            }}
          >
            <HandArrow variant="loop" sx={{ position: "absolute", width: 104, left: -112, top: 18 }} />
            <Box
              sx={{
                position: "absolute",
                right: 8,
                top: 4,
                width: 184,
                aspectRatio: "4 / 3",
                borderRadius: "18px",
                overflow: "hidden",
                transform: "rotate(4deg)",
              }}
            >
              <Image src="/media/hero.png" alt="" fill sizes="184px" priority style={{ objectFit: "cover" }} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: 14,
                top: 108,
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: color.lime,
              }}
            />
          </Box>

          {/* Bottom left beside the second line on wide screens; under it elsewhere. */}
          <Typography
            sx={{
              position: { lg: "absolute" },
              left: 0,
              bottom: "0.08em",
              mt: { xs: 4, lg: 0 },
              maxWidth: { xs: "36ch", lg: 360 },
              fontSize: { xs: "1.125rem", lg: "1.0625rem" },
              lineHeight: 1.55,
              color: color.inkMuted,
              ...rise(260),
            }}
          >
            An AI engineering and research practice. We build agents, retrieval and
            evaluation that hold up under real traffic.
          </Typography>
        </Box>

        <Box sx={{ mt: { xs: 5, md: 7 }, display: "flex", gap: 1.5, flexWrap: "wrap", ...rise(380) }}>
          <PillLink href="/contact" size="lg">
            Start a project
          </PillLink>
          <PillLink href="/case-studies" variant="outline" size="lg">
            See our work
          </PillLink>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
