"use client";

import {
    Box,
    Container,
    Typography,
    Button,
} from "@mui/material";
import Link from "next/link";

function HeroSection() {
    return (
        <Box
            sx={{
                height: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "87vh",
                    backgroundImage: 'url("/media/hero.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: "2.5rem", sm: "2.5rem", md: "3rem" },
                                color: "secondary.contrastText",
                            }}
                        >
                            We build AI & software solutions that solve real
                            business problems
                        </Typography>

                        <Typography
                            sx={{
                                mt: 3,
                                mb: 4,
                                color: "primary.contrastText",
                            }}
                        >
                            We design and develop intelligent systems,
                            automation tools, and scalable web platforms
                            that help teams work smarter and grow faster.
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Button
                                component={Link}
                                href="/works"
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
                                VIEW WORK
                            </Button>

                            <Button
                                component={Link}
                                href="/contact"
                                variant="contained"
                                sx={{
                                    borderRadius: 7,
                                    p: "9px 18px",
                                    fontWeight: 600,
                                    fontSize: { sx: 16, sm: 16.5, md: 17 },
                                    color: "text.primary",
                                    backgroundColor: "secondary.main",
                                    boxShadow: "none",
                                    transition: 'all 0.3s ease',
                                    "&:hover": {
                                        boxShadow: "none",
                                        backgroundColor: "primary.contrastText",
                                        color: "text.primary",
                                    },
                                }}
                            >
                                GET STARTED
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}

export default HeroSection;
