import Image from "next/image";
import { Box } from "@mui/material";
import { showInScheme } from "@/theme/colorScheme";

// The 14Labs logo: colour on light backgrounds, white wordmark in dark mode,
// or all white (`white`) on top of a dark hero image.
function ThemedLogo({ white = false }) {
  // Whole pixels matching the SVG's own size, so the browser never rescales
  // it. It's small and above the fold, so it loads eagerly.
  const props = { width: 86, height: 32, loading: "eager" };

  if (white) return <Image src="/media/logo-white.svg" alt="14Labs Logo" {...props} />;

  return (
    <>
      <Box component="span" sx={showInScheme("light")}>
        <Image src="/media/logo.svg" alt="14Labs Logo" {...props} />
      </Box>
      <Box component="span" sx={showInScheme("dark")}>
        <Image src="/media/logo-dark.svg" alt="14Labs Logo" {...props} />
      </Box>
    </>
  );
}

export default ThemedLogo;
