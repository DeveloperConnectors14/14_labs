import { getChallanges } from "@/services/dataService";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import HubIcon from "@mui/icons-material/Hub";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

const iconMap = {
  PrecisionManufacturing: PrecisionManufacturingIcon,
  Hub: HubIcon,
  ScienceOutlined: ScienceOutlinedIcon,
  TuneOutlined: TuneOutlinedIcon,
};

const challenges = getChallanges();

function ChallengesSection() {
  return (
    <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Challenges we <Box component="span" sx={{ color: "text.secondary" }}>
              can overcome
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2, color: "text.primary" }}>
            We turn these challenges into intelligent, practical solutions.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            {challenges.map((item, i) => (
              <Grid size={12} key={i}>
                <Card>
                  <CardContent sx={{
                    p: { xs: 3, md: 4 },
                    border: 1,
                    borderColor: "divider",
                    borderRadius: CARD_RADIUS,
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: "background.paper",
                        border: 1,
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {(() => {
                        const Icon = iconMap[item.icon];
                        return Icon ? <Icon sx={{ fontSize: 32, color: "text.secondary" }} /> : null;
                      })()}
                    </Box>
                    <Box>
                      <Typography variant="h3">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
                        {item.desc}
                      </Typography>
                    </Box>
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


export default ChallengesSection;