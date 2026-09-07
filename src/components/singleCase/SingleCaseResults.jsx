import { Box } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import StatSlabs from "@/components/ui/StatSlabs";

/** What the system was worth once it ran, on the same stat treatment the
 *  architecture figures use — so the two rows read as the same kind of claim
 *  measured at two points in the project. */
function SingleCaseResults({ results }) {
  if (!results?.items?.length) return null;

  return (
    <Section>
      <SectionHead
        split
        eyebrow={results.label}
        title={results.title}
        lede={results.text}
      />

      <Box sx={{ mt: { xs: 5, md: 8 } }}>
        <StatSlabs items={results.items} />
      </Box>
    </Section>
  );
}

export default SingleCaseResults;
