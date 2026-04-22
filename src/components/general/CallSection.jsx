"use client";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";
import { SECTION_PX, SECTION_PY, BUTTON_RADIUS } from "@/theme/tokens";

function CallSection({ contact }) {
  return (
    <Box
      sx={{
        color: "white",
        px: SECTION_PX,
        py: SECTION_PY,
      }}
    >
      <Box sx={{ background: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)", borderRadius: 4, py: { xs: 6, md: 8 }, px: { xs: 2, md: 5 } }}>
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {(contact ? (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                  <Typography variant="h2" sx={{ color: "secondary.contrastText" }} >
                    Ready to Build Your AI Solution?
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 2 }} color="primary.contrastText">
                    We design and build multi-agent AI systems tailored to your unique business needs. From architecture to deployment, we handle it all.
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, mt: 2 }}>
                    <Button
                      component={Link}
                      href="/contact"
                      variant="contained"
                      sx={{
                        borderRadius: BUTTON_RADIUS,
                        px: 3,
                        py: 1.4,
                        backgroundColor: "background.paper",
                        color: "text.primary",
                        "&:hover": {
                          backgroundColor: "primary.contrastText",
                          color: "text.primary"
                        },
                      }}
                    >
                      Discuss Your Project
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2, justifyContent: { xs: "flex-start", md: "space-between" }, alignItems: { xs: "center", md: "flex-start" }, textAlign: { xs: "center", md: "left" } }}>
                  <Box>
                    <Typography variant="body2" color="primary.contrastText">
                      Email
                    </Typography>
                    <Typography variant="h3" color="secondary.contrastText">
                      contact@14labs.co
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="primary.contrastText">
                      Phone
                    </Typography>
                    <Typography variant="h3" color="secondary.contrastText">
                      +92 318 7806914
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h2" sx={{ color: "secondary.contrastText" }} >
                Have an idea or challenge in mind?
              </Typography>
              <Typography variant="body1" color="primary.contrastText" sx={{ py: 1 }}>
                Let's talk about how AI and custom software can help your business move faster and smarter.
              </Typography>
              <Button
                component={Link}
                href="contact"
                variant="contained"
                sx={{
                  borderRadius: BUTTON_RADIUS,
                  p: "9px 18px",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: "primary.contrastText",
                    color: "text.primary",
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          )
          )}

        </Container>
      </Box >
    </Box >
  );
}


export default CallSection;