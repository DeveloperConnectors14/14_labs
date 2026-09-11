import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import ActionLink from "@/components/ui/ActionLink";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import { getPublications } from "@/services/dataService";
import { titleCase } from "@/services/titleCase";
import { color, measure, motion, radius, type } from "@/theme/tokens";

const { sources, groups } = getPublications();

// A filled dot for what is out, a ring for what is with reviewers, a dashed
// ring for what is still being written — the same three steps at a glance.
const MARKS = {
  Published: { backgroundColor: color.lime, border: `1.5px solid ${color.lime}` },
  "Under review": { backgroundColor: "transparent", border: `1.5px solid ${color.limeDeep}` },
  "Work in progress": { backgroundColor: "transparent", border: `1.5px dashed ${color.grey45}` },
};

const paperTitleSx = {
  fontSize: type.h4,
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: "-0.012em",
  color: color.ink,
  maxWidth: "60ch",
};

function StatusMark({ status }) {
  return (
    <Box
      aria-hidden
      sx={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, ...MARKS[status] }}
    />
  );
}

function Paper({ paper, first }) {
  const meta = paper.target
    ? `Target: ${paper.target}`
    : [paper.venue, paper.year].filter(Boolean).join(" · ");
  const page = paper.slug ? `/research/papers/${paper.slug}` : null;

  return (
    <Box
      component="article"
      sx={{
        paddingBlock: { xs: 3, md: 3.5 },
        borderTop: first ? 0 : "1px solid",
        borderColor: color.rule,
      }}
    >
      {meta ? (
        <Typography variant="caption" sx={{ display: "block", color: color.accent, mb: 1.25 }}>
          {meta}
        </Typography>
      ) : null}

      {/* Paper titles are kept exactly as they were published. */}
      <Typography component="h4" sx={paperTitleSx}>
        {page ? (
          <LinkBox
            href={page}
            sx={{
              color: "inherit",
              textDecoration: "none",
              transition: `color ${motion.fast}`,
              "&:hover": { color: color.accent },
            }}
          >
            {paper.title}
          </LinkBox>
        ) : (
          paper.title
        )}
      </Typography>

      {paper.authors ? (
        <Typography variant="body2" sx={{ mt: 1.25, color: color.inkFaint, maxWidth: measure.body }}>
          <Box component="span" sx={{ color: color.inkMuted, fontWeight: 500 }}>
            Authors:{" "}
          </Box>
          {paper.authors.join(", ")}
        </Typography>
      ) : null}

      <Typography variant="body1" sx={{ mt: 1.5, color: color.inkMuted, maxWidth: measure.body }}>
        {paper.description}
      </Typography>

      {paper.note ? (
        <Typography variant="caption" sx={{ display: "block", mt: 1, color: color.inkFaint }}>
          {paper.note}
        </Typography>
      ) : null}

      {page || paper.url || paper.doi ? (
        <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
          {paper.url ? (
            <PillLink href={paper.url} variant="outline" size="sm">
              View paper ↗
            </PillLink>
          ) : null}
          {paper.doi ? (
            <PillLink
              href={paper.doi}
              variant="outline"
              size="sm"
              aria-label={`DOI ${paper.doi.replace("https://doi.org/", "")}`}
            >
              DOI ↗
            </PillLink>
          ) : null}
          {page ? (
            <ActionLink href={page} sx={{ ml: { sm: 1.5 } }}>
              Read the summary
            </ActionLink>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}

/**
 * Papers, in three groups: published, under review, in progress. Each group
 * is a status label with its count beside a column of papers; published ones
 * carry their venue, authors, links out to the paper and its DOI, and a page
 * of their own with our summary of the work.
 */
function Publications() {
  return (
    <Section id="publications" tight divider>
      <SectionHead
        eyebrow="Publications"
        title="Every paper, by status"
        action={
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 4, rowGap: 1.5 }}>
            {sources.map((source) => (
              <ActionLink key={source.url} href={source.url} external>
                {/* An element, not a string, so the name is not title-cased. */}
                <span>Research by {source.name}</span>
              </ActionLink>
            ))}
          </Box>
        }
        sx={{ mb: { xs: 5, md: 7 } }}
      />

      <Box sx={{ display: "grid", gap: { xs: 5, md: 6 } }}>
        {groups.map(({ status, papers }) => {
          const headingId = `pub-${status.toLowerCase().replace(/\s+/g, "-")}`;
          return papers.length ? (
            <Box
              key={status}
              component="section"
              aria-labelledby={headingId}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
                columnGap: 6,
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  alignSelf: "start",
                  pt: { xs: 2.5, md: 4 },
                  pb: { xs: 0.5, md: 0 },
                  position: { md: "sticky" },
                  top: { md: 96 },
                }}
              >
                <StatusMark status={status} />
                <Typography
                  id={headingId}
                  component="h3"
                  sx={{ fontSize: "1.0625rem", fontWeight: 500, color: color.ink }}
                >
                  {titleCase(status)}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: radius.pill,
                    backgroundColor: color.accentSoft,
                    color: color.accent,
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                  }}
                >
                  {papers.length}
                </Box>
              </Box>

              <Box>
                {papers.map((paper, i) => (
                  <Paper key={paper.title} paper={paper} first={i === 0} />
                ))}
              </Box>
            </Box>
          ) : null;
        })}
      </Box>
    </Section>
  );
}

export default Publications;
