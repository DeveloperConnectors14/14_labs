import { Box, Typography } from "@mui/material";
import Eyebrow from "./Eyebrow";
import { color, measure } from "@/theme/tokens";

/**
 * Section opener: mono eyebrow, headline, optional lede.
 *
 * `split` puts the lede in a second column beside the headline instead of under
 * it. Alternating the two across a page is what stops every section from having
 * the identical heading-then-paragraph-then-grid silhouette.
 */
const TONES = {
  light: { fg: color.ink, muted: color.inkMuted },
  deep: { fg: color.onDeep, muted: color.onDeepMuted },
  // The muted step on the deep band is a green grey. On black it reads as a
  // colour cast rather than as a tone, so black gets its own neutral.
  black: { fg: color.onBlack, muted: color.onBlackMuted },
};

function SectionHead({
  eyebrow,
  title,
  lede,
  split = false,
  onDeep = false,
  tone,
  action = null,
  sx,
}) {
  const t = TONES[tone ?? (onDeep ? "deep" : "light")];
  const dark = t !== TONES.light;
  const heading = (
    <Box>
      {eyebrow ? <Eyebrow onDeep={dark} sx={{ mb: 3 }}>{eyebrow}</Eyebrow> : null}
      <Typography
        variant="h2"
        sx={{
          color: t.fg,
          maxWidth: "20ch",
          textWrap: "balance",
        }}
      >
        {title}
      </Typography>
    </Box>
  );

  const supporting = lede ? (
    <Typography
      variant="lede"
      sx={{
        color: t.muted,
        maxWidth: measure.lede,
        mt: split ? 0 : 3,
      }}
    >
      {lede}
    </Typography>
  ) : null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: split ? { xs: "1fr", md: "1fr 1fr" } : "1fr",
        // Wide gutter between the columns, but a tight row gap so an action
        // link does not float half a section away from its heading.
        columnGap: { xs: 0, md: 8 },
        rowGap: { xs: 3, md: 4 },
        alignItems: split ? "end" : "start",
        ...sx,
      }}
    >
      {heading}
      {split ? supporting : null}
      {!split && supporting ? supporting : null}
      {action ? (
        <Box sx={{ gridColumn: "1 / -1", mt: { xs: 1, md: 2 } }}>{action}</Box>
      ) : null}
    </Box>
  );
}

export default SectionHead;
