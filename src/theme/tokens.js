/**
 * 14Labs design tokens.
 *
 * The palette is four brand colours and the steps between them:
 *
 *   forest  #1E4634   full-bleed bands, primary actions, the mark
 *   cream   #F6E9E0   the light ground
 *   peach   #F9D2BA   highlight — legible on forest, on brown and on the dark
 *                     ground; never text on cream, where it is ~1.2:1
 *   brown   #5E3122   the second dark band: footer and instrument panels
 *
 * There are two themes. Every value lives in `palettes`; `color` holds only CSS
 * variable references to them, so a component writes `color.ink` once and gets
 * the right ink in either theme with no JavaScript on the switch. The variables
 * are emitted by `themeCss` (injected in the root layout) and the active theme
 * is the `data-theme` attribute MUI sets on <html>.
 *
 * Token names describe role rather than hue, and a few are kept from the old
 * palette so nothing downstream had to be renamed: `lime` is the highlight (now
 * peach) and `black` is the second dark band (now brown).
 */

export const palettes = {
  light: {
    // --- Ground -------------------------------------------------------------
    ground: "#F6E9E0",
    surface: "#FDF8F4",
    surfaceAlt: "#EFDFD3",
    ink: "#2A1B14",
    inkMuted: "#5E4A3F",
    inkFaint: "#7A6456",
    rule: "#E7D4C6",
    ruleStrong: "#D3BBAA",

    // --- Forest -------------------------------------------------------------
    deep: "#1E4634",
    deepAlt: "#173729",
    // What a forest button turns on hover. Ink here; a lifted green in the dark
    // theme, where ink is cream and would swallow the cream label.
    deepHover: "#2A1B14",
    accent: "#24573F",
    accentSoft: "#E4E4D6",
    // Text set inside an accent fill. Flips with the accent itself.
    onAccent: "#F6E9E0",

    // --- Highlight (peach) --------------------------------------------------
    lime: "#F9D2BA",
    limeSoft: "#FCE7DA",
    limeDeep: "#D9926B",

    // Tints of forest over the surface, named by how much green is in them so
    // a card can pick its own step.
    green05: "#F1EEE7",
    green10: "#E6E6DE",
    green20: "#D2D8CF",
    green30: "#B6C4B8",
    green45: "#8FA697",
    green60: "#4F8069",
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
   * Dark is not the light theme inverted. The ground is forest taken almost to
   * black, so the page still reads as the same brand; the bands keep their own
   * colours and simply sit lighter than the ground instead of darker. Peach
   * takes over as the accent, because forest text on a forest-black ground is
   * not text.
   */
  dark: {
    ground: "#0F1A15",
    surface: "#15241D",
    surfaceAlt: "#1B2D24",
    ink: "#F6E9E0",
    inkMuted: "#CDBBAE",
    inkFaint: "#9E8C7F",
    rule: "#24362C",
    ruleStrong: "#35493E",

    deep: "#1E4634",
    deepAlt: "#183A2B",
    deepHover: "#2B5E47",
    accent: "#F9D2BA",
    accentSoft: "#3A2E27",
    onAccent: "#2A1B14",

    lime: "#F9D2BA",
    limeSoft: "#FCE7DA",
    limeDeep: "#D9926B",

    // The ramp runs away from the ground rather than towards green, so every
    // step keeps the job it has in the light theme.
    green05: "#14231C",
    green10: "#192B22",
    green20: "#1F3429",
    green30: "#2C4638",
    green45: "#486B58",
    green60: "#7FA792",
    green70: "#A9C6B5",

    black: "#4A2619",
    blackAlt: "#3C1F14",
    blackField: "#573122",
    blackAxis: "#6E4231",
    blackMark: "#9A6C5A",
    blackFaint: "#B48C7C",
    onBlack: "#F6E9E0",
    onBlackMuted: "#CFAE9D",
    ruleOnBlack: "#63372A",

    onDeep: "#F6E9E0",
    onDeepMuted: "#A8BFB1",
    ruleOnDeep: "#2F5B47",
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
