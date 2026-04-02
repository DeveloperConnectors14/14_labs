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
                    <Container sx={{ width: "803px", display: "flex", flexDirection: "column", gap: "24px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px", }}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontStyle: "semiBold",
                                    fontSize: { xs: "28px", sm: "38px", md: "48px" },
                                    lineHeight: "120%",
                                    color: "secondary.contrastText",
                                    fontFamily: "'Instrument Sans', sans-serif",
                                }}
                            >
                                We are 14 Labs <br /> Engineered for enterprise. Inspired by what's next.
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontstyle: "Regular",
                                    fontSize: { xs: "16px", sm: "17px", md: "18px" },
                                    lineHeight: "150%",
                                    color: "primary.contrastText",
                                    fontFamily: "'Instrument Sans', sans-serif",
                                }}
                            >
                                Delivering AI-powered innovation. We turn complex technology challenges into seamless, scalable solutions that are delivered on time and on target.
                            </Typography>
                        </Box>
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
                                href="/services"
                                variant="contained"
                                sx={{
                                    borderRadius: "60px",
                                    p: "16px 24px",
                                    fontWeight: 600,
                                    fontStyle: "semiBold",
                                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                                    lineHeight: "24px",
                                    backgroundColor: "background.paper",
                                    color: "text.primary",
                                    fontFamily: "'IBM Plex Mono', monospace",
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
                                    borderRadius: "60px",
                                    p: "16px 24px",
                                    fontWeight: 600,
                                    fontStyle: "semiBold",
                                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                                    lineHeight: "24px",
                                    color: "text.primary",
                                    fontFamily: "'IBM Plex Mono', monospace",
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
                                Contact Us →
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}

export default HeroSection;
