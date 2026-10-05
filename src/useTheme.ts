import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  // index.html sets data-theme before the page paints, so read that first.
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// One shared theme for the whole page, so every toggle button stays in sync.
let current: Theme = getInitialTheme();
const listeners = new Set<() => void>();

function apply(theme: Theme) {
  current = theme;
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#12110f" : "#f3eee4");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Ignore: the theme still applies for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Light/dark theme, remembered between visits.
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current);
  const toggle = () => apply(theme === "dark" ? "light" : "dark");
  return { theme, toggle };
}
