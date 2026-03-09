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

function ContactPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        console.log(formData);

        // show popup
        setOpenSnackbar(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        }, 3000);
    };

    const handleClose = (_, reason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                px: { xs: 3, md: 8 },
                py: 6,
                background:
                    "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
            }}
        >
            <Grid container spacing={3} alignItems="flex-start">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Contact Us
                    </Typography>

                    <Typography
                        sx={{ py: 2, maxWidth: 420 }}
                        color="text.secondary"
                    >
                        Explore our in-depth case studies showcasing real-world
                        examples of how our AI solutions have driven success for
                        businesses like yours.
                    </Typography>

                    <Box sx={{ mt: 6 }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                                Email
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                info@14labs.co
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Phone
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                +1(888)-855-5328
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
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                            }}
                        />

                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                            }}
                        />

                        <TextField
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                            }}
                        />

                        <TextField
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            multiline
                            rows={5}
                            fullWidth
                            required
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                            }}
                        />

                        <Box sx={{ mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitted}
                                sx={{
                                    borderRadius: 7,
                                    px: 2.5,
                                    py: 1.5,
                                    fontWeight: 600,
                                    letterSpacing: 1,
                                    color: "text.primary",
                                    backgroundColor: "primary.main",
                                    boxShadow: "none"
                                }}
                            >
                                SEND MESSAGE
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Success Popup */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Message Sent Successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ContactPage;