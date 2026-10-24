"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";
import { BUTTON_RADIUS } from "@/theme/tokens";

function CopyCitationButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={copy}
      variant="outlined"
      size="small"
      startIcon={copied ? <Check /> : <ContentCopy />}
      sx={{ borderRadius: BUTTON_RADIUS, px: 2, color: "text.primary", borderColor: "divider" }}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export default CopyCitationButton;
