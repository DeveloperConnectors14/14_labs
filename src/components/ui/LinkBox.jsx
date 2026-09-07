"use client";

import Link from "next/link";
import { Box } from "@mui/material";

/**
 * A Box that renders as a Next.js Link.
 *
 * Needed because `component={Link}` passes a function across the server/client
 * boundary, which React Server Components reject. Keeping the boundary in one
 * small client component lets every section above it stay on the server.
 */
function LinkBox({ href, children, ...rest }) {
  return (
    <Box component={Link} href={href} {...rest}>
      {children}
    </Box>
  );
}

export default LinkBox;
