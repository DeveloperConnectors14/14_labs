import { color } from "@/theme/tokens";

/**
 * Every visual on the site is drawn from one of three palettes: on the light
 * ground, on the deep green band, or on black. They are kept here rather than in each
 * figure so a chart can never quietly invent a colour.
 *
 * Lime is absent from the light palette on purpose — it sits at roughly 1.9:1
 * on grey and is unreadable as a line or a label there.
 */
const PALETTES = {
  light: {
    field: color.green20,
    grid: color.rule,
    axis: color.ruleStrong,
    mark: color.green45,
    series: [color.deep, color.green60, color.green30],
    highlight: color.accent,
    // Text sitting *inside* a filled highlight, which is dark on the light
    // palette and bright on the deep one — so it flips.
    onHighlight: color.onDeep,
    label: color.inkFaint,
    labelStrong: color.inkMuted,
    glow: color.accent,
  },
  black: {
    field: "#1F1F1F",
    grid: color.ruleOnBlack,
    axis: "#3A3A3A",
    mark: "#6B6B6B",
    series: [color.lime, color.limeSoft, "#8C8C8C"],
    highlight: color.lime,
    onHighlight: color.black,
    label: "#8C8C8C",
    labelStrong: "#D4D4D4",
    glow: color.lime,
  },

  deep: {
    field: color.ruleOnDeep,
    grid: color.ruleOnDeep,
    axis: color.green70,
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
