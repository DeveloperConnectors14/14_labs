"use client";
import { getTools } from "@/services/dataService";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SECTION_PX, SECTION_PY, TILE_RADIUS } from "@/theme/tokens";

const tools = getTools();

function ToolsSection() {

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTools =
    activeFilter === "All"
      ? tools.flatMap((item) => item.values)
      : tools
        .filter((item) => item.techType === activeFilter)
        .flatMap((item) => item.values);

  function handleFilter(type) {
    setActiveFilter(type);
  }

  return (
    <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <Typography variant="h2" sx={{ color: "text.primary" }}>
              Our <Box component="span" sx={{ color: "text.secondary" }}>
                Tech Stack
              </Box>
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            We leverage cutting-edge AI frameworks and cloud infrastructure to build intelligent, scalable solutions for enterprise.
          </Typography>
        </Grid>

        <Grid size={12} sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          pb: 2
        }}>
          {["All", ...tools.map((t) => t.techType)].map((label) => {
            const isActive = activeFilter === label;
            return (
              <Button
                key={label}
                variant="contained"
                onClick={() => handleFilter(label)}
                sx={{
                  borderRadius: TILE_RADIUS,
                  px: 2,
                  py: 1,
                  border: 1,
                  borderColor: isActive ? "text.secondary" : "divider",
                  backgroundColor: isActive ? "text.secondary" : "background.paper",
                  color: isActive ? "secondary.contrastText" : "text.black",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: isActive ? "text.secondary" : "primary.contrastText",
                    boxShadow: "none",
                  },
                }}
              >
                {label}
              </Button>
            );
          })}

        </Grid>

        <Grid container spacing={2} sx={{ width: "100%" }}>
          {filteredTools.map((item, index) => (
            <Grid size={{ xs: 6, sm: 3, md: 1.5 }} key={index}>
              <Box sx={{
                width: "100%",
                height: { xs: 110, sm: 115, md: 120 },
                backgroundColor: "background.paper",
                p: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: TILE_RADIUS,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}>
                <Image
                  src={`/media/tech_stacks/${item.file}.svg`}
                  alt={item.name}
                  width={48}
                  height={48}
                  style={{
                    height: 40,
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
                <Typography variant="body2" sx={{ color: "text.grey", textAlign: "center", lineHeight: 1.2 }}>
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolsSection;