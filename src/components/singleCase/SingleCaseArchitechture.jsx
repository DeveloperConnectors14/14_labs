import { Box } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import StatSlabs from "@/components/ui/StatSlabs";

/**
 * The three numbers that describe the shape of the build — nodes, ceiling,
 * quality bar — on the site's one stat treatment.
 */
function SingleCaseArchitechture({ architectureData }) {
  if (!architectureData?.length) return null;

  return (
    <Section tight>
      <SectionHead
        eyebrow="Architecture at a glance"
        title="What the system is made of"
      />

      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <StatSlabs items={architectureData} />
      </Box>
    </Section>
  );
}

export default SingleCaseArchitechture;
