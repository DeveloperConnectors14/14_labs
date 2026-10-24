import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { BRAND_GRADIENT } from "@/theme/tokens";
import { keepHyphenatedWords } from "@/components/general/ArticleParts";

// Full-width header for research paper pages. Shows `image` (the paper's card
// image) when given, otherwise the brand gradient. The transparent navbar sits
// on top of it.
function GradientHero({ caption, title, image }) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        // Taller by the navbar's height, since the transparent navbar sits on top.
        minHeight: { xs: 460, sm: 470, md: 640, lg: 664 },
        display: "flex",
        alignItems: "flex-end",
        background: BRAND_GRADIENT,
      }}
    >
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      )}
      {/* Darkens the lower part (and the top, under the navbar) so text stays readable on any image. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: image
            ? "linear-gradient(to top, rgba(4,20,36,0.95) 0%, rgba(4,20,36,0.7) 45%, rgba(4,20,36,0.25) 75%, rgba(4,20,36,0.55) 100%)"
            : "linear-gradient(to top, rgba(4,20,36,0.92) 0%, rgba(4,20,36,0.75) 50%, rgba(4,20,36,0.35) 100%)",
        }}
      />
      <Box sx={{ position: "relative", px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 }, maxWidth: 1300 }}>
        {caption && (
          <Typography variant="caption" sx={{ display: "block", color: "secondary.main", textTransform: "uppercase", letterSpacing: "0.08em", mb: 2 }}>
            {caption}
          </Typography>
        )}
        <Typography variant="h1" sx={{ color: "secondary.contrastText", textWrap: "balance" }}>
          {keepHyphenatedWords(title)}
        </Typography>
      </Box>
    </Box>
  );
}

export default GradientHero;
