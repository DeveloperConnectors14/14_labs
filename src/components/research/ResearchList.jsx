"use client";

import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import LinkBox from "@/components/ui/LinkBox";
import TopicFigure from "@/components/visuals/TopicFigure";
import { formatPostDate } from "@/services/format";
import { color, measure, motion, radius } from "@/theme/tokens";

const ALL = "All";

/**
 * The note index, filterable by subject.
 *
 * Four notes do not need a filter. Forty will, and the shape of the component
 * does not change between the two — what changes is that the topic row doubles
 * as a statement of what the practice actually writes about, which is worth
 * having on the page at any count.
 *
 * Filtering is client state and nothing else: no route change, no query param,
 * no scroll jump. A reader narrowing a four-item list should not lose their
 * place in history over it.
 */
function ResearchList({ posts }) {
  const [topic, setTopic] = useState(ALL);

  const topics = useMemo(() => {
    const seen = new Map();
    posts.forEach((post) => seen.set(post.topic, (seen.get(post.topic) ?? 0) + 1));
    return [[ALL, posts.length], ...Array.from(seen.entries())];
  }, [posts]);

  const shown = topic === ALL ? posts : posts.filter((p) => p.topic === topic);

  return (
    <Box>
      <Box
        role="group"
        aria-label="Filter notes by subject"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          pb: { xs: 4, md: 5 },
        }}
      >
        {topics.map(([name, count]) => {
          const active = name === topic;
          return (
            <Box
              key={name}
              component="button"
              type="button"
              onClick={() => setTopic(name)}
              aria-pressed={active}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                border: "1px solid",
                borderColor: active ? color.deep : color.grey20,
                backgroundColor: active ? color.deep : color.surface,
                color: active ? color.onDeep : color.inkMuted,
                borderRadius: radius.pill,
                cursor: "pointer",
                font: "inherit",
                transition: `background-color ${motion.fast}, color ${motion.fast}, border-color ${motion.fast}`,
                "&:hover": {
                  borderColor: active ? color.deep : color.grey45,
                  color: active ? color.onDeep : color.ink,
                },
              }}
            >
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "inherit", fontWeight: active ? 500 : 400 }}
              >
                {name}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                sx={{ color: active ? color.lime : color.inkFaint }}
              >
                {count}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box>
        {shown.map((post, i) => (
          <LinkBox
            key={post.slug}
            href={`/research/${post.slug}`}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "150px 190px 1fr" },
              gap: { xs: 2, md: 5 },
              alignItems: "start",
              paddingBlock: { xs: 3.5, md: 4 },
              borderTop: i === 0 ? 0 : "1px solid",
              borderColor: color.rule,
              textDecoration: "none",
              "&:hover .post-title": { color: color.accent },
              "&:hover .row-plate": { backgroundColor: color.grey20 },
            }}
          >
            <Box
              className="row-plate"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                height: 92,
                px: 1.5,
                py: 1,
                borderRadius: radius.md,
                backgroundColor: color.grey10,
                transition: `background-color ${motion.base}`,
              }}
            >
              <TopicFigure
                topic={post.topic}
                tone="light"
                style={{ width: "auto", height: "100%", maxWidth: "100%" }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, pt: { md: 0.5 } }}>
              <Typography variant="caption" sx={{ color: color.inkFaint }}>
                {formatPostDate(post.date)}
              </Typography>
              <Typography variant="caption" sx={{ color: color.accent }}>
                {post.topic}
              </Typography>
              <Typography variant="caption" sx={{ color: color.inkFaint }}>
                {post.readingTime} read
              </Typography>
            </Box>

            <Box>
              <Typography
                className="post-title"
                variant="h3"
                sx={{
                  color: color.ink,
                  transition: `color ${motion.fast}`,
                  maxWidth: "30ch",
                }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, color: color.inkMuted, maxWidth: measure.body }}
              >
                {post.summary}
              </Typography>
            </Box>
          </LinkBox>
        ))}
      </Box>
    </Box>
  );
}

export default ResearchList;
