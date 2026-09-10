import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { color, font, measure } from "@/theme/tokens";
import { titleCase } from "@/services/titleCase";

/**
 * What was wrong before the work started, as a numbered ledger.
 *
 * Numbered rather than bulleted, and ruled rather than boxed: these are the
 * findings of a review, and the reader should be able to count them. Some cases
 * give each item a title and some only a sentence, so the row handles both
 * without leaving a hole where a title would have been.
 */
function SingleCaseChallanges({ challanges }) {
  if (!challanges?.items?.length) return null;

  return (
    <Section band="alt">
      <SectionHead
        split
        eyebrow={challanges.label}
        title={challanges.title}
        lede={challanges.text}
      />

      <Box sx={{ mt: { xs: 5, md: 8 } }}>
        {challanges.items.map((item) => (
          <Box
            key={item.sNo}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "auto 1fr 1.2fr" },
              columnGap: { md: 5 },
              rowGap: { xs: 1.5, md: 0 },
              alignItems: "start",
              paddingBlock: { xs: 3.5, md: 4.5 },
              borderTop: "1px solid",
              borderColor: color.ruleStrong,
              "&:last-of-type": {
                borderBottom: "1px solid",
                borderColor: color.ruleStrong,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: font.display,
                fontWeight: 300,
                fontSize: "1.75rem",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: color.grey45,
                minWidth: "2.5ch",
              }}
            >
              {item.sNo}
            </Typography>

            {item.title ? (
              <Typography variant="h3" sx={{ color: color.ink, maxWidth: "20ch" }}>
                {titleCase(item.title)}
              </Typography>
            ) : (
              <Box aria-hidden />
            )}

            <Typography
              variant="body1"
              sx={{
                color: color.inkMuted,
                maxWidth: measure.body,
                // With no title the sentence is the row, so it steps up to fill
                // the column the title would have used.
                gridColumn: { md: item.title ? "auto" : "2 / -1" },
              }}
            >
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default SingleCaseChallanges;
