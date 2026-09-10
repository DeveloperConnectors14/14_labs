import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import HandArrow from "@/components/ui/HandArrow";
import HandNote from "@/components/ui/HandNote";
import PillLink from "@/components/ui/PillLink";
import HeroMark from "@/components/home/HeroMark";
import { color, radius } from "@/theme/tokens";

/**
 * Each piece rises into place once, in reading order. Reduced motion is
 * handled globally (globals.css collapses the duration) and `both` keeps the
 * end state, so the setting removes the movement rather than the content.
 */
const rise = (delay) => ({
  "@keyframes heroRise": {
    from: { opacity: 0, transform: "translateY(0.4rem)" },
    to: { opacity: 1, transform: "none" },
  },
  animation: `heroRise 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
});

const HEADLINE = "clamp(2.75rem, 0.8rem + 5.6vw, 6.25rem)";

const lineSx = {
  display: "block",
  fontSize: HEADLINE,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "-0.045em",
  color: color.ink,
};

const DOT_FIELD = "radial-gradient(ellipse 75% 65% at 50% 45%, #000 15%, transparent 78%)";

/** Who this is, before what it says: the mark, the name, the practice. */
function BrandTag() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        pl: 0.75,
        pr: 2,
        py: 0.75,
        borderRadius: radius.pill,
        border: "1px solid",
        borderColor: color.rule,
        backgroundColor: `color-mix(in srgb, ${color.ground} 80%, transparent)`,
        backdropFilter: "blur(6px)",
        ...rise(0),
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: 28,
          height: 28,
          borderRadius: radius.pill,
          backgroundColor: color.black,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Image src="/logo-14.png" alt="" width={16} height={16} priority />
      </Box>
      <Typography component="span" sx={{ fontSize: "0.9375rem", fontWeight: 600, color: color.ink }}>
        14Labs
      </Typography>
      <Box aria-hidden sx={{ width: "1px", height: 14, backgroundColor: color.ruleStrong }} />
      <Typography component="span" sx={{ fontSize: "0.9375rem", color: color.inkMuted }}>
        AI Engineering and Research Lab
      </Typography>
    </Box>
  );
}

/**
 * The type on the left, the brand on the right.
 *
 * The headline is two lines, the second stepped in so the pair still reads as
 * a distance travelled — research, then production. Opposite it is the 14Labs
 * mark made of points (HeroMark): it assembles on load and gives way under the
 * cursor. A pencil arrow draws itself up towards it once the points have
 * landed, with a note saying it can be touched; both appear only where there
 * is a cursor-sized screen to use them.
 *
 * Decoration budget: the dot field, one low green glow, the mark, one arrow,
 * one note. Nothing else moves.
 */
function Hero() {
  return (
    <Box
      component="section"
      sx={{ position: "relative", overflow: "hidden", pt: { xs: 6, md: 9 }, pb: { xs: 8, md: 12 } }}
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
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(34% 46% at 78% 48%, color-mix(in srgb, ${color.lime} 13%, transparent), transparent 72%)`,
        }}
      />

      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.2fr) minmax(0, 1fr)" },
            columnGap: 4,
            rowGap: { xs: 5, md: 6 },
            alignItems: "center",
          }}
        >
          <Box>
            <BrandTag />

            <Box component="h1" sx={{ m: 0, mt: { xs: 4, md: 5 }, fontWeight: 400 }}>
              <Box component="span" sx={{ ...lineSx, ...rise(90) }}>
                From Research,
              </Box>
              <Box
                component="span"
                sx={{ ...lineSx, pl: { sm: "1.1em" }, mt: "0.06em", ...rise(190) }}
              >
                to Production.
              </Box>
            </Box>

            <Typography
              variant="lede"
              sx={{ mt: { xs: 3.5, md: 4.5 }, color: color.inkMuted, maxWidth: "44ch", ...rise(290) }}
            >
              An AI engineering and research practice. We build multi-agent systems,
              retrieval and evaluation that hold up once real users arrive.
            </Typography>

            <Box sx={{ mt: { xs: 4.5, md: 5.5 }, display: "flex", gap: 1.5, flexWrap: "wrap", ...rise(390) }}>
              <PillLink href="/contact" size="lg">
                Start a project
              </PillLink>
              <PillLink href="/case-studies" variant="outline" size="lg">
                See our work
              </PillLink>
            </Box>
          </Box>

          <Box sx={{ position: "relative" }}>
            <HeroMark sx={{ height: { xs: 250, sm: 340, lg: 470 } }} />

            {/* Pencil annotation, pointer screens only. */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "flex-end",
                gap: 0.5,
                position: "absolute",
                left: -8,
                bottom: -18,
                pointerEvents: "none",
                "@media (hover: none)": { display: "none" },
              }}
            >
              <HandNote delay={2500} rotate={-6} sx={{ mb: 0.5 }}>
                move your cursor through it
              </HandNote>
              <HandArrow variant="rise" delay={1500} duration={1000} sx={{ width: 96, mb: 1.5 }} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
