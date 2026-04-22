"use client";

import React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Grid,
    Typography,
    Divider,
    Button,
} from "@mui/material";

import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import { getNavItems } from "@/services/dataService";
import { SECTION_PX } from "@/theme/tokens";

const navItems = getNavItems();

const Footer = () => {
    return (
        <Box sx={{ px: SECTION_PX, py: 5 }}>
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
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Link
                            href="https://x.com/14labs_co"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-flex", padding: 8 }}
                        >
                            <XIcon fontSize="small" sx={{
                                color: "text.black",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }} />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/14labs"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-flex", padding: 8 }}
                        >
                            <LinkedInIcon fontSize="small" sx={{
                                color: "text.black",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: "text.secondary",
                                },
                            }} />
                        </Link>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, pt: 1 }}>
                <Typography variant="body2" sx={{ color: "text.grey" }}>
                    © Copyright 2026, All Rights Reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;