"use client";

import { useState } from "react";
import Link from "next/link";
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
    Divider,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import Image from "next/image";

const APP_BAR_HEIGHT = "104px";

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const isScrolled = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    const navItems = [
        { label: "SERVICES", path: "/services" },
        { label: "CASE STUDIES", path: "/case-studies" },
        { label: "ABOUT US", path: "/about-us" },
        { label: "CONTACT", path: "/contact" },
    ];

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    height: { xs: "80px", sm: "90px", md: APP_BAR_HEIGHT },
                    backgroundColor: "background.paper",
                    backdropFilter: isScrolled ? "blur(10px)" : "none",
                    transition: "all 0.4s ease",
                    zIndex: 1200,
                }}
            >
                <Toolbar
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <Button
                        component={Link}
                        href="/"
                        sx={{
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        <Image
                            src="/media/logo.svg"
                            alt="14Labs Logo"
                            width={85.53}
                            height={32}
                        />
                    </Button>

                    {/* Desktop Menu */}
                    <Box sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        width: "538px",
                        p: "4px"
                    }}>
                        {navItems.map((item) => (
                            <Link key={item.path} href={item.path} style={{
                                textDecoration: "none",
                            }}>
                                <Typography sx={{
                                    fontStyle: "medium",
                                    height: "24px",
                                    fontWeight: 500,
                                    fontsize: "16px",
                                    lineHeight: "150%",
                                    color: "text.primary",
                                    transition: 'all 0.3s ease',
                                    fontFamily: "'IBM Plex Mono', monospace", "&:hover": {
                                        color: "text.secondary",
                                    },
                                }}>
                                    {item.label}
                                </Typography>
                            </Link>
                        ))}

                    </Box>
                    <Button
                        component={Link}
                        href="/contact"
                        variant="contained"
                        sx={{
                            display: { xs: "none", md: "flex" },
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
                        GET STARTED
                    </Button>

                    {/* Mobile Menu Icon */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            onClick={() => setMobileOpen((prev) => !prev)}
                        >
                            <Fade in={!mobileOpen}>
                                <MenuIcon />
                            </Fade>
                            <Fade in={mobileOpen}>
                                <CloseIcon sx={{ position: "absolute" }} />
                            </Fade>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Menu */}
            <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        top: { xs: "80px", sm: "90px", md: APP_BAR_HEIGHT },
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
                                fontFamily: "'IBM Plex Mono', monospace",
                                color: "text.primary",
                                textTransform: "none",
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
                    <Divider sx={{ my: 2 }} />
                    <Button
                        component={Link}
                        fullWidth
                        href="/contact"
                        variant="contained"
                        sx={{
                            borderRadius: 7,
                            px: 2.5,
                            py: 1,
                            fontWeight: 600,
                            fontsize: 16,
                            fontFamily: "'IBM Plex Mono', monospace",
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
            </Collapse>

            {/* space for fixed navbar */}
            <Toolbar sx={{ height: { xs: "80px", sm: "90px", md: APP_BAR_HEIGHT }, }} />
        </>
    );
}

export default Navbar;
