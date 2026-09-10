import { color } from "@/theme/tokens";

/**
 * Every visual on the site is drawn from one of three palettes: on the page
 * ground, on the deep forest band, or on the brown band (keyed `black`, the
 * role it took over). They are kept here rather than in each figure so a chart
 * can never quietly invent a colour.
 *
 * Every entry is a theme variable, so a figure follows the light/dark switch
 * without knowing it exists. On the ground, the lead series is `accent` — forest
 * in the light theme, a light sage in the dark one — and everything behind it is
 * sand, so a chart has exactly one green line and it is the one that matters.
 * Peach never lands on cream, where it sits around 1.2:1.
 */
const PALETTES = {
  light: {
    field: color.sand20,
    grid: color.rule,
    axis: color.ruleStrong,
    mark: color.sand45,
    series: [color.accent, color.green60, color.sand30],
    highlight: color.accent,
    // Text sitting *inside* a filled highlight. It flips with the highlight.
    onHighlight: color.onAccent,
    label: color.inkFaint,
    labelStrong: color.inkMuted,
    glow: color.accent,
  },
  black: {
    field: color.blackField,
    grid: color.ruleOnBlack,
    axis: color.blackAxis,
    mark: color.blackMark,
    series: [color.lime, color.limeSoft, color.blackFaint],
    highlight: color.lime,
    onHighlight: color.black,
    label: color.onBlackMuted,
    labelStrong: color.onBlack,
    glow: color.lime,
  },

  deep: {
    field: color.ruleOnDeep,
    grid: color.ruleOnDeep,
    axis: color.ruleOnDeep,
    mark: color.onDeepMuted,
    series: [color.lime, color.limeSoft, color.onDeepMuted],
    highlight: color.lime,
    onHighlight: color.deepAlt,
    label: color.onDeepMuted,
    labelStrong: color.onDeep,
    glow: color.lime,
  },
};

export const paletteFor = (tone) => PALETTES[tone] ?? PALETTES.light;
