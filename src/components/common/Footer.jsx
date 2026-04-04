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
import { getNavItems } from "@/services/dataService";

const navItems = getNavItems();

const Footer = () => {
    return (
        <Box sx={{ px: 4, py: 5, }}>
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
                            width={85.53}
                            height={32}
                        />
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center", }}>
                    <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>

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
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "flex-start", sm: "flex-end", md: "flex-end" },
                        }}
                    >
                        <IconButton>
                            <TwitterIcon fontSize="small" sx={{
                                color: "text.black",
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }} />
                        </IconButton>
                        <IconButton>
                            <FacebookIcon fontSize="small" sx={{
                                color: "text.black",
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }} />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon fontSize="small" sx={{
                                color: "text.black",
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }} />
                        </IconButton>
                        <IconButton>
                            <GitHubIcon fontSize="small" sx={{
                                color: "text.black",
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "row" },
                pt: 2,
            }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" },
                        mt: { xs: 2, md: 0 },
                    }}>
                        <Typography variant="body2" sx={{ color: "text.grey", fontFamily: "'Instrument Sans', sans-serif", }}>
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
                        <Link href="/" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" sx={{
                                color: "text.grey",
                                fontFamily: "'Instrument Sans', sans-serif",
                                transition: "all 0.4s ease",
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }}>
                                Privacy Policy
                            </Typography>
                        </Link>

                        <Link href="/" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" sx={{
                                color: "text.grey",
                                fontFamily: "'Instrument Sans', sans-serif",
                                transition: "all 0.4s ease",
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }}>
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