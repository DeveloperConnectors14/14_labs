import { Box, Chip, Typography } from "@mui/material";
import { SectionTitle, DetailsList, DashList } from "@/components/general/ArticleParts";
import { SECTION_PX, SECTION_PY, TILE_RADIUS } from "@/theme/tokens";

const calloutSx = {
  mt: 3,
  p: { xs: 2, md: 3 },
  borderRadius: TILE_RADIUS,
  background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
};

// A case study in the same reading-column layout as the research paper pages.
// Every section is built from the case study's existing data in `caseDetails`.
function CaseArticle({ data }) {
  const { hero, challenges, cost, approach, key_features: features, techStack, results } = data;
  const tech = techStack?.stacks.flatMap((stack) => stack.values.map((v) => v.name)) ?? [];

  return (
    <Box component="article" sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {/* The subtitle is shown as the lead in CaseHeader, so the article starts here. */}
        <SectionTitle>Project</SectionTitle>
        <DetailsList rows={hero.stats.map((stat) => [stat.label, stat.value])} />

        {challenges && (
          <>
            <SectionTitle>The challenge</SectionTitle>
            {challenges.text && (
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>{challenges.text}</Typography>
            )}
            <DashList items={challenges.items} />
            {cost?.text && (
              <Box sx={calloutSx}>
                <Typography variant="body1" color="text.primary">{cost.text}</Typography>
              </Box>
            )}
          </>
        )}

        {approach && (
          <>
            <SectionTitle>Our approach</SectionTitle>
            {approach.text && (
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>{approach.text}</Typography>
            )}
            <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              {approach.steps.map((step, i) => (
                <Box component="li" key={step.title} sx={{ display: "flex", gap: 2 }}>
                  <Typography variant="caption" sx={{ color: "secondary.main", pt: 0.5, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    <Box component="strong" sx={{ fontWeight: 600 }}>{step.title}: </Box>
                    {step.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        {results?.items?.length > 0 && (
          <>
            <SectionTitle>Results</SectionTitle>
            {results.text && (
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>{results.text}</Typography>
            )}
            <DetailsList rows={results.items.map((r) => [r.value, `${r.label}: ${r.desc}`])} />
          </>
        )}

        {features?.list?.length > 0 && (
          <>
            <SectionTitle>Key features</SectionTitle>
            <DashList items={features.list} />
          </>
        )}

        {tech.length > 0 && (
          <>
            <SectionTitle>Technology</SectionTitle>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {tech.map((name) => <Chip key={name} label={name} />)}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default CaseArticle;
