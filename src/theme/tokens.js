/**
 * 14Labs design tokens.
 *
 * Two themes, both built to the same rule: a quiet ground, one near-black ink,
 * and colour only where it means something.
 *
 *   light   white ground, navy pill buttons, green for links, dots and marks —
 *           the clean research-page look: white, type and space
 *   dark    #121317 ground, off-white type, white pill buttons and black cards,
 *           with green kept to highlights
 *
 *   navy    #0B1B36   primary action in the light theme, and the closing band
 *   green   #22C98A   highlight: dots, chart marks, glow on dark cards
 *   black   #0B0D12   the card colour for figures and imagery, in both themes
 *
 * Every value lives in `palettes`; `color` holds only CSS variable references
 * to them, so a component writes `color.ink` once and gets the right ink in
 * either theme with no JavaScript on the switch. The variables are emitted by
 * `themeCss` (injected in the root layout) and the active theme is the
 * `data-theme` attribute MUI sets on <html>.
 *
 * `primary` is the pill button. `deep` is the closing band — navy in light, a
 * raised navy-black in dark — and is no longer a button colour. `lime` is the
 * green highlight and `black` the card colour; both names are older than the
 * colours they now hold.
 */

export const palettes = {
  light: {
    // --- Ground -------------------------------------------------------------
    ground: "#FFFFFF",
    surface: "#F8F9FB",
    surfaceAlt: "#F1F3F6",
    ink: "#16181D",
    inkMuted: "#43474E",
    inkFaint: "#5F6368",
    rule: "#E6E8EC",
    ruleStrong: "#CDD2D9",

    // --- Primary action (navy pill) -----------------------------------------
    primary: "#0B1B36",
    onPrimary: "#FFFFFF",
    primaryHover: "#1C2F52",

    // --- Closing band -------------------------------------------------------
    deep: "#0B1B36",
    deepAlt: "#13264A",
    deepHover: "#1C2F52",
    onDeep: "#FFFFFF",
    onDeepMuted: "#AFBAD0",
    ruleOnDeep: "#24385E",

    // --- Green --------------------------------------------------------------
    // `accent` is green deep enough to be text on white; `lime` is the bright
    // green for dots, marks and anything on a dark card.
    accent: "#0E7A52",
    accentSoft: "#E6F5EE",
    onAccent: "#FFFFFF",
    lime: "#22C98A",
    limeSoft: "#9DEBC7",
    limeDeep: "#16A56F",

    // --- Soft band ----------------------------------------------------------
    soft: "#F4F6F9",
    softAlt: "#FFFFFF",
    softMark: "#0B1B36",
    ruleOnSoft: "#E1E5EB",

    // Greys: the neutral steps plates and thumbnails are cut from.
    grey05: "#F8F9FB",
    grey10: "#F1F3F6",
    grey20: "#E6E9EE",
    grey30: "#CDD3DC",
    grey45: "#6B7280",

    // --- Black card ---------------------------------------------------------
    black: "#0B0D12",
    blackAlt: "#14171E",
    // Chart steps on a black card: field, axis, mark, third series.
    blackField: "#1A1E27",
    blackAxis: "#2A2F3A",
    blackMark: "#4B5261",
    blackFaint: "#8A93A6",
    onBlack: "#F1F3F6",
    onBlackMuted: "#A9B0BE",
    ruleOnBlack: "#262B35",
  },

  /**
   * Dark is a cool near-black, not navy: the page recedes and the cards and
   * type carry it. The primary button inverts to a white pill — on a dark page
   * that is the clearest "act here" there is — and green lifts a step so it
   * stays legible as text.
   */
  dark: {
    ground: "#121317",
    surface: "#1B1C21",
    surfaceAlt: "#202127",
    ink: "#E9EAEE",
    inkMuted: "#BFC3CB",
    inkFaint: "#9AA0AA",
    rule: "#2A2C33",
    ruleStrong: "#3B3E46",

    primary: "#E9EAEE",
    onPrimary: "#121317",
    primaryHover: "#FFFFFF",

    deep: "#151A28",
    deepAlt: "#1C2233",
    deepHover: "#242B40",
    onDeep: "#F1F3F6",
    onDeepMuted: "#AEB6C8",
    ruleOnDeep: "#2A3148",

    accent: "#5EE0A6",
    accentSoft: "#1A2A22",
    onAccent: "#121317",
    lime: "#3DDC97",
    limeSoft: "#A6EFC6",
    limeDeep: "#2BB673",

    soft: "#17181D",
    softAlt: "#1E2026",
    softMark: "#5EE0A6",
    ruleOnSoft: "#2A2C33",

    grey05: "#17181D",
    grey10: "#1B1C21",
    grey20: "#24262C",
    grey30: "#33363E",
    grey45: "#8C929C",

    black: "#000000",
    blackAlt: "#0B0C0F",
    blackField: "#141519",
    blackAxis: "#26282E",
    blackMark: "#474B55",
    blackFaint: "#7D8390",
    onBlack: "#E9EAEE",
    onBlackMuted: "#A2A7B1",
    ruleOnBlack: "#202227",
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

// One family for display and text, as the reference pages do. Mono and serif
// stay for code and long-form research prose.
export const font = {
  display: "var(--font-sans)",
  body: "var(--font-sans)",
  mono: "var(--font-mono)",
  serif: "var(--font-serif)",
};

/**
 * Display steps run at weight 400 with moderately tight tracking. Google Sans
 * Flex has an optical-size axis, so large settings tighten on their own and
 * the tracking here only has to finish the job.
 */
export const type = {
  display: "clamp(2.75rem, 0.5rem + 7.4vw, 7.5rem)",
  h1: "clamp(2.5rem, 1.4rem + 4.2vw, 5rem)",
  h2: "clamp(2rem, 1.35rem + 2.6vw, 3.5rem)",
  h3: "clamp(1.375rem, 1.2rem + 0.75vw, 1.875rem)",
  h4: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)",
  lede: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)",
  body: "1.0625rem",
  small: "0.9375rem",
  eyebrow: "0.875rem",
};

export const radius = {
  none: 0,
  sm: "6px",
  md: "12px",
  lg: "20px",
  xl: "28px",
  card: "28px",
  pill: "999px",
};

export const layout = {
  maxWidth: 1320,
  narrow: 780,
  gutter: { xs: "16px", sm: "24px", md: "32px", lg: "40px" },
  // Half-gaps: two adjacent sections each contribute one, so the gap between
  // them is 2x this.
  gapY: "clamp(40px, 4.5vw, 72px)",
  gapYTight: "clamp(28px, 3vw, 44px)",
  // Padding inside an inset slab, which is its own enclosure and needs a real
  // internal margin rather than a half-gap.
  slabY: "clamp(44px, 5.5vw, 88px)",
  sectionY: "clamp(72px, 9vw, 152px)",
  sectionYTight: "clamp(56px, 7vw, 120px)",
  navHeight: { xs: 64, md: 72 },
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
