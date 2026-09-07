import { Box, Typography } from "@mui/material";
import { color } from "@/theme/tokens";

/**
 * The small mono label above a heading, with a short leading rule. Does the job
 * the old design used a two-tone heading for: marking a new section without
 * recolouring half the headline.
 */
function Eyebrow({ children, onDeep = false, rule = true, sx }) {
  const fg = onDeep ? color.lime : color.accent;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ...sx }}>
      {rule ? (
        <Box
          aria-hidden
          sx={{ width: 28, height: "2px", flexShrink: 0, backgroundColor: fg }}
        />
      ) : null}
      <Typography variant="eyebrow" component="span" sx={{ color: fg }}>
        {children}
      </Typography>
    </Box>
  );
}

export default Eyebrow;
