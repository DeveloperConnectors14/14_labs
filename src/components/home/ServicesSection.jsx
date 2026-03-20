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
    <Box sx={{ px: 4, py: 5, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h4" fontWeight={600} sx={{ color: "text.primary" }}>
            Our <Box component="span" sx={{ color: "text.secondary" }}>
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
                      border: "none",
                      boxShadow: 6,
                      transform: "translateY(-6px)",
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
                        color="primary.contrastText"
                        sx={{ py: 0.5 }}
                      >
                        {service.sNo}
                      </Typography>
                      <Divider />
                      <Box sx={{ pt: 10 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "secondary.contrastText" }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.contrastText"
                          sx={{ py: 1 }}
                        >
                          {service.desc}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      component={Link}
                      href="/services"
                      variant="contained"
                      sx={{
                        borderRadius: 7,
                        p: "9px 18px",
                        fontWeight: 600,
                        mt: 1,
                        backgroundColor: "background.paper",
                        color: "text.primary",
                        boxShadow: "none",
                        alignSelf: "flex-start",
                        "&:hover": {
                          boxShadow: "none",
                          backgroundColor: "primary.contrastText",
                          color: "text.primary",
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