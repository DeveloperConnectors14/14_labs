// Shows an element only in the given colour scheme ("light" or "dark"). Done in
// CSS rather than React state, so the right version is on screen from the
// first paint, with no hydration mismatch or flicker.
export const showInScheme = (scheme, display = "inline-flex") => (theme) => ({
  display: scheme === "light" ? display : "none",
  ...theme.applyStyles("dark", { display: scheme === "dark" ? display : "none" }),
});
