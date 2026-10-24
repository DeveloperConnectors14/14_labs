"use client";

import Link from "next/link";
import { Box, Card, Divider, Typography } from "@mui/material";
import { CARD_RADIUS } from "@/theme/tokens";

// Teal-to-navy tint shown on hover; text switches to light colours on top of it.
const HOVER_GRADIENT = "linear-gradient(90deg, #016b64, #054c64, #063864, #02185a)";

// Numbered card used by "Our services" and the case-study challenges. All
// content is visible at rest (nothing hidden behind hover); hover only adds
// the gradient. Pass `href` to make the whole card a link.
function NumberedCard({ number, title, desc, href, children }) {
  return (
    <Card
      {...(href && { component: Link, href })}
      sx={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 2.5, md: 3 },
        border: 1,
        borderColor: "divider",
        borderRadius: CARD_RADIUS,
        textDecoration: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: HOVER_GRADIENT,
          opacity: 0,
          transition: "opacity 0.4s ease",
        },
        "& > *": { position: "relative" },
        "& .cardNo, & .cardTitle, & .cardDesc": { transition: "color 0.4s ease" },
        "&:hover::before": { opacity: 1 },
        "&:hover .cardNo, &:hover .cardDesc": { color: "primary.contrastText" },
        "&:hover .cardTitle": { color: "secondary.contrastText" },
        "&:focus-visible": { outline: 2, outlineColor: "secondary.main", outlineOffset: 2 },
      }}
    >
      <Box>
        <Typography className="cardNo" variant="caption" color="text.grey" sx={{ display: "block", pb: 0.5 }}>
          {number}
        </Typography>
        <Divider />
      </Box>
      {title && (
        <Typography className="cardTitle" variant="h3" sx={{ color: "text.black" }}>
          {title}
        </Typography>
      )}
      {desc && (
        <Typography
          className={title ? "cardDesc" : "cardTitle"}
          variant={title ? "body2" : "h3"}
          sx={{ color: title ? "text.grey" : "text.black", flexGrow: 1 }}
        >
          {desc}
        </Typography>
      )}
      {children}
    </Card>
  );
}

export default NumberedCard;
