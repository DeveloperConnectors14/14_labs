/**
 * 14Labs design tokens.
 *
 * The palette is the logo's. The wordmark is indigo and the mark is teal, and
 * everything else on the page is a cool neutral that stays out of their way:
 *
 *   indigo    #2E368F   the primary. Actions, links, focus, the lit word in the
 *                       hero, one stat tile and the closing band
 *   teal      #00D3B1   the mark. Highlights on dark bands, and small marks —
 *                       a dot, a chart line — on light ones. Never body text on
 *                       a light ground, where it is ~2:1
 *   midnight  #0F1433   the dark band: footer and instrument panels
 *   greys               the rest — a cool ramp from white to slate
 *
 * Two brand colours and a quiet ground is what reads as decent: the colour is
 * rationed, so where it appears means something.
 *
 * There are two themes. Every value lives in `palettes`; `color` holds only CSS
 * variable references to them, so a component writes `color.ink` once and gets
 * the right ink in either theme with no JavaScript on the switch. The variables
 * are emitted by `themeCss` (injected in the root layout) and the active theme
 * is the `data-theme` attribute MUI sets on <html>.
 *
 * A few names are kept from earlier palettes so nothing downstream had to be
 * renamed: `lime` is the highlight (teal), `deep` the primary fill (indigo) and
 * `black` the dark band (midnight).
 */

export const palettes = {
  light: {
    // --- Ground -------------------------------------------------------------
    ground: "#F7F8FA",
    surface: "#FFFFFF",
    surfaceAlt: "#EFF1F6",
    ink: "#121629",
    inkMuted: "#4A5068",
    inkFaint: "#5E6479",
    rule: "#E3E6EE",
    ruleStrong: "#CDD2DE",

    // --- Indigo (primary) ---------------------------------------------------
    deep: "#2E368F",
    deepAlt: "#262D7C",
    deepHover: "#1F2566",
    accent: "#2E368F",
    accentSoft: "#E9EBF8",
    // Text set inside an accent fill. Flips with the accent itself.
    onAccent: "#FFFFFF",

    // --- Highlight (teal) ---------------------------------------------------
    lime: "#00D3B1",
    limeSoft: "#7EE8D6",
    // The teal deep enough to hold a line or a dot on a light ground.
    limeDeep: "#009982",

    // --- Soft band ----------------------------------------------------------
    // A pale indigo wash for breaking up a run of white sections. Text on it
    // is the ordinary ink, so a section written for the ground works here
    // unchanged. `softMark` is its numeral and index colour.
    soft: "#EBEDF9",
    softAlt: "#F5F6FD",
    softMark: "#2E368F",
    ruleOnSoft: "#D5D9F0",

    // Greys: the neutral steps cards and plates are cut from. Named by depth.
    grey05: "#F2F4F8",
    grey10: "#ECEFF5",
    grey20: "#E1E5EE",
    grey30: "#CBD1DE",
    grey45: "#6B7289",

    // --- Midnight band ------------------------------------------------------
    black: "#0F1433",
    blackAlt: "#171D45",
    // Chart steps on the midnight band: field, axis, mark, third series.
    blackField: "#1B2150",
    blackAxis: "#2F3668",
    blackMark: "#5B6395",
    blackFaint: "#8B92BA",
    onBlack: "#EEF0F7",
    onBlackMuted: "#A7ADC8",
    ruleOnBlack: "#262D5A",

    // --- On the indigo band -------------------------------------------------
    onDeep: "#FFFFFF",
    onDeepMuted: "#C5C9EC",
    ruleOnDeep: "#454EA6",
  },

  /**
   * Dark is midnight, not black: the same indigo taken almost all the way down,
   * so the page is recognisably the same brand at night. Colours are lighter
   * tonal steps rather than inversions — indigo is lifted so a button still
   * separates from the ground, and link text becomes a light periwinkle, since
   * the light theme's indigo would vanish here.
   */
  dark: {
    ground: "#0D1020",
    surface: "#141830",
    surfaceAlt: "#1A1F3A",
    ink: "#EEF0F7",
    inkMuted: "#B4B9CF",
    inkFaint: "#8D93AD",
    rule: "#232845",
    ruleStrong: "#333A5C",

    deep: "#3A43A6",
    deepAlt: "#313996",
    deepHover: "#4751BA",
    accent: "#A5ACF7",
    accentSoft: "#1E2447",
    onAccent: "#0D1020",

    lime: "#2EE6C8",
    limeSoft: "#8FF0E0",
    limeDeep: "#21C2A7",

    soft: "#171C37",
    softAlt: "#1E2442",
    softMark: "#A5ACF7",
    ruleOnSoft: "#2A3056",

    grey05: "#151A31",
    grey10: "#191E37",
    grey20: "#20263F",
    grey30: "#2E3453",
    grey45: "#8A90AA",

    black: "#080B1A",
    blackAlt: "#0E1226",
    blackField: "#12172E",
    blackAxis: "#232949",
    blackMark: "#4B5279",
    blackFaint: "#7980A5",
    onBlack: "#EEF0F7",
    onBlackMuted: "#A3A9C3",
    ruleOnBlack: "#1C2140",

    onDeep: "#FFFFFF",
    onDeepMuted: "#D0D3F3",
    ruleOnDeep: "#525BBE",
  },
};

const cssVar = (key) => `--c-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
const ref = (key) => `var(${cssVar(key)})`;

// The cast keeps editor completion on `color.*`; fromEntries alone loses the keys.
const themed = /** @type {{ [K in keyof typeof palettes.light]: string }} */ (
  Object.fromEntries(Object.keys(palettes.light).map((key) => [key, ref(key)]))
);

export const color = {
  ...themed,

  // Aliases kept so the not-yet-rewritten case-study pages keep compiling.
  paper: ref("ground"),
  wash: ref("surfaceAlt"),
  washDeep: ref("rule"),
  inkDeep: ref("deep"),
  onInk: ref("onDeep"),
  onInkMuted: ref("onDeepMuted"),
  ruleOnInk: ref("ruleOnDeep"),
};

const declare = (palette) =>
  Object.entries(palette)
    .map(([key, value]) => `${cssVar(key)}:${value};`)
    .join("");

/** Both themes as one stylesheet. Injected once, in the root layout. */
export const themeCss = `:root{${declare(palettes.light)}}:root[data-theme="dark"]{${declare(
  palettes.dark
)}}`;

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

// --- Back-compat -----------------------------------------------------------
// The case-study and inner pages still import these until they are rewritten.
export const SECTION_PX = { xs: "16px", sm: "24px", md: "32px", lg: "40px" };
export const SECTION_PY = { xs: "56px", md: "96px" };
export const CARD_RADIUS = radius.lg;
export const TILE_RADIUS = radius.md;
export const BUTTON_RADIUS = radius.pill;
export const BUTTON_PADDING = { px: 3, py: 1.4 };
