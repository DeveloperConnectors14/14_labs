"use client";

import { Box, Typography, Paper, Grid } from "@mui/material";
import Xarrow, { Xwrapper } from "react-xarrows";
import { SECTION_PX, SECTION_PY, TILE_RADIUS } from "@/theme/tokens";


const Node = ({ id, label, color = "#377BBB" }) => {
    return (
        <Paper
            id={id}
            elevation={0}
            sx={{
                px: { xs: 0.5, sm: 0.5, md: 2 },
                py: { xs: 0.5, sm: 1, md: 1.5 },
                borderRadius: TILE_RADIUS,
                border: "1px dashed #D9D9D9",
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: { xs: 150, sm: 200, md: 240 },
                justifyContent: "center",
                background: "#fff",
                fontFamily: "IBM Plex Mono",
            }}
        >
            <Box
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: color,
                }}
            />
            <Typography variant="body2" sx={{ py: 1 }}>
                {label}
            </Typography>
        </Paper>
    );
};

const Arrow = ({ start, end }) => {
    return (
        <Xarrow
            start={start}
            end={end}
            showHead={false}
            strokeWidth={1}
            color="#9B9B9B"
            path="grid"
        />
    );
};

function SingleCasePipeline({ casePipeline }) {
    const nodeMap = Object.fromEntries(
        casePipeline.nodes.map((node) => [node.id, node])
    );

    return (
        <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                        {casePipeline.label || "Architecture"}
                    </Typography>

                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                        {(() => {
                            const raw = casePipeline.title || "Intelligent Pipeline Architecture";
                            const words = raw.split(" ");
                            const last = words.pop();
                            const rest = words.join(" ");
                            return (
                                <>
                                    {rest ? `${rest} ` : ""}
                                    <Box component="span" sx={{ color: "text.secondary" }}>
                                        {last}
                                    </Box>
                                </>
                            );
                        })()}
                    </Typography>
                    {casePipeline.text && (
                        <Typography variant="body1" sx={{ pt: 2 }} color="text.grey">
                            {casePipeline.text}
                        </Typography>
                    )}
                </Grid>

                <Grid size={12} sx={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                    <Xwrapper>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 3,
                                position: "relative",
                                minWidth: "fit-content",
                                px: 1,
                            }}
                        >
                            {casePipeline.layout.map((row, i) => (
                                <Box key={i} sx={{ display: "flex", gap: 6 }}>
                                    {row.map((nodeId) => {
                                        const node = nodeMap[nodeId];
                                        if (!node) return null;

                                        return <Node key={nodeId} {...node} />;
                                    })}
                                </Box>
                            ))}

                            {casePipeline.edges.map(([start, end], i) => (
                                <Arrow key={i} start={start} end={end} />
                            ))}
                        </Box>
                    </Xwrapper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SingleCasePipeline;