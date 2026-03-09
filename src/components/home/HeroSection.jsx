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
                height: "92vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "85vh",
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
                                fontSize: { xs: "2rem", md: "3rem" },
                                color: "primary.contrastText",
                                lineHeight: 1.3,
                            }}
                        >
                            We build AI & software solutions that solve real
                            business problems
                        </Typography>

                        <Typography
                            sx={{
                                mt: 3,
                                mb: 4,
                                color: "secondary.contrastText",
                                fontSize: "1rem",
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
                                    borderRadius: 6,
                                    px: 3,
                                    py: 1.4,
                                    fontWeight: 600,
                                    backgroundColor: "primary.contrastText",
                                    color: "text.primary",
                                    "&:hover": {
                                        backgroundColor: "#f3f4f6",
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
                                    borderRadius: 6,
                                    px: 3,
                                    py: 1.4,
                                    fontWeight: 600,
                                    color: "text.primary",
                                    background:
                                        "primary.main",
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
