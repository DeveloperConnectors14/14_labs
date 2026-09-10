import { Box, Container, Typography } from "@mui/material";
import { getStats } from "@/services/dataService";
import { color, layout } from "@/theme/tokens";

const stats = getStats();

/**
 * Four figures on one rule. No cards, no colour, no icons: a number, what it
 * counts, and the qualifier that keeps it honest.
 */
function Numbers() {
  return (
    <Box component="section" sx={{ paddingBlock: layout.gapY }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            columnGap: { xs: 3, md: 5 },
            rowGap: 5,
            borderTop: "1px solid",
            borderColor: color.rule,
            pt: { xs: 4, md: 5 },
          }}
        >
          {stats.map((item) => (
            <Box key={item.label}>
              <Typography
                className="tabular"
                sx={{
                  fontSize: "clamp(2.5rem, 1.8rem + 2.4vw, 4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: color.ink,
                }}
              >
                {item.value}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: 500, color: color.ink }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: color.inkFaint }}>
                {item.note}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Numbers;
