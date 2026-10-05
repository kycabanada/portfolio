import { profile } from "../data/profile";
import { useManilaTime } from "../useManilaTime";
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./Icons";

const navigate = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#kind-words", label: "Kind words" },
  { href: "#contact", label: "Contact" },
];

const heading = "font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted";
const link = "inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-ink";

export default function Footer() {
  const time = useManilaTime();

  return (
    <footer className="border-t border-rule bg-surface/40">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
        {/* About */}
        <div className="col-span-2 lg:col-span-1">
          <a href="#top" className="font-mono text-base tracking-wide text-ink">
            kristine<span className="text-signal">.</span>c
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Full-stack web developer and BS IT student at UST, building web apps that are easy for
            people to use.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1.5 text-xs text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-[#22c55e]" />
            </span>
            Open to internships
          </p>
        </div>

        {/* Navigate */}
        <nav aria-label="Footer">
          <h2 className={heading}>Navigate</h2>
          <ul className="mt-4 space-y-3">
            {navigate.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div>
          <h2 className={heading}>Connect</h2>
          <ul className="mt-4 space-y-3">
            {profile.github && (
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" className={link}>
                  <GitHubIcon className="size-4" /> GitHub
                </a>
              </li>
            )}
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className={link}>
                <MailIcon className="size-4" /> Email
              </a>
            </li>
            <li>
              <a href={profile.resumeFile} download className={link}>
                <DownloadIcon className="size-4" /> Resume
              </a>
            </li>
          </ul>
        </div>

        {/* Local time */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className={heading}>Local time</h2>
          <p className="font-wide mt-4 text-2xl font-bold text-ink">{time}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
            <PinIcon className="size-4" /> {profile.location}
          </p>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} kristine.c · Built with React, TypeScript and Tailwind CSS
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 text-ink/80 hover:text-ink">
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-rule transition-colors group-hover:border-ink/40">
              <ArrowIcon className="size-3.5 -rotate-45" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
