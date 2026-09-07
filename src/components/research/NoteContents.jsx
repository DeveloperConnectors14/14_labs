"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { color, layout, motion } from "@/theme/tokens";

/**
 * The contents of a note, pinned beside it, with the section you are reading
 * marked.
 *
 * Scroll position is read from an IntersectionObserver rather than from a
 * scroll handler: the browser does the work off the main thread, and a long
 * note scrolled fast never queues up a hundred layout reads.
 *
 * The rootMargin is deliberately lopsided. A heading counts as "current" from
 * the moment it reaches the top quarter of the viewport until the next one
 * does, which is where a reader's eye actually is — centring the band instead
 * makes the marker lag a full section behind the text.
 */
function NoteContents({ items }) {
  const [active, setActive] = useState(items?.[0]?.id);

  useEffect(() => {
    if (!items?.length) return undefined;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!headings.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (!items?.length) return null;

  return (
    <Box
      component="nav"
      aria-label="Contents"
      sx={{
        display: { xs: "none", md: "block" },
        position: "sticky",
        top: `${layout.navHeight.md + 32}px`,
      }}
    >
      <Typography variant="eyebrow" sx={{ color: color.inkFaint }}>
        Contents
      </Typography>

      <Box
        sx={{
          mt: 2.5,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid",
          borderColor: color.rule,
        }}
      >
        {items.map((item) => {
          const current = item.id === active;

          return (
            <Box
              key={item.id}
              component="a"
              href={`#${item.id}`}
              sx={{
                position: "relative",
                paddingBlock: 1.1,
                paddingInline: 2,
                textDecoration: "none",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                letterSpacing: "-0.005em",
                color: current ? color.ink : color.inkFaint,
                transition: `color ${motion.fast}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "-1px",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: current ? color.accent : "transparent",
                  transition: `background-color ${motion.fast}`,
                },
                "&:hover": { color: color.ink },
              }}
            >
              {item.text}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default NoteContents;
