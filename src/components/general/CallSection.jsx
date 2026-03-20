"use client";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";

function CallSection({ contact }) {
  return (
    <Box
      sx={{
        color: "white",
        px: { xs: 3, md: ((contact) ? (3) : (14)) },
        py: 3
      }}
    >
      <Box sx={{ background: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)", borderRadius: 4, py: 5, px: { xs: 2, md: 5 } }}>
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {(contact ? (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Box>
                  <Typography variant="h4" sx={{ color: "secondary.contrastText" }} >
                    Are you ready to unlock potential with customised AI solution?
                  </Typography>
                  <Button
                    component={Link}
                    href="/contact"
                    variant="contained"
                    sx={{
                      borderRadius: 6,
                      mt: 2,
                      px: 3,
                      py: 1.4,
                      fontWeight: 600,
                      backgroundColor: "background.paper",
                      color: "text.primary",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: "primary.contrastText",
                        color: "text.primary"
                      },
                    }}
                  >
                    Schedule Call
                  </Button>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ height: "100%", display: "flex", flexDirection: { xs: "row", md: "column" }, justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2" color="primary.contrastText">
                      Email
                    </Typography>
                    <Typography variant="body2" color="secondary.contrastText" sx={{ fontWeight: "bold" }}>
                      info@14labs.com
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="primary.contrastText">
                      Phone
                    </Typography>
                    <Typography variant="body2" color="secondary.contrastText" sx={{ fontWeight: "bold" }}>
                      {"+1(888)-855-5328"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "secondary.contrastText" }} >
                Have an idea or challenge in mind?
              </Typography>
              <Typography variant="body2" color="primary.contrastText" sx={{ py: 2 }}>
                Lets talk about how AI and custom software can help your business move faster and smarter
              </Typography>
              <Button
                component={Link}
                href="contact"
                variant="contained"
                sx={{
                  borderRadius: 7,
                  p: "9px 18px",
                  fontWeight: 600,
                  fontSize: { sx: 16, sm: 16.5, md: 17 },
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
                Schedule Call
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