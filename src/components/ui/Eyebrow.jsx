import { Box, Typography } from "@mui/material";
import { color } from "@/theme/tokens";

/**
 * The small label above a heading: a green dot and a few words in sentence
 * case. The dot is the only colour in it, so it marks a new section without
 * shouting — the tracked mono capitals it replaces read as template chrome.
 */
function Eyebrow({ children, onDeep = false, rule = true, sx }) {
  const fg = onDeep ? color.onDeepMuted : color.inkMuted;
  const dot = onDeep ? color.lime : color.limeDeep;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, ...sx }}>
      {rule ? (
        <Box
          aria-hidden
          sx={{ width: 8, height: 8, flexShrink: 0, borderRadius: "50%", backgroundColor: dot }}
        />
      ) : null}
      <Typography variant="eyebrow" component="span" sx={{ color: fg }}>
        {children}
      </Typography>
    </Box>
  );
}

export default Eyebrow;
