/**
 * Title case for headings, labels and buttons.
 *
 * Not CSS `text-transform: capitalize`, which capitalises every word including
 * "a", "of" and "the". The rules here are the usual editorial ones:
 *
 *   - Every word is capitalised except the short ones below, which stay lower
 *     case unless they open or close the title or follow a full stop, colon,
 *     question mark or dash.
 *   - Words that already carry capitals past their first letter are left
 *     exactly as written — AI, PDFs, 14Labs, iOS.
 *   - Each part of a hyphenated word is treated as a word: Multi-Agent,
 *     De-Risk, Go-to-Market.
 */
const SMALL = new Set([
  "a", "an", "and", "as", "at", "but", "by", "en", "for", "if", "in",
  "nor", "of", "on", "or", "per", "the", "to", "v", "via", "vs",
]);

// A token that ends a clause, so the next word opens a new one.
const BREAK = /[.:!?—–]$/;

const fixWord = (core, edge) => {
  if (!core) return core;
  // Deliberate capitals — acronyms, brand names — are kept verbatim.
  if (/[A-Z]/.test(core.slice(1))) return core;
  const lower = core.toLowerCase();
  if (!edge && SMALL.has(lower)) return lower;
  return lower.replace(/[a-z]/, (c) => c.toUpperCase());
};

export function titleCase(text) {
  if (typeof text !== "string" || !text.trim()) return text;

  const tokens = text.split(/(\s+)/);
  const wordAt = tokens.map((t, i) => (/\S/.test(t) ? i : -1)).filter((i) => i >= 0);
  const first = wordAt[0];
  const last = wordAt[wordAt.length - 1];
  let opensClause = true;

  return tokens
    .map((token, i) => {
      if (!/\S/.test(token)) return token;
      const [, lead, core, trail] = /^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/.exec(token);
      const edge = opensClause || i === first || i === last;
      opensClause = BREAK.test(token) || /^[—–-]+$/.test(token);
      const fixed = core
        .split("-")
        .map((part, j) => fixWord(part, j === 0 ? edge : false))
        .join("-");
      return lead + fixed + trail;
    })
    .join("");
}

/** Title-cases a string child; anything else (elements, numbers) passes through. */
export const titleCaseChild = (child) => (typeof child === "string" ? titleCase(child) : child);
