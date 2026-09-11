import { Box, Container, Typography } from "@mui/material";
import EmbeddingField from "@/components/visuals/EmbeddingField";
import ActionLink from "@/components/ui/ActionLink";
import Eyebrow from "@/components/ui/Eyebrow";
import HandArrow from "@/components/ui/HandArrow";
import HandNote from "@/components/ui/HandNote";
import LinkBox from "@/components/ui/LinkBox";
import PillLink from "@/components/ui/PillLink";
import RevealText from "@/components/ui/RevealText";
import { getPublicationCounts, getPublishedPapers } from "@/services/dataService";
import { color, layout, measure, motion, radius } from "@/theme/tokens";

const papers = getPublishedPapers();
const latest = papers[0];
const counts = getPublicationCounts();

// The table here is a taste of the work, not the index: the newest few.
const SHOWN = 3;

// Dates are stored as ISO days; read them as UTC so the server's zone never
// shifts a paper into the previous month.
const monthYear = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

// Graph paper for the plate: a lab notebook, not a blank card.
const GRAPH = `color-mix(in srgb, ${color.ruleStrong} 55%, transparent)`;
const GRAPH_FADE = "radial-gradient(ellipse 80% 75% at 50% 50%, #000 40%, transparent 100%)";

// One sheet under the top paper, offset and turned a little further each time.
const sheetSx = (turn, x, y, opacity) => ({
  position: "absolute",
  inset: 0,
  borderRadius: "18px",
  border: "1px solid",
  borderColor: color.rule,
  backgroundColor: color.surface,
  opacity,
  transform: `rotate(${turn}deg) translate(${x}px, ${y}px)`,
  transition: `transform ${motion.slow}`,
});

// Where a row's own padding starts, so its rule and its hover plate line up
// with the text column rather than with the page edge.
const ROW_INSET = { xs: "12px", md: "20px" };

/**
 * Research, composed the way a research page lays out a finding.
 *
 * The desk: a figure on graph paper, and the newest paper on top of a small
 * stack — hovering it lifts the top sheet and fans the others out — with a
 * pencil annotation pointing at it, drawn the first time the section scrolls
 * into view. Opposite: the argument, the counts of papers out, under review and
 * in progress, and one action. Below: the newest papers as a short table, each
 * row going to our summary of the paper with the links out to the paper and
 * its DOI beside it. Pointing at a row lifts it onto a plate and lets the
 * others fall back, so the eye stays on the one being read.
 *
 * Everything on it is real: the paper on the desk is the newest one, and the
 * counts and dates come from the papers.
 */
function ResearchFeature() {
  return (
    <Box id="research" component="section" sx={{ paddingBlock: layout.sectionYTight }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" },
            gap: { xs: 7, md: 10 },
            alignItems: "center",
          }}
        >
          {/* The desk. */}
          <Box sx={{ position: "relative", pb: { xs: 14, sm: 10 }, pr: { sm: 6 } }}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: radius.card,
                backgroundColor: color.grey10,
                aspectRatio: "5 / 4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 3, md: 5 },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(${GRAPH} 1px, transparent 1px), linear-gradient(90deg, ${GRAPH} 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                  backgroundPosition: "-1px -1px",
                  maskImage: GRAPH_FADE,
                  WebkitMaskImage: GRAPH_FADE,
                }}
              />
              <EmbeddingField tone="light" style={{ position: "relative", width: "100%", height: "auto" }} />
            </Box>

            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: -14,
                top: 44,
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: color.lime,
              }}
            />

            {/* The stack of papers, newest on top. */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: { xs: "82%", sm: 320 },
                transform: "rotate(-3deg)",
                "&:hover .sheet-1": { transform: "rotate(5deg) translate(14px, -10px)" },
                "&:hover .sheet-2": { transform: "rotate(10deg) translate(26px, -18px)" },
                "&:hover .note-top": { transform: "rotate(1.5deg) translateY(-6px)" },
              }}
            >
              <Box aria-hidden className="sheet-2" sx={sheetSx(6, 12, -8, 0.55)} />
              <Box aria-hidden className="sheet-1" sx={sheetSx(3, 6, -4, 0.9)} />

              <LinkBox
                href={`/research/papers/${latest.slug}`}
                className="note-top"
                sx={{
                  position: "relative",
                  display: "block",
                  p: 2.75,
                  borderRadius: "18px",
                  backgroundColor: color.ground,
                  border: "1px solid",
                  borderColor: color.ruleStrong,
                  color: color.ink,
                  textDecoration: "none",
                  transition: `transform ${motion.slow}`,
                  "&:hover .note-cta": { color: color.accent },
                }}
              >
                <Box sx={{ display: "flex", gap: 2, fontSize: "0.8125rem", color: color.inkFaint }}>
                  <span>{latest.venue}</span>
                  <span>{monthYear(latest.date)}</span>
                </Box>
                <Typography
                  sx={{ mt: 1, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", ...clamp(3) }}
                >
                  {latest.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: color.inkMuted, ...clamp(2) }}>
                  {latest.description}
                </Typography>
                <Typography
                  className="note-cta"
                  sx={{ mt: 1.75, fontSize: "0.875rem", fontWeight: 500, transition: `color ${motion.fast}` }}
                >
                  Read the Summary ›
                </Typography>
              </LinkBox>
            </Box>

            {/* Pencil: a note and an arrow at the printout. */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "flex-start",
                gap: 0.5,
                position: "absolute",
                left: 8,
                bottom: 18,
                pointerEvents: "none",
              }}
            >
              <HandNote delay={900} rotate={-5}>
                our latest paper
              </HandNote>
              <HandArrow variant="reach" delay={250} duration={900} sx={{ width: 104, mt: 1.5 }} />
            </Box>
          </Box>

          {/* The argument. */}
          <Box>
            <Eyebrow>Research</Eyebrow>
            <RevealText
              text="Research is how we de-risk the build."
              muted="Measure first, build second."
              sx={{ mt: 3, maxWidth: "17ch" }}
            />
            <Typography variant="lede" sx={{ mt: 3, color: color.inkMuted, maxWidth: measure.lede }}>
              Before we write production code, we measure — and we publish what we
              find. Our peer-reviewed papers cover renewable-energy forecasting,
              materials engineering and applied machine learning, and the same
              discipline tells you early whether a system is worth building at all.
            </Typography>

            {/* Plain facts about the papers. */}
            <Box
              component="dl"
              sx={{
                mt: 4,
                mb: 0,
                display: "flex",
                columnGap: 5,
                rowGap: 2,
                flexWrap: "wrap",
                pt: 3,
                borderTop: "1px solid",
                borderColor: color.rule,
              }}
            >
              {[
                { value: counts.published, label: "Papers Published" },
                { value: counts.underReview, label: "Under Review" },
                { value: counts.inProgress, label: "In Progress" },
                { value: monthYear(latest.date), label: "Latest Paper" },
              ].map((fact) => (
                <Box key={fact.label}>
                  <Typography
                    component="dd"
                    className="tabular"
                    sx={{ m: 0, fontSize: "1.75rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: color.ink }}
                  >
                    {fact.value}
                  </Typography>
                  <Typography component="dt" variant="body2" sx={{ mt: 0.5, color: color.inkFaint }}>
                    {fact.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 4.5 }}>
              <PillLink href="/research" size="lg">
                Read the research
              </PillLink>
            </Box>
          </Box>
        </Box>

        {/* The newest papers. The title goes to our summary of the paper; the
            pills go out to the publisher and the DOI. They sit beside the
            title rather than wrapping the row, so no link is nested in another. */}
        <Box sx={{ mt: { xs: 9, md: 13 } }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              columnGap: 3,
              rowGap: 1.5,
              mb: 2.5,
            }}
          >
            <Typography
              component="h3"
              sx={{ fontSize: "1.5rem", lineHeight: 1.2, letterSpacing: "-0.02em", color: color.ink }}
            >
              Latest Papers
            </Typography>
            <ActionLink href="/research#publications">{`All ${papers.length} papers`}</ActionLink>
          </Box>

          <Box
            sx={{
              // Pointing at one row lets the others fall back a step.
              "@media (hover: hover)": {
                "&:hover .paper-row:not(:hover)": { opacity: 0.45 },
              },
            }}
          >
            {papers.slice(0, SHOWN).map((paper, i) => (
              <Box
                key={paper.slug}
                component="article"
                className="paper-row"
                sx={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "200px minmax(0, 1fr) auto" },
                  columnGap: 5,
                  rowGap: 1.5,
                  alignItems: "start",
                  py: 3,
                  mx: { xs: -1.5, md: -2.5 },
                  px: { xs: 1.5, md: 2.5 },
                  borderRadius: radius.lg,
                  transition: `opacity ${motion.base}, transform ${motion.base}, background-color ${motion.base}, box-shadow ${motion.base}`,
                  // The rule between rows, drawn inside the row's padding so it
                  // lines up with the text and can step aside for the plate.
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: ROW_INSET,
                    right: ROW_INSET,
                    height: "1px",
                    backgroundColor: color.rule,
                    transition: `opacity ${motion.base}`,
                  },
                  "&:hover, &:focus-within": {
                    backgroundColor: color.surface,
                    boxShadow: "0 22px 44px -30px rgba(0, 0, 0, 0.45)",
                  },
                  "&:hover::before, &:hover + .paper-row::before, &:focus-within::before, &:focus-within + .paper-row::before":
                    { opacity: 0 },
                  "@media (hover: hover)": {
                    "&:hover": { transform: "scale(1.012)" },
                  },
                  "&:hover .paper-title": { color: color.accent },
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5, fontSize: "0.8125rem", pt: { md: 0.5 } }}
                >
                  <Box component="span" sx={{ color: color.accent }}>
                    {paper.venue}
                  </Box>
                  <Box component="span" sx={{ color: color.inkFaint }}>
                    {monthYear(paper.date)}
                  </Box>
                </Box>

                <Box>
                  {/* Kept exactly as published, so it is not title-cased. */}
                  <Typography
                    component="h4"
                    sx={{ fontSize: "1.1875rem", lineHeight: 1.35, letterSpacing: "-0.01em", maxWidth: "62ch" }}
                  >
                    <LinkBox
                      href={`/research/papers/${paper.slug}`}
                      className="paper-title"
                      sx={{ color: color.ink, textDecoration: "none", transition: `color ${motion.fast}` }}
                    >
                      {paper.title}
                    </LinkBox>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: color.inkFaint, maxWidth: measure.body }}>
                    {paper.authors.join(", ")}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pt: { md: 0.25 } }}>
                  <PillLink href={paper.url} variant="outline" size="sm">
                    View paper ↗
                  </PillLink>
                  <PillLink
                    href={paper.doi}
                    variant="outline"
                    size="sm"
                    aria-label={`DOI ${paper.doi.replace("https://doi.org/", "")}`}
                  >
                    DOI ↗
                  </PillLink>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResearchFeature;
