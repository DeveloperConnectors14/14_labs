"use client";

import { Box, Typography, Paper, Grid } from "@mui/material";
import Xarrow, { Xwrapper } from "react-xarrows";


const Node = ({ id, label, color = "#377BBB" }) => {
    return (
        <Paper
            id={id}
            elevation={0}
            sx={{
                px: { xs: 0.5, sm: 0.5, md: 2 },
                py: { xs: 0.5, sm: 1, md: 1.5 },
                borderRadius: "10px",
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
            <Typography
                sx={{
                    py: 1,
                    fontWeight: 400,
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                    fontFamily: "'Instrument Sans', sans-serif",
                }}
            >
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
        <Box sx={{ px: 4, py: 6 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            py: 1,
                            fontWeight: 400,
                            fontSize: { xs: "16px", sm: "17px", md: "18px" },
                            fontFamily: "'Instrument Sans', sans-serif",
                        }}
                    >
                        Architecture
                    </Typography>

                    <Typography
                        fontWeight={600}
                        sx={{
                            fontSize: { xs: "26px", sm: "32px", md: "40px" },
                            fontFamily: "'Instrument Sans', sans-serif",
                        }}
                    >
                        Intelligent Pipeline <br /> Architecture
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Xwrapper>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 3,
                                position: "relative",
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