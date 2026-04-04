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

const studies = getcaseStudies();

function CaseStudies() {
  return (
    <Box sx={{ px: 4, py: 6, }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "semiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
            Case <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
              studies
            </Box>
          </Typography>
          <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
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
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                    textDecoration: "none",
                    p: 1,
                    "&:hover": {
                      borderColor: "text.grey"
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/media/${item.img}`}
                    alt={item.img}
                    sx={{ borderRadius: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={600} color="text.black" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.grey" sx={{ pt: 1, fontFamily: "'Instrument Sans', sans-serif", }}>
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