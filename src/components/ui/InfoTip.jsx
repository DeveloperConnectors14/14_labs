"use client";

import { Box, Tooltip } from "@mui/material";
import { color } from "@/theme/tokens";

// Each line of the tip rises in after the tip itself has grown from its
// anchor, so opening one reads as a small unfolding rather than a pop.
const rise = (delay) => ({
  "@keyframes tipRise": {
    from: { opacity: 0, transform: "translateY(5px)" },
    to: { opacity: 1, transform: "none" },
  },
  animation: `tipRise 460ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
});

/**
 * A small explanatory card with an arrow, shown on hover and keyboard focus
 * (and on a short press on touch screens).
 *
 * Built on MUI's Tooltip, so placement, flipping at the viewport edge and the
 * accessibility wiring (aria-describedby, Escape to dismiss) come for free. It
 * is set in the inverse of the page — ink on light, light on dark — with a teal
 * dot, a title and one sentence. Tips never hold links; the thing they are
 * attached to is the link.
 */
function InfoTip({ title, body, placement = "top", children }) {
  return (
    <Tooltip
      arrow
      placement={placement}
      enterDelay={90}
      enterNextDelay={60}
      leaveDelay={60}
      enterTouchDelay={250}
      title={
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "-0.005em",
              ...rise(60),
            }}
          >
            <Box
              component="span"
              aria-hidden
              sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color.lime, flexShrink: 0 }}
            />
            {title}
          </Box>
          {body ? (
            <Box sx={{ mt: 0.75, fontSize: "0.8125rem", lineHeight: 1.5, opacity: 0.84, ...rise(130) }}>
              {body}
            </Box>
          ) : null}
        </Box>
      }
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: color.ink,
            color: color.ground,
            borderRadius: "14px",
            px: 1.75,
            py: 1.25,
            maxWidth: 290,
            fontFamily: "inherit",
            boxShadow: "0 18px 40px -14px rgba(0, 0, 0, 0.45)",
          },
        },
        arrow: { sx: { color: color.ink } },
        popper: { modifiers: [{ name: "offset", options: { offset: [0, 6] } }] },
      }}
    >
      {children}
    </Tooltip>
  );
}

export default InfoTip;
