import AgentGraph from "./AgentGraph";
import EmbeddingField from "./EmbeddingField";
import EvalCurve from "./EvalCurve";
import LatencyBars from "./LatencyBars";
import SignalGrid from "./SignalGrid";

/**
 * Subject to figure, resolved in one place.
 *
 * The figures are meant to work as a visual index — a reader who sees the
 * scatter on a research card should recognise it on the retrieval service card
 * and know, before reading a word, that the two are about the same thing. That
 * only holds if nothing else in the codebase gets to pick.
 *
 * Keys match `topic` on a research note and the tag vocabulary used elsewhere.
 */
const BY_TOPIC = {
  Retrieval: EmbeddingField,
  Evaluation: EvalCurve,
  "Multi-agent systems": AgentGraph,
  "Applied ML": SignalGrid,
  "Applied machine learning": SignalGrid,
  Production: LatencyBars,
  Reliability: LatencyBars,
};

// Matched without regard to case, so a topic keeps its figure whether it is
// written "Multi-agent systems" or "Multi-Agent Systems".
const BY_KEY = Object.fromEntries(
  Object.entries(BY_TOPIC).map(([topic, Figure]) => [topic.toLowerCase(), Figure])
);

function TopicFigure({ topic, ...rest }) {
  // An unmapped topic is a content bug, not a rendering one — fall back to the
  // most neutral figure rather than punching a hole in the layout.
  const Figure = BY_KEY[String(topic).toLowerCase()] ?? SignalGrid;
  return <Figure {...rest} />;
}

export default TopicFigure;
