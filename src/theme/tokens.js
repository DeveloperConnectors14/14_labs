/**
 * 14Labs design tokens.
 *
 * Two themes, both built to the same rule: a quiet ground, one near-black ink,
 * and colour only where it means something.
 *
 *   light   a cool off-white ground, navy pill buttons, the logo's teal-green
 *           for links, dots and marks
 *   dark    a blue-black ground, off-white type, white pill buttons and black
 *           cards, with teal kept to highlights
 *
 *   navy    #0B1B36   primary action in the light theme, and the closing band
 *   teal    #14C9A5   highlight: dots, chart marks, glow on dark surfaces — a
 *                     step off the logo's own #00D3B1, so the page and the mark
 *                     are visibly one brand
 *   black   #0A0D13   the card colour for figures and imagery, in both themes
 *
 * Every value lives in `palettes`; `color` holds only CSS variable references
 * to them, so a component writes `color.ink` once and gets the right ink in
 * either theme with no JavaScript on the switch. The variables are emitted by
 * `themeCss` (injected in the root layout) and the active theme is the
 * `data-theme` attribute MUI sets on <html>.
 *
 * `primary` is the pill button. `deep` is the closing band — navy in light, a
 * raised navy-black in dark — and is no longer a button colour. `lime` is the
 * teal highlight and `black` the card colour; both names are older than the
 * colours they now hold.
 */

export const palettes = {
  light: {
    // --- Ground -------------------------------------------------------------
    ground: "#FAFBFC",
    surface: "#F3F5F8",
    surfaceAlt: "#ECEFF3",
    ink: "#11151C",
    inkMuted: "#414753",
    inkFaint: "#5B6270",
    rule: "#E3E7EC",
    ruleStrong: "#C9D0D9",

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

    // --- Teal ---------------------------------------------------------------
    // `accent` is teal deep enough to be text on the ground; `lime` is the
    // bright teal for dots, marks and anything on a dark surface.
    accent: "#0A7563",
    accentSoft: "#E3F6F1",
    onAccent: "#FFFFFF",
    lime: "#14C9A5",
    limeSoft: "#95EBD9",
    limeDeep: "#0FA38A",

    // --- Soft band ----------------------------------------------------------
    soft: "#F1F4F8",
    softAlt: "#FFFFFF",
    softMark: "#0B1B36",
    ruleOnSoft: "#DFE4EA",

    // Greys: the neutral steps plates and thumbnails are cut from.
    grey05: "#F5F7F9",
    grey10: "#EEF1F5",
    grey20: "#E3E7ED",
    grey30: "#CAD1DB",
    grey45: "#687080",

    // --- Black card ---------------------------------------------------------
    black: "#0A0D13",
    blackAlt: "#131720",
    // Chart steps on a black card: field, axis, mark, third series.
    blackField: "#191E29",
    blackAxis: "#29303D",
    blackMark: "#4A5262",
    blackFaint: "#8892A5",
    onBlack: "#EEF1F5",
    onBlackMuted: "#A8B0BF",
    ruleOnBlack: "#252B36",
  },

  /**
   * Dark is a blue-black, not neutral grey: the page recedes and the cards
   * and type carry it. The primary button inverts to a white pill — on a dark
   * page that is the clearest "act here" there is — and teal lifts a step so
   * it stays legible as text.
   */
  dark: {
    ground: "#0B0E13",
    surface: "#12161D",
    surfaceAlt: "#171C24",
    ink: "#E8ECF2",
    inkMuted: "#B5BDCA",
    inkFaint: "#8C95A4",
    rule: "#222833",
    ruleStrong: "#333B48",

    primary: "#E8ECF2",
    onPrimary: "#0B0E13",
    primaryHover: "#FFFFFF",

    deep: "#111A2B",
    deepAlt: "#17223A",
    deepHover: "#1F2B46",
    onDeep: "#EEF1F5",
    onDeepMuted: "#AEB8CC",
    ruleOnDeep: "#27324C",

    accent: "#4FE0C0",
    accentSoft: "#10241F",
    onAccent: "#0B0E13",
    lime: "#2EDDB6",
    limeSoft: "#9CF0DD",
    limeDeep: "#22B797",

    soft: "#10141A",
    softAlt: "#161B23",
    softMark: "#4FE0C0",
    ruleOnSoft: "#222833",

    grey05: "#10141A",
    grey10: "#141920",
    grey20: "#1C222B",
    grey30: "#2B333F",
    grey45: "#88909E",

    black: "#040609",
    blackAlt: "#0A0D12",
    blackField: "#11151C",
    blackAxis: "#232A35",
    blackMark: "#434B59",
    blackFaint: "#7B8494",
    onBlack: "#E8ECF2",
    onBlackMuted: "#A0A8B6",
    ruleOnBlack: "#1C212A",
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

// One family for display and text. Mono and serif stay for code and
// long-form research prose.
export const font = {
  display: "var(--font-sans)",
  body: "var(--font-sans)",
  mono: "var(--font-mono)",
  serif: "var(--font-serif)",
  // Pencil notes beside the drawn arrows only.
  hand: "var(--font-hand)",
};

/**
 * Display steps run at weight 400 with moderately tight tracking.
 * Text steps stay at 400.
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
