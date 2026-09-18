import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import ActionLink from "@/components/ui/ActionLink";
import { getcaseStudies } from "@/services/dataService";
import { color, measure, radius } from "@/theme/tokens";

const studies = getcaseStudies();

/**
 * The opening of a case study: what it is, and the four facts that frame it.
 *
 * The stats run as a ruled ledger rather than as four cards. A case study is a
 * document, and a document states its terms — industry, timeline, team, scale —
 * before it starts arguing.
 */
function SingleCaseHero({ heroData, caseId }) {
  if (!heroData) return null;

  const study = studies.find((item) => item.id === caseId);

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: color.ground,
        paddingTop: { xs: "40px", md: "72px" },
        paddingBottom: { xs: "40px", md: "64px" },
      }}
    >
      <Container>
        <ActionLink href="/case-studies" back>
          All work
        </ActionLink>

        {/* Title and subtitle on the left; the cover art — only 407×220 at
            source — sits beside them at close to its own size. */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            display: "grid",
            gridTemplateColumns: study?.img
              ? { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 420px)" }
              : "1fr",
            columnGap: { md: 6, lg: 10 },
            rowGap: { xs: 5, md: 0 },
            alignItems: "end",
          }}
        >
          <Box>
            <Typography
              variant="display"
              component="h1"
              sx={{
                color: color.ink,
                maxWidth: "18ch",
                textWrap: "balance",
                fontSize: "clamp(2.25rem, 1rem + 4.4vw, 4.25rem)",
              }}
            >
              {heroData.title}
            </Typography>

            {heroData.subtitle ? (
              <Typography
                variant="lede"
                sx={{ mt: { xs: 3, md: 4 }, color: color.inkMuted, maxWidth: measure.lede }}
              >
                {heroData.subtitle}
              </Typography>
            ) : null}
          </Box>

          {study?.img ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "100%", sm: "440px", md: "100%" },
                aspectRatio: "407 / 220",
                overflow: "hidden",
                borderRadius: radius.lg,
                backgroundColor: color.grey20,
              }}
            >
              <Image
                src={`/media/${study.img}`}
                alt=""
                fill
                priority
                sizes="(max-width: 600px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ) : null}
        </Box>

        {heroData.stats?.length ? (
          <Box
            sx={{
              mt: { xs: 5, md: 7 },
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              borderTop: "1px solid",
              borderColor: color.ruleStrong,
            }}
          >
            {heroData.stats.map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  py: { xs: 2.5, md: 3 },
                  pr: 3,
                  borderBottom: "1px solid",
                  borderColor: color.rule,
                }}
              >
                <Typography variant="eyebrow" sx={{ color: color.inkFaint }}>
                  {stat.label}
                </Typography>
                <Typography
                  className="tabular"
                  sx={{
                    mt: 1.25,
                    fontSize: "clamp(1.25rem, 1rem + 0.9vw, 1.75rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: color.ink,
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}

export default SingleCaseHero;
