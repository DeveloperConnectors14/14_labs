/**
 * Research notes.
 *
 * DRAFT CONTENT — written as a scaffold so the section, its routing and its
 * typography can be built and reviewed. Replace or rewrite every entry with
 * real 14Labs work before this goes public.
 *
 * `body` is an array of blocks: { type: "p" | "h2" | "quote" | "list" }.
 */
export const research = [
  {
    slug: "retrieval-is-the-product",
    title: "Retrieval is the product",
    kicker: "Why swapping models rarely fixes a RAG system that is answering badly",
    date: "2026-07-14",
    readingTime: "8 min",
    topic: "Retrieval",
    summary:
      "Across six deployments, changing the generation model moved answer quality far less than changing what we put in the context window. Here is how we now measure the two separately.",
    body: [
      {
        type: "p",
        text: "When a retrieval-augmented system gives a bad answer, the first instinct is almost always to reach for a bigger model. It is the cheapest change to make and the easiest to justify. In our experience it is also, most of the time, the wrong one.",
      },
      {
        type: "p",
        text: "The reason is structural. A generation model can only be as good as the context it is handed. If the passage containing the answer never made it into the window, no amount of reasoning capability recovers it — the model is not being asked a hard question, it is being asked an impossible one.",
      },
      { type: "h2", text: "Measuring the two halves separately" },
      {
        type: "p",
        text: "We split evaluation into two independent scores. Retrieval is graded on whether the passage containing the answer appears in the top-k results, judged against a hand-built golden set. Generation is graded on whether the model produces a correct answer when it is handed the correct passage by construction.",
      },
      {
        type: "list",
        items: [
          "Retrieval recall at k — did the right chunk make it into the window?",
          "Grounded accuracy — given the right chunk, is the answer right?",
          "Faithfulness — does the answer stay inside what the context supports?",
          "Refusal rate — does it decline when the context genuinely lacks the answer?",
        ],
      },
      {
        type: "quote",
        text: "Two systems with identical end-to-end accuracy can be broken in completely different ways. Only splitting the score tells you which one you are looking at.",
      },
      { type: "h2", text: "What actually moved the number" },
      {
        type: "p",
        text: "Chunking strategy and reranking consistently produced larger gains than model upgrades, at a fraction of the inference cost. Document structure mattered more than we expected: preserving heading hierarchy in chunk metadata was worth more than doubling the context window.",
      },
      {
        type: "p",
        text: "None of this argues against using a stronger model. It argues for knowing which of the two halves is failing before you spend anything.",
      },
    ],
  },
  {
    slug: "evaluation-harness-before-agents",
    title: "Build the evaluation harness first",
    kicker: "The unglamorous artefact that decides whether an AI project ships",
    date: "2026-05-02",
    readingTime: "6 min",
    topic: "Evaluation",
    summary:
      "A note on why we no longer start prompt work before a golden set exists, and what a minimum viable eval harness looks like in week one.",
    body: [
      {
        type: "p",
        text: "The most common way an AI project fails is not a technical failure. It is that nobody can say, with evidence, whether the system is better than it was last week. Without that, iteration becomes negotiation, and the loudest opinion in the room wins.",
      },
      { type: "h2", text: "What week one looks like" },
      {
        type: "p",
        text: "We spend the first days of an engagement collecting cases rather than writing prompts. Fifty to two hundred real inputs, each with an expected outcome agreed by somebody who does the job today. It is slow, it is not what anyone hoped the first week would look like, and it is the single highest-leverage thing in the project.",
      },
      {
        type: "list",
        items: [
          "Real inputs, drawn from production traffic or historical records",
          "Expected outputs agreed by a domain owner, not by the engineers",
          "Deliberate hard cases: ambiguous, adversarial and genuinely unanswerable",
          "A runner that scores a full pass in under ten minutes",
        ],
      },
      {
        type: "quote",
        text: "If a prompt change cannot be defended with a number, it is not an engineering decision. It is a preference.",
      },
      {
        type: "p",
        text: "Once that harness exists, the project changes character. Regressions get caught in CI instead of by a customer. A model upgrade becomes a measurable experiment. And the argument about whether to use a bigger model resolves itself in an afternoon.",
      },
    ],
  },
  {
    slug: "cost-of-an-extra-agent",
    title: "The real cost of an extra agent",
    kicker: "Latency, spend and debuggability compound faster than capability does",
    date: "2026-03-19",
    readingTime: "7 min",
    topic: "Multi-agent systems",
    summary:
      "Notes from instrumenting an eleven-node pipeline: where the time actually went, which steps earned their place, and the three we deleted.",
    body: [
      {
        type: "p",
        text: "Multi-agent architectures are easy to add to and hard to subtract from. Each new node looks locally justified. The costs it adds are distributed, delayed and mostly invisible until something breaks in production.",
      },
      { type: "h2", text: "Three costs nobody budgets for" },
      {
        type: "list",
        items: [
          "Latency is additive and serial — parallelising is harder than it looks once steps share state",
          "Spend is multiplicative — a retry loop three nodes deep can quietly triple a monthly bill",
          "Debuggability degrades non-linearly — with eleven nodes there are eleven places a silent failure can hide",
        ],
      },
      {
        type: "p",
        text: "Instrumenting first changed which questions we could ask. With per-node traces covering duration, token spend and failure rate, it became obvious that two nodes accounted for most of the wall-clock time, and that one contributed almost nothing to output quality.",
      },
      {
        type: "quote",
        text: "The default answer to an expensive step should be to delete it and see whether anybody notices. Often nobody does.",
      },
      {
        type: "p",
        text: "We now treat node count as a budget rather than an outcome. Adding one means justifying it against the measured contribution of the nodes already there.",
      },
    ],
  },
  {
    slug: "structured-extraction-notes",
    title: "Structured extraction is mostly a schema problem",
    kicker: "Field-level scoring, and why loose schemas fail quietly",
    date: "2026-01-27",
    readingTime: "5 min",
    topic: "Applied ML",
    summary:
      "Working notes on pulling reliable structured records out of messy documents — and why we score every field independently rather than the record as a whole.",
    body: [
      {
        type: "p",
        text: "Extraction tasks look simple and behave badly. The failure is rarely that the model cannot read the document; it is that the schema does not say precisely enough what a correct answer would be.",
      },
      { type: "h2", text: "Score fields, not records" },
      {
        type: "p",
        text: "A record-level accuracy score collapses very different failures into one number. A record with a missing phone number and a record with a wrong address both read as a miss, even though only one of them is dangerous. Field-level scoring surfaces the shape of the failure and points straight at the schema line responsible.",
      },
      {
        type: "list",
        items: [
          "Every field carries an explicit type, a format and a null policy",
          "Uncertain values return null with a reason rather than a plausible guess",
          "Each field is scored independently, then weighted by downstream consequence",
        ],
      },
      {
        type: "p",
        text: "Most of the gains we have seen on extraction work came from tightening the schema and making refusal a first-class outcome — not from changing the model behind it.",
      },
    ],
  },
];
