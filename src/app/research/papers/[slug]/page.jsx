import { notFound } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import CallSection from "@/components/general/CallSection";
import ActionLink from "@/components/ui/ActionLink";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import { getPublication, getPublishedPapers } from "@/services/dataService";
import { formatPostDate } from "@/services/format";
import { color, font, layout, measure, radius } from "@/theme/tokens";

export function generateStaticParams() {
  return getPublishedPapers().map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const paper = getPublication(slug);
  if (!paper) return {};

  return {
    title: paper.title,
    description: paper.description,
    openGraph: {
      type: "article",
      title: paper.title,
      description: paper.description,
      publishedTime: paper.date,
    },
  };
}

// Long-form prose is set in the serif: it marks writing as writing.
const proseSx = {
  fontFamily: font.serif,
  fontSize: "1.1875rem",
  lineHeight: 1.7,
  color: color.ink,
  maxWidth: measure.body,
};

const headingSx = {
  mb: 2,
  color: color.ink,
  scrollMarginTop: `${layout.navHeight.md + 24}px`,
};

/** "Butt, M. M. et al." is not how we credit people: every author, as published. */
const citation = (paper) => {
  const where = [
    paper.volume ? `${paper.volume}${paper.issue ? `(${paper.issue})` : ""}` : null,
    paper.pages ?? paper.article,
  ]
    .filter(Boolean)
    .join(", ");
  return `${paper.authors.join(", ")} (${paper.date.slice(0, 4)}). ${paper.title}. ${paper.venue}${
    where ? `, ${where}` : ""
  }. ${paper.doi}`;
};

function DetailRow({ label, children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "96px 1fr",
        gap: 2,
        paddingBlock: 1.5,
        borderTop: "1px solid",
        borderColor: color.rule,
      }}
    >
      <Typography component="dt" variant="caption" sx={{ color: color.inkFaint, pt: 0.25 }}>
        {label}
      </Typography>
      <Typography
        component="dd"
        variant="body2"
        sx={{ m: 0, color: color.ink, overflowWrap: "anywhere" }}
      >
        {children}
      </Typography>
    </Box>
  );
}

async function PaperPage({ params }) {
  const { slug } = await params;
  const paper = getPublication(slug);
  if (!paper) notFound();

  const others = getPublishedPapers()
    .filter((entry) => entry.slug !== paper.slug)
    .slice(0, 2);
  const doiId = paper.doi.replace("https://doi.org/", "");

  return (
    <>
      <Box
        component="article"
        sx={{ paddingTop: { xs: "40px", md: "72px" }, paddingBottom: { xs: "56px", md: "96px" } }}
      >
        <Container>
          <ActionLink href="/research#publications" back sx={{ mb: 6 }}>
            All publications
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
              Published paper
            </Typography>
            <Typography variant="caption" sx={{ color: color.inkFaint }}>
              {paper.venue}
            </Typography>
            <Typography variant="caption" sx={{ color: color.inkFaint }}>
              {formatPostDate(paper.date)}
            </Typography>
            {paper.access ? (
              <Typography variant="caption" sx={{ color: color.inkFaint }}>
                {paper.access}
              </Typography>
            ) : null}
          </Box>

          {/* Kept exactly as published, so it is not title-cased. */}
          <Typography
            variant="h2"
            component="h1"
            sx={{ mt: 5, color: color.ink, maxWidth: "30ch", textWrap: "balance" }}
          >
            {paper.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.lede }}
          >
            <Box component="span" sx={{ color: color.ink, fontWeight: 500 }}>
              Authors:{" "}
            </Box>
            {paper.authors.join(", ")}
          </Typography>

          {paper.note ? (
            <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: color.inkFaint }}>
              {paper.note}
            </Typography>
          ) : null}

          <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            <PillLink href={paper.url}>View paper ↗</PillLink>
            <PillLink href={paper.doi} variant="outline" aria-label={`DOI ${doiId}`}>
              DOI ↗
            </PillLink>
          </Box>

          <Box
            sx={{
              mt: { xs: 7, md: 10 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 320px" },
              columnGap: { md: 8 },
              rowGap: 7,
              alignItems: "start",
            }}
          >
            <Box>
              <Typography id="overview" variant="h3" component="h2" sx={headingSx}>
                Overview
              </Typography>
              {paper.overview.map((text) => (
                <Typography key={text.slice(0, 32)} sx={{ ...proseSx, my: 3 }}>
                  {text}
                </Typography>
              ))}

              <Typography id="findings" variant="h3" component="h2" sx={{ ...headingSx, mt: 7 }}>
                Key Findings
              </Typography>
              <Box component="ul" sx={{ m: 0, mt: 3, p: 0, listStyle: "none", maxWidth: measure.body }}>
                {paper.findings.map((item) => (
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
                    <Box
                      component="span"
                      aria-hidden
                      sx={{ color: color.accent, fontFamily: font.mono, fontSize: "0.8125rem", lineHeight: 1.9 }}
                    >
                      &#8212;
                    </Box>
                    <span>{item}</span>
                  </Typography>
                ))}
              </Box>

              <Typography variant="body2" sx={{ mt: 4, color: color.inkFaint, maxWidth: measure.body }}>
                This is our summary of the paper. The full text, with its abstract, figures and
                data, is on the publisher&rsquo;s site.
              </Typography>
            </Box>

            <Box component="aside" sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
              <Typography variant="eyebrow" sx={{ color: color.inkFaint, mb: 2 }}>
                Details
              </Typography>
              <Box component="dl" sx={{ m: 0, borderBottom: "1px solid", borderColor: color.rule }}>
                <DetailRow label="Journal">{paper.venue}</DetailRow>
                <DetailRow label="Published">{formatPostDate(paper.date)}</DetailRow>
                {paper.volume ? (
                  <DetailRow label="Volume">
                    {paper.volume}
                    {paper.issue ? `, issue ${paper.issue}` : ""}
                  </DetailRow>
                ) : null}
                {paper.pages ? <DetailRow label="Pages">{paper.pages}</DetailRow> : null}
                {paper.article ? <DetailRow label="Article">{paper.article}</DetailRow> : null}
                <DetailRow label="DOI">
                  <Box
                    component="a"
                    href={paper.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: color.accent, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {doiId}
                  </Box>
                </DetailRow>
                {paper.access ? <DetailRow label="Access">{paper.access}</DetailRow> : null}
              </Box>

              {paper.topics?.length ? (
                <>
                  <Typography variant="eyebrow" sx={{ color: color.inkFaint, mt: 5, mb: 2 }}>
                    Topics
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {paper.topics.map((topic) => (
                      <Box
                        key={topic}
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: radius.pill,
                          border: "1px solid",
                          borderColor: color.rule,
                          color: color.inkMuted,
                          fontSize: "0.8125rem",
                        }}
                      >
                        {topic}
                      </Box>
                    ))}
                  </Box>
                </>
              ) : null}

              <Typography variant="eyebrow" sx={{ color: color.inkFaint, mt: 5, mb: 2 }}>
                Cite
              </Typography>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: radius.md,
                  backgroundColor: color.surface,
                  border: "1px solid",
                  borderColor: color.rule,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: color.inkMuted, lineHeight: 1.6, overflowWrap: "anywhere", userSelect: "all" }}
                >
                  {citation(paper)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {others.length ? (
            <Box sx={{ mt: { xs: 8, md: 12 }, pt: 5, borderTop: "1px solid", borderColor: color.ink }}>
              <Typography variant="eyebrow" sx={{ color: color.inkFaint, mb: 4 }}>
                More Papers
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
                    href={`/research/papers/${entry.slug}`}
                    sx={{
                      textDecoration: "none",
                      "&:hover .next-title": { color: color.accent },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: color.inkFaint }}>
                      {entry.venue} · {formatPostDate(entry.date)}
                    </Typography>
                    <Typography
                      className="next-title"
                      variant="h4"
                      sx={{ mt: 1, color: color.ink, transition: "color 140ms" }}
                    >
                      {entry.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1.5, color: color.inkMuted }}>
                      {entry.description}
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

export default PaperPage;
