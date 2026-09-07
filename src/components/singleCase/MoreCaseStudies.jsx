import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import LinkBox from "@/components/ui/LinkBox";
import ActionLink from "@/components/ui/ActionLink";
import { color, motion, radius } from "@/theme/tokens";

/**
 * The next case, as a wide plate rather than a grid of one.
 *
 * It sits after the closing band deliberately: somebody who has read to the end
 * of a case study and is not ready to write to us should be handed the other
 * one, not the footer.
 */
function MoreCaseStudies({ moreCases }) {
  if (!moreCases?.length) return null;

  return (
    <Section tight>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 3,
          flexWrap: "wrap",
          pb: { xs: 3, md: 4 },
          borderBottom: "1px solid",
          borderColor: color.ruleStrong,
        }}
      >
        <Typography variant="eyebrow" sx={{ color: color.accent }}>
          Read next
        </Typography>
        <ActionLink href="/case-studies">All work</ActionLink>
      </Box>

      <Box
        sx={{
          mt: { xs: 3, md: 4 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: { xs: 4, md: 6 },
        }}
      >
        {moreCases.map((item) => (
          <LinkBox
            key={item.id}
            href={`/case-studies/${item.id}`}
            sx={{
              textDecoration: "none",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "160px 1fr" },
              gap: { xs: 2.5, sm: 3 },
              alignItems: "center",
              "&:hover .next-image": { transform: "scale(1.05)" },
              "&:hover .next-title": { color: color.accent },
            }}
          >
            <Box
              sx={{
                position: "relative",
                aspectRatio: "16 / 11",
                overflow: "hidden",
                borderRadius: radius.md,
                backgroundColor: color.green20,
              }}
            >
              <Image
                className="next-image"
                src={`/media/${item.img}`}
                alt=""
                fill
                sizes="200px"
                style={{ objectFit: "cover", transition: `transform ${motion.slow}` }}
              />
            </Box>

            <Box>
              {/* This slot used to print `item.date`, which was the same
                  placeholder on every record. */}
              <Typography variant="caption" sx={{ color: color.inkFaint }}>
                Case study
              </Typography>
              <Typography
                className="next-title"
                variant="h3"
                sx={{ mt: 1, color: color.ink, transition: `color ${motion.fast}` }}
              >
                {item.title}
              </Typography>
            </Box>
          </LinkBox>
        ))}
      </Box>
    </Section>
  );
}

export default MoreCaseStudies;
