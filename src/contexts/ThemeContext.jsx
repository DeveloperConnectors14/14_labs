"use client";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const theme = createTheme({
    palette: {
      mode: "light",

      primary: {
        main: "#0A3B60",
        contrastText: "#d1d5db",
      },

      secondary: {
        main: "#00D3B1",
        contrastText: "#FFFFFF",
      },

      background: {
        default: "#FAFAFA",
        paper: "#FFFFFF",
      },

      text: {
        primary: "#0A3B60",
        secondary: "#00D3B1",
        grey: "#808080",
        black: "#0c0c0c",
      },

      divider: "#e4e5eb",

      customColors: {
        hardGradient: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)",
        softGradient: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
      },
    },

    typography: {
      fontFamily: "'Instrument Sans', sans-serif",
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      h1: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: "28px",
        "@media (min-width:640px)": { fontSize: "38px" },
        "@media (min-width:1024px)": { fontSize: "48px" },
      },
      h2: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: "26px",
        "@media (min-width:640px)": { fontSize: "32px" },
        "@media (min-width:1024px)": { fontSize: "48px" },
      },
      h3: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 700,
        lineHeight: 1.3,
        fontSize: "20px",
        "@media (min-width:640px)": { fontSize: "22px" },
        "@media (min-width:1024px)": { fontSize: "24px" },
      },
      h4: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 600,
        lineHeight: 1.3,
        fontSize: "18px",
        "@media (min-width:640px)": { fontSize: "22px" },
        "@media (min-width:1024px)": { fontSize: "26px" },
      },
      body1: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: "16px",
        "@media (min-width:640px)": { fontSize: "17px" },
        "@media (min-width:1024px)": { fontSize: "18px" },
      },
      body2: {
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: "14px",
        "@media (min-width:640px)": { fontSize: "15px" },
        "@media (min-width:1024px)": { fontSize: "16px" },
      },
      button: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 600,
        lineHeight: 1.2,
        textTransform: "uppercase",
        fontSize: "16px",
        "@media (min-width:640px)": { fontSize: "18px" },
        "@media (min-width:1024px)": { fontSize: "20px" },
      },
      caption: {
        fontFamily: "'IBM Plex Mono', monospace",
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
          root: {
            backgroundColor: "#ffffff",
            borderRadius: 16,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            minHeight: 36,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e2f2f1",
            color: "#0a3b60",
          },
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
          root: {
            backgroundColor: "#ffffff",
            color: "#0a3b60",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          },
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

  return (
    <ThemeContext.Provider value={{ theme }}>
      <MuiThemeProvider theme={theme}>
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

