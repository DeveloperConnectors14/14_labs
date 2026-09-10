"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRight from "@mui/icons-material/ChevronRight";
import PillLink from "@/components/ui/PillLink";
import { getCaseDetails, getcaseStudies, getNavItems, getResearch } from "@/services/dataService";
import { useNavHidden } from "@/components/common/navVisibility";
import { color, layout, motion } from "@/theme/tokens";

const navItems = getNavItems();
// Contact is the pill on the right; listing it again beside it is noise.
const barItems = navItems.filter((item) => item.path !== "/contact");

const monthYear = (iso) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

const caseDetails = getCaseDetails();

// What each dropdown lists: the real notes and case studies, then the index.
const MENUS = {
    "/research": {
        items: getResearch().map((post) => ({
            href: `/research/${post.slug}`,
            meta: `${post.topic}  ·  ${monthYear(post.date)}`,
            title: post.title,
        })),
        all: { href: "/research", label: "All Research" },
    },
    "/case-studies": {
        items: getcaseStudies().map((item) => {
            const hero = caseDetails.find((d) => d.caseId === item.id)?.hero;
            return {
                href: `/case-studies/${item.id}`,
                meta: hero?.stats?.[0]?.value ?? "Case study",
                title: hero?.title ?? item.title,
            };
        }),
        all: { href: "/case-studies", label: "All Case Studies" },
    },
};

/** Two bars that become an X. Cheaper and calmer than swapping icon glyphs. */
function MenuToggle({ open }) {
    const barSx = {
        position: "absolute",
        left: 0,
        width: 20,
        height: "1.5px",
        backgroundColor: color.ink,
        transition: `transform ${motion.base}, top ${motion.base}`,
    };

    return (
        <Box aria-hidden sx={{ position: "relative", width: 20, height: 14 }}>
            <Box sx={{ ...barSx, top: open ? 6 : 1, transform: open ? "rotate(45deg)" : "none" }} />
            <Box sx={{ ...barSx, top: open ? 6 : 11, transform: open ? "rotate(-45deg)" : "none" }} />
        </Box>
    );
}

/**
 * One glyph for both themes — a ring, half filled — turned over by CSS when the
 * page goes dark. Nothing in it is rendered from state, so the server render
 * and the first client render agree whichever theme the visitor lands in; the
 * theme is only read at the moment of the click.
 */
function ThemeToggle() {
    const { mode, systemMode, setMode } = useColorScheme();

    const toggle = () => {
        const current = mode === "system" ? systemMode : mode;
        setMode(current === "dark" ? "light" : "dark");
    };

    return (
        <IconButton
            onClick={toggle}
            aria-label="Toggle dark theme"
            disableRipple
            sx={{
                width: 40,
                height: 40,
                color: color.ink,
                transition: `background-color ${motion.fast}`,
                "&:hover": { backgroundColor: color.surfaceAlt },
            }}
        >
            <Box
                component="svg"
                viewBox="0 0 20 20"
                aria-hidden
                sx={{
                    width: 18,
                    height: 18,
                    transition: `transform ${motion.slow}`,
                    "[data-theme='dark'] &": { transform: "rotate(180deg)" },
                }}
            >
                <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
            </Box>
        </IconButton>
    );
}

/** Both marks ship and CSS shows the one for the active theme, so the logo is
 *  right on the first paint rather than after hydration. */
export function ThemedLogo({ width = 80, height = 30, priority = false }) {
    return (
        <>
            <Box sx={{ display: "flex", "[data-theme='dark'] &": { display: "none" } }}>
                <Image src="/media/logo-ink.svg" alt="14Labs" width={width} height={height} priority={priority} />
            </Box>
            <Box sx={{ display: "none", "[data-theme='dark'] &": { display: "flex" } }}>
                <Image src="/media/logo-onink.svg" alt="" width={width} height={height} priority={priority} />
            </Box>
        </>
    );
}

const linkSx = (active) => ({
    display: "inline-flex",
    alignItems: "center",
    px: 1.75,
    py: 1,
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "0.9375rem",
    fontWeight: active ? 500 : 400,
    color: active ? color.ink : color.inkMuted,
    backgroundColor: active ? color.surfaceAlt : "transparent",
    transition: `color ${motion.fast}, background-color ${motion.fast}`,
    "&:hover": { color: color.ink, backgroundColor: color.surfaceAlt },
});

/**
 * A nav item with a panel under it.
 *
 * Pure CSS: the panel opens on hover and whenever anything inside the item has
 * keyboard focus (`:focus-within`), so tabbing onto "Research" opens it and
 * tabbing on walks through the notes. It closes a beat after the pointer
 * leaves, so crossing the gap to the panel does not drop it. The trigger is
 * still the section's link — on a touch screen a tap simply goes there.
 */
function DropdownItem({ item, active }) {
    const menu = MENUS[item.path];

    return (
        <Box
            sx={{
                position: "relative",
                "&:hover .nav-panel, &:focus-within .nav-panel": {
                    opacity: 1,
                    visibility: "visible",
                    transform: "translate(-50%, 0)",
                    transition: `opacity 200ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s`,
                },
                "&:hover .nav-chev, &:focus-within .nav-chev": { transform: "rotate(180deg)" },
            }}
        >
            <Box
                component={Link}
                href={item.path}
                aria-current={active ? "page" : undefined}
                aria-haspopup="true"
                sx={linkSx(active)}
            >
                {item.label}
                <ExpandMore
                    className="nav-chev"
                    aria-hidden
                    sx={{ fontSize: 17, ml: 0.25, mr: -0.5, transition: `transform ${motion.base}` }}
                />
            </Box>

            <Box
                className="nav-panel"
                sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    pt: 1.5,
                    opacity: 0,
                    visibility: "hidden",
                    transform: "translate(-50%, 8px)",
                    // Close after a short grace, then hide from the tab order.
                    transition: `opacity 180ms ease 120ms, transform 220ms ease 120ms, visibility 0s linear 320ms`,
                    zIndex: 10,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: 380,
                        p: 1,
                        borderRadius: "18px",
                        border: "1px solid",
                        borderColor: color.rule,
                        backgroundColor: color.ground,
                        boxShadow: "0 28px 60px -28px rgba(0, 0, 0, 0.4)",
                        // The pointer up to the trigger.
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -6,
                            left: "50%",
                            width: 11,
                            height: 11,
                            backgroundColor: color.ground,
                            borderLeft: "1px solid",
                            borderTop: "1px solid",
                            borderColor: color.rule,
                            transform: "translateX(-50%) rotate(45deg)",
                        },
                    }}
                >
                    {menu.items.map((entry) => (
                        <Box
                            key={entry.href}
                            component={Link}
                            href={entry.href}
                            sx={{
                                position: "relative",
                                display: "block",
                                px: 1.5,
                                py: 1.25,
                                borderRadius: "12px",
                                textDecoration: "none",
                                color: color.ink,
                                transition: `background-color ${motion.fast}`,
                                "&:hover, &:focus-visible": { backgroundColor: color.surfaceAlt },
                                "&:hover .nav-entry-title": { color: color.accent },
                            }}
                        >
                            <Typography sx={{ fontSize: "0.75rem", color: color.inkFaint, whiteSpace: "pre" }}>
                                {entry.meta}
                            </Typography>
                            <Typography
                                className="nav-entry-title"
                                sx={{ mt: 0.25, fontSize: "0.9375rem", lineHeight: 1.35, transition: `color ${motion.fast}` }}
                            >
                                {entry.title}
                            </Typography>
                        </Box>
                    ))}

                    <Box
                        component={Link}
                        href={menu.all.href}
                        sx={{
                            mt: 0.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 1.5,
                            py: 1.25,
                            borderTop: "1px solid",
                            borderColor: color.rule,
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: color.ink,
                            "&:hover": { color: color.accent },
                            "&:hover .nav-all-chev": { transform: "translateX(3px)" },
                        }}
                    >
                        {menu.all.label}
                        <ChevronRight
                            className="nav-all-chev"
                            aria-hidden
                            sx={{ fontSize: 18, transition: `transform ${motion.base}` }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function Navbar() {
    const pathname = usePathname();

    // The menu remembers the page it was opened on and only counts as open
    // while that is still the page — so a route change closes it without an
    // effect, and the overlay can never be left hanging over the next page.
    const [openedOn, setOpenedOn] = useState(null);
    const mobileOpen = openedOn === pathname;
    const setMobileOpen = (next) => {
        const open = typeof next === "function" ? next(mobileOpen) : next;
        setOpenedOn(open ? pathname : null);
    };

    const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

    // Pinned full-bleed sections take the bar off screen while they hold the
    // viewport — see navVisibility.
    const hidden = useNavHidden();

    // The overlay covers the page; letting the page scroll behind it is the
    // classic mobile-menu bug.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const isActive = (path) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path);

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    height: layout.navHeight,
                    justifyContent: "center",
                    backgroundColor: isScrolled
                        ? `color-mix(in srgb, ${color.ground} 86%, transparent)`
                        : color.ground,
                    backdropFilter: isScrolled ? "saturate(160%) blur(14px)" : "none",
                    borderBottom: "1px solid",
                    borderColor: isScrolled ? color.rule : "transparent",
                    transform: hidden ? "translateY(-100%)" : "none",
                    // Leaves before it fades so the bar does not sit half-lit
                    // over the panel it is uncovering.
                    opacity: hidden ? 0 : 1,
                    pointerEvents: hidden ? "none" : "auto",
                    transition: `border-color ${motion.base}, background-color ${motion.base}, transform ${motion.base}, opacity ${motion.fast}`,
                    zIndex: 1300,
                }}
            >
                <Container>
                    <Toolbar disableGutters sx={{ minHeight: "0 !important", gap: 1 }}>
                        <Box component={Link} href="/" aria-label="14Labs home" sx={{ display: "flex" }}>
                            <ThemedLogo priority />
                        </Box>

                        <Box
                            component="nav"
                            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5, ml: 5 }}
                        >
                            {barItems.map((item) => {
                                const active = isActive(item.path);
                                return MENUS[item.path] ? (
                                    <DropdownItem key={item.path} item={item} active={active} />
                                ) : (
                                    <Box
                                        key={item.path}
                                        component={Link}
                                        href={item.path}
                                        aria-current={active ? "page" : undefined}
                                        sx={linkSx(active)}
                                    >
                                        {item.label}
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
                            <ThemeToggle />

                            <PillLink
                                href="/contact"
                                size="sm"
                                sx={{ display: { xs: "none", md: "inline-flex" } }}
                            >
                                Start a project
                            </PillLink>

                            <IconButton
                                onClick={() => setMobileOpen((prev) => !prev)}
                                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileOpen}
                                disableRipple
                                sx={{ display: { xs: "flex", md: "none" }, mr: -1 }}
                            >
                                <MenuToggle open={mobileOpen} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile overlay. Full-bleed and large-type rather than a cramped
                dropdown — a menu with five items deserves the whole screen. */}
            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                    position: "fixed",
                    inset: 0,
                    zIndex: 1200,
                    flexDirection: "column",
                    backgroundColor: color.ground,
                    paddingTop: `${layout.navHeight.xs + 24}px`,
                    opacity: mobileOpen ? 1 : 0,
                    pointerEvents: mobileOpen ? "auto" : "none",
                    transition: `opacity ${motion.base}`,
                }}
                aria-hidden={!mobileOpen}
            >
                <Container>
                    {navItems.map((item) => (
                        <Box
                            key={item.path}
                            component={Link}
                            href={item.path}
                            sx={{
                                display: "block",
                                paddingBlock: 2.25,
                                borderBottom: "1px solid",
                                borderColor: color.rule,
                                textDecoration: "none",
                                color: isActive(item.path) ? color.accent : color.ink,
                            }}
                        >
                            <Typography variant="h3" component="span">
                                {item.label}
                            </Typography>
                        </Box>
                    ))}

                    <PillLink href="/contact" size="lg" sx={{ mt: 4 }}>
                        Start a project
                    </PillLink>
                </Container>
            </Box>

            {/* Spacer for the fixed bar. */}
            <Box sx={{ height: layout.navHeight }} />
        </>
    );
}

export default Navbar;
