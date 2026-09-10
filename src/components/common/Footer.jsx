import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import HubOutlined from "@mui/icons-material/HubOutlined";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";
import ScienceOutlined from "@mui/icons-material/ScienceOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import LinkBox from "@/components/ui/LinkBox";
import { getNavItems, getResearch, getServices, getSite } from "@/services/dataService";
import { color, motion } from "@/theme/tokens";

const navItems = getNavItems();
const services = getServices();
const research = getResearch();
const site = getSite();

// One icon per practice, in the same order as the data.
const SERVICE_ICONS = [HubOutlined, TravelExploreOutlined, ScienceOutlined, FactCheckOutlined];

const linkSx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 1.5,
    textDecoration: "none",
    color: color.inkMuted,
    fontSize: "0.9375rem",
    lineHeight: 1.4,
    transition: `color ${motion.fast}`,
    "&:hover": { color: color.ink },
};

function Glyph({ icon: Icon }) {
    return (
        <Box
            aria-hidden
            sx={{
                width: 28,
                height: 28,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: color.rule,
                color: color.ink,
            }}
        >
            <Icon sx={{ fontSize: 16 }} />
        </Box>
    );
}

function Column({ heading, children }) {
    return (
        <Box>
            <Typography sx={{ fontSize: "1.125rem", fontWeight: 500, color: color.ink, mb: 2.5 }}>
                {heading}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.5 }}>
                {children}
            </Box>
        </Box>
    );
}

function Item({ href, icon, external = false, children }) {
    const inner = (
        <>
            {icon ? <Glyph icon={icon} /> : null}
            <span>{children}</span>
        </>
    );

    return (
        <Box component="li">
            {external || /^(mailto:|tel:)/.test(href) ? (
                <Box
                    component="a"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    sx={linkSx}
                >
                    {inner}
                </Box>
            ) : (
                <LinkBox href={href} sx={linkSx}>
                    {inner}
                </LinkBox>
            )}
        </Box>
    );
}

/**
 * The index of the site, and nothing else: a one-line statement of what the
 * practice is for, then every destination grouped the way a visitor would look
 * for it. Same ground as the page — the footer is the end of the page, not a
 * different place.
 */
function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: color.ground,
                borderTop: "1px solid",
                borderColor: color.rule,
                pt: "clamp(56px, 7vw, 112px)",
                pb: 5,
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "1.3fr repeat(4, 1fr)",
                        },
                        columnGap: { sm: 5, lg: 6 },
                        rowGap: { xs: 6, md: 7 },
                    }}
                >
                    <Typography
                        sx={{
                            gridColumn: { sm: "1 / -1", lg: "auto" },
                            fontSize: "clamp(1.625rem, 1.3rem + 1vw, 2.25rem)",
                            lineHeight: 1.12,
                            letterSpacing: "-0.025em",
                            color: color.ink,
                            maxWidth: "14ch",
                        }}
                    >
                        AI systems that survive contact with production
                    </Typography>

                    <Column heading="Practice">
                        {services.map((service, i) => (
                            <Item key={service.sNo} href="/services" icon={SERVICE_ICONS[i]}>
                                {service.title}
                            </Item>
                        ))}
                    </Column>

                    <Column heading="Research">
                        {research.map((post) => (
                            <Item key={post.slug} href={`/research/${post.slug}`}>
                                {post.title}
                            </Item>
                        ))}
                    </Column>

                    <Column heading="Company">
                        {navItems.map((item) => (
                            <Item key={item.path} href={item.path}>
                                {item.label}
                            </Item>
                        ))}
                    </Column>

                    <Column heading="Contact">
                        <Item href={`mailto:${site.email}`} icon={MailOutline}>
                            {site.email}
                        </Item>
                        <Item href={`tel:${site.phone.replace(/\s/g, "")}`} icon={PhoneOutlined}>
                            {site.phone}
                        </Item>
                        <Item href={site.linkedin} icon={LinkedIn} external>
                            LinkedIn
                        </Item>
                        <Item href={site.x} icon={XIcon} external>
                            X
                        </Item>
                    </Column>
                </Box>

                <Box
                    sx={{
                        mt: { xs: 8, md: 12 },
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <LinkBox href="/" aria-label="14Labs home" sx={{ display: "inline-flex" }}>
                        <Box sx={{ display: "flex", "[data-theme='dark'] &": { display: "none" } }}>
                            <Image src="/media/logo-ink.svg" alt="14Labs" width={92} height={34} />
                        </Box>
                        <Box sx={{ display: "none", "[data-theme='dark'] &": { display: "flex" } }}>
                            <Image src="/media/logo-onink.svg" alt="" width={92} height={34} />
                        </Box>
                    </LinkBox>

                    <Typography variant="body2" sx={{ color: color.inkFaint }}>
                        © {new Date().getFullYear()} 14Labs. AI engineering, applied machine learning and research.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
