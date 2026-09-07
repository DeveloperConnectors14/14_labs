/** ISO date to "14 Jul 2026". Kept here so every surface renders it identically. */
export const formatPostDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
