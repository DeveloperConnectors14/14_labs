"use client";

import {
    Add,
    Remove,
    SearchOutlined,
    StorageOutlined,
    LocationOnOutlined,
    VisibilityOutlined,
    AccountTreeOutlined,
    GroupsOutlined,
    InsightsOutlined,
    BoltOutlined,
} from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

const iconMap = {
    SearchOutlined,
    StorageOutlined,
    LocationOnOutlined,
    VisibilityOutlined,
    AccountTreeOutlined,
    GroupsOutlined,
    InsightsOutlined,
    BoltOutlined,
};

function SingleCaseApproach({ approaches }) {
    const [expanded, setExpanded] = useState(0);

    const handleChange = (i) => (_, isExpanded) => {
        setExpanded(isExpanded ? i : false);
    };

    return (
        <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                        {approaches.label || "Our Approach"}
                    </Typography>
                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                        {approaches.title}
                    </Typography>
                    {approaches.text && (
                        <Typography variant="body1" sx={{ pt: 2 }} color="text.grey">
                            {approaches.text}
                        </Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Grid container spacing={2.5}>
                        {approaches.steps.map((item, i) => {
                            const isOpen = expanded === i;
                            return (
                                <Grid size={12} key={i}>
                                    <Accordion
                                        expanded={isOpen}
                                        onChange={handleChange(i)}
                                        disableGutters
                                        elevation={0}
                                        square={false}
                                        sx={{
                                            border: 1,
                                            borderColor: "divider",
                                            borderRadius: `${CARD_RADIUS} !important`,
                                            overflow: "hidden",
                                            backgroundColor: "background.paper",
                                            "&::before": { display: "none" },
                                            "&:first-of-type": { borderRadius: `${CARD_RADIUS} !important` },
                                            "&:last-of-type": { borderRadius: `${CARD_RADIUS} !important` },
                                            "&.Mui-expanded": {
                                                margin: 0,
                                            },
                                            "& .MuiAccordionSummary-content": {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: { xs: 2, md: 3 },
                                                my: 0,
                                            },
                                            "& .MuiAccordionSummary-content.Mui-expanded": {
                                                my: 0,
                                            },
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={
                                                isOpen
                                                    ? <Remove sx={{ color: "text.secondary", fontSize: 22 }} />
                                                    : <Add sx={{ color: "text.secondary", fontSize: 22 }} />
                                            }
                                            sx={{
                                                px: { xs: 2, md: 2.5 },
                                                py: { xs: 2, md: 2.5 },
                                                minHeight: "unset",
                                                "&.Mui-expanded": { minHeight: "unset" },
                                                "& .MuiAccordionSummary-expandIconWrapper": {
                                                    transform: "none",
                                                    transition: "none",
                                                },
                                                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                                                    transform: "none",
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    flexShrink: 0,
                                                    width: { xs: 56, md: 72 },
                                                    height: { xs: 56, md: 72 },
                                                    borderRadius: "50%",
                                                    border: 1,
                                                    borderColor: "divider",
                                                    backgroundColor: "background.paper",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {(() => {
                                                    const Icon = iconMap[item.icon];
                                                    return Icon ? (
                                                        <Icon sx={{ fontSize: { xs: 28, md: 36 }, color: "text.secondary" }} />
                                                    ) : null;
                                                })()}
                                            </Box>

                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "text.black",
                                                        letterSpacing: "1.12px",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {item.step}
                                                </Typography>
                                                <Typography
                                                    variant="h3"
                                                    sx={{
                                                        color: "text.primary",
                                                        letterSpacing: "-0.48px",
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>

                                        <AccordionDetails
                                            sx={{
                                                px: { xs: 2, md: 2.5 },
                                                pt: 0,
                                                pb: { xs: 2, md: 2.5 },
                                                pl: { xs: 2, sm: `${56 + 24 + 20}px`, md: `${72 + 24 + 20}px` },
                                            }}
                                        >
                                            <Typography variant="body1" color="text.grey">
                                                {item.desc}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SingleCaseApproach;
