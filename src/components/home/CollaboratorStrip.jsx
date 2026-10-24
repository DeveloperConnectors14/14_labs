import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { getCollaborators } from "@/services/dataService";

const collaborators = getCollaborators();

// On hover (mouse only), the tile turns white and the logo fades from its white
// version to its original colours. Touch screens keep the white logos.
const HOVER = "@media (hover: hover) and (pointer: fine)";


// White logo tiles along the bottom of the dark hero. They scroll sideways on
// narrow screens instead of wrapping, so the strip stays one row high.
function CollaboratorStrip() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "center", color: "secondary.contrastText", opacity: 0.92, mb: 2, px: 2, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
      >
        Co-authored with researchers from
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          px: 2,
          display: "flex",
          // Auto margins centre the row when it fits and keep its start
          // reachable when it scrolls (justify-content: center would clip it).
          "& > li:first-of-type": { ml: "auto" },
          "& > li:last-of-type": { mr: "auto" },
          gap: 1.5,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {collaborators.map((c) => (
          <Box
            component="li"
            key={c.name}
            title={`${c.name}, ${c.country}`}
            sx={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              height: { xs: 56, md: 60 },
              px: { xs: 2, md: 2.5 },
              border: 1,
              borderColor: "rgba(255,255,255,0.22)",
              borderRadius: "12px",
              // Frosted glass: a dark translucent fill with a blur of the photo behind,
              // so the white logos stand out on any hero slide.
              backgroundColor: "rgba(10,18,26,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
              "& .logoWhite, & .logoColor, & .logoLabel": { transition: "opacity 0.3s ease, color 0.3s ease" },
              [HOVER]: {
                "&:hover": {
                  backgroundColor: "background.paper",
                  borderColor: "background.paper",
                  "& .logoWhite": { opacity: 0 },
                  "& .logoColor": { opacity: 1 },
                  "& .logoLabel": { color: "text.primary" },
                },
              },
            }}
          >
            {/* The two versions are cropped identically, so they overlap exactly. */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 28, md: 32 },
                "& img": { height: "100%", width: "auto", display: "block" },
                "& .logoColor": { position: "absolute", inset: 0, opacity: 0 },
              }}
            >
              <Image className="logoWhite" src={`/media/${c.logo}`} alt={c.name} width={c.width} height={c.height} />
              <Image
                className="logoColor"
                src={`/media/${c.logo.replace(".webp", "-color.webp")}`}
                alt=""
                aria-hidden
                width={c.width}
                height={c.height}
              />
            </Box>
            {c.label && (
              <Typography
                component="span"
                className="logoLabel"
                sx={{ color: "secondary.contrastText", fontWeight: 600, fontSize: { xs: "13px", md: "14px" }, lineHeight: 1.2, whiteSpace: "nowrap" }}
              >
                {c.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CollaboratorStrip;
