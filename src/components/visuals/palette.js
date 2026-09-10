import { color } from "@/theme/tokens";

/**
 * Every visual on the site is drawn from one of three palettes: on the page
 * ground, on the closing band (`deep`), or on a black card (`black`). They are
 * kept here rather than in each figure so a chart can never quietly invent a
 * colour.
 *
 * Every entry is a theme variable, so a figure follows the light/dark switch
 * without knowing it exists. On the ground a chart gets green for the series
 * that matters, the primary (navy, or off-white in dark) for the second, and
 * grey for everything else. On a black card the lead is the bright green.
 */
const PALETTES = {
  light: {
    field: color.grey20,
    grid: color.rule,
    axis: color.ruleStrong,
    mark: color.grey45,
    series: [color.accent, color.primary, color.grey30],
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
