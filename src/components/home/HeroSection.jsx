"use client";

import {
    Box,
    Container,
    Typography,
    Button,
} from "@mui/material";
import Link from "next/link";
import { BUTTON_RADIUS } from "@/theme/tokens";

function HeroSection() {
    return (
        <Box
            sx={{
                px: 2,
                pt: { xs: 1, md: 2 },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: { xs: "70vh", sm: "75vh", md: "87vh" },
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
                        width: "100%",
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
                    <Container sx={{ maxWidth: "803px", width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px", }}>
                            <Typography variant="h1" sx={{ color: "secondary.contrastText" }}>
                                We are 14Labs <br /> Engineered for enterprise. Inspired by what's next.
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    color: "primary.contrastText",
                                }}
                            >
                                Delivering AI-powered innovation. We turn complex technology challenges into seamless, scalable solutions that are delivered on time and on target.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Button
                                component={Link}
                                href="/services"
                                variant="contained"
                                sx={{
                                    borderRadius: BUTTON_RADIUS,
                                    p: "16px 24px",
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
                                Explore AI Services
                            </Button>

                            <Button
                                component={Link}
                                href="/contact"
                                variant="contained"
                                sx={{
                                    borderRadius: BUTTON_RADIUS,
                                    p: "16px 24px",
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
                                Contact Us
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}

export default HeroSection;
