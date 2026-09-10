/**
 * 14Labs design tokens.
 *
 * Four brand colours, each with one job:
 *
 *   forest  #1E4634   the primary. Actions, links, focus, the one lit word in
 *                     the hero, and a single closing band. Nothing else — a
 *                     primary that is on every surface stops meaning "act here"
 *   cream   #F6E9E0   the alternate surface; the ground is a lighter step of it
 *   peach   #F9D2BA   the warm band, and the highlight on dark bands
 *   brown   #5E3122   the dark band: footer and instrument panels
 *
 * Everything between them is a warm sand ramp, not a green one. Most of the
 * page is neutral on purpose; the colour lands harder for being rationed.
 *
 * There are two themes. Every value lives in `palettes`; `color` holds only CSS
 * variable references to them, so a component writes `color.ink` once and gets
 * the right ink in either theme with no JavaScript on the switch. The variables
 * are emitted by `themeCss` (injected in the root layout) and the active theme
 * is the `data-theme` attribute MUI sets on <html>.
 *
 * A few names are kept from the old palette so nothing downstream had to be
 * renamed: `lime` is the highlight (peach) and `black` is the dark band (brown).
 */

export const palettes = {
  light: {
    // --- Ground -------------------------------------------------------------
    ground: "#FAF5F0",
    surface: "#FFFDFA",
    surfaceAlt: "#F6E9E0",
    ink: "#231813",
    inkMuted: "#5C4A40",
    inkFaint: "#6F5C50",
    rule: "#EBDDD2",
    ruleStrong: "#D9C4B5",

    // --- Forest (primary) ---------------------------------------------------
    deep: "#1E4634",
    deepAlt: "#173729",
    deepHover: "#15342A",
    accent: "#1E4634",
    accentSoft: "#E6ECE7",
    // Text set inside an accent fill. Flips with the accent itself.
    onAccent: "#FAF5F0",

    // --- Highlight (peach) --------------------------------------------------
    lime: "#F9D2BA",
    limeSoft: "#FCE6D8",
    limeDeep: "#C98763",

    // --- Warm band (peach) --------------------------------------------------
    // Text on it is the ordinary ink, so a section written for the ground
    // works here unchanged. `warmMark` is its numeral and index colour.
    warm: "#F9D2BA",
    warmAlt: "#FCE3D3",
    warmMark: "#5E3122",
    ruleOnWarm: "#EDBB9D",

    // Sand: the neutral steps cards and plates are cut from. Named by depth.
    sand05: "#F7EEE7",
    sand10: "#F2E5DB",
    sand20: "#EADBCF",
    sand30: "#DCC7B8",
    sand45: "#8A6D5B",

    // Two greens survive in the ramp, for chart series only.
    green60: "#3F7A5C",
    green70: "#2B5E47",

    // --- Brown band ---------------------------------------------------------
    black: "#5E3122",
    blackAlt: "#4E2819",
    // Chart steps on the brown band: field, axis, mark, third series.
    blackField: "#6C3D2D",
    blackAxis: "#85523F",
    blackMark: "#A87866",
    blackFaint: "#BF9585",
    onBlack: "#F6E9E0",
    onBlackMuted: "#D3B5A5",
    ruleOnBlack: "#76412F",

    // --- On the forest band -------------------------------------------------
    onDeep: "#F6E9E0",
    onDeepMuted: "#A8BFB1",
    ruleOnDeep: "#2F5B47",
  },

  /**
   * Dark is warm charcoal — the brown taken almost to black — not green-black:
   * a dark page in the primary colour is the same "all green" problem, only
   * darker. Colours are desaturated tonal steps rather than inversions. Forest
   * is lifted a step so a button still separates from the ground, and the text
   * accent becomes a light sage so green stays the primary in both themes.
   */
  dark: {
    ground: "#16110E",
    surface: "#1E1814",
    surfaceAlt: "#261E19",
    ink: "#F6E9E0",
    inkMuted: "#CDBBAE",
    inkFaint: "#A08E81",
    rule: "#30261F",
    ruleStrong: "#44372E",

    deep: "#24533F",
    deepAlt: "#1C4332",
    deepHover: "#2E6750",
    accent: "#93C6A9",
    accentSoft: "#22302A",
    onAccent: "#16110E",

    lime: "#F9D2BA",
    limeSoft: "#FCE6D8",
    limeDeep: "#D9926B",

    warm: "#33241D",
    warmAlt: "#3D2C23",
    warmMark: "#F9D2BA",
    ruleOnWarm: "#4A372C",

    sand05: "#1D1713",
    sand10: "#221B17",
    sand20: "#2A221C",
    sand30: "#372C25",
    sand45: "#9A8474",

    green60: "#7DB394",
    green70: "#A8CDB8",

    black: "#3A2219",
    blackAlt: "#2F1B13",
    blackField: "#45291E",
    blackAxis: "#5C3A2C",
    blackMark: "#8F6453",
    blackFaint: "#AD8573",
    onBlack: "#F6E9E0",
    onBlackMuted: "#CFAE9D",
    ruleOnBlack: "#553226",

    onDeep: "#F6E9E0",
    onDeepMuted: "#B3C9BC",
    ruleOnDeep: "#336450",
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
