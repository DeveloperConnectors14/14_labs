"use client";

import { useSyncExternalStore } from "react";

/**
 * Lets a full-bleed pinned section ask the fixed nav to step out of the way.
 *
 * The horizontal rail owns the entire viewport for as long as it is pinned, and
 * its headings run right under the bar. Giving the nav a per-section dark theme
 * would keep it readable but not stop it covering the copy — while a rail is
 * held there is nowhere else for the bar to go, so it leaves and comes back on
 * release.
 *
 * A count rather than a flag: two pinned sections can both be active for a
 * frame during a fast scroll, and with a flag the first one's release would
 * hand the nav back while the second is still holding it.
 */
let holds = 0;
const listeners = new Set();

/** Hides the nav until the returned function is called. */
export function holdNav() {
  holds += 1;
  listeners.forEach((notify) => notify());

  let released = false;
  return () => {
    if (released) return;
    released = true;
    holds -= 1;
    listeners.forEach((notify) => notify());
  };
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => holds > 0;
// Nothing is pinned during the server render, and the nav must not flash out
// on hydration.
const getServerSnapshot = () => false;

export function useNavHidden() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
