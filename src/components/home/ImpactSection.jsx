import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
          <Typography variant="h4" fontWeight={600}>
            Our <Box component="span" sx={{ color: "primary.main" }}>
              impact
            </Box>
          </Typography>
          <Typography sx={{ py: 2 }} color="text.secondary">
            From multi-agent systems to custom LLM integration, we specialize in building AI infrastructures that scales.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={3}>
            {stats.map((item, i) => (
              < Grid size={{ xs: 12, sm: (i === 0 ? 12 : 6), md: (i === 0 ? 6 : 3) }} key={i}>
                <Card
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 4,
                    px: 2,
                    position: "relative",
                    overflow: "hidden",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h1" fontWeight={700} sx={{ pb: 6 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="black" >
                      {item.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
}

export default ImpactSection;