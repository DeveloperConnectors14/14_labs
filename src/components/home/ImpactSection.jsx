import { Box, Grid, Typography } from "@mui/material";

const stats = [
  { value: "14+", label: "Projects delivered" },
  { value: "10+", label: "Happy clients" },
  { value: "4+", label: "Years experience" },
];

function ImpactSection() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary" }}>
            Our <Box component="span" sx={{ color: "text.secondary" }}>
              impact
            </Box>
          </Typography>
          <Typography sx={{ py: 2 }} color="text.primary">
            From multi-agent systems to custom LLM integration, we specialize in building AI infrastructures that scales.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={3}>
            {stats.map((item, i) => (
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
                    "&:hover": {
                      boxShadow: 4,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="h1" sx={{ pb: 6, fontWeight: 700, color: "text.primary" }} gutterBottom>
                      {item.value}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "text.black" }}>
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