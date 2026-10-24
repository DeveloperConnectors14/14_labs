import Image from "next/image";
import { Box, Typography } from "@mui/material";
import ShareButton from "@/components/general/ShareButton";
import ScrollToButton from "@/components/general/ScrollToButton";
import { keepHyphenatedWords } from "@/components/general/ArticleParts";
import { SECTION_PX, CARD_RADIUS } from "@/theme/tokens";

// Centred article header (layout from a DeepMind blog post, in the site's own
// style): meta line, title, buttons, a large rounded cover, then the lead.
function CaseHeader({ data }) {
  const industry = data.hero.stats.find((s) => s.label === "Industry")?.value;
  const meta = ["Case study", industry].filter(Boolean).join(" · ");

  return (
    <Box component="header" sx={{ px: SECTION_PX, pt: { xs: 6, md: 10 } }}>
      <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", color: "text.grey", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {meta}
        </Typography>
        <Typography variant="h1" sx={{ color: "text.primary", mt: 2, textWrap: "balance" }}>
          {keepHyphenatedWords(data.hero.title)}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: { xs: 3, md: 4 } }}>
          {data.pipeline && <ScrollToButton targetId="architecture">See the architecture</ScrollToButton>}
          <ShareButton title={data.hero.title} />
        </Box>
      </Box>

      {/* Cover: the case study's `cover` image, or a soft placeholder until one is added. */}
      <Box
        sx={{
          position: "relative",
          maxWidth: 1520,
          mx: "auto",
          mt: { xs: 5, md: 7 },
          aspectRatio: { xs: "4 / 3", md: "21 / 9" },
          borderRadius: CARD_RADIUS,
          overflow: "hidden",
          background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
        }}
      >
        {data.cover && (
          <Image src={`/media/${data.cover}`} alt="" fill priority sizes="(min-width: 1600px) 1520px, 100vw" style={{ objectFit: "cover" }} />
        )}
      </Box>

      <Typography
        variant="h3"
        component="p"
        sx={{ maxWidth: 760, mx: "auto", mt: { xs: 5, md: 7 }, textAlign: "center", color: "text.primary", fontWeight: 500, textWrap: "balance" }}
      >
        {data.hero.subtitle}
      </Typography>
    </Box>
  );
}

export default CaseHeader;
