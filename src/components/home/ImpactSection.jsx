import { getStats } from "@/services/dataService";
import { Box, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

const stats = getStats();

function ImpactSection() {
  return (
    <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Our <Box component="span" sx={{ color: "text.secondary" }}>
              impact
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            From multi-agent systems to custom LLM integrations, we specialize in building AI infrastructure that scales. We believe in genuine support, seamless team alignment, and delivering outcomes that matter.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={3}>
            {stats.slice(0, 3).map((item, i) => (
              < Grid size={{ xs: 12, sm: (i === 0 ? 12 : 6), md: (i === 0 ? 6 : 3) }} key={i}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2.5,
                    p: 2,
                    borderRadius: CARD_RADIUS,
                    border: 1,
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    transition: "0.3s",
                  }}
                >
                  <Box>
                    <Typography sx={{ lineHeight: 1, mb: 3, fontWeight: 700, fontSize: { xs: "48px", sm: "72px", md: "104px" }, color: "text.primary", fontFamily: "'Instrument Sans', sans-serif" }}>
                      {item.value}
                    </Typography>
                    <Typography variant="h3" sx={{ color: "text.black" }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
}

export default ImpactSection;