"use client";

import { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import RetrievalRank, {
  ANSWER,
  DEFAULT_K,
  SCORES,
} from "@/components/visuals/RetrievalRank";
import { color, motion, radius } from "@/theme/tokens";

/**
 * The one figure on the site the reader can change, rather than only point at.
 *
 * Every other visual here argues by being drawn from real structure. This one
 * argues by being wrong until you fix it: the passage that answers the question
 * ranks twelfth, so at the top-k every RAG tutorial ships with, the model never
 * sees it. Drag the cutoff to twelve and it appears — and the readout beside it
 * shows what that costs, which is the half of the tradeoff nobody puts in the
 * tutorial.
 *
 * Why it is worth a section of its own: "retrieval, not the model, is usually
 * the thing that is broken" is the most load-bearing claim we make, and it is
 * the one a visitor is most likely to have heard argued the other way. A reader
 * who moves the slider and watches the answer cross the line has tested the
 * claim rather than been told it.
 *
 * The numbers are a worked example on the figure's own fourteen candidates, not
 * a measurement of anyone's system, and the caption says so. An interactive
 * that quietly implies it is reading live production data would be the exact
 * dishonesty this page is arguing against.
 */

/** Assumptions, stated on the page rather than buried here. */
const TOKENS_PER_CHUNK = 380;
const PROMPT_OVERHEAD = 450;
/** USD per 1k input tokens — a mid-range frontier model, rounded. */
const RATE = 0.003;

function Readout({ label, value, note, strong = false }) {
  return (
    <Box
      sx={{
        py: 2,
        borderTop: "1px solid",
        borderColor: color.ruleOnBlack,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "baseline",
        columnGap: 2,
      }}
    >
      <Typography variant="caption" sx={{ color: color.onBlackMuted }}>
        {label}
      </Typography>
      <Typography
        className="tabular"
        sx={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.9375rem",
          color: strong ? color.lime : color.onBlack,
          transition: `color ${motion.fast}`,
        }}
      >
        {value}
      </Typography>
      {note ? (
        <Typography
          variant="caption"
          sx={{ gridColumn: "1 / -1", mt: 0.5, color: color.onBlackMuted }}
        >
          {note}
        </Typography>
      ) : null}
    </Box>
  );
}

function RetrievalLab({ dense = false }) {
  const [k, setK] = useState(DEFAULT_K);

  const found = ANSWER < k;
  const tokens = PROMPT_OVERHEAD + k * TOKENS_PER_CHUNK;
  const cost = (tokens / 1000) * RATE;

  return (
    /* See SignalPanel: in the rail the height comes from the rail. */
    <Section
      band="black"
      id="retrieval-lab"
      sx={dense ? { paddingBlock: 0 } : undefined}
    >
      <SectionHead
        tone="black"
        split
        eyebrow="Move it yourself"
        title="The model was never the problem"
        lede="This is one real question against fourteen candidate passages. The passage that answers it ranks twelfth — so at the top-k most systems ship with, the model is asked a question and handed fourteen chunks that do not contain the answer. Drag the cutoff and watch where it crosses."
      />

      <Box
        sx={{
          mt: dense ? { xs: 3, md: 4 } : { xs: 5, md: 8 },
          backgroundColor: color.blackAlt,
          border: "1px solid",
          borderColor: color.ruleOnBlack,
          borderRadius: { xs: radius.lg, md: radius.xl },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
          columnGap: { md: 6 },
          rowGap: { xs: 4, md: 0 },
          alignItems: "center",
          p: { xs: 3, md: 5 },
        }}
      >
        <RetrievalRank
          tone="black"
          k={k}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: dense ? "44vh" : undefined,
          }}
        />

        <Box>
          <Typography
            component="label"
            htmlFor="topk"
            variant="caption"
            sx={{ color: color.onBlackMuted, display: "block" }}
          >
            Passages handed to the model
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1.5,
              mt: 1,
            }}
          >
            <Typography
              className="tabular"
              sx={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "3rem",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: color.onBlack,
              }}
            >
              {k}
            </Typography>
            <Typography variant="caption" sx={{ color: color.onBlackMuted }}>
              top-k
            </Typography>
          </Box>

          <Slider
            id="topk"
            value={k}
            min={1}
            max={SCORES.length}
            step={1}
            marks
            onChange={(_, value) => setK(value)}
            aria-label="Number of retrieved passages passed to the model"
            valueLabelDisplay="off"
            sx={{
              mt: 2,
              color: color.lime,
              height: 2,
              "& .MuiSlider-rail": { backgroundColor: color.ruleOnBlack, opacity: 1 },
              "& .MuiSlider-mark": { backgroundColor: color.ruleOnBlack, height: 6 },
              "& .MuiSlider-markActive": { backgroundColor: color.limeDeep },
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: color.lime,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0 0 0 8px ${color.limeDeep}33`,
                },
              },
            }}
          />

          <Box sx={{ mt: 3 }}>
            <Readout
              label="Answer inside the context window"
              value={found ? "yes" : "no"}
              strong={found}
              note={
                found
                  ? `Rank ${ANSWER + 1} is now inside the cutoff.`
                  : `It is at rank ${ANSWER + 1}. Everything above it is a near duplicate of the wrong passage.`
              }
            />
            <Readout
              label="Context sent per query"
              value={`≈ ${tokens.toLocaleString()} tokens`}
            />
            <Readout
              label="Input cost per query"
              value={`≈ $${cost.toFixed(4)}`}
              note={
                found
                  ? "Turning k up until the answer appears is the expensive way to fix ranking."
                  : null
              }
            />
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 3,
              pt: 2,
              borderTop: "1px solid",
              borderColor: color.ruleOnBlack,
              color: color.onBlackMuted,
            }}
          >
            Worked example on the fourteen candidates drawn here — not a reading
            from a live system. Assumes ~{TOKENS_PER_CHUNK} tokens per passage
            and ${RATE.toFixed(3)} per 1k input tokens.
          </Typography>
        </Box>
      </Box>
    </Section>
  );
}

export default RetrievalLab;
