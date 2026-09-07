import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import LinkBox from "@/components/ui/LinkBox";
import { getSite } from "@/services/dataService";
import { color, font, motion, radius } from "@/theme/tokens";

const site = getSite();

const COPY = {
  contact: {
    eyebrow: "Get in touch",
    top: "Tell us what is",
    bottom: "not working yet.",
    lede: "Send the shape of the problem, the data you have and what a good outcome would look like. We will reply with an honest read on whether it is worth building — including when it is not.",
  },
  next: {
    eyebrow: "Next step",
    top: "Have a problem that",
    bottom: "has resisted a demo?",
    lede: "The fastest way to find out is a two-week pilot with a real evaluation set. You keep the set either way.",
  },
};

const CONTACT_LINKS = [
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", href: site.linkedin, external: true },
];

const headlineSx = {
  fontFamily: font.display,
  fontWeight: 300,
  fontSize: "clamp(2.25rem, 1rem + 4.6vw, 4.5rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.045em",
  color: color.onDeep,
  textWrap: "balance",
};

/**
 * Closing band, and the last thing anyone reads: one sentence with the mark set
 * into the middle of it, and two ways forward.
 *
 * It used to be a headline on the left and a ruled list of contact details on
 * the right, which is the layout every agency site ends on. Centring it and
 * breaking the sentence around the logo does the job a closing band is actually
 * for — it stops the page rather than continuing it.
 *
 * The details are still here, as one quiet line under the buttons. A closing
 * band that makes someone hunt for an email address is a worse band, however
 * clean it looks.
 */
function CallSection({ contact = true }) {
  const copy = contact ? COPY.contact : COPY.next;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        backgroundColor: color.deep,
        color: color.onDeep,
        paddingBlock: "clamp(72px, 9vw, 144px)",
      }}
    >
      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="eyebrow" sx={{ color: color.lime }}>
            {copy.eyebrow}
          </Typography>

          {/* One heading, with the mark sitting between its two lines. The
              spans are block-level so the mark is a line of the sentence rather
              than a floating decoration beside it. */}
          <Typography component="h2" sx={{ ...headlineSx, mt: { xs: 4, md: 5 } }}>
            <Box component="span" sx={{ display: "block" }}>
              {copy.top}
            </Box>

            {/* The mark, plainly. It was in a bordered circle that tilted when
                you touched it, which made the one fixed thing in the brand look
                like a button — and a logo that moves is a logo nobody trusts.
                The band around it is what does the work instead. */}
            <Box
              aria-hidden
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2.5, md: 4 },
                paddingBlock: { xs: 2, md: 2.5 },
              }}
            >
              <Box
                sx={{
                  height: "1px",
                  flex: 1,
                  maxWidth: { xs: 56, md: 160 },
                  backgroundImage: `linear-gradient(to right, transparent, ${color.ruleOnDeep})`,
                }}
              />

              <Image
                src="/logo-14.png"
                alt=""
                width={104}
                height={104}
                style={{ width: "auto", height: "1.15em" }}
              />

              <Box
                sx={{
                  height: "1px",
                  flex: 1,
                  maxWidth: { xs: 56, md: 160 },
                  backgroundImage: `linear-gradient(to left, transparent, ${color.ruleOnDeep})`,
                }}
              />
            </Box>

            <Box component="span" sx={{ display: "block" }}>
              {copy.bottom}
            </Box>
          </Typography>

          <Typography
            variant="lede"
            sx={{
              mt: { xs: 3, md: 4 },
              color: color.onDeepMuted,
              maxWidth: "54ch",
            }}
          >
            {copy.lede}
          </Typography>

          <Box
            sx={{
              mt: { xs: 4, md: 5 },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <LinkBox
              href="/contact"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 3.5,
                py: 1.8,
                backgroundColor: color.lime,
                color: color.deepAlt,
                textDecoration: "none",
                borderRadius: radius.pill,
                transition: `background-color ${motion.fast}, color ${motion.fast}`,
                "&:hover": { backgroundColor: color.onDeep },
              }}
            >
              <Typography
                component="span"
                sx={{ fontSize: "0.9375rem", fontWeight: 500 }}
              >
                Start a conversation
              </Typography>
            </LinkBox>

            <LinkBox
              href="/case-studies"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 3.5,
                py: 1.8,
                borderRadius: radius.pill,
                border: "1px solid",
                borderColor: color.ruleOnDeep,
                color: color.onDeep,
                textDecoration: "none",
                transition: `border-color ${motion.fast}, background-color ${motion.fast}`,
                "&:hover": {
                  borderColor: color.lime,
                  backgroundColor: color.deepAlt,
                },
              }}
            >
              <Typography
                component="span"
                sx={{ fontSize: "0.9375rem", fontWeight: 500 }}
              >
                See the work
              </Typography>
            </LinkBox>
          </Box>

          {contact ? (
            <Box
              sx={{
                mt: { xs: 4, md: 5 },
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 1.5, md: 2.5 },
              }}
            >
              {CONTACT_LINKS.map((link, i) => (
                <Box
                  key={link.href}
                  sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 } }}
                >
                  {i > 0 ? (
                    <Box
                      aria-hidden
                      sx={{
                        width: 3,
                        height: 3,
                        borderRadius: radius.pill,
                        backgroundColor: color.ruleOnDeep,
                      }}
                    />
                  ) : null}
                  <Typography
                    component="a"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    variant="caption"
                    sx={{
                      color: color.onDeepMuted,
                      textDecoration: "none",
                      transition: `color ${motion.fast}`,
                      "&:hover": { color: color.lime },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}

export default CallSection;
