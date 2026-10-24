import { Fragment } from "react";
import { Box, Typography } from "@mui/material";

// Shared building blocks for article-style pages (research papers, case studies).

// Swap ordinary hyphens for non-breaking ones (U+2011) so words like
// "meta-review" never split across lines. Only the displayed text changes.
export const keepHyphenatedWords = (text) => text.replace(/-/g, "\u2011");

export function SectionTitle({ children }) {
  return (
    <Typography variant="h4" component="h2" sx={{ color: "text.primary", mt: { xs: 5, md: 6 }, mb: 2 }}>
      {children}
    </Typography>
  );
}

// Label/value pairs in a two-column grid. `rows` is a list of [label, value].
export function DetailsList({ rows }) {
  return (
    <Box component="dl" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "160px 1fr" }, columnGap: 3, rowGap: { xs: 0.5, sm: 1.5 }, m: 0 }}>
      {rows.map(([label, value]) => (
        <Fragment key={label}>
          <Typography component="dt" variant="body2" color="text.grey" sx={{ mt: { xs: 1.5, sm: 0 } }}>
            {label}
          </Typography>
          <Typography component="dd" variant="body1" color="text.primary" sx={{ m: 0, overflowWrap: "anywhere" }}>
            {value}
          </Typography>
        </Fragment>
      ))}
    </Box>
  );
}

// Teal-dash bullet list; each item is a string or a { title, desc } pair.
export function DashList({ items }) {
  return (
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
      {items.map((item) => {
        const key = typeof item === "string" ? item : item.title || item.desc;
        return (
          <Typography key={key.slice(0, 40)} component="li" variant="body1" color="text.primary" sx={{ display: "flex", gap: 1.5 }}>
            <Box component="span" aria-hidden sx={{ color: "secondary.main", flexShrink: 0 }}>—</Box>
            {typeof item === "string" ? item : (
              <span>
                {item.title && <Box component="strong" sx={{ fontWeight: 600 }}>{item.title}{item.desc ? ": " : ""}</Box>}
                {item.desc}
              </span>
            )}
          </Typography>
        );
      })}
    </Box>
  );
}
