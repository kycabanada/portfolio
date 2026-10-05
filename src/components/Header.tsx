import { useEffect, useState } from "react";
import { useTheme } from "../useTheme";
import { profile } from "../data/profile";
import { CloseIcon, DownloadIcon, MenuIcon, MoonIcon, SunIcon } from "./Icons";

// "Home" covers the opener and the intro right after it.
const links = [
  { href: "#top", label: "Home", sections: ["top", "intro"] },
  { href: "#about", label: "About", sections: ["about"] },
  { href: "#journey", label: "Journey", sections: ["journey"] },
  { href: "#portfolio", label: "Portfolio", sections: ["portfolio", "kind-words"] },
  { href: "#contact", label: "Contact", sections: ["contact"] },
];

// One header for the whole site. It stays at the top while you scroll and
// highlights the section you're reading.
export default function Header() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  // The section you're reading is the last one whose top has passed a line
  // 35% down the screen. At the very bottom of the page, the last section wins
  // (Contact is too short to ever reach that line on its own).
  useEffect(() => {
    const ids = links.flatMap((l) => l.sections);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className="site-nav mx-auto max-w-6xl rounded-2xl border border-rule bg-surface/90 text-ink shadow-card backdrop-blur-md"
      >
        <div className="flex h-14 items-center justify-between gap-4 pl-5 pr-2">
          <a href="#top" className="font-mono text-sm tracking-wide text-ink">
            kristine<span className="text-signal">.</span>c
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = l.sections.includes(active);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`nav-link relative rounded-lg px-3 py-2 font-mono text-[0.8125rem] tracking-wide transition-colors duration-300 ${
                      isActive ? "bg-ink/[0.07] text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={profile.resumeFile}
              download
              className="hidden items-center gap-1.5 rounded-xl border border-rule px-3.5 py-2 font-mono text-[0.8125rem] text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 sm:inline-flex"
            >
              <DownloadIcon className="size-3.5" /> Resume
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${next} mode`}
              title={`Switch to ${next} mode`}
              className="grid size-10 place-items-center rounded-xl text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-xl text-ink hover:bg-ink/5 md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <ul id="mobile-menu" className="border-t border-rule p-2 md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 font-mono text-sm ${
                    l.sections.includes(active) ? "bg-ink/5 text-ink" : "text-muted"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={profile.resumeFile}
                download
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 font-mono text-sm text-ink"
              >
                <DownloadIcon className="size-4" /> Resume
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
