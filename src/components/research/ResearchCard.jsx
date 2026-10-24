"use client";

import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import ResearchArt from "@/components/research/ResearchArt";
import { CARD_RADIUS, BUTTON_RADIUS } from "@/theme/tokens";

// Matches the carousel's slide widths so next/image picks the right size.
const IMAGE_SIZES = "(min-width: 640px) 400px, 80vw";

const clampLines = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

function ResearchCard({ paper }) {
  const underReview = paper.status === "review";
  // Dark images get white text and a dark fade; light images keep dark text.
  const dark = paper.imgTone === "dark";
  const titleColor = dark ? "secondary.contrastText" : "text.black";
  const metaColor = dark ? "primary.contrastText" : "text.grey";

  return (
    // The whole card links to the paper's page, so it holds no nested links.
    // Like the DeepMind reference cards, the image fills the card and the
    // text and button sit on top of it.
    <Card
      component={Link}
      href={`/research/${paper.id}`}
      aria-label={`${paper.title}: learn more`}
      sx={{
        // 2:3, like the DeepMind reference cards: 400 x 600 on desktop.
        aspectRatio: "2 / 3",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: 1,
        // A hairline keeps dark cards distinct on the dark homepage section; the
        // navy background stops the theme's white card colour showing through it.
        borderColor: dark ? "rgba(255,255,255,0.08)" : "divider",
        backgroundColor: dark ? "#06142A" : "background.paper",
        borderRadius: CARD_RADIUS,
        textDecoration: "none",
        transition: "border-color 0.3s",
        "&:focus-visible": { outline: 2, outlineColor: "secondary.main", outlineOffset: 2 },
        "& .cardImage": { transition: "transform 0.6s ease" },
        "&:hover": {
          borderColor: "transparent",
          "& .cardImage": { transform: "scale(1.04)" },
          // Dark images only get a light tint, so the image stays visible on hover.
          "& .cardTint": { opacity: dark ? 0.35 : 1 },
          "& .paperTitle": { color: "secondary.contrastText" },
          "& .paperMeta": { color: "primary.contrastText" },
        },
      }}
    >
      <Box className="cardImage" sx={{ position: "absolute", inset: 0 }}>
        {paper.img ? (
          <Image src={`/media/${paper.img}`} alt="" fill sizes={IMAGE_SIZES} style={{ objectFit: "cover" }} />
        ) : (
          <ResearchArt topic={paper.topic} />
        )}
      </Box>

      {/* Fade behind the text so it stays readable on any image. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: dark
            ? "linear-gradient(to bottom, rgba(6,20,42,0.85) 0%, rgba(6,20,42,0.5) 28%, rgba(6,20,42,0) 50%)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.75) 28%, rgba(255,255,255,0) 50%)",
        }}
      />
      {/* The site's teal-to-navy hover tint, laid over the image. */}
      <Box
        className="cardTint"
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.3s",
          background: "linear-gradient(90deg, #016b64e6, #054c64e6, #063864e6, #02185ae6)",
        }}
      />

      <Box sx={{ position: "relative", p: 3 }}>
        {/* Keeps unpublished work from being mistaken for published papers. */}
        {underReview && (
          <Typography className="paperMeta" variant="caption" color={metaColor} sx={{ display: "block", textTransform: "uppercase", mb: 1, transition: "color 0.3s" }}>
            Under review
          </Typography>
        )}
        <Typography
          className="paperTitle"
          variant="h3"
          component="h3"
          color={titleColor}
          title={paper.title}
          // One line like DeepMind's titles; phones allow a second for the longest ones.
          sx={{ fontSize: { xs: "19px", md: "22px" }, transition: "color 0.3s", ...clampLines(1), WebkitLineClamp: { xs: 2, sm: 1 } }}
        >
          {paper.shortTitle}
        </Typography>
        <Typography className="paperMeta" variant="body2" color={metaColor} sx={{ pt: 1, transition: "color 0.3s", ...clampLines(2) }}>
          {paper.blurb}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", p: 3 }}>
        {/* A small pill in the site's button style; the card itself is the link. */}
        <Box
          component="span"
          sx={(theme) => ({
            // The theme's button font, but not its responsive (larger) sizes.
            fontFamily: theme.typography.button.fontFamily,
            fontWeight: theme.typography.button.fontWeight,
            textTransform: theme.typography.button.textTransform,
            fontSize: "14px",
            lineHeight: 1.2,
            display: "inline-flex",
            alignItems: "center",
            borderRadius: BUTTON_RADIUS,
            p: "8px 16px",
            backgroundColor: "secondary.main",
            color: "brand.navy",
          })}
        >
          Learn more
        </Box>
      </Box>
    </Card>
  );
}

export default ResearchCard;
