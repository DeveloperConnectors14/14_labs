"use client";
import { getServices } from "@/services/dataService";
import { Box, Grid, Chip, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, NAV_SCROLL_MARGIN } from "@/theme/tokens";
import NumberedCard from "@/components/general/NumberedCard";

const services = getServices();

function ServicesSection() {
  return (
    <Box component="section" id="services" sx={{ px: SECTION_PX, py: SECTION_PY, scrollMarginTop: NAV_SCROLL_MARGIN, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)" }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Our <Box component="span" sx={{ color: "text.secondary" }}>
              services
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            From research to production: we design, build and deploy machine learning and AI software for companies and research partners.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid size={{ xs: 12, sm: 6 }} key={service.sNo} sx={{ display: "flex" }}>
                <NumberedCard number={service.sNo} title={service.title} desc={service.desc}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {service.tags.slice(0, 3).map((tag) => (
                      <Chip key={tag} label={tag} size="small" sx={{ display: "inline-flex", minHeight: 28 }} />
                    ))}
                  </Box>
                </NumberedCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServicesSection;
