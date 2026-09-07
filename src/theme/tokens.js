/**
 * 14Labs design tokens.
 *
 * Palette and geometry are derived from measured values on lab14.group; the
 * display typography is derived from measured values on fin.ai. Both were read
 * off the live sites rather than estimated.
 *
 *   ground   #EBEBEB   light grey page — not white, which is the single
 *                      fastest way to stop reading as a default template
 *   deep     #003D21   forest green, used as full-bleed inverted bands
 *   lime     #78D147   highlight — legible ONLY on the deep green band
 *
 * Contrast note: lime on grey is ~1.9:1. It is never text on a light ground.
 */

export const color = {
  // --- Light ground -------------------------------------------------------
  ground: "#EBEBEB",
  surface: "#FFFFFF",
  surfaceAlt: "#E0E0E0",
  ink: "#1C1C1C",
  inkMuted: "#616161",
  inkFaint: "#757575",
  rule: "#D4D4D4",
  ruleStrong: "#BEBEBE",

  // --- Green ramp ---------------------------------------------------------
  deep: "#003D21",
  deepAlt: "#002916",
  accent: "#006130",
  accentSoft: "#DCE8E0",
  lime: "#78D147",

  // Tints, on the same hue as `deep`. A page of pure-white cards on grey reads
  // as a default template; carrying a trace of the brand green through the card
  // surfaces is most of what makes a palette look chosen. Named by how much
  // green is in them, not by role, so a card can pick its own step.
  green05: "#F4F8F5",
  green10: "#E9F1EC",
  green20: "#D8E6DD",
  green30: "#BFD5C8",
  green45: "#8FB6A0",
  green60: "#1F7A4C",
  green70: "#0A5C33",

  // Lime only ever appears on a green ground. These two exist so a chart can
  // draw three distinguishable series there without leaving the palette.
  limeSoft: "#B9E79A",
  limeDeep: "#4E9E28",

  // --- Black band ---------------------------------------------------------
  // The mark itself is black-and-teal, and a page that answers it with nothing
  // but green bands reads as one long section. Black is the second dark tone:
  // used where the content is instrumentation rather than argument, it also
  // stops the green from going stale by being everywhere.
  black: "#0D0D0D",
  blackAlt: "#161616",
  onBlack: "#EBEBEB",
  onBlackMuted: "#9E9E9E",
  ruleOnBlack: "#2B2B2B",

  // --- On the deep band ---------------------------------------------------
  onDeep: "#EBEBEB",
  onDeepMuted: "#93B3A1",
  ruleOnDeep: "#0B5231",

  // Aliases kept so the not-yet-rewritten case-study pages keep compiling.
  paper: "#EBEBEB",
  wash: "#E0E0E0",
  washDeep: "#D4D4D4",
  inkDeep: "#003D21",
  onInk: "#EBEBEB",
  onInkMuted: "#93B3A1",
  ruleOnInk: "#0B5231",
};

export const font = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
  serif: "var(--font-serif)",
};

/**
 * Display steps run at weight 300 with tight tracking (fin.ai's setting).
 * Text steps stay at 400 — light weight below ~28px turns to mush.
 */
export const type = {
  display: "clamp(2.75rem, 1.1rem + 6.6vw, 6.25rem)",
  h1: "clamp(2.25rem, 1.2rem + 4.2vw, 4.5rem)",
  h2: "clamp(1.875rem, 1.15rem + 2.9vw, 3.5rem)",
  h3: "clamp(1.3125rem, 1.1rem + 0.85vw, 1.75rem)",
  h4: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)",
  lede: "clamp(1.125rem, 1.02rem + 0.5vw, 1.4375rem)",
  body: "1.0625rem",
  small: "0.9375rem",
  eyebrow: "0.75rem",
};

export const radius = {
  none: 0,
  sm: "6px",
  md: "12px",
  lg: "24px",
  xl: "32px",
  pill: "999px",
};

export const layout = {
  maxWidth: 1320,
  narrow: 780,
  gutter: { xs: "16px", sm: "24px", md: "32px", lg: "40px" },
  // Half-gaps: two adjacent sections each contribute one, so the gap between
  // them is 2x this. Setting the full gap here is what produced ~300px of dead
  // ground between every pair of sections.
  gapY: "clamp(40px, 4.5vw, 72px)",
  gapYTight: "clamp(28px, 3vw, 44px)",
  // Padding inside an inset slab, which is its own enclosure and needs a real
  // internal margin rather than a half-gap.
  slabY: "clamp(44px, 5.5vw, 88px)",
  sectionY: "clamp(72px, 9vw, 152px)",
  sectionYTight: "clamp(48px, 6vw, 96px)",
  navHeight: { xs: 64, md: 76 },
};

/** Measure caps. Prose past ~70ch stops being readable. */
export const measure = {
  lede: "60ch",
  body: "70ch",
};

export const motion = {
  fast: "140ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "260ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "480ms cubic-bezier(0.16, 1, 0.3, 1)",
};

/**
 * Depth-of-field on the pinned hero, driven by scroll position.
 *
 * `blurMax` is deliberately below the point where the headline stops being
 * readable as a shape — the effect is meant to read as the hero receding, not
 * as a loading state. Scale stays above 0.95 for the same reason.
 */
export const heroDefocus = {
  blurMax: 13,
  opacityMin: 0.32,
  scaleMin: 0.955,
  liftMax: -56,
  /** Fraction of a viewport of scrolling the whole transition takes. */
  runway: 0.85,
};

// --- Back-compat -----------------------------------------------------------
// The case-study and inner pages still import these until they are rewritten.
export const SECTION_PX = { xs: "16px", sm: "24px", md: "32px", lg: "40px" };
export const SECTION_PY = { xs: "56px", md: "96px" };
export const CARD_RADIUS = radius.lg;
export const TILE_RADIUS = radius.md;
export const BUTTON_RADIUS = radius.pill;
export const BUTTON_PADDING = { px: 3, py: 1.4 };
