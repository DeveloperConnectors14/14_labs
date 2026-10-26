import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { BRAND_GRADIENT } from "@/theme/tokens";
import { keepHyphenatedWords } from "@/components/general/ArticleParts";

// Full-width header for research paper pages. Shows `image` (the paper's own
// header photo) when given, otherwise the brand gradient. `imagePosition` picks
// which part of the photo stays in view when it's cropped (CSS object-position).
// The transparent navbar sits on top of it.
function GradientHero({ caption, title, image, imagePosition = "center" }) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        // Taller by the navbar's height, since the transparent navbar sits on top.
        minHeight: { xs: 444, md: 632 },
        display: "flex",
        alignItems: "flex-end",
        background: BRAND_GRADIENT,
      }}
    >
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: imagePosition }} />
      )}
      {/* Darkens the lower part (and the top, under the navbar) so text stays readable on any image. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: image
            ? {
                // On phones the title fills most of the header, so the fade is stronger.
                xs: "linear-gradient(to top, rgba(4,20,36,0.95) 0%, rgba(4,20,36,0.82) 55%, rgba(4,20,36,0.5) 80%, rgba(4,20,36,0.6) 100%)",
                md: "linear-gradient(to top, rgba(4,20,36,0.95) 0%, rgba(4,20,36,0.7) 45%, rgba(4,20,36,0.25) 75%, rgba(4,20,36,0.55) 100%)",
              }
            : "linear-gradient(to top, rgba(4,20,36,0.92) 0%, rgba(4,20,36,0.75) 50%, rgba(4,20,36,0.35) 100%)",
        }}
      />
      <Box sx={{ position: "relative", px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 }, maxWidth: 1300 }}>
        {caption && (
          <Typography variant="caption" sx={{ display: "block", color: "secondary.main", textTransform: "uppercase", letterSpacing: "0.08em", mb: 2, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
            {caption}
          </Typography>
        )}
        <Typography variant="h1" sx={{ color: "secondary.contrastText", textWrap: "balance", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
          {keepHyphenatedWords(title)}
        </Typography>
      </Box>
    </Box>
  );
}

export default GradientHero;
