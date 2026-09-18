import Image from "next/image";
import { Box, Typography } from "@mui/material";
import HubOutlined from "@mui/icons-material/HubOutlined";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";
import ScienceOutlined from "@mui/icons-material/ScienceOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import HandArrow from "@/components/ui/HandArrow";
import HandNote from "@/components/ui/HandNote";
import InfoTip from "@/components/ui/InfoTip";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import HeroScene from "@/components/home/HeroScene";
import { getServices } from "@/services/dataService";
import { color, motion, radius } from "@/theme/tokens";

const services = getServices();

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

// The pencil underline under "Production Systems", drawn once the headline has landed.
const drawOn = (delay) => ({
  "@keyframes heroDraw": { from: { strokeDashoffset: 1 }, to: { strokeDashoffset: 0 } },
  strokeDasharray: 1,
  animation: `heroDraw 1000ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms both`,
});

// Sized to the copy column, not the screen, so both lines always fit it.
const HEADLINE = "clamp(2.25rem, 0.25rem + 3.4vw, 3.5rem)";

const lineSx = {
  display: "block",
  fontSize: HEADLINE,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: "-0.045em",
  color: color.ink,
  // A line of the headline holds together from `sm` up, where the column is
  // wide enough for it; on a phone it is allowed to wrap rather than overflow.
  whiteSpace: { xs: "normal", sm: "nowrap" },
};

// Same order and icons as the footer.
const ICONS = [HubOutlined, TravelExploreOutlined, ScienceOutlined, FactCheckOutlined];

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
 * The practices as a row of small chips, each a way into What We Do. Hover or
 * focus one and a tip unfolds above it with the practice's full name and what
 * it is, in one sentence.
 */
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
      {services.map((service, i) => {
        const Icon = ICONS[i];
        return (
          <InfoTip key={service.sNo} title={service.title} body={service.tagline}>
            <LinkBox
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
                transition: `border-color ${motion.fast}, color ${motion.fast}, background-color ${motion.fast}, transform ${motion.base}`,
                "&:hover, &:focus-visible": {
                  borderColor: color.limeDeep,
                  color: color.ink,
                  backgroundColor: color.accentSoft,
                  transform: "translateY(-2px)",
                },
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
                {Icon ? <Icon sx={{ fontSize: 15 }} /> : null}
              </Box>
              {service.short}
            </LinkBox>
          </InfoTip>
        );
      })}
    </Box>
  );
}

/**
 * The hero copy, handed to HeroScene — which owns the globe of words, the
 * scroll runway and the moment the globe becomes the wordmark.
 *
 * Left: the name; a two-line headline stepped in so it reads as a distance
 * travelled, with "Production Systems" underlined in pencil once it lands; the
 * promise, with the part that matters set a shade stronger; one action and one
 * alternative; and, under a thin rule, the four practices with tips.
 */
function Hero() {
  return (
    <HeroScene
      note={
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5 }}>
          <HandNote delay={2400} rotate={-6} sx={{ mb: 0.5 }}>
            move your cursor through it
          </HandNote>
          <HandArrow variant="rise" delay={1500} duration={1000} sx={{ width: 96, mb: 1.5 }} />
        </Box>
      }
    >
      <BrandTag />

      <Box component="h1" sx={{ m: 0, mt: { xs: 4, md: 5 }, fontWeight: 400 }}>
        <Box component="span" sx={{ ...lineSx, ...rise(90) }}>
          From AI Research
        </Box>
        <Box component="span" sx={{ ...lineSx, pl: { sm: "0.8em" }, mt: "0.06em", ...rise(190) }}>
          to{" "}
          <Box component="span" sx={{ position: "relative", display: "inline-block" }}>
            Production Systems
            <Box
              component="svg"
              aria-hidden
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              sx={{
                position: "absolute",
                left: "-1%",
                bottom: "-0.12em",
                width: "102%",
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
        sx={{ mt: { xs: 3.5, md: 4.5 }, color: color.inkMuted, maxWidth: "48ch", ...rise(290) }}
      >
        14Labs builds reliable AI solutions by combining research, engineering,
        and evaluation. We create intelligent agents, retrieval systems, and
        machine learning products{" "}
        <Box component="span" sx={{ color: color.ink, fontWeight: 500 }}>
          designed for real-world users.
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
    </HeroScene>
  );
}

export default Hero;
