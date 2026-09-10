import { Box, Typography } from "@mui/material";
import { color, font, motion, radius } from "@/theme/tokens";

/**
 * A row of figures, on a warm ramp that deepens left to right and lands on
 * forest — the same device the home page uses for its numbers, kept in one
 * place so a case study can never invent a second style of stat card.
 *
 * The ramp is walked, not repeated: with three slabs the row still ends on the
 * forest step, so a row of three and a row of four read as the same object.
 */
const RAMP = [
  { bg: color.surface, fg: color.ink, muted: color.inkFaint, rule: color.limeDeep },
  { bg: color.sand10, fg: color.ink, muted: color.inkFaint, rule: color.limeDeep },
  { bg: color.warm, fg: color.ink, muted: color.inkMuted, rule: color.warmMark },
  { bg: color.deep, fg: color.onDeep, muted: color.onDeepMuted, rule: color.lime },
];

function StatSlabs({ items, columns }) {
  if (!items?.length) return null;

  const cols = columns ?? Math.min(items.length, 4);
  const step = Math.max(1, Math.floor(RAMP.length / items.length));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: `repeat(${cols}, 1fr)`,
        },
        gap: { xs: 1.5, md: 2 },
      }}
    >
      {items.map((item, i) => {
        const tone =
          RAMP[Math.min(RAMP.length - 1, i === items.length - 1 ? RAMP.length - 1 : i * step)];

        return (
          <Box
            key={item.label ?? i}
            sx={{
              backgroundColor: tone.bg,
              borderRadius: radius.lg,
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: 170, md: 230 },
              transition: `transform ${motion.base}`,
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Typography
              className="tabular"
              sx={{
                fontFamily: font.display,
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                color: tone.fg,
              }}
            >
              {item.value}
            </Typography>

            <Box>
              <Box
                aria-hidden
                sx={{
                  width: 24,
                  height: "2px",
                  mb: 2,
                  backgroundColor: tone.rule,
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.0625rem",
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  color: tone.fg,
                }}
              >
                {item.label}
              </Typography>
              {/* Home-page stats call it `note`, case studies call it `desc`.
                  One component, both vocabularies. */}
              {item.desc ?? item.note ? (
                <Typography variant="body2" sx={{ mt: 1, color: tone.muted }}>
                  {item.desc ?? item.note}
                </Typography>
              ) : null}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default StatSlabs;
