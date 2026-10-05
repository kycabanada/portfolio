import { useEffect, useState } from "react";
import { useTheme } from "../useTheme";
import {
  AwardIcon,
  FolderIcon,
  MailIcon,
  MoonIcon,
  SparkIcon,
  SunIcon,
  WrenchIcon,
} from "./Icons";

const links = [
  { href: "#projects", label: "Work", Icon: FolderIcon },
  { href: "#certifications", label: "Certs", Icon: AwardIcon },
  { href: "#about", label: "About", Icon: SparkIcon },
  { href: "#skills", label: "Skills", Icon: WrenchIcon },
  { href: "#contact", label: "Contact", Icon: MailIcon },
];

// Floating navigation at the bottom of the screen: easy to reach with a thumb on
// phones, and it highlights the section you're reading. It stays hidden on the
// full-screen opener, which has its own top bar.
export default function Dock() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((s): s is Element => s !== null);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    // Back at the top, nothing is highlighted.
    const onScroll = () => {
      if (window.scrollY < 200) setActive("");
      setShown(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <nav
      aria-label="Sections"
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none ${
        shown ? "" : "pointer-events-none translate-y-[150%] opacity-0"
      }`}
    >
      <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-[#17140f]/90 p-1.5 text-[#f3eee4] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md">
        {links.map(({ href, label, Icon }) => {
          const isActive = active === href;
          return (
            <a
              key={href}
              href={href}
              aria-current={isActive ? "location" : undefined}
              className={`flex min-h-11 min-w-10 items-center justify-center gap-2 rounded-full px-2.5 text-sm sm:min-w-11 sm:px-3 font-medium transition-colors ${
                isActive
                  ? "bg-[#f3eee4] text-[#17140f]"
                  : "text-[#f3eee4]/75 hover:bg-white/10 hover:text-[#f3eee4]"
              }`}
            >
              <Icon className="size-[18px] shrink-0" />
              <span className="sr-only sm:not-sr-only">{label}</span>
            </a>
          );
        })}
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-white/15" />
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${next} mode`}
          title={`Switch to ${next} mode`}
          className="grid size-11 place-items-center rounded-full bg-[#e4572e] text-[#17140f] transition-transform hover:rotate-12"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
