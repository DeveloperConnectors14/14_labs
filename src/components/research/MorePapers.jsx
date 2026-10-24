import { Box, Typography } from "@mui/material";
import ResearchCarousel from "@/components/research/ResearchCarousel";
import ResearchCard from "@/components/research/ResearchCard";
import { SECTION_PX, SECTION_PY } from "@/theme/tokens";

function MorePapers({ papers }) {
  return (
    <Box component="section" sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Typography variant="h2" sx={{ color: "text.primary", mb: 2 }}>
        More <Box component="span" sx={{ color: "text.secondary" }}>research</Box>
      </Typography>
      <ResearchCarousel label="More research publications">
        {papers.map((paper) => (
          <ResearchCard key={paper.id} paper={paper} />
        ))}
      </ResearchCarousel>
    </Box>
  );
}

export default MorePapers;
