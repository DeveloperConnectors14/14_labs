import { Box, Container, Typography } from "@mui/material";
import HandArrow from "@/components/ui/HandArrow";
import ParallaxImage from "@/components/ui/ParallaxImage";
import PillLink from "@/components/ui/PillLink";
import RevealText from "@/components/ui/RevealText";
import { getCaseDetails, getcaseStudies } from "@/services/dataService";
import { color, layout, measure } from "@/theme/tokens";

const details = getCaseDetails();
const cases = getcaseStudies().map((item) => ({
  ...item,
  hero: details.find((d) => d.caseId === item.id)?.hero,
}));

/**
 * Shipped work, one project per row: what it is and what it did on one side,
 * the picture on the other, alternating so two rows never share a silhouette.
 * Each picture opens out of its frame as it arrives and drifts inside it as it
 * passes (ParallaxImage). The facts are the project's own — industry,
 * timeline, team — and nothing is rounded up into a claim.
 */
function SelectedWork() {
  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <RevealText
            text="Selected work."
            muted="What we built and how long it took."
            sx={{ maxWidth: "20ch" }}
          />
          <PillLink href="/case-studies" variant="outline">
            All case studies
          </PillLink>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 10 }, display: "grid", rowGap: { xs: 10, md: 16 } }}>
          {cases.map((item, i) => {
            const [industry, ...facts] = item.hero?.stats ?? [];
            const flip = i % 2 === 1;

            return (
              <Box
                key={item.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
                  gap: { xs: 4, md: 10 },
                  alignItems: "center",
                }}
              >
                <Box sx={{ order: { md: flip ? 2 : 1 } }}>
                  {industry ? (
                    <Typography variant="body2" sx={{ color: color.inkFaint }}>
                      {industry.value}
                    </Typography>
                  ) : null}
                  <Typography
                    component="h3"
                    sx={{
                      mt: 1.5,
                      fontSize: "clamp(1.875rem, 1.3rem + 1.8vw, 3rem)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.03em",
                      color: color.ink,
                      maxWidth: "16ch",
                    }}
                  >
                    {item.hero?.title ?? item.title}
                  </Typography>
                  {item.hero?.subtitle ? (
                    <Typography variant="lede" sx={{ mt: 2.5, color: color.inkMuted, maxWidth: measure.lede }}>
                      {item.hero.subtitle}
                    </Typography>
                  ) : null}

                  {facts.length ? (
                    <Box component="dl" sx={{ mt: 4, mb: 0, display: "flex", flexWrap: "wrap", columnGap: 5, rowGap: 2 }}>
                      {facts.map((fact) => (
                        <Box key={fact.label}>
                          <Typography component="dt" variant="body2" sx={{ color: color.inkFaint }}>
                            {fact.label}
                          </Typography>
                          <Typography component="dd" sx={{ m: 0, mt: 0.25, fontSize: "1.125rem", color: color.ink }}>
                            {fact.value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : null}

                  <Box sx={{ mt: 4.5 }}>
                    <PillLink href={`/case-studies/${item.id}`}>Read the case study</PillLink>
                  </Box>
                </Box>

                <Box sx={{ position: "relative", order: { md: flip ? 1 : 2 } }}>
                  <ParallaxImage src={`/media/${item.img}`} sizes="(max-width: 900px) 100vw, 640px" />
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      width: flip ? 26 : 34,
                      height: flip ? 26 : 34,
                      borderRadius: "50%",
                      backgroundColor: flip ? color.primary : color.lime,
                      ...(flip ? { right: -10, bottom: 28 } : { left: -14, top: 36 }),
                    }}
                  />
                  {flip ? null : (
                    <HandArrow
                      variant="loop"
                      sx={{
                        display: { xs: "none", lg: "block" },
                        position: "absolute",
                        width: 120,
                        right: 24,
                        top: -76,
                        transform: "scaleX(-1)",
                      }}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default SelectedWork;
