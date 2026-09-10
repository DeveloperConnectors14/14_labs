"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { titleCaseChild } from "@/services/titleCase";
import { color, motion } from "@/theme/tokens";

/**
 * The site's tertiary action: a text link with a rule that draws itself on
 * hover and an arrow that nudges. Its label is title-cased, like every other
 * action on the site.
 */
function ActionLink({
  href,
  children,
  onDeep = false,
  external = false,
  back = false,
  sx,
}) {
  const fg = onDeep ? color.onDeep : color.ink;
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Box
      component={Link}
      href={href}
      {...linkProps}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
        color: fg,
        position: "relative",
        paddingBottom: "3px",
        transition: `color ${motion.fast}`,
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          height: "1px",
          backgroundColor: "currentColor",
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: `transform ${motion.base}`,
        },
        "&:hover": { color: onDeep ? color.lime : color.accent },
        "&:hover::after": { transform: "scaleX(1)" },
        "&:hover .arrow": { transform: `translateX(${back ? "-3px" : "3px"})` },
        ...sx,
      }}
    >
      {/* A link that goes back points back. The arrow leads on the way out and
          follows on the way in, which is the only reason to order it. */}
      <Box
        aria-hidden
        className="arrow"
        component="span"
        sx={{
          display: "inline-block",
          order: back ? -1 : 0,
          fontSize: "0.9375rem",
          lineHeight: 1,
          transition: `transform ${motion.base}`,
        }}
      >
        {back ? "←" : "→"}
      </Box>
      <Typography
        component="span"
        sx={{ fontSize: "0.9375rem", fontWeight: 500, letterSpacing: "-0.005em" }}
      >
        {titleCaseChild(children)}
      </Typography>
    </Box>
  );
}

export default ActionLink;
