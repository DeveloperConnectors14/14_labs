import { Box } from "@mui/material";
import ResearchCarousel from "@/components/research/ResearchCarousel";
import ResearchCard from "@/components/research/ResearchCard";
import { getPublications } from "@/services/dataService";
import { SECTION_PX, SECTION_PY, NAV_SCROLL_MARGIN } from "@/theme/tokens";

const publications = getPublications();

function ResearchSection() {
  return (
    <Box
      component="section"
      id="research"
      sx={{ px: SECTION_PX, pt: { xs: 1, md: 2 }, pb: SECTION_PY, scrollMarginTop: NAV_SCROLL_MARGIN }}
    >
      <ResearchCarousel label="Research publications">
        {publications.map((paper) => (
          <ResearchCard key={paper.id} paper={paper} />
        ))}
      </ResearchCarousel>
    </Box>
  );
}

export default ResearchSection;
