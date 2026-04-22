"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { getcaseStudies } from "@/services/dataService";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, TILE_RADIUS } from "@/theme/tokens";

const studies = getcaseStudies();

function CaseStudies() {
  return (
    <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Case <Box component="span" sx={{ color: "text.secondary" }}>
              studies
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            Explore how we've transformed businesses across industries with intelligent automation, multi-agent systems, and cutting-edge AI technology.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={3}>
            {studies.map((item, i) => (
              < Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}
                sx={{ display: "flex" }}
              >
                <Card
                  component={Link}
                  href={`/case-studies/${item.id}`}
                  sx={{
                    width: "100%",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: CARD_RADIUS,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                    textDecoration: "none",
                    p: 1,
                    "&:hover": {
                      borderColor: "transparent",
                      background: "linear-gradient(90deg, #016b64bb, #054c64c5, #063864cb, #02185abb)",
                      "& .caseTitle": { color: "secondary.contrastText" },
                      "& .caseDate": { color: "primary.contrastText" },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/media/${item.img}`}
                    alt={item.img}
                    sx={{ borderRadius: TILE_RADIUS }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography className="caseTitle" variant="h3" color="text.black" sx={{ transition: "color 0.3s" }}>
                      {item.title}
                    </Typography>
                    <Typography className="caseDate" variant="body2" color="text.grey" sx={{ pt: 1, transition: "color 0.3s" }}>
                      {item.date}
                    </Typography>
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


export default CaseStudies;
