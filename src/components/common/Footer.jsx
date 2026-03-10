"use client";

import React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Divider,
    Button,
} from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";

const Footer = () => {
    return (
        <Box sx={{ px: 4, py: 6, }}>
            <Grid container alignItems="center" spacing={3}>
                <Grid size={{ xs: 6, md: 3 }}>
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
                            width={100}
                            height={30}
                        />
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center", }}>
                    <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>
                        <Link href="/services" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                SERVICES
                            </Typography>
                        </Link>

                        <Link href="/case-studies" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                CASE STUDIES
                            </Typography>
                        </Link>

                        <Link href="/about-us" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                ABOUT US
                            </Typography>
                        </Link>

                        <Link href="/contact" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                CONTACT
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton>
                            <TwitterIcon fontSize="small" sx={{ color: "black" }} />
                        </IconButton>
                        <IconButton>
                            <FacebookIcon fontSize="small" sx={{ color: "black" }} />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon fontSize="small" sx={{ color: "black" }} />
                        </IconButton>
                        <IconButton>
                            <GitHubIcon fontSize="small" sx={{ color: "black" }} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid container sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "row" },
            }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" },
                        mt: { xs: 2, md: 0 },
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            © Copyright 2026, All Rights Reserved
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "space-evenly", md: "flex-end" },
                            gap: 3,
                        }}
                    >
                        <Link href="/privacy" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" color="text.secondary">
                                Privacy Policy
                            </Typography>
                        </Link>

                        <Link href="/terms" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" color="text.secondary">
                                Terms & Conditions
                            </Typography>
                        </Link>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default Footer;