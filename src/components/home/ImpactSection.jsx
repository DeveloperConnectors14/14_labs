import { getStats } from "@/services/dataService";
import { Box, Grid, Typography } from "@mui/material";

const stats = getStats();

function ImpactSection() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "semiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
            Our <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
              impact
            </Box>
          </Typography>
          <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
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
                    borderRadius: 4,
                    border: 1,
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    transition: "0.3s",
                  }}
                >
                  <Box>
                    <Typography sx={{ pb: 6, fontWeight: 700, fontSize: { xs: "60px", sm: "80px", md: "120px" }, fontStyle: "Bold", fontWeight: 700, color: "text.primary", fontFamily: "'Instrument Sans', sans-serif", }} gutterBottom>
                      {item.value}
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: { xs: "24px", sm: "26px", md: "28px" }, fontStyle: "Medium", color: "text.black", fontFamily: "Inter, sans-serif" }}>
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