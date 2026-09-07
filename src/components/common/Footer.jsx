import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import LinkBox from "@/components/ui/LinkBox";
import { getNavItems, getServices, getSite } from "@/services/dataService";
import { color, motion, layout } from "@/theme/tokens";

const navItems = getNavItems();
const services = getServices();
const site = getSite();

const linkSx = {
    textDecoration: "none",
    color: color.onBlackMuted,
    fontSize: "0.9375rem",
    lineHeight: 2,
    transition: `color ${motion.fast}`,
    "&:hover": { color: color.lime },
};

function FooterColumn({ heading, children }) {
    return (
        <Box>
            <Typography variant="eyebrow" sx={{ color: color.onBlackMuted, mb: 2.5 }}>
                {heading}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {children}
            </Box>
        </Box>
    );
}

function Footer() {
    return (
        <Box
            component="footer"
            /* Black rather than the darkest green. The closing CTA above it is
               already a deep green band, and two greens stacked read as one
               long section with a rule through it; black gives the page a
               floor. It is the palette's second dark tone and already carries
               its own on-black text and rule steps, so nothing here is a
               one-off colour. */
            sx={{
                backgroundColor: color.black,
                color: color.onBlack,
                paddingBlock: "clamp(48px, 6vw, 88px)",
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "1.6fr repeat(3, 1fr)",
                        },
                        gap: { xs: 5, md: 6 },
                    }}
                >
                    <Box>
                        <LinkBox href="/" aria-label="14Labs home" sx={{ display: "inline-flex" }}>
                            <Image src="/media/logo-onink.svg" alt="14Labs" width={92} height={34} />
                        </LinkBox>
                        <Typography
                            sx={{
                                mt: 3,
                                maxWidth: "30ch",
                                fontSize: "1.0625rem",
                                lineHeight: 1.55,
                                color: color.onBlackMuted,
                            }}
                        >
                            AI engineering, applied machine learning and research — built to run
                            in production, not in a notebook.
                        </Typography>
                    </Box>

                    <FooterColumn heading="Site">
                        {navItems.map((item) => (
                            <LinkBox key={item.path} href={item.path} sx={linkSx}>
                                {item.label}
                            </LinkBox>
                        ))}
                    </FooterColumn>

                    <FooterColumn heading="Practice">
                        {services.map((service) => (
                            <LinkBox key={service.sNo} href="/services" sx={linkSx}>
                                {service.title}
                            </LinkBox>
                        ))}
                    </FooterColumn>

                    <FooterColumn heading="Contact">
                        <Box component="a" href={`mailto:${site.email}`} sx={linkSx}>
                            {site.email}
                        </Box>
                        <Box
                            component="a"
                            href={site.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={linkSx}
                        >
                            LinkedIn
                        </Box>
                        <Box
                            component="a"
                            href={site.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={linkSx}
                        >
                            X / Twitter
                        </Box>
                    </FooterColumn>
                </Box>

                <Box
                    sx={{
                        mt: { xs: 6, md: 9 },
                        pt: 3,
                        borderTop: "1px solid",
                        borderColor: color.ruleOnBlack,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="caption" sx={{ color: color.onBlackMuted }}>
                        © {new Date().getFullYear()} 14Labs
                    </Typography>
                    <Typography variant="caption" sx={{ color: color.onBlackMuted }}>
                        AI Engineering · Applied ML · Research
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
