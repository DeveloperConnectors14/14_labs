import { notFound } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import ActionLink from "@/components/ui/ActionLink";
import LinkBox from "@/components/ui/LinkBox";
import NoteContents from "@/components/research/NoteContents";
import ReadingProgress from "@/components/research/ReadingProgress";
import TopicFigure from "@/components/visuals/TopicFigure";
import { getResearch, getResearchPost } from "@/services/dataService";
import { formatPostDate } from "@/services/format";
import { color, font, layout, measure, radius } from "@/theme/tokens";

export function generateStaticParams() {
  return getResearch().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
    },
  };
}

// Long-form prose is set in the serif at a fixed measure. This is the only
// place on the site that uses it — it marks writing as writing.
const proseSx = {
  fontFamily: font.serif,
  fontSize: "1.1875rem",
  lineHeight: 1.7,
  color: color.ink,
  maxWidth: measure.body,
};

/** Section ids are derived from the heading text so the contents rail, the
 *  anchors and a link somebody pastes into Slack all agree without the notes
 *  having to carry hand-written ids. */
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Block({ block }) {
  if (block.type === "h2") {
    return (
      <Typography
        id={slugify(block.text)}
        variant="h3"
        component="h2"
        sx={{
          mt: 7,
          mb: 2,
          color: color.ink,
          // Anchored headings must clear the fixed navigation bar when a
          // contents link jumps to them.
          scrollMarginTop: `${layout.navHeight.md + 24}px`,
        }}
      >
        {block.text}
      </Typography>
    );
  }

  if (block.type === "quote") {
    return (
      <Box
        component="blockquote"
        sx={{
          m: 0,
          my: 6,
          pl: { xs: 3, md: 4 },
          borderLeft: "2px solid",
          borderColor: color.accent,
        }}
      >
        <Typography
          sx={{
            ...proseSx,
            fontSize: "1.375rem",
            lineHeight: 1.5,
            fontStyle: "italic",
            color: color.ink,
          }}
        >
          {block.text}
        </Typography>
      </Box>
    );
  }

  if (block.type === "list") {
    return (
      <Box component="ul" sx={{ m: 0, my: 4, p: 0, listStyle: "none", maxWidth: measure.body }}>
        {block.items.map((item) => (
          <Typography
            key={item}
            component="li"
            sx={{
              ...proseSx,
              maxWidth: "none",
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 1.5,
              paddingBlock: 1.25,
              borderTop: "1px solid",
              borderColor: color.rule,
              "&:last-of-type": { borderBottom: "1px solid", borderColor: color.rule },
            }}
          >
            <Box component="span" aria-hidden sx={{ color: color.accent, fontFamily: font.mono, fontSize: "0.8125rem", lineHeight: 1.9 }}>
              &#8212;
            </Box>
            <span>{item}</span>
          </Typography>
        ))}
      </Box>
    );
  }

  return <Typography sx={{ ...proseSx, my: 3.5 }}>{block.text}</Typography>;
}

async function ResearchPost({ params }) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) notFound();

  const others = getResearch().filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <>
      <ReadingProgress targetId="note-body" />

      <Box
        id="note-body"
        component="article"
        sx={{ paddingTop: { xs: "40px", md: "72px" }, paddingBottom: { xs: "56px", md: "96px" } }}
      >
        <Container>
          <ActionLink href="/research" back sx={{ mb: 6 }}>
            All notes
          </ActionLink>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
              mt: 4,
              pb: 3,
              borderBottom: "1px solid",
              borderColor: color.rule,
            }}
          >
            <Typography variant="caption" sx={{ color: color.accent }}>
              {post.topic}
            </Typography>
            <Typography variant="caption" sx={{ color: color.inkFaint }}>
              {formatPostDate(post.date)}
            </Typography>
            <Typography variant="caption" sx={{ color: color.inkFaint }}>
              {post.readingTime} read
            </Typography>
          </Box>

          <Typography variant="h1" sx={{ mt: 5, color: color.ink, maxWidth: "20ch" }}>
            {post.title}
          </Typography>

          <Typography
            variant="lede"
            sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.lede }}
          >
            {post.kicker}
          </Typography>

          {/* The subject's figure, captioned like a figure. It is the same
              drawing the note's card carries on the index and the home page —
              arriving on the article and recognising the picture is the point,
              so it is placed above the prose rather than buried in it. */}
          <Box sx={{ mt: { xs: 5, md: 7 }, maxWidth: 720 }}>
            <Box
              sx={{
                backgroundColor: color.green10,
                borderRadius: radius.lg,
                px: { xs: 3, md: 5 },
                py: { xs: 3, md: 4.5 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TopicFigure
                topic={post.topic}
                tone="light"
                style={{ width: "100%", height: "auto", maxWidth: 460 }}
              />
            </Box>
            <Typography
              variant="caption"
              component="figcaption"
              sx={{ display: "block", mt: 1.5, color: color.inkFaint }}
            >
              Fig. 1 &mdash; {post.topic}
            </Typography>
          </Box>

          {/* Prose and its contents rail. The rail is a column of the article
              rather than a floating widget, so on a narrow screen it simply
              stops existing instead of turning into a hamburger. */}
          <Box
            sx={{
              mt: { xs: 6, md: 9 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 220px" },
              columnGap: { md: 8 },
              alignItems: "start",
            }}
          >
            <Box>
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </Box>

            <NoteContents
              items={post.body
                .filter((block) => block.type === "h2")
                .map((block) => ({ id: slugify(block.text), text: block.text }))}
            />
          </Box>

          {others.length ? (
            <Box sx={{ mt: { xs: 8, md: 12 }, pt: 5, borderTop: "1px solid", borderColor: color.ink }}>
              <Typography variant="eyebrow" sx={{ color: color.inkFaint, mb: 4 }}>
                Read next
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: { xs: 4, md: 6 },
                }}
              >
                {others.map((entry) => (
                  <LinkBox
                    key={entry.slug}
                    href={`/research/${entry.slug}`}
                    sx={{
                      textDecoration: "none",
                      "&:hover .next-title": { color: color.accent },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: color.inkFaint }}>
                      {formatPostDate(entry.date)}
                    </Typography>
                    <Typography
                      className="next-title"
                      variant="h4"
                      sx={{ mt: 1, color: color.ink, transition: "color 140ms" }}
                    >
                      {entry.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1.5, color: color.inkMuted }}>
                      {entry.summary}
                    </Typography>
                  </LinkBox>
                ))}
              </Box>
            </Box>
          ) : null}
        </Container>
      </Box>

      <CallSection contact />
    </>
  );
}

export default ResearchPost;
