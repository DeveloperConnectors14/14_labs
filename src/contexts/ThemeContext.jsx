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
      fontFamily: "sans-serif",
      fontWeightRegular: 400,
      fontWeightMedium: 500,
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
