"use client";

import { Box, IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { showInScheme } from "@/theme/colorScheme";

// Hidden on screen but read by screen readers (the standard "sr-only" styles).
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

// Switches between light (the default) and dark mode; MUI remembers the choice.
// The icon and the screen-reader label both name the mode a click switches to.
function ThemeToggle({ color }) {
  const { mode, systemMode, setMode } = useColorScheme();

  const toggle = () => {
    const current = mode === "system" ? systemMode : mode;
    setMode(current === "dark" ? "light" : "dark");
  };

  return (
    <IconButton onClick={toggle} title="Switch light or dark mode" sx={{ color }}>
      <DarkModeOutlined fontSize="small" sx={showInScheme("light")} />
      <LightModeOutlined fontSize="small" sx={showInScheme("dark")} />
      <Box component="span" sx={[visuallyHidden, showInScheme("light", "inline")]}>Switch to dark mode</Box>
      <Box component="span" sx={[visuallyHidden, showInScheme("dark", "inline")]}>Switch to light mode</Box>
    </IconButton>
  );
}

export default ThemeToggle;
