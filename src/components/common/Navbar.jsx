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
import PillLink from "@/components/ui/PillLink";
import { getNavItems } from "@/services/dataService";
import { useNavHidden } from "@/components/common/navVisibility";
import { color, layout, motion } from "@/theme/tokens";

const navItems = getNavItems();
// Contact is the pill on the right; listing it again beside it is noise.
const barItems = navItems.filter((item) => item.path !== "/contact");

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
                                return (
                                    <Box
                                        key={item.path}
                                        component={Link}
                                        href={item.path}
                                        aria-current={active ? "page" : undefined}
                                        sx={{
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
                                        }}
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
