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
import { getNavItems } from "@/services/dataService";
import { useNavHidden } from "@/components/common/navVisibility";
import { color, layout, motion, radius } from "@/theme/tokens";

const navItems = getNavItems();

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
            <Box
                sx={{
                    ...barSx,
                    top: open ? 6 : 1,
                    transform: open ? "rotate(45deg)" : "none",
                }}
            />
            <Box
                sx={{
                    ...barSx,
                    top: open ? 6 : 11,
                    transform: open ? "rotate(-45deg)" : "none",
                }}
            />
        </Box>
    );
}

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

    // Pinned full-bleed sections take the bar off screen while they hold the
    // viewport — see navVisibility.
    const hidden = useNavHidden();

    // Route changes should never leave the overlay hanging open.
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

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
                    backgroundColor: isScrolled ? "rgba(235,235,235,0.88)" : color.ground,
                    backdropFilter: isScrolled ? "saturate(180%) blur(12px)" : "none",
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
                    <Toolbar disableGutters sx={{ minHeight: "0 !important", gap: 2 }}>
                        <Box
                            component={Link}
                            href="/"
                            aria-label="14Labs home"
                            sx={{ display: "flex", mr: "auto" }}
                        >
                            <Image
                                src="/media/logo-ink.svg"
                                alt="14Labs"
                                width={80}
                                height={30}
                                priority
                            />
                        </Box>

                        <Box
                            component="nav"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            {navItems.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Box
                                        key={item.path}
                                        component={Link}
                                        href={item.path}
                                        sx={{
                                            textDecoration: "none",
                                            position: "relative",
                                            paddingBlock: "6px",
                                            color: active ? color.ink : color.inkMuted,
                                            transition: `color ${motion.fast}`,
                                            "&:hover": { color: color.ink },
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                insetInline: 0,
                                                bottom: 0,
                                                height: "1px",
                                                backgroundColor: color.accent,
                                                transform: active ? "scaleX(1)" : "scaleX(0)",
                                                transformOrigin: "left",
                                                transition: `transform ${motion.base}`,
                                            },
                                            "&:hover::after": { transform: "scaleX(1)" },
                                        }}
                                    >
                                        <Typography
                                            component="span"
                                            sx={{ fontSize: "0.9375rem", fontWeight: 450, letterSpacing: "-0.005em" }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box
                            component={Link}
                            href="/contact"
                            sx={{
                                display: { xs: "none", md: "inline-flex" },
                                alignItems: "center",
                                ml: 3,
                                px: 2.75,
                                py: 1.35,
                                borderRadius: radius.pill,
                                backgroundColor: color.deep,
                                color: color.onDeep,
                                textDecoration: "none",
                                transition: `background-color ${motion.fast}, color ${motion.fast}`,
                                "&:hover": { backgroundColor: color.ink, color: color.ground },
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "-0.005em" }}
                            >
                                Start a project
                            </Typography>
                        </Box>

                        <IconButton
                            onClick={() => setMobileOpen((prev) => !prev)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            disableRipple
                            sx={{ display: { xs: "flex", md: "none" }, mr: -1 }}
                        >
                            <MenuToggle open={mobileOpen} />
                        </IconButton>
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
                    {navItems.map((item, i) => (
                        <Box
                            key={item.path}
                            component={Link}
                            href={item.path}
                            sx={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: 2,
                                paddingBlock: 2.25,
                                borderBottom: "1px solid",
                                borderColor: color.rule,
                                textDecoration: "none",
                                color: isActive(item.path) ? color.accent : color.ink,
                            }}
                        >
                            <Typography variant="caption" sx={{ color: color.inkFaint, width: 24 }}>
                                {String(i + 1).padStart(2, "0")}
                            </Typography>
                            <Typography variant="h3" component="span">
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Container>
            </Box>

            {/* Spacer for the fixed bar. */}
            <Box sx={{ height: layout.navHeight }} />
        </>
    );
}

export default Navbar;
