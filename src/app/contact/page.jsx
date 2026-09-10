"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { getSite } from "@/services/dataService";
import { color, font, measure, motion, radius } from "@/theme/tokens";

const site = getSite();

/**
 * One input style for the whole form, written against the site's own tokens
 * rather than MUI's theme palette — the rest of the page is built from these
 * and a form that quietly uses a different grey is the tell that it was bolted
 * on afterwards.
 */
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    fontSize: "1rem",
    "& fieldset": {
      borderColor: color.rule,
      transition: `border-color ${motion.fast}`,
    },
    "&:hover fieldset": { borderColor: color.grey30 },
    "&.Mui-focused fieldset": {
      borderColor: color.accent,
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputBase-input": {
    color: color.ink,
    padding: "15px 16px",
    "&::placeholder": { color: color.inkFaint, opacity: 1 },
  },
  "& .MuiInputBase-inputMultiline": { padding: 0 },
};

const DETAILS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  { label: "LinkedIn", value: "/company/14labs", href: site.linkedin, external: true },
  { label: "Based in", value: "Lahore, Pakistan" },
];

// What actually happens after the button is pressed. Saying so is the cheapest
// way to make a contact form feel like it reaches a person.
const NEXT = [
  "One of the engineers reads it — not a form queue.",
  "You get a reply within two working days, including if the answer is no.",
  "If it looks like a fit, the next step is a 30-minute call about the problem, not a pitch.",
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({ severity: "success", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      setSnackbar({ severity: "success", message: "Message sent. We will reply within two working days." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
      setOpenSnackbar(true);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: color.ground,
        paddingTop: { xs: "48px", md: "88px" },
        paddingBottom: { xs: "56px", md: "112px" },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            columnGap: { md: 8 },
            rowGap: { xs: 6, md: 0 },
            alignItems: "start",
          }}
        >
          <Box>
            <Typography variant="eyebrow" sx={{ color: color.accent, mb: 4 }}>
              Contact
            </Typography>

            <Typography variant="h1" sx={{ color: color.ink, maxWidth: "13ch" }}>
              Tell us what is not working yet
            </Typography>

            <Typography
              variant="lede"
              sx={{ mt: 4, color: color.inkMuted, maxWidth: measure.lede }}
            >
              Send the shape of the problem, the data you have and what a good
              outcome would look like. We will reply with an honest read on
              whether it is worth building — including when it is not.
            </Typography>

            <Box
              sx={{
                mt: { xs: 5, md: 7 },
                borderTop: "1px solid",
                borderColor: color.ruleStrong,
              }}
            >
              {DETAILS.map((row) => {
                const content = (
                  <>
                    <Typography variant="eyebrow" sx={{ color: color.inkFaint }}>
                      {row.label}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.75,
                        fontSize: "1.0625rem",
                        fontWeight: 500,
                        letterSpacing: "-0.015em",
                        color: "inherit",
                      }}
                    >
                      {row.value}
                    </Typography>
                  </>
                );

                const rowSx = {
                  display: "block",
                  paddingBlock: 2.25,
                  borderBottom: "1px solid",
                  borderColor: color.rule,
                  textDecoration: "none",
                  color: color.ink,
                  transition: `color ${motion.fast}`,
                };

                return row.href ? (
                  <Box
                    key={row.label}
                    component="a"
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    sx={{ ...rowSx, "&:hover": { color: color.accent } }}
                  >
                    {content}
                  </Box>
                ) : (
                  <Box key={row.label} sx={rowSx}>
                    {content}
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: { xs: 5, md: 6 } }}>
              <Typography variant="eyebrow" sx={{ color: color.accent }}>
                What happens next
              </Typography>

              <Box component="ol" sx={{ listStyle: "none", m: 0, mt: 2.5, p: 0 }}>
                {NEXT.map((item, i) => (
                  <Box
                    key={item}
                    component="li"
                    sx={{ display: "flex", gap: 2, mt: i ? 1.75 : 0 }}
                  >
                    <Typography
                      aria-hidden
                      sx={{
                        fontFamily: font.mono,
                        fontSize: "0.75rem",
                        letterSpacing: "0.11em",
                        color: color.grey45,
                        pt: "3px",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="body2" sx={{ color: color.inkMuted }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: color.grey05,
              border: "1px solid",
              borderColor: color.grey20,
              borderRadius: { xs: radius.lg, md: radius.xl },
              p: { xs: 3, md: 4.5 },
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Typography variant="h3" sx={{ color: color.ink }}>
              Send a note
            </Typography>

            {[
              { name: "name", placeholder: "Full name", type: "text" },
              { name: "email", placeholder: "Email address", type: "email" },
              { name: "subject", placeholder: "Subject", type: "text" },
            ].map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            ))}

            <TextField
              name="message"
              placeholder="What is the problem, and what have you tried?"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={6}
              fullWidth
              required
              sx={fieldSx}
            />

            <Box
              component="button"
              type="submit"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                alignSelf: "flex-start",
                appearance: "none",
                border: 0,
                cursor: isSubmitting ? "progress" : "pointer",
                px: 3.5,
                py: 1.8,
                borderRadius: radius.pill,
                backgroundColor: color.deep,
                color: color.onDeep,
                fontFamily: font.body,
                fontSize: "0.9375rem",
                fontWeight: 500,
                transition: `background-color ${motion.fast}, opacity ${motion.fast}`,
                opacity: isSubmitting ? 0.65 : 1,
                "&:hover": { backgroundColor: color.deepHover },
              }}
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </Box>

            <Typography variant="caption" sx={{ color: color.inkFaint }}>
              We reply to everything. No newsletter, no sequence, no CRM
              follow-up.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactPage;
