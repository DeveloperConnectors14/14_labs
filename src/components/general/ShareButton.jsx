"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { IosShare } from "@mui/icons-material";

// Opens the device share sheet where available (mostly phones); otherwise
// copies the page link and confirms with "Link copied".
function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The visitor closed the share sheet; nothing to do.
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={share}
      endIcon={<IosShare fontSize="small" />}
      sx={{ px: 2, py: 1, fontSize: { xs: "15px", md: "15px" }, color: "text.primary", "&:hover": { backgroundColor: "rgba(10,59,96,0.06)" } }}
    >
      {copied ? "Link copied" : "Share"}
    </Button>
  );
}

export default ShareButton;
