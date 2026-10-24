"use client";
import { Box, Typography, Button, Grid } from "@mui/material";
import { ArrowForward, MailOutline, PhoneOutlined } from "@mui/icons-material";
import Link from "next/link";
import { SECTION_PX, SECTION_PY, BUTTON_RADIUS } from "@/theme/tokens";
import { getContactInfo } from "@/services/dataService";

const contactInfo = getContactInfo();

const contactRows = [
  { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}`, Icon: MailOutline },
  { label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}`, Icon: PhoneOutlined },
];

// Closing call to action shown at the bottom of most pages. The `contact` prop
// is kept for existing callers but no longer changes anything.
function CallSection({ contact }) {
  return (
    <Box component="section" sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Box
        sx={{
          background: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)",
          borderRadius: 4,
          py: { xs: 5, md: 8 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h2" sx={{ color: "secondary.contrastText", textWrap: "balance" }}>
              Collaborate with us on research or production AI
            </Typography>
            <Typography variant="body1" sx={{ pt: 2, maxWidth: 640, color: "rgba(255,255,255,0.85)" }}>
              Whether you&apos;re a company with a problem to solve or a university looking for a research partner, we&apos;d like to hear from you.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              endIcon={<ArrowForward fontSize="small" />}
              sx={{
                mt: 3,
                borderRadius: BUTTON_RADIUS,
                p: "10px 22px",
                fontSize: { xs: "15px", md: "15px" },
                // Always white: it sits on the brand gradient in both themes.
                backgroundColor: "common.white",
                color: "brand.navy",
                boxShadow: "none",
                "&:hover": { boxShadow: "none", backgroundColor: "primary.contrastText", color: "brand.navy" },
              }}
            >
              Start a conversation
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
              {contactRows.map(({ label, value, href, Icon }) => (
                <Box component="li" key={label} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <Icon sx={{ color: "rgba(255,255,255,0.85)", fontSize: 22, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
                      {label}
                    </Typography>
                    <Typography
                      component="a"
                      href={href}
                      variant="h3"
                      sx={{
                        color: "secondary.contrastText",
                        textDecoration: "none",
                        overflowWrap: "anywhere",
                        transition: "color 0.2s",
                        "&:hover": { color: "secondary.main", textDecoration: "underline", textUnderlineOffset: "4px" },
                        "&:focus-visible": { outline: 2, outlineColor: "secondary.contrastText", outlineOffset: 3, borderRadius: "4px" },
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CallSection;
