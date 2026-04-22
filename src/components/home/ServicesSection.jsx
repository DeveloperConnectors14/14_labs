"use client";
import { getServices } from "@/services/dataService";
import { Box, Grid, Card, CardContent, Typography, Divider, Button } from "@mui/material";
import Link from "next/link";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, BUTTON_RADIUS } from "@/theme/tokens";


const services = getServices();

function ServicesSection() {
  return (
    <Box sx={{ px: SECTION_PX, py: SECTION_PY, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Our <Box component="span" sx={{ color: "text.secondary" }}>
              Services
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            We keep our word, align seamlessly with your teams, and deliver outcomes that matter. Integrating the now. Inventing the next.
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
                    borderRadius: CARD_RADIUS,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    minHeight: { xs: 270, sm: 300, md: 340 },
                    transition: "all 0.4s ease",
                    "&:hover": {
                      backgroundImage: 'url("/media/service1.png")',
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      "& .cardContent::before": {
                        opacity: 1,
                      },
                      "& .sNo": {
                        color: "primary.contrastText",
                      },
                      "& .hidden": {
                        display: "block",
                        transform: "translateY(0)",
                        opacity: 1,
                      }, "&:hover .hidden": {
                        position: "relative",
                        opacity: 1,
                        transform: "translateY(0)",
                        visibility: "visible",
                      },
                      "& .heading": {
                        color: "secondary.contrastText",
                      }
                    },
                    "@media (max-width: 1023.95px)": {
                      backgroundImage: 'url("/media/service1.png")',
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      "& .cardContent::before": {
                        opacity: 1,
                      },
                      "& .sNo": {
                        color: "primary.contrastText",
                      },
                      "& .hidden": {
                        position: "relative",
                        display: "block",
                        transform: "translateY(0)",
                        opacity: 1,
                        visibility: "visible",
                      },
                      "& .heading": {
                        color: "secondary.contrastText",
                      },
                    },

                  }}
                >
                  <CardContent
                    className="cardContent"
                    sx={{
                      position: "relative",
                      flexGrow: 1,
                      zIndex: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "background 0.4s ease",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, #016b64bb, #054c64c5, #063864cb, #02185abb)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                      }
                    }}
                  >
                    <Box sx={{
                      flexGrow: 1,
                      zIndex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "background 0.4s ease",
                    }}>
                      <Box>
                        <Typography
                          className="sNo"
                          variant="caption"
                          color="text.grey"
                          sx={{ py: 0.5, display: "block" }}
                        >
                          {service.sNo}
                        </Typography>
                        <Divider />
                      </Box>
                      <Box className="detailBox" >
                        <Typography
                          className="heading"
                          variant="h3"
                          sx={{ color: "text.black" }}
                        >
                          {service.title}
                        </Typography>
                        <Box className="hidden" sx={{
                          position: "absolute",
                          opacity: 0,
                          transform: "translateY(50px)",
                          visibility: "hidden",
                          transition: "all 0.4s ease",
                        }} >
                          <Typography
                            variant="body2"
                            color="primary.contrastText"
                            sx={{ py: 1 }}
                          >
                            {service.desc}
                          </Typography>
                          <Button
                            component={Link}
                            href="/services"
                            variant="contained"
                            sx={{
                              borderRadius: BUTTON_RADIUS,
                              p: "9px 18px",
                              mt: 2,
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
                        </Box>
                      </Box>
                    </Box>
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