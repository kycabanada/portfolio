import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./Icons";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  // index.html sets data-theme before the page paints, so read that first.
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function Header() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore: the theme still applies for this visit.
    }
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <header
      className="sticky z-20 border-b border-rule bg-paper/80 backdrop-blur-md"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-ink"
        >
          <img
            src={profile.photo}
            alt=""
            className="size-8 rounded-full object-cover ring-2 ring-river"
          />
          {profile.name}
        </a>

        <nav aria-label="Sections" className="ml-auto hidden gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setTheme(next)}
          aria-label={`Switch to ${next} mode`}
          title={`Switch to ${next} mode`}
          className="ml-auto grid size-10 place-items-center rounded-full border border-rule bg-surface text-ink hover:border-river hover:text-river md:ml-0"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-full border border-rule bg-surface text-ink md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-t border-rule px-5 py-3 md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 font-medium text-ink hover:bg-surface-2"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
