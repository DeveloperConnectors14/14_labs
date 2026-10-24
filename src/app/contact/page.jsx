"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { SECTION_PX, SECTION_PY, BUTTON_RADIUS, TILE_RADIUS, SOFT_GRADIENT } from "@/theme/tokens";
import { getContactInfo } from "@/services/dataService";

const contactInfo = getContactInfo();

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "background.paper",
    borderRadius: TILE_RADIUS,
    transition: "border-color 0.2s ease",
    "& fieldset": {
      borderColor: "divider",
      transition: "border-color 0.2s ease",
    },
    "&:hover fieldset": {
      borderColor: "text.grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "text.secondary",
      borderWidth: "1.5px",
    },
    "&.Mui-error fieldset": {
      borderColor: "error.main",
    },
  },
  "& .MuiInputBase-input": {
    color: "text.black",
    padding: "14px 16px",
    "&::placeholder": {
      color: "text.grey",
      opacity: 1,
    },
  },
  "& .MuiInputBase-multiline": {
    padding: 0,
  },
  "& .MuiInputBase-inputMultiline": {
    padding: "14px 16px",
  },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  // Subject and message are each optional, but at least one must be filled in.
  const [contentMissing, setContentMissing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({ severity: "success", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "subject" || e.target.name === "message") setContentMissing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() && !formData.message.trim()) {
      setContentMissing(true);
      return;
    }
    setIsSubmitted(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      setSnackbar({ severity: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitted(false);
      setOpenSnackbar(true);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        px: SECTION_PX,
        py: SECTION_PY,
        background: SOFT_GRADIENT,
      }}
    >
      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Contact{" "}
            <Box component="span" sx={{ color: "text.secondary" }}>
              us
            </Box>
          </Typography>

          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            Ready to start your next project? Contact us through any of these channels or fill out the form.
          </Typography>

          <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.grey">
                Email
              </Typography>
              <Typography variant="h3" color="text.primary">
                {contactInfo.email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.grey">
                Phone
              </Typography>
              <Typography variant="h3" color="text.primary">
                {contactInfo.phone}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.grey">
                Location
              </Typography>
              <Typography variant="h3" color="text.primary">
                {contactInfo.location}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              placeholder="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              sx={textFieldSx}
            />

            <TextField
              placeholder="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={textFieldSx}
            />

            <TextField
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              error={contentMissing}
              sx={textFieldSx}
            />

            <TextField
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
              error={contentMissing}
              helperText={contentMissing ? "Add a subject or a message" : ""}
              sx={textFieldSx}
            />

            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={isSubmitted}
                sx={{
                  borderRadius: BUTTON_RADIUS,
                  p: "9px 18px",
                  color: "brand.navy",
                  backgroundColor: "secondary.main",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "primary.contrastText",
                    color: "brand.navy",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
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
