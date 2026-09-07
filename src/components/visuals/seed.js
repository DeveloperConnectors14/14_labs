/**
 * Deterministic pseudo-randomness.
 *
 * The figures are point clouds and jittered series, which want to look
 * organic — but they render on the server and again on the client, and
 * Math.random() would produce two different pictures and a hydration
 * mismatch. mulberry32 gives the same sequence in both places.
 */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Box–Muller. Clusters made of uniform noise read as rectangles, not clouds. */
export function gaussian(next) {
  const u = Math.max(next(), 1e-9);
  const v = next();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Quantises a generated value.
 *
 * Not cosmetic. `Math.exp`, `Math.log` and friends are only specified to within
 * an implementation-defined error, and Node's V8 and the browser's V8 are not
 * the same build — so a figure computed on the server and recomputed during
 * hydration can disagree in the last bit or two. React compares the rendered
 * attribute strings, sees `0.24170035785868094` against `0.2417003578586809`,
 * and reports a hydration mismatch on the whole tree.
 *
 * Every value derived from a transcendental is therefore rounded WHERE IT IS
 * GENERATED rather than where it is printed: anything that feeds a comparison,
 * a sort or a threshold has to already agree, not merely print the same.
 */
export const quantise = (value, places = 3) => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

/** Trims float noise out of the emitted SVG path data. */
export const n = (value) => Math.round(value * 100) / 100;
