import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import SignalMap from "@/components/visuals/SignalMap";
import { color, motion, radius } from "@/theme/tokens";

const LEGEND = [
  { tone: color.lime, label: "Wired to an alert" },
  { tone: color.blackMark, label: "Sampled and kept" },
];

/**
 * The band between what we build and what we have shipped: the operational
 * half of the job, drawn rather than claimed.
 *
 * It is the one figure on the page a reader is invited to touch — every mark is
 * a signal that names itself when you point at it. That is deliberate: this
 * section is arguing that the unglamorous instrumentation is the product, and a
 * reader who spends ten seconds reading the labels has taken the argument more
 * seriously than one who read another paragraph about reliability.
 */
function SignalPanel({ dense = false }) {
  return (
    /* `dense` is set when this panel is a screen in the horizontal rail rather
       than a band in the page. The rail supplies the height, so the section
       must not also supply its own vertical rhythm — the two together overflow
       the viewport and the bottom of the figure gets clipped. */
    <Section band="black" sx={dense ? { paddingBlock: 0 } : undefined}>
      <SectionHead
        tone="black"
        split
        eyebrow="Under load"
        title="The failures only show up under load"
        lede="Nothing fails on the happy path. It fails on the retry that never ends, the tool that returns nonsense at three in the morning, and the bill that triples on a Tuesday — so these are the things we wire in before anyone calls a system done."
      />

      <Box
        sx={{
          mt: dense ? { xs: 3, md: 4 } : { xs: 5, md: 8 },
          backgroundColor: color.blackAlt,
          border: "1px solid",
          borderColor: color.ruleOnBlack,
          borderRadius: { xs: radius.lg, md: radius.xl },
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
          alignItems: "center",
          columnGap: { md: 6 },
          rowGap: { xs: 4, md: 0 },
          p: { xs: 3, md: 5 },
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ color: color.onBlack, maxWidth: "20ch" }}>
            What We Instrument
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 2, color: color.onBlackMuted, maxWidth: "34ch" }}
          >
            Point at a signal to name it. Every one of these is cheap to add on
            day one and expensive to retrofit in week nine.
          </Typography>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid",
              borderColor: color.ruleOnBlack,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {LEGEND.map((item) => (
              <Box
                key={item.label}
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 11,
                    height: 11,
                    borderRadius: "2px",
                    backgroundColor: item.tone,
                  }}
                />
                <Typography variant="caption" sx={{ color: color.onBlackMuted }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            // The figure is the interactive half, so it gets the room: on a
            // narrow card a hoverable 11px mark is not a target.
            minWidth: 0,
            transition: `opacity ${motion.base}`,
          }}
        >
          <SignalMap
            tone="black"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: dense ? "46vh" : undefined,
            }}
          />
        </Box>
      </Box>
    </Section>
  );
}

export default SignalPanel;
