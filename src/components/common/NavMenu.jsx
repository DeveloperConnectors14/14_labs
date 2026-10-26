"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, ButtonBase, Fade, Typography } from "@mui/material";
import { ArrowForward, ExpandMore } from "@mui/icons-material";
import { areaIcons } from "@/components/research/areaIcons";
import { NAV_HEIGHT, TILE_RADIUS, FONT_MONO } from "@/theme/tokens";

const OPEN_DELAY_MS = 150; // so passing the mouse over the bar doesn't open it
const CLOSE_DELAY_MS = 200; // so moving the mouse down into the panel doesn't close it

// "RESEARCH" -> "Research", for labels read by screen readers.
const sentenceCase = (label) => label.charAt(0) + label.slice(1).toLowerCase();

// One link in a panel: optional area icon or thumbnail, a label and a meta line.
// Focus-area links are plain <a> so arriving at the anchor fires `hashchange`,
// which opens that row in "Our focus".
function MenuLink({ link, onNavigate }) {
  const Icon = link.icon && areaIcons[link.icon];
  return (
    <Box
      component={link.plain ? "a" : Link}
      href={link.href}
      onClick={onNavigate}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1,
        mx: -1,
        borderRadius: 1,
        textDecoration: "none",
        "&:hover, &:focus-visible": { backgroundColor: "action.hover", "& .menuLabel": { color: "secondary.main" } },
        "&:focus-visible": { outline: 2, outlineColor: "secondary.main" },
      }}
    >
      {Icon && <Icon sx={{ fontSize: 20, color: "text.secondary", flexShrink: 0 }} />}
      {link.img && (
        <Box sx={{ position: "relative", width: 64, height: 44, borderRadius: 1, overflow: "hidden", flexShrink: 0 }}>
          <Image src={`/media/${link.img}`} alt="" fill sizes="64px" style={{ objectFit: "cover" }} />
        </Box>
      )}
      <Box component="span" sx={{ minWidth: 0 }}>
        <Typography component="span" className="menuLabel" variant="body2" sx={{ display: "block", color: "text.primary", fontWeight: 500, transition: "color 0.2s" }}>
          {link.label}
        </Typography>
        {link.meta && (
          <Typography component="span" variant="caption" sx={{ display: "block", color: "text.grey" }}>
            {link.meta}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// The contents of a menu: titled columns of links, then an optional footer link.
// One column on phones, side by side from tablet width up.
export function MenuPanel({ menu, onNavigate }) {
  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: `repeat(${menu.columns.length}, minmax(0, 1fr))` }, gap: { xs: 2, sm: 4 } }}>
        {menu.columns.map((column) => (
          <Box key={column.title}>
            <Typography variant="caption" sx={{ display: "block", color: "text.grey", textTransform: "uppercase", letterSpacing: "0.08em", mb: 1 }}>
              {column.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {column.links.map((link) => (
                <li key={link.href}>
                  <MenuLink link={link} onNavigate={onNavigate} />
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      {menu.footer && (
        <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
          <Box
            component="a"
            href={menu.footer.href}
            onClick={onNavigate}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              fontFamily: FONT_MONO,
              fontSize: 14,
              fontWeight: 500,
              textTransform: "uppercase",
              textDecoration: "none",
              color: "text.primary",
              "&:hover, &:focus-visible": { color: "secondary.main" },
            }}
          >
            {menu.footer.label}
            <ArrowForward sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      )}
    </>
  );
}

// Desktop navbar item with a hover panel. The label stays a normal link; the
// small arrow next to it opens the panel by click or keyboard (Escape closes
// it). The panel also opens on hover, after a short delay. `onOpenChange` lets
// the navbar turn solid while a panel is open.
export function NavDropdown({ item, menu, labelSx, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const toggleRef = useRef(null);
  const panelId = useId();

  // Every open/close goes through here, so the navbar hears about each change once.
  const update = (value) => {
    clearTimeout(timer.current);
    setOpen(value);
    onOpenChange(value);
  };
  const schedule = (value, delay) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => update(value), delay);
  };
  const close = () => update(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <Box
      onMouseEnter={() => schedule(true, OPEN_DELAY_MS)}
      onMouseLeave={() => schedule(false, CLOSE_DELAY_MS)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          close();
          toggleRef.current?.focus();
        }
      }}
      // Full bar height, so the panel starts right at the bar's bottom edge.
      sx={{ position: "relative", height: NAV_HEIGHT, display: "flex", alignItems: "center", gap: 0.5 }}
    >
      <Link href={item.path} onClick={close} style={{ textDecoration: "none" }}>
        <Typography sx={labelSx}>{item.label}</Typography>
      </Link>
      <ButtonBase
        ref={toggleRef}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${sentenceCase(item.label)} menu`}
        onClick={() => update(!open)}
        sx={{ color: labelSx.color, borderRadius: "50%", p: "2px", "&:focus-visible": { outline: 2, outlineColor: "secondary.main" } }}
      >
        <ExpandMore sx={{ fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </ButtonBase>

      {/* Fade keeps the panel in the page but hidden (and out of the tab order) when closed. */}
      <Fade in={open} timeout={150}>
        {/* The top padding is an invisible bridge, so the mouse can move from the bar into the panel. */}
        <Box id={panelId} sx={{ position: "absolute", top: "100%", left: -16, pt: 1, zIndex: 1300 }}>
          <Box
            sx={{
              width: menu.columns.length > 1 ? 580 : 400,
              p: 3,
              borderRadius: TILE_RADIUS,
              border: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0 16px 40px rgba(10, 59, 96, 0.14)",
            }}
          >
            <MenuPanel menu={menu} onNavigate={close} />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}
