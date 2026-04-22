"use client";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { getPricing } from "@/services/dataService";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, BUTTON_RADIUS } from "@/theme/tokens";

const pricing = getPricing();

function PricingSection() {
    return (
        <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                        Our <Box component="span" sx={{ color: "text.secondary" }}>
                            Pricing
                        </Box>
                    </Typography>
                    <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
                        Customized pricing options best suitable for your needs
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Grid container spacing={3}>
                        {pricing.map((item, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i} sx={{ display: "flex" }}>
                                <Card
                                    sx={{
                                        width: "100%",
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: CARD_RADIUS,
                                        transition: "0.3s",
                                        "&:hover": {
                                            borderColor: "text.grey"
                                        },
                                    }}
                                >
                                    <CardContent sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between", p: 1,
                                    }}>
                                        <Box sx={{ px: 2, borderRadius: "12px", background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                                            <Typography variant="h3" color="text.black" sx={{ py: 1 }} >
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ py: 1 }} color="text.primary">
                                                {item.duration}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ px: 2 }}>
                                            {item.details.split(",").map((point, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        py: 0.6,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 18,
                                                            height: 18,
                                                            borderRadius: "50%",
                                                            backgroundColor: "text.secondary",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <ArrowForwardIosIcon
                                                            sx={{ fontSize: 10, color: "secondary.contrastText" }}
                                                        />
                                                    </Box>

                                                    <Typography variant="body2" sx={{ py: 1 }} color="text.primary">
                                                        {point.trim()}
                                                    </Typography>
                                                </Box>
                                            ))}

                                            <Typography
                                                color="text.black"
                                                sx={{ mt: 1, fontWeight: 700, fontSize: { xs: "24px", sm: "26px", md: "28px" }, fontFamily: "'Instrument Sans', sans-serif" }}
                                            >
                                                {item.pricing}
                                            </Typography>

                                            <Button
                                                component={Link}
                                                href="/contact"
                                                variant="contained"
                                                sx={{
                                                    border: 1,
                                                    borderColor: "secondary.main",
                                                    borderRadius: BUTTON_RADIUS,
                                                    mt: 2,
                                                    px: 3,
                                                    py: 1.4,
                                                    backgroundColor: "background.paper",
                                                    color: "text.primary",
                                                    boxShadow: "none",
                                                    "&:hover": {
                                                        boxShadow: "none",
                                                        backgroundColor: "primary.contrastText",
                                                        color: "text.primary",
                                                    },
                                                }}
                                            >
                                                Schedule Call
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}

export default PricingSection;
