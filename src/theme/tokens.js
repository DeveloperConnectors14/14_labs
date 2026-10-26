export const SECTION_PX = { xs: 2, md: 4 };
export const SECTION_PY = { xs: 4, md: 6 };
export const CARD_RADIUS = "20px";
export const TILE_RADIUS = "12px";
export const BUTTON_RADIUS = "60px";
export const BUTTON_PADDING = { px: 3, py: 1.4 };
// Fixed navbar height per breakpoint. The bar, its spacer, the mobile menu and
// the scroll offset all use this, so they always stay in sync.
export const NAV_HEIGHT = { xs: "64px", md: "72px" };
// Sections stop this far from the top on /#anchor jumps, i.e. just below the navbar.
export const NAV_SCROLL_MARGIN = NAV_HEIGHT;
// Brand teal-to-navy gradient used by the homepage hero and paper headers.
export const BRAND_GRADIENT = "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)";
// Pale page-section gradient; a dark navy version in dark mode (theme palette).
export const SOFT_GRADIENT = "var(--mui-palette-customColors-softGradient)";
// Site fonts, self-hosted by next/font in the root layout (real 400–700 weights).
export const FONT_SANS = "var(--font-sans), 'Instrument Sans', sans-serif";
export const FONT_MONO = "var(--font-mono), 'IBM Plex Mono', monospace";
