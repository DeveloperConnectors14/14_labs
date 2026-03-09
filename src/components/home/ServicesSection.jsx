"use client";
import { Box, Grid, Card, CardContent, Typography, Divider, Button } from "@mui/material";
import Link from "next/link";


const services = [
  {
    sNo: "01",
    title: "AI & Intelligent Systems",
    desc: "Web plateforms, internal tools, dashboards, and scalable systems tailored to your workflow."
  },
  {
    sNo: "02",
    title: "Custom Software",
    desc: "Web plateforms, internal tools, dashboards, and scalable systems tailored to your workflow."
  },
  {
    sNo: "03",
    title: "AI Integration & Automation",
    desc: "Web plateforms, internal tools, dashboards, and scalable systems tailored to your workflow."
  },
  {
    sNo: "04",
    title: "AI & Intelligent Systems",
    desc: "Web plateforms, internal tools, dashboards, and scalable systems tailored to your workflow."
  },
];

function ServicesSection() {
  return (
    <Box sx={{ px: 4, py: 6, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            Our <Box component="span" sx={{ color: "primary.main" }}>
              Services
            </Box>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            {services.map((service, i) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 6 }}
                key={i}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    flex: 1,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    backgroundImage: 'url("/media/service1.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    overflow: "hidden",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      background:
                        "linear-gradient(90deg, #016b64bb, #054c64c5, #063864cb, #02185abb)",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="secondary.contrastText"
                        sx={{ py: 0.5 }}
                      >
                        {service.sNo}
                      </Typography>
                      <Divider />
                      <Box sx={{ pt: 10 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "primary.contrastText" }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="secondary.contrastText"
                          sx={{ py: 1 }}
                        >
                          {service.desc}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      component={Link}
                      href="/"
                      variant="contained"
                      sx={{
                        borderRadius: 6,
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        backgroundColor: "primary.contrastText",
                        color: "text.primary",
                        boxShadow: "none",
                        alignSelf: "flex-start",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                          boxShadow: "none",
                        },
                      }}
                    >
                      EXPLORE
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


export default ServicesSection;