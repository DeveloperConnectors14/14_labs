"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Collapse,
    Fade,
    useScrollTrigger,
    Typography,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import ThemedLogo from "@/components/common/ThemedLogo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { BUTTON_RADIUS, NAV_HEIGHT, FONT_MONO, SECTION_PX } from "@/theme/tokens";
import { getNavItems, hasDarkHero } from "@/services/dataService";

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const isScrolled = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    const navItems = getNavItems();

    // Pages that open with the dark full-width hero get a transparent bar with
    // white text on top of it (like the DeepMind reference). It turns solid
    // white as soon as the page scrolls or the mobile menu opens.
    const pathname = usePathname();
    const overHero = hasDarkHero(pathname);
    const transparent = overHero && !isScrolled && !mobileOpen;
    const linkColor = transparent ? "secondary.contrastText" : "text.primary";

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                // Without this, MUI's built-in dark-mode bar colour overrides the
                // transparent bar over the hero.
                enableColorOnDark
                sx={{
                    height: NAV_HEIGHT,
                    backgroundColor: transparent ? "transparent" : "background.paper",
                    boxShadow: transparent ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
                    backdropFilter: isScrolled ? "blur(10px)" : "none",
                    transition: "all 0.4s ease",
                    zIndex: 1200,
                }}
            >
                {/* Same side margins as the page content, so the logo and the right-hand
                    button line up with the sections below. */}
                <Toolbar
                    disableGutters
                    sx={{
                        px: SECTION_PX,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo with the links right beside it, left-aligned like the DeepMind reference. */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: { md: 5, lg: 8 } }}>
                        <Button
                            component={Link}
                            href="/"
                            aria-label="14Labs home"
                            sx={{
                                // No padding, so the logo starts exactly at the page margin.
                                p: 0,
                                minWidth: 0,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            <ThemedLogo white={transparent} />
                        </Button>

                        {/* Desktop Menu */}
                        <Box sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: { md: 4, lg: 5 },
                            p: "4px"
                        }}>
                            {navItems.map((item) => (
                                <Link key={item.path} href={item.path} style={{
                                    textDecoration: "none",
                                }}>
                                    <Typography sx={{
                                        fontWeight: 500,
                                        // Per-breakpoint so it overrides the theme's responsive body size.
                                        fontSize: { xs: "15px", md: "15px" },
                                        lineHeight: "150%",
                                        color: linkColor,
                                        transition: 'all 0.3s ease',
                                        fontFamily: FONT_MONO, "&:hover": {
                                            color: "text.secondary",
                                        },
                                    }}>
                                        {item.label}
                                    </Typography>
                                </Link>
                            ))}

                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 2 } }}>
                    <ThemeToggle color={linkColor} />
                    <Button
                        component={Link}
                        href="/contact"
                        variant="contained"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            borderRadius: BUTTON_RADIUS,
                            p: "10px 20px",
                            fontWeight: 600,
                            // Per-breakpoint so it overrides the theme's responsive button size.
                            fontSize: { xs: "15px", md: "15px" },
                            lineHeight: "20px",
                            color: "brand.navy",
                            fontFamily: FONT_MONO,
                            backgroundColor: "secondary.main",
                            boxShadow: "none",
                            transition: 'all 0.3s ease',
                            "&:hover": {
                                boxShadow: "none",
                                backgroundColor: "primary.contrastText",
                                color: "brand.navy",
                            },
                        }}
                    >
                        LET&apos;S CONNECT
                    </Button>

                    {/* Mobile Menu Icon */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            onClick={() => setMobileOpen((prev) => !prev)}
                            // Pulled into its own padding so the icon lines up with the page margin.
                            sx={{ color: linkColor, mr: -1 }}
                        >
                            <Fade in={!mobileOpen}>
                                <MenuIcon />
                            </Fade>
                            <Fade in={mobileOpen}>
                                <CloseIcon sx={{ position: "absolute" }} />
                            </Fade>
                        </IconButton>
                    </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Menu */}
            <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        top: NAV_HEIGHT,
                        left: 0,
                        right: 0,
                        backgroundColor: "background.paper",
                        borderTop: 1,
                        borderColor: "divider",
                        zIndex: 1100,
                        px: 2,
                        py: 2,
                    }}
                >
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            component={Link}
                            href={item.path}
                            fullWidth
                            onClick={() => setMobileOpen(false)}
                            sx={{
                                justifyContent: "center",
                                py: 1,
                                fontWeight: 500,
                                fontSize: 14,
                                fontFamily: FONT_MONO,
                                color: "text.primary",
                                backgroundColor: "transparent",
                                transition: "all 0.4s ease",
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                        <Button
                            component={Link}
                            href="/contact"
                            variant="contained"
                            sx={{
                                borderRadius: BUTTON_RADIUS,
                                px: 2.5,
                                py: 1,
                                fontWeight: 600,
                                fontSize: { xs: "15px", sm: "15px" },
                                fontFamily: FONT_MONO,
                                color: "brand.navy",
                                backgroundColor: "secondary.main",
                                boxShadow: "none",
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    boxShadow: "none",
                                    backgroundColor: "primary.contrastText",
                                    color: "brand.navy",
                                },
                            }}
                        >
                            LET&apos;S CONNECT
                        </Button>
                    </Box>
                </Box>
            </Collapse>

            {/* Space for the fixed navbar, except where the hero sits behind it. */}
            {!overHero && <Toolbar sx={{ height: NAV_HEIGHT }} />}
        </>
    );
}

export default Navbar;
