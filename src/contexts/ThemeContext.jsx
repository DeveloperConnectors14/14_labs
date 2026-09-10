"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import { color, font, type, radius, motion, layout, palettes } from "@/theme/tokens";

const ThemeContext = createContext();

// Display scale: weight 300 with tight tracking, measured off fin.ai. Light
// weight only works at size — anything under ~28px stays at 400.
const displayHeading = (fontSize, { lineHeight = 1.0, letterSpacing = "-0.046em", weight = 300 } = {}) => ({
  fontFamily: font.display,
  fontWeight: weight,
  fontSize,
  lineHeight,
  letterSpacing,
});

// MUI derives its own hover and focus tints from the palette, so it is handed
// the literal values for each scheme. Everything else on the site reads
// `color.*`, which are CSS variables switched by the same attribute.
const schemePalette = (mode, p) => ({
  mode,
  primary: { main: p.ink, contrastText: p.ground },
  secondary: { main: p.accent, contrastText: p.onAccent },
  background: { default: p.ground, paper: p.surface },
  text: {
    primary: p.ink,
    secondary: p.inkMuted,
    disabled: p.inkFaint,
  },
  divider: p.rule,
});

export const ThemeProvider = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        // Both schemes are emitted as CSS variables and chosen by the
        // `data-theme` attribute on <html>. InitColorSchemeScript in the root
        // layout sets it before first paint, so a dark-mode visitor never sees
        // the light ground flash first.
        cssVariables: { colorSchemeSelector: "data-theme" },
        colorSchemes: {
          light: { palette: schemePalette("light", palettes.light) },
          dark: { palette: schemePalette("dark", palettes.dark) },
        },

        shape: { borderRadius: 24 },

        // Depth comes from the surface split and the bands, not from blur.
        shadows: Array(25).fill("none"),

        typography: {
          fontFamily: font.body,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 600,

          display: displayHeading(type.display, { lineHeight: 0.95, letterSpacing: "-0.05em" }),
          h1: displayHeading(type.h1, { lineHeight: 0.98 }),
          h2: displayHeading(type.h2, { lineHeight: 1.02, letterSpacing: "-0.042em" }),
          h3: displayHeading(type.h3, {
            lineHeight: 1.2,
            letterSpacing: "-0.022em",
            weight: 400,
          }),
          h4: displayHeading(type.h4, {
            lineHeight: 1.3,
            letterSpacing: "-0.012em",
            weight: 500,
          }),

          lede: {
            fontFamily: font.body,
            fontWeight: 400,
            fontSize: type.lede,
            lineHeight: 1.5,
            letterSpacing: "-0.014em",
          },
          body1: {
            fontFamily: font.body,
            fontWeight: 400,
            fontSize: type.body,
            lineHeight: 1.65,
            letterSpacing: "-0.004em",
          },
          body2: {
            fontFamily: font.body,
            fontWeight: 400,
            fontSize: type.small,
            lineHeight: 1.6,
            letterSpacing: "-0.002em",
          },

          // Mono labels the page: eyebrows, indices, dates, tags.
          eyebrow: {
            fontFamily: font.mono,
            fontWeight: 500,
            fontSize: type.eyebrow,
            lineHeight: 1.4,
            letterSpacing: "0.11em",
            textTransform: "uppercase",
          },
          mono: {
            fontFamily: font.mono,
            fontWeight: 400,
            fontSize: "0.8125rem",
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          },
          caption: {
            fontFamily: font.mono,
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.5,
            letterSpacing: "0.03em",
          },
          button: {
            fontFamily: font.body,
            fontWeight: 500,
            fontSize: "0.9375rem",
            lineHeight: 1.2,
            letterSpacing: "-0.005em",
            textTransform: "none",
          },
        },

        breakpoints: {
          values: { xs: 0, sm: 640, md: 900, lg: 1200, xl: 1440 },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: { body: { backgroundColor: color.ground } },
          },

          MuiTypography: {
            defaultProps: {
              variantMapping: {
                display: "h1",
                lede: "p",
                eyebrow: "p",
                mono: "p",
              },
            },
          },

          MuiButton: {
            defaultProps: { disableElevation: true, disableRipple: true },
            styleOverrides: {
              root: {
                borderRadius: radius.pill,
                paddingInline: "24px",
                paddingBlock: "13px",
                minHeight: 48,
                transition: `background-color ${motion.fast}, color ${motion.fast}, border-color ${motion.fast}`,
              },
              contained: {
                backgroundColor: color.deep,
                color: color.onDeep,
                "&:hover": { backgroundColor: color.deepHover },
              },
              outlined: {
                borderColor: color.ruleStrong,
                color: color.ink,
                "&:hover": { borderColor: color.ink, backgroundColor: "transparent" },
              },
              text: {
                paddingInline: 0,
                minHeight: "auto",
                "&:hover": { backgroundColor: "transparent" },
              },
            },
          },

          MuiChip: {
            styleOverrides: {
              root: {
                height: 30,
                borderRadius: radius.pill,
                backgroundColor: color.surface,
                border: "1px solid " + color.rule,
                color: color.inkMuted,
                fontFamily: font.mono,
                fontSize: "0.75rem",
                letterSpacing: "0.02em",
              },
              label: { paddingInline: 12 },
            },
          },

          MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
              root: {
                backgroundColor: color.surface,
                backgroundImage: "none",
                borderRadius: radius.lg,
                boxShadow: "none",
              },
            },
          },

          MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: { root: { backgroundImage: "none" } },
          },

          MuiAppBar: {
            defaultProps: { elevation: 0, color: "transparent" },
            styleOverrides: { root: { backgroundImage: "none", boxShadow: "none" } },
          },

          MuiDivider: {
            styleOverrides: { root: { borderColor: color.rule } },
          },

          MuiContainer: {
            defaultProps: { maxWidth: false },
            styleOverrides: {
              root: {
                maxWidth: layout.maxWidth,
                marginInline: "auto",
                paddingInline: layout.gutter.xs,
                "@media (min-width:640px)": { paddingInline: layout.gutter.sm },
                "@media (min-width:900px)": { paddingInline: layout.gutter.md },
                "@media (min-width:1200px)": { paddingInline: layout.gutter.lg },
              },
            },
          },

          MuiLink: {
            defaultProps: { underline: "none" },
            styleOverrides: { root: { transition: `color ${motion.fast}` } },
          },
        },
      }),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme }}>
      {/* Transitions are suspended for the one frame the theme flips, or every
          band on the page would cross-fade at its own speed. */}
      <MuiThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Error in ThemeProvider");
  }
  return context;
};
