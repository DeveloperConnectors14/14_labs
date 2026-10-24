"use client";

import { Button } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import { BUTTON_RADIUS } from "@/theme/tokens";

// Teal pill that smoothly scrolls to an element on the same page. The href
// stays as a fallback; reduced-motion visitors get an instant jump.
function ScrollToButton({ targetId, children }) {
  const onClick = (event) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <Button
      component="a"
      href={`#${targetId}`}
      onClick={onClick}
      variant="contained"
      endIcon={<ArrowDownward fontSize="small" />}
      sx={{
        borderRadius: BUTTON_RADIUS,
        p: { xs: "9px 16px", md: "10px 22px" },
        fontSize: { xs: "14px", md: "15px" },
        whiteSpace: "nowrap",
        backgroundColor: "secondary.main",
        color: "text.primary",
        boxShadow: "none",
        "&:hover": { boxShadow: "none", backgroundColor: "primary.contrastText", color: "text.primary" },
      }}
    >
      {children}
    </Button>
  );
}

export default ScrollToButton;
