import { Box, Container, Typography } from "@mui/material";
import DotWave from "@/components/ui/DotWave";
import PillLink from "@/components/ui/PillLink";
import { getSite } from "@/services/dataService";
import { color, layout, motion, radius, type } from "@/theme/tokens";

const site = getSite();

const COPY = {
  contact: {
    title: "Tell Us What Isn't Working Yet",
    lede: "Send the shape of the problem, the data you have and what a good outcome would look like. We will reply with an honest read on whether it is worth building — including when it is not.",
  },
  next: {
    title: "Have a problem that has resisted a demo?",
    lede: "The fastest way to find out is a two-week pilot with a real evaluation set. You keep the set either way.",
  },
};

const CONTACT_LINKS = [
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", href: site.linkedin, external: true },
];

const WAVE_FADE = "linear-gradient(to top, #000 30%, transparent 95%)";

/**
 * The closing card, and the last thing anyone reads before the footer: one
 * sentence, two ways forward, and the contact details for anyone who would
 * rather not click through to a form.
 *
 * It is a rounded card inside the page width rather than a full-bleed band, so
 * it reads as an object you can act on rather than as more page. Underneath
 * the type, a field of points rolls slowly in perspective (DotWave), fading
 * out before it reaches the heading.
 */
function CallSection({ contact = true, title, lede }) {
  const base = contact ? COPY.contact : COPY.next;
  const copy = { title: title ?? base.title, lede: lede ?? base.lede };

  return (
    <Box component="section" sx={{ paddingBlock: layout.gapY }}>
      <Container>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: radius.lg, md: radius.card },
            backgroundColor: color.deep,
            color: color.onDeep,
            px: { xs: 3, md: 8 },
            py: { xs: 8, md: 13 },
            textAlign: "center",
          }}
        >
          <DotWave
            sx={{
              position: "absolute",
              insetInline: 0,
              bottom: 0,
              height: "72%",
              maskImage: WAVE_FADE,
              WebkitMaskImage: WAVE_FADE,
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `radial-gradient(50% 55% at 50% 118%, color-mix(in srgb, ${color.lime} 26%, transparent), transparent 70%)`,
            }}
          />

          <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography
              component="h2"
              sx={{
                fontSize: type.h1,
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: color.onDeep,
                maxWidth: "15ch",
                textWrap: "balance",
              }}
            >
              {copy.title}
            </Typography>

            <Typography variant="lede" sx={{ mt: 3, color: color.onDeepMuted, maxWidth: "52ch" }}>
              {copy.lede}
            </Typography>

            <Box sx={{ mt: 5, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5 }}>
              <PillLink href="/contact" variant="inverse" size="lg">
                Start a conversation
              </PillLink>
              <PillLink href="/case-studies" variant="inverseOutline" size="lg">
                See the work
              </PillLink>
            </Box>

            {contact ? (
              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  columnGap: 3.5,
                  rowGap: 1,
                }}
              >
                {CONTACT_LINKS.map((link) => (
                  <Typography
                    key={link.href}
                    component="a"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    variant="body2"
                    sx={{
                      color: color.onDeepMuted,
                      textDecoration: "none",
                      transition: `color ${motion.fast}`,
                      "&:hover": { color: color.onDeep },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            ) : null}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CallSection;
