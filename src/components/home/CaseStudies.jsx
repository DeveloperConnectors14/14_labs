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

const studies = [
  {
    id: "case-1",
    title: "How we increase revenuew for Acme using AI.",
    img: "case1.png",
    date: "31st January 2008",
  },
  {
    id: "case-2",
    title: "How we reduce wait time to 45% using data.",
    img: "case2.png",
    date: "31st January 2008",
  },
  {
    id: "case-3",
    title: "How we increase revenuew for Acme using AI.",
    img: "case3.png",
    date: "31st January 2008",
  },
];

function CaseStudies() {
  return (
    <Box sx={{ px: 4, py: 6, }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight={600} sx={{ color: "text.primary" }}>
            Case <Box component="span" sx={{ color: "text.secondary" }}>
              studies
            </Box>
          </Typography>
          <Typography sx={{ py: 2 }} color="text.primary">
            Explore our in-depth case studies showcasing real-world examples of how AI solutions have driven success for businesses like yours.
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
                      transform: "translateY(-6px)",
                      boxShadow: 6,
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
                    <Typography fontWeight={600} color="text.black">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
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