import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import { getStats } from "@/services/dataService";
import { color, font, radius } from "@/theme/tokens";

const stats = getStats();

/**
 * The figures, on a ramp that darkens left to right and lands on the deep
 * green. Four identical white slabs was the correct call when the page had no
 * other colour in it; now that the band above is full-bleed green, the row
 * reads as a bridge out of it rather than as a hard reset to grey.
 *
 * Deliberately no figure behind the numerals. A distribution was drawn on the
 * last card and it lost: the whole job of a stat card is one number read at a
 * glance, and anything behind it is competing with the only thing it is for.
 */
const TONES = [
  { bg: color.surface, fg: color.ink, muted: color.inkFaint, rule: color.lime },
  { bg: color.green05, fg: color.ink, muted: color.inkFaint, rule: color.lime },
  { bg: color.green20, fg: color.ink, muted: color.inkMuted, rule: color.accent },
  { bg: color.deep, fg: color.onDeep, muted: color.onDeepMuted, rule: color.lime },
];

function ImpactSection() {
  return (
    <Section tight>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {stats.map((item, i) => {
          const t = TONES[i % TONES.length];

          return (
            <Box
              key={item.label}
              sx={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: t.bg,
                borderRadius: radius.lg,
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: { xs: 160, md: 220 },
              }}
            >
              <Typography
                className="tabular"
                sx={{
                  position: "relative",
                  fontFamily: font.display,
                  fontWeight: 300,
                  fontSize: "clamp(2.75rem, 1.6rem + 4vw, 4.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  color: t.fg,
                }}
              >
                {item.value}
              </Typography>

              <Box sx={{ position: "relative", mt: 3 }}>
                <Box
                  aria-hidden
                  sx={{ width: 32, height: "3px", backgroundColor: t.rule, mb: 2 }}
                />
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: t.fg,
                    letterSpacing: "-0.012em",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 0.75, color: t.muted }}
                >
                  {item.note}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}

export default ImpactSection;
