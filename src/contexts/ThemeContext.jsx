"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useContext } from "react";
import { FONT_SANS, FONT_MONO } from "@/theme/tokens";

const ThemeContext = createContext();

// Brand colours that stay the same in light and dark mode, e.g. the navy label
// on teal buttons. Everything theme-dependent uses the palette below instead.
const brand = { navy: "#0A3B60", teal: "#00D3B1" };

// Everyone starts in light mode (the site's main look); dark mode is opt-in
// via the navbar toggle and then remembered. Colours are emitted as CSS
// variables and switched by a
// class on <html> (set before first paint by InitColorSchemeScript in the
// root layout), so there is no flash of the wrong theme.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: brand.navy, contrastText: "#d1d5db" },
        secondary: { main: brand.teal, contrastText: "#FFFFFF" },
        background: { default: "#FAFAFA", paper: "#FFFFFF" },
        text: { primary: brand.navy, secondary: brand.teal, grey: "#808080", black: "#0c0c0c" },
        divider: "#e4e5eb",
        brand,
        chip: { background: "#e2f2f1", text: brand.navy },
        customColors: {
          hardGradient: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)",
          softGradient: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#7DB8E8", contrastText: "#d1d5db" },
        secondary: { main: brand.teal, contrastText: "#FFFFFF" },
        background: { default: "#071521", paper: "#0D2131" },
        text: { primary: "#E6EDF3", secondary: brand.teal, grey: "#93A4B3", black: "#F3F6F8" },
        divider: "rgba(255,255,255,0.12)",
        brand,
        chip: { background: "rgba(0,211,177,0.14)", text: "#CFF5EE" },
        customColors: {
          hardGradient: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)",
          softGradient: "linear-gradient(90deg, #0a2629, #0b2230, #101d31, #111b2c)",
        },
      },
    },
  },

    typography: {
      fontFamily: FONT_SANS,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      h1: {
        fontFamily: FONT_SANS,
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: "28px",
        "@media (min-width:640px)": { fontSize: "38px" },
        "@media (min-width:1024px)": { fontSize: "48px" },
      },
      h2: {
        fontFamily: FONT_SANS,
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: "26px",
        "@media (min-width:640px)": { fontSize: "32px" },
        "@media (min-width:1024px)": { fontSize: "48px" },
      },
      h3: {
        fontFamily: FONT_SANS,
        fontWeight: 700,
        lineHeight: 1.3,
        fontSize: "20px",
        "@media (min-width:640px)": { fontSize: "22px" },
        "@media (min-width:1024px)": { fontSize: "24px" },
      },
      h4: {
        fontFamily: FONT_SANS,
        fontWeight: 600,
        lineHeight: 1.3,
        fontSize: "18px",
        "@media (min-width:640px)": { fontSize: "22px" },
        "@media (min-width:1024px)": { fontSize: "26px" },
      },
      body1: {
        fontFamily: FONT_SANS,
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: "16px",
        "@media (min-width:640px)": { fontSize: "17px" },
        "@media (min-width:1024px)": { fontSize: "18px" },
      },
      body2: {
        fontFamily: FONT_SANS,
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: "14px",
        "@media (min-width:640px)": { fontSize: "15px" },
        "@media (min-width:1024px)": { fontSize: "16px" },
      },
      button: {
        fontFamily: FONT_MONO,
        fontWeight: 600,
        lineHeight: 1.2,
        textTransform: "uppercase",
        fontSize: "16px",
        "@media (min-width:640px)": { fontSize: "18px" },
        "@media (min-width:1024px)": { fontSize: "20px" },
      },
      caption: {
        fontFamily: FONT_MONO,
        fontWeight: 500,
        lineHeight: 1.4,
        fontSize: "12px",
        "@media (min-width:640px)": { fontSize: "13px" },
        "@media (min-width:1024px)": { fontSize: "14px" },
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 1024,
        lg: 1230,
      },
    },

    components: {

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.vars.palette.background.paper,
            borderRadius: 16,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            minHeight: 36,
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.vars.palette.chip.background,
            color: theme.vars.palette.chip.text,
          }),
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
            "&:active": { boxShadow: "none" },
            "&:focus": { boxShadow: "none" },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.vars.palette.background.paper,
            color: theme.vars.palette.text.primary,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }),
        },
      },

    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "80px",
          paddingBottom: "80px",
        },
      },
    },
});

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={{ theme }}>
    <MuiThemeProvider theme={theme} defaultMode="light">
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  </ThemeContext.Provider>
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Error in ThemeProvider");
  }
  return context;
};

