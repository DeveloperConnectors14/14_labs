import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import LinkBox from "@/components/ui/LinkBox";
import { getCaseDetails, getcaseStudies } from "@/services/dataService";
import { color, motion, radius } from "@/theme/tokens";

const studies = getcaseStudies();
const details = getCaseDetails();

/** Pulls the standfirst, the industry and the node count out of the full case
 *  record, so the card carries real information rather than just a title. */
function summarise(id) {
  const record = details.find((entry) => entry.caseId === id);
  if (!record) return {};
  const stats = record.hero?.stats ?? [];
  const industry = stats.find((s) => s.label === "Industry")?.value;
  const nodes = stats.find((s) => s.label === "Pipeline Nodes")?.value;
  return { subtitle: record.hero?.subtitle, industry, nodes };
}

function CaseStudies({ heading = true }) {
  return (
    <Section id="work">
      {heading ? (
        <SectionHead
          split
          eyebrow="Selected work"
          title="Systems running in production"
          lede="Each of these started as a workflow somebody was doing by hand. The write-ups cover the architecture, what we measured and where the design had to change."
          sx={{ mb: { xs: 6, md: 10 } }}
        />
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: { xs: 6, md: 6 },
        }}
      >
        {studies.map((item) => {
          const { subtitle, industry, nodes } = summarise(item.id);

          return (
            <LinkBox
              key={item.id}
              href={`/case-studies/${item.id}`}
              sx={{
                textDecoration: "none",
                display: "block",
                "&:hover .case-image": { transform: "scale(1.04)" },
                "&:hover .case-title": { color: color.accent },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderRadius: radius.lg,
                  // Green rather than grey, so the plate reads as part of the
                  // palette while the screenshot is still decoding.
                  backgroundColor: color.green20,
                }}
              >
                <Image
                  className="case-image"
                  src={`/media/${item.img}`}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    transition: `transform ${motion.slow}`,
                  }}
                />
              </Box>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {industry ? (
                  <Typography variant="caption" sx={{ color: color.accent }}>
                    {industry}
                  </Typography>
                ) : null}
                {/* The date these cards used to show was the same placeholder
                    on every record — `1st January 2024`. On a page selling
                    measurement, a fabricated date is the one thing you cannot
                    leave lying around, so the slot carries something the data
                    actually knows instead. */}
                {nodes ? (
                  <Typography variant="caption" sx={{ color: color.inkFaint }}>
                    {nodes} pipeline nodes
                  </Typography>
                ) : null}
              </Box>

              <Typography
                className="case-title"
                variant="h3"
                sx={{ mt: 1.5, color: color.ink, transition: `color ${motion.fast}` }}
              >
                {item.title}
              </Typography>

              {subtitle ? (
                <Typography
                  variant="body1"
                  sx={{ mt: 1.5, color: color.inkMuted, maxWidth: "52ch" }}
                >
                  {subtitle}
                </Typography>
              ) : null}
            </LinkBox>
          );
        })}
      </Box>
    </Section>
  );
}

export default CaseStudies;
