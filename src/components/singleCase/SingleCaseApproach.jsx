import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { color, font, motion, radius } from "@/theme/tokens";

/**
 * The method, as ordered steps on one rail.
 *
 * The steps are laid out along a single horizontal rule with a marker on it,
 * because the one thing a reader needs to take from this section is that the
 * stages happen in an order and each one hands something to the next. Four
 * unconnected cards say the opposite.
 */
function SingleCaseApproach({ approaches }) {
  if (!approaches?.steps?.length) return null;

  return (
    <Section>
      <SectionHead
        split
        eyebrow={approaches.label}
        title={approaches.title}
        lede={approaches.text}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 9 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: `repeat(${Math.min(approaches.steps.length, 4)}, 1fr)`,
          },
          gap: { xs: 4, md: 3 },
        }}
      >
        {approaches.steps.map((step, i) => (
          <Box
            key={step.step ?? i}
            sx={{
              position: "relative",
              pt: 4,
              "&:hover .step-dot": {
                backgroundColor: color.accent,
                transform: "scale(1.35)",
              },
            }}
          >
            {/* The rail, drawn per step so it never has to know how many
                columns the grid collapsed to. */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: color.ruleStrong,
              }}
            />
            <Box
              className="step-dot"
              aria-hidden
              sx={{
                position: "absolute",
                top: "-4px",
                left: 0,
                width: 9,
                height: 9,
                borderRadius: radius.pill,
                backgroundColor: color.grey45,
                transformOrigin: "center",
                transition: `background-color ${motion.base}, transform ${motion.base}`,
              }}
            />

            <Typography variant="eyebrow" sx={{ color: color.accent }}>
              {step.step ?? `Step ${i + 1}`}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                fontFamily: font.display,
                fontWeight: 400,
                fontSize: "1.25rem",
                lineHeight: 1.25,
                letterSpacing: "-0.025em",
                color: color.ink,
              }}
            >
              {step.title}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1.5, color: color.inkMuted }}>
              {step.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default SingleCaseApproach;
