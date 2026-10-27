"use client";

import Link from "next/link";
import ThemedLogo from "@/components/common/ThemedLogo";
import { Box, Grid, Typography, Divider, IconButton } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getContactInfo, getFooterColumns, getSocialLinks } from "@/services/dataService";
import { SECTION_PX } from "@/theme/tokens";

const contactInfo = getContactInfo();
const footerColumns = getFooterColumns();
const socialLinks = getSocialLinks();

const socialIcons = { linkedin: LinkedInIcon, x: XIcon };

const headingSx = { display: "block", color: "text.grey", textTransform: "uppercase", mb: 2 };

const linkSx = {
    display: "block",
    width: "fit-content",
    color: "text.primary",
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover": { color: "text.secondary" },
};

function Footer() {
    return (
        <Box component="footer" sx={{ px: SECTION_PX, pt: { xs: 5, md: 6 }, pb: 4, borderTop: 1, borderColor: "divider" }}>
            <Grid container spacing={{ xs: 4, md: 3 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Link href="/" aria-label="14Labs home" style={{ display: "inline-flex" }}>
                        <ThemedLogo />
                    </Link>
                    <Typography variant="body2" color="text.primary" sx={{ pt: 2, maxWidth: 320 }}>
                        AI Engineering, Applied Machine Learning & Research
                    </Typography>
                    <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
                        {contactInfo.location}
                    </Typography>
                </Grid>

                {footerColumns.map((column) => (
                    <Grid size={{ xs: 6, md: 2 }} key={column.title} component="nav" aria-label={column.title}>
                        <Typography variant="caption" sx={headingSx}>
                            {column.title}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                            {column.links.map((link) => (
                                <Typography key={link.path} variant="body2" component={Link} href={link.path} sx={linkSx}>
                                    {link.label}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                ))}

                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="caption" sx={headingSx}>
                        Contact
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                        <Typography variant="body2" component="a" href={`mailto:${contactInfo.email}`} sx={linkSx}>
                            {contactInfo.email}
                        </Typography>
                        <Typography variant="body2" component="a" href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} sx={linkSx}>
                            {contactInfo.phone}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, pt: 2 }}>
                        {socialLinks.map(({ type, label, url }) => {
                            const Icon = socialIcons[type];
                            return (
                                <IconButton
                                    key={type}
                                    component="a"
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`14Labs on ${label} (opens in new tab)`}
                                    sx={{ border: 1, borderColor: "divider", color: "text.black", "&:hover": { color: "text.secondary" } }}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            );
                        })}
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ mt: { xs: 4, md: 5 }, mb: 3 }} />

            <Typography variant="body2" sx={{ color: "text.grey", textAlign: { xs: "center", md: "left" } }}>
                © {new Date().getFullYear()} 14Labs · {contactInfo.location}. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
