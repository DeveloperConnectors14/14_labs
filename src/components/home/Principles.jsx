import { Box, Container, Typography } from "@mui/material";
import RevealText from "@/components/ui/RevealText";
import { getFeatures } from "@/services/dataService";
import { color, layout, measure } from "@/theme/tokens";

const features = getFeatures();

/**
 * How we work: a heading on the left, three commitments on the right, each on
 * its own rule. They are not a sequence, so they are not numbered.
 */
function Principles() {
  return (
    <Box component="section" sx={{ paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.4fr)" },
            gap: { xs: 5, md: 10 },
          }}
        >
          <Box>
            <RevealText text="Three commitments" muted="you can hold us to." sx={{ maxWidth: "13ch" }} />
            <Typography variant="lede" sx={{ mt: 3, color: color.inkMuted, maxWidth: "40ch" }}>
              Stated concretely enough that you could check them against us at the end
              of an engagement.
            </Typography>
          </Box>

          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {features.map((item) => (
              <Box
                component="li"
                key={item.sNo}
                sx={{
                  py: { xs: 3.5, md: 4.5 },
                  borderTop: "1px solid",
                  borderColor: color.rule,
                  "&:last-of-type": { borderBottom: "1px solid", borderColor: color.rule },
                }}
              >
                <Typography variant="h3" component="h3">
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.5, color: color.inkMuted, maxWidth: measure.body }}>
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Principles;
