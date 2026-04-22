import { getFeatures } from "@/services/dataService";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

const features = getFeatures();

function WhyChooseUs() {
  return (
    <Box sx={{ px: SECTION_PX, py: SECTION_PY, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            What set us <Box component="span" sx={{ color: "text.secondary" }}>
              apart
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            We differentiate ourselves from other AI service providers by:
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={3}>
            {features.map((item, i) => (
              < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    width: "100%",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: CARD_RADIUS,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <Image
                        src={`/media/${item.icon}`}
                        alt={item.icon}
                        width={60}
                        height={60}
                        style={{
                          objectFit: "contain",
                          borderRadius: "100%",
                        }}
                      />
                    </Box>
                    <Typography variant="h3">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.grey" sx={{ py: 1 }}>
                      {item.desc}
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

export default WhyChooseUs;
