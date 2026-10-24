"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, ButtonBase, Chip, Collapse, Grid, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import BiotechIcon from "@mui/icons-material/Biotech";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import { getResearchAreas } from "@/services/dataService";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, NAV_SCROLL_MARGIN } from "@/theme/tokens";

const areas = getResearchAreas();

const iconMap = {
  WbSunnyOutlined: WbSunnyOutlinedIcon,
  Biotech: BiotechIcon,
  CenterFocusStrongOutlined: CenterFocusStrongOutlinedIcon,
  EnergySavingsLeafOutlined: EnergySavingsLeafOutlinedIcon,
};

// "Our focus": heading and a photo on the left, a numbered list of the research
// areas on the right. One row is open at a time and lists that area's papers.
function ResearchAreas() {
  const [open, setOpen] = useState(0);

  return (
    <Box component="section" id="research-areas" sx={{ px: SECTION_PX, py: SECTION_PY, scrollMarginTop: NAV_SCROLL_MARGIN }}>
      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Our <Box component="span" sx={{ color: "text.secondary" }}>
              focus
            </Box>
          </Typography>
          <Box
            sx={{
              position: "relative",
              mt: { xs: 1, md: 3 },
              // Fixed shape so the photo never squashes when rows open or close.
              aspectRatio: { xs: "16 / 9", md: "3 / 2" },
              borderRadius: CARD_RADIUS,
              overflow: "hidden",
            }}
          >
            <Image
              src="/media/focus-microscope.webp"
              alt="Close-up of a microscope objective lens"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>

        {/* The 10px top offset lines the first divider up with the top of the
            heading's letters rather than its line box. */}
        <Grid size={{ xs: 12, md: 7 }} component="ul" sx={{ listStyle: "none", m: 0, p: 0, pt: { md: "10px" }, alignSelf: "flex-start" }}>
          {areas.map((area, i) => {
            const isOpen = open === i;
            const panelId = `focus-panel-${i}`;
            const Icon = iconMap[area.icon];
            return (
              <Box component="li" key={area.title} sx={{ borderTop: 1, borderColor: "divider", "&:last-of-type": { borderBottom: 1, borderColor: "divider" } }}>
                <ButtonBase
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 2, md: 3 },
                    py: { xs: 2, md: 2.5 },
                    textAlign: "left",
                    "&:hover .focusTitle": { color: "secondary.main" },
                    "&:focus-visible": { outline: 2, outlineColor: "secondary.main", outlineOffset: 2 },
                  }}
                >
                  {/* Icon circle and +/- toggle match the case-study "Step" accordion. */}
                  <Box
                    component="span"
                    sx={{
                      width: { xs: 44, md: 56 },
                      height: { xs: 44, md: 56 },
                      flexShrink: 0,
                      borderRadius: "50%",
                      border: 1,
                      borderColor: "divider",
                      backgroundColor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {Icon && <Icon sx={{ fontSize: { xs: 22, md: 28 }, color: "text.secondary" }} />}
                  </Box>
                  <Box component="span" sx={{ flexGrow: 1 }}>
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ display: "block", color: isOpen ? "secondary.main" : "text.grey", transition: "color 0.3s" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography
                      component="span"
                      variant="h3"
                      className="focusTitle"
                      sx={{ display: "block", color: isOpen ? "secondary.main" : "text.primary", transition: "color 0.3s" }}
                    >
                      {area.title}
                    </Typography>
                  </Box>
                  {isOpen
                    ? <Remove sx={{ color: "text.secondary", fontSize: 24, flexShrink: 0 }} />
                    : <Add sx={{ color: "text.secondary", fontSize: 24, flexShrink: 0 }} />}
                </ButtonBase>

                <Collapse in={isOpen}>
                  <Box id={panelId} role="region" aria-label={area.title} sx={{ pb: 3, pl: { xs: 7.5, md: 10 } }}>
                    <Typography variant="body1" color="text.grey">
                      {area.desc}
                    </Typography>
                    <Typography variant="caption" color="text.grey" sx={{ display: "block", textTransform: "uppercase", mt: 2, mb: 1 }}>
                      {area.paperCount} {area.paperCount === 1 ? "paper" : "papers"}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {area.papers.map((paper) => (
                        <Chip
                          key={paper.id}
                          component={Link}
                          href={`/research/${paper.id}`}
                          label={paper.shortTitle}
                          clickable
                          sx={{ display: "inline-flex", "&:hover": { backgroundColor: "secondary.main" } }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResearchAreas;
