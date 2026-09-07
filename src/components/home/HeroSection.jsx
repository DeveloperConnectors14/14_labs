import { Box, Container, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import ActionLink from "@/components/ui/ActionLink";
import DefocusOnScroll from "@/components/ui/DefocusOnScroll";
import FitLines from "@/components/ui/FitLines";
import LinkBox from "@/components/ui/LinkBox";
import Marquee from "@/components/ui/Marquee";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const HEADLINE = "AI systems that survive contact with production.";

/**
 * Every word in the headline is its own span, for one reason: hovering a word
 * lights it. It is the smallest interaction that still says the page is a
 * surface rather than a picture of one — no cursor tracking, nothing moving on
 * its own, and no reflow, because only colour and a two-pixel lift change.
 *
 * "survive" is lit to begin with. It is the word the sentence turns on, and it
 * is the only colour in the type.
 */
const Words = ({ text, lit }) => {
  const parts = text.split(" ");

  return parts.map((word, i) => (
    <Box
      key={`${word}-${i}`}
      component="span"
      sx={{
        display: "inline-block",
        color: word === lit ? color.accent : "inherit",
        transition: `color ${motion.fast}, translate ${motion.fast}`,
        "&:hover": { color: color.accent, translate: "0 -0.018em" },
      }}
    >
      {word}
      {i < parts.length - 1 ? " " : null}
    </Box>
  ));
};

const line = (text, lit) => ({
  chars: text.length,
  content: <Words text={text} lit={lit} />,
});

// The same sentence, broken for the width it has to fill. Two long lines read
// as a poster on a desktop and as a ransom note on a phone, so the phone gets
// four short ones instead.
const VARIANTS = [
  {
    show: { xs: "none", md: "block" },
    maxVh: 21,
    lines: [
      line("AI systems that survive", "survive"),
      line("contact with production."),
    ],
  },
  {
    show: { xs: "block", md: "none" },
    maxVh: 13,
    lines: [
      line("AI systems"),
      line("that survive", "survive"),
      line("contact with"),
      line("production."),
    ],
  },
];

// What the practice is actually spending its week on. Specifics beat one claim
// — and unlike a tagline, this is a line somebody has to keep true.
const IN_THE_LAB = [
  "Retrieval evaluation harnesses",
  "Agent trace tooling",
  "Inference cost modelling",
  "Multi-agent failure taxonomies",
  "Structured extraction benchmarks",
];

/**
 * How the headline arrives: each line wipes up from its own baseline, one after
 * the other. The stagger is written as nth-of-type delays because every line
 * shares one style object.
 *
 * Reduced motion is handled globally — globals.css collapses the duration, and
 * `both` leaves the end state in place, so the setting removes the movement
 * rather than the headline. The wipe is animated with `translate` rather than
 * `transform` so it composes with anything a parent is transforming.
 */
const headlineSx = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  lineHeight: 0.86,
  letterSpacing: "-0.05em",
  color: color.ink,
  "@keyframes heroLineIn": {
    from: { clipPath: "inset(0 0 104% 0)", translate: "0 0.12em" },
    to: { clipPath: "inset(-30% -6% -30% 0)", translate: "0 0" },
  },
  animation: "heroLineIn 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
  "&:nth-of-type(1)": { animationDelay: "80ms" },
  "&:nth-of-type(2)": { animationDelay: "190ms" },
  "&:nth-of-type(3)": { animationDelay: "300ms" },
  "&:nth-of-type(4)": { animationDelay: "410ms" },
};

/**
 * The stage the page opens on: one sentence, set as large as the screen can
 * carry, and nothing else in the viewport competing with it.
 *
 * There is no illustration here on purpose. This used to run an animated
 * network field off the right edge; beside the type it read as stock decoration
 * and it was the first thing a reader's eye had to learn to ignore. What
 * replaced it is the type itself — every line measured and scaled to touch both
 * edges of the screen (see FitLines), which is the one thing a stock template
 * cannot do, because it has no idea what the sentence says.
 *
 * The type is set to the container, not to the screen: full-bleed lines read as
 * a banner rather than as a page, and they stop lining up with the column
 * guides drawn behind them — which is the thing that makes the hero look built
 * rather than dropped in.
 *
 * It is held to a single viewport. The section is pinned and defocused as the
 * page scrolls over it (DefocusOnScroll), and that only works while the whole
 * hero fits on screen — anything taller gets its bottom clipped the moment it
 * sticks. The `maxVh` cap on each headline variant is what keeps that true on a
 * short, wide window, where fitting the width alone would run off the bottom.
 */
function HeroSection() {
  return (
    <DefocusOnScroll>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: color.ground,
          minHeight: { md: `calc(100svh - ${layout.navHeight.md}px)` },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: { xs: "36px", md: "clamp(28px, 4.5vh, 60px)" },
          paddingBottom: { xs: "32px", md: "clamp(16px, 2.5vh, 28px)" },
        }}
      >
        {/* Column guides, at the width the rest of the page is set to. Almost
            invisible by design: it is the difference between a page that has a
            grid and type floating on grey, and it costs one gradient. */}
        <Box
          aria-hidden
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            inset: 0,
            maxWidth: layout.maxWidth,
            marginInline: "auto",
            paddingInline: { md: layout.gutter.md, lg: layout.gutter.lg },
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              height: "100%",
              opacity: 0.5,
              backgroundImage: `repeating-linear-gradient(to right, ${color.rule} 0 1px, transparent 1px calc(100% / 6))`,
            }}
          />
        </Box>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                pb: { xs: 3, md: "clamp(16px, 3vh, 40px)" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  aria-hidden
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: radius.pill,
                    backgroundColor: color.lime,
                    border: "1px solid",
                    borderColor: color.accent,
                    // A slow pulse on one 8px dot. It is the only thing in the
                    // hero that says the page is live rather than printed.
                    "@keyframes heroPulse": {
                      "0%, 100%": { boxShadow: `0 0 0 0 ${color.lime}` },
                      "70%": { boxShadow: `0 0 0 7px rgba(120, 209, 71, 0)` },
                    },
                    animation: "heroPulse 3.2s ease-out infinite",
                  }}
                />
                <Typography variant="eyebrow" sx={{ color: color.accent }}>
                  AI Engineering · Applied Machine Learning · Research
                </Typography>
              </Box>

              <Typography
                variant="eyebrow"
                sx={{
                  display: { xs: "none", md: "block" },
                  color: color.inkFaint,
                }}
              >
                Evaluation · Tracing · Reliability · Cost
              </Typography>
            </Box>
          </Container>

          {/* The headline is one h1. The two settings inside it are breakpoint
              variants of the same sentence, so both are hidden from assistive
              tech and the sentence itself is read once, from the top. */}
          <Container>
            <Box component="h1" sx={{ margin: 0 }}>
              <Box component="span" sx={visuallyHidden}>
                {HEADLINE}
              </Box>

              {VARIANTS.map((variant, i) => (
                <FitLines
                  key={i}
                  aria-hidden
                  lines={variant.lines}
                  maxVh={variant.maxVh}
                  sx={{ display: variant.show }}
                  lineSx={headlineSx}
                />
              ))}
            </Box>
          </Container>
        </Box>

        {/* Everything under the type is deliberately small, and sits on a rule
            the width of the container — the headline is the only thing in this
            viewport asking to be read first. */}
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              mt: { xs: 4, md: "clamp(22px, 4vh, 48px)" },
              pt: { xs: 3, md: "clamp(16px, 2.5vh, 28px)" },
              borderTop: "1px solid",
              borderColor: color.rule,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: { xs: 3.5, md: 6 },
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="lede"
              sx={{
                color: color.inkMuted,
                maxWidth: measure.lede,
                flex: "1 1 420px",
              }}
            >
              We are an engineering and research practice working on multi-agent
              systems, retrieval and applied machine learning. We take the parts
              that are hard to demo — evaluation, tracing, reliability, cost —
              and make them the parts that ship.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3.5,
                flexWrap: "wrap",
                pt: { md: 0.5 },
              }}
            >
              <LinkBox
                href="/case-studies"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 3.5,
                  py: 1.8,
                  borderRadius: radius.pill,
                  backgroundColor: color.deep,
                  color: color.onDeep,
                  textDecoration: "none",
                  transition: `background-color ${motion.fast}`,
                  "&:hover": { backgroundColor: color.ink },
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontSize: "0.9375rem", fontWeight: 500 }}
                >
                  See our work
                </Typography>
              </LinkBox>

              <ActionLink href="/research">Read the research</ActionLink>
            </Box>
          </Box>
        </Container>

        {/* Baseline strip. Gives the viewport a bottom edge, and says what the
            practice is working on this month rather than what it believes. It
            runs because a list this long has no honest static width — and a
            hero whose last row is quietly moving is a hero that is not a
            screenshot. */}
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              mt: { xs: 4, md: "clamp(20px, 3.5vh, 44px)" },
              pt: 2,
              borderTop: "1px solid",
              borderColor: color.rule,
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 3 },
            }}
          >
            <Typography
              variant="eyebrow"
              sx={{ color: color.inkFaint, flexShrink: 0 }}
            >
              In the lab
            </Typography>

            <Marquee sx={{ flex: 1 }}>
              {IN_THE_LAB.map((item) => (
                <Box
                  key={item}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      width: 5,
                      height: 5,
                      flexShrink: 0,
                      borderRadius: radius.pill,
                      backgroundColor: color.limeDeep,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: color.inkMuted, whiteSpace: "nowrap" }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Marquee>

            <Box
              aria-hidden
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1.25,
                flexShrink: 0,
                color: color.inkFaint,
                "@keyframes heroCue": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(4px)" },
                },
              }}
            >
              <Typography variant="caption" sx={{ color: "inherit" }}>
                Scroll
              </Typography>
              <Box
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1,
                  animation: "heroCue 2.4s ease-in-out infinite",
                }}
              >
                &#8595;
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </DefocusOnScroll>
  );
}

export default HeroSection;
