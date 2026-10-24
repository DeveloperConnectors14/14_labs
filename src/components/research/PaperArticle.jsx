import { Fragment } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import CopyCitationButton from "@/components/research/CopyCitationButton";
import { SectionTitle, DetailsList, DashList } from "@/components/general/ArticleParts";
import { formatCitation, formatPublishedDate, isTeamAuthor } from "@/services/dataService";
import { SECTION_PX, SECTION_PY, BUTTON_RADIUS, TILE_RADIUS, SOFT_GRADIENT } from "@/theme/tokens";

const externalLink = { target: "_blank", rel: "noopener noreferrer" };

function PaperArticle({ paper }) {
  const published = paper.status === "published";
  const doiUrl = paper.doi && `https://doi.org/${paper.doi}`;

  const details = published
    ? [
        ["Journal", paper.venue],
        ["Published", formatPublishedDate(paper.published)],
        ["Volume", paper.issue ? `${paper.volume}, issue ${paper.issue}` : paper.volume],
        [paper.pages.includes("–") ? "Pages" : "Article number", paper.pages],
        ["DOI", <Box component="a" href={doiUrl} {...externalLink} sx={{ color: "text.primary" }} key="doi">{paper.doi}</Box>],
      ]
    : [
        ["Status", "Under review"],
        paper.venue && ["Submitted to", paper.venue],
      ].filter(Boolean);

  return (
    <Box component="article" sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {paper.authors.length > 0 && (
          <Typography variant="body1" color="text.grey">
            <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>Authors: </Box>
            {paper.authors.map((name, i) => (
              <Fragment key={name}>
                {i > 0 && ", "}
                {isTeamAuthor(name)
                  ? <Box component="strong" sx={{ color: "text.primary" }}>{name}</Box>
                  : name}
              </Fragment>
            ))}
          </Typography>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
          {published ? (
            <>
              <Button
                component="a"
                href={paper.url}
                {...externalLink}
                variant="contained"
                endIcon={<ArrowOutward />}
                sx={{
                  borderRadius: BUTTON_RADIUS,
                  p: "9px 18px",
                  backgroundColor: "secondary.main",
                  color: "brand.navy",
                  "&:hover": { backgroundColor: "primary.contrastText", color: "brand.navy" },
                }}
              >
                View paper
              </Button>
              <Button
                component="a"
                href={doiUrl}
                {...externalLink}
                variant="outlined"
                endIcon={<ArrowOutward />}
                sx={{ borderRadius: BUTTON_RADIUS, p: "8px 18px", color: "text.primary", borderColor: "text.primary" }}
              >
                DOI
              </Button>
            </>
          ) : (
            <Chip label="Under review" />
          )}
        </Box>

        <SectionTitle>Overview</SectionTitle>
        {paper.overview.map((paragraph) => (
          <Typography key={paragraph.slice(0, 40)} variant="body1" color="text.primary" sx={{ mb: 2 }}>
            {paragraph}
          </Typography>
        ))}

        {paper.findings?.length > 0 && (
          <>
            <SectionTitle>Key findings</SectionTitle>
            <DashList items={paper.findings} />
          </>
        )}

        <Typography variant="body2" color="text.grey" sx={{ mt: 4 }}>
          {published
            ? "This is our summary of the paper. The full text, with its abstract, figures and data, is on the publisher's site."
            : "This paper is under review. Full details will be added once it is published."}
        </Typography>

        <SectionTitle>Details</SectionTitle>
        <DetailsList rows={details} />

        {paper.topics?.length > 0 && (
          <>
            <SectionTitle>Topics</SectionTitle>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {paper.topics.map((topic) => <Chip key={topic} label={topic} />)}
            </Box>
          </>
        )}

        {published && (
          <>
            <SectionTitle>Cite</SectionTitle>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: TILE_RADIUS,
                background: SOFT_GRADIENT,
              }}
            >
              <Typography variant="body2" color="text.primary" sx={{ overflowWrap: "anywhere" }}>
                {formatCitation(paper)}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <CopyCitationButton text={formatCitation(paper)} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PaperArticle;
