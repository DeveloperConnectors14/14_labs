import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import HubOutlined from "@mui/icons-material/HubOutlined";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";
import ScienceOutlined from "@mui/icons-material/ScienceOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import HandArrow from "@/components/ui/HandArrow";
import HandNote from "@/components/ui/HandNote";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import HeroMark from "@/components/home/HeroMark";
import { color, motion, radius } from "@/theme/tokens";

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

// The pencil underline under "Production.", drawn once the headline has landed.
const drawOn = (delay) => ({
  "@keyframes heroDraw": { from: { strokeDashoffset: 1 }, to: { strokeDashoffset: 0 } },
  strokeDasharray: 1,
  animation: `heroDraw 1000ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms both`,
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

// The four practices, in the same order and with the same icons as the footer.
const PRACTICES = [
  { icon: HubOutlined, label: "Multi-Agent Systems" },
  { icon: TravelExploreOutlined, label: "Retrieval" },
  { icon: ScienceOutlined, label: "Applied ML" },
  { icon: FactCheckOutlined, label: "Evaluation" },
];

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

/** The practices as a row of small chips, each a way into What We Do. */
function PracticeChips() {
  return (
    <Box
      sx={{
        mt: { xs: 5, md: 6 },
        pt: { xs: 3, md: 3.5 },
        borderTop: "1px solid",
        borderColor: color.rule,
        maxWidth: 600,
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {PRACTICES.map(({ icon: Icon, label }, i) => (
        <LinkBox
          key={label}
          href="/services"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            pl: 0.625,
            pr: 1.75,
            py: 0.625,
            borderRadius: radius.pill,
            border: "1px solid",
            borderColor: color.rule,
            backgroundColor: `color-mix(in srgb, ${color.ground} 70%, transparent)`,
            color: color.inkMuted,
            textDecoration: "none",
            fontSize: "0.875rem",
            transition: `border-color ${motion.fast}, color ${motion.fast}, background-color ${motion.fast}`,
            "&:hover": { borderColor: color.limeDeep, color: color.ink, backgroundColor: color.accentSoft },
            ...rise(500 + i * 70),
          }}
        >
          <Box
            aria-hidden
            sx={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              backgroundColor: color.accentSoft,
              color: color.accent,
            }}
          >
            <Icon sx={{ fontSize: 15 }} />
          </Box>
          {label}
        </LinkBox>
      ))}
    </Box>
  );
}

/**
 * The type on the left, the brand on the right.
 *
 * Left: the name, a two-line headline stepped in so it reads as a distance
 * travelled — research, then production — with "Production." underlined in
 * pencil once it lands; the promise, with the part that matters set a shade
 * stronger; one action and one alternative; and under a thin rule, the four
 * practices as ways in.
 *
 * Right: the 14Labs mark made of points (HeroMark), which assembles on load,
 * turns in 3D towards the cursor and parts under it. A pencil arrow draws
 * itself up towards it once the points have landed, with a note saying it can
 * be touched; both appear only where there is a cursor to use them.
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
              <Box component="span" sx={{ ...lineSx, pl: { sm: "1.1em" }, mt: "0.06em", ...rise(190) }}>
                to{" "}
                <Box component="span" sx={{ position: "relative", display: "inline-block" }}>
                  Production.
                  <Box
                    component="svg"
                    aria-hidden
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    sx={{
                      position: "absolute",
                      left: "-1%",
                      bottom: "-0.12em",
                      width: "90%",
                      height: "0.22em",
                      overflow: "visible",
                      color: color.lime,
                    }}
                  >
                    <Box
                      component="path"
                      d="M4 13 C 60 5, 140 4, 200 9 S 280 15, 296 7"
                      pathLength="1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      sx={drawOn(1150)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography
              variant="lede"
              sx={{ mt: { xs: 3.5, md: 4.5 }, color: color.inkMuted, maxWidth: "44ch", ...rise(290) }}
            >
              An AI engineering and research practice. We build multi-agent systems,
              retrieval and evaluation that{" "}
              <Box component="span" sx={{ color: color.ink, fontWeight: 500 }}>
                hold up once real users arrive.
              </Box>
            </Typography>

            <Box sx={{ mt: { xs: 4.5, md: 5.5 }, display: "flex", gap: 1.5, flexWrap: "wrap", ...rise(390) }}>
              <PillLink href="/contact" size="lg">
                Start a project
              </PillLink>
              <PillLink href="/case-studies" variant="outline" size="lg">
                See our work
              </PillLink>
            </Box>

            <PracticeChips />
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
