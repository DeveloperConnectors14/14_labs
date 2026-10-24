"use client";

import {
    Box,
    Container,
    Typography,
    Button,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import Link from "next/link";
import { BUTTON_RADIUS } from "@/theme/tokens";
import CollaboratorStrip from "@/components/home/CollaboratorStrip";
import HeroSlideshow from "@/components/home/HeroSlideshow";

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: none; }
`;

// Staggered entrance; skipped entirely for visitors who prefer reduced motion.
const enter = (delay) => ({
    animation: `${fadeUp} 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}s both`,
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
});


// Scrolls smoothly to a homepage section instead of jumping; the href stays
// as a fallback. scroll-margin-top on each section keeps it below the navbar.
const scrollToSection = (id) => (event) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

function HeroSection() {
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    // Fills the first screen; the transparent navbar sits on top of it.
                    minHeight: "100vh",
                    "@supports (height: 100svh)": { minHeight: "100svh" },
                    // Full width, edge to edge, like the DeepMind reference.
                    position: "relative",
                    overflow: "hidden",
                    // Plain dark fallback shown only until the first photo loads.
                    backgroundColor: "#0b1218",
                }}
            >
                <HeroSlideshow />

                <Box
                    sx={{
                        width: "100%",
                        position: "absolute",
                        inset: 0,
                        background:
                            // Neutral (black) shading only where text sits: behind the headline and at the bottom for the logos.
                            "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(0,0,0,0.4), transparent 70%), linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 30%, transparent 60%, rgba(0,0,0,0.25) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Container sx={{ position: "relative", maxWidth: "803px", width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px", }}>
                            {/* Balanced wrapping keeps "Research" from sitting alone on the second line.
                                The teal phrase matches the site's two-tone section headings. */}
                            <Typography variant="h1" sx={{ color: "secondary.contrastText", textWrap: "balance", textShadow: "0 2px 24px rgba(0,0,0,0.5)", fontSize: { xs: "34px", sm: "44px", md: "58px" }, ...enter(0.15) }}>
                                AI Engineering,{" "}
                                <Box component="span" sx={{ color: "secondary.main" }}>Applied Machine Learning</Box>
                                {" "}& Research
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                flexWrap: "wrap",
                                ...enter(0.45),
                            }}
                        >
                            <Button
                                component={Link}
                                href="/#research"
                                onClick={scrollToSection("research")}
                                variant="contained"
                                sx={{
                                    borderRadius: BUTTON_RADIUS,
                                    p: "10px 22px",
                                    fontSize: { xs: "15px", md: "16px" },
                                    // Teal like the navbar's Let's connect: teal marks the main action.
                                    backgroundColor: "secondary.main",
                                    color: "brand.navy",
                                    transition: 'all 0.3s ease',
                                    "&:hover": {
                                        boxShadow: "none",
                                        backgroundColor: "primary.contrastText",
                                        color: "brand.navy",
                                    },
                                }}
                            >
                                Research
                            </Button>

                            <Button
                                component={Link}
                                href="/#services"
                                onClick={scrollToSection("services")}
                                variant="outlined"
                                sx={{
                                    borderRadius: BUTTON_RADIUS,
                                    p: "9px 21px",
                                    fontSize: { xs: "15px", md: "16px" },
                                    color: "secondary.contrastText",
                                    borderColor: "rgba(255,255,255,0.6)",
                                    transition: 'all 0.3s ease',
                                    "&:hover": {
                                        borderColor: "secondary.contrastText",
                                        backgroundColor: "rgba(255,255,255,0.08)",
                                    },
                                }}
                            >
                                AI services
                            </Button>
                        </Box>
                    </Container>
                </Box>

                <Box sx={{ position: "absolute", left: 0, right: 0, bottom: { xs: 24, md: 40 }, ...enter(0.6) }}>
                    <CollaboratorStrip />
                </Box>
            </Box>
        </Box>
    );
}

export default HeroSection;
