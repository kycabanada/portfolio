import { useEffect, useRef, useState } from "react";
import ImageSlot from "./ImageSlot";
import TechIcon from "./TechIcon";
import { projects } from "../data/projects";
import { certifications } from "../data/certifications";
import { skillGroups } from "../data/skills";
import { projectArt as art } from "./projectArt";
import { projectPath } from "./ProjectPage";
import { ArrowIcon, AwardIcon } from "./Icons";

// Links like #projects, #certifications or #skills open the matching tab.
const tabs = [
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certificates" },
  { id: "skills", label: "Tech Stack" },
] as const;
type Tab = (typeof tabs)[number]["id"];

const card =
  "rounded-2xl border border-rule bg-surface/80 shadow-card backdrop-blur transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-ink/30";

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>("projects");
  const section = useRef<HTMLElement>(null);

  // Jump to the right tab (and project card) from links anywhere on the page.
  useEffect(() => {
    const go = (id: string, smooth = true) => {
      const t = tabs.find((x) => x.id === id);
      const p = projects.find((x) => x.id === id);
      if (!t && !p) return false;
      setTab(t ? t.id : "projects");
      requestAnimationFrame(() =>
        (p ? document.getElementById(p.id) : section.current)?.scrollIntoView({
          behavior: smooth ? "smooth" : "instant",
          block: p ? "center" : "start",
        }),
      );
      return true;
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      if (a && go(a.getAttribute("href")!.slice(1))) e.preventDefault();
    };
    go(location.hash.slice(1), false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <section ref={section} id="portfolio" className="intro relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <header className="reveal text-center">
          <h2 className="font-wide text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.01em]">
            Portfolio Showcase
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </header>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Portfolio"
          className="reveal relative mx-auto mt-10 grid max-w-3xl grid-cols-3 rounded-2xl border border-rule bg-surface/70 p-1.5 shadow-card backdrop-blur"
        >
          <span
            aria-hidden="true"
            className="tab-thumb absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/3)] rounded-xl bg-ink/[0.08] ring-1 ring-ink/10"
            style={{ translate: `${tabs.findIndex((t) => t.id === tab) * 100}% 0` }}
          />
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`relative z-10 rounded-xl px-2 py-3 text-sm transition-colors sm:text-[0.9375rem] ${
                tab === t.id ? "font-medium text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          key={tab}
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          className="tab-panel mt-12"
        >
          {tab === "projects" && <ProjectGrid />}
          {tab === "certifications" && <CertGrid />}
          {tab === "skills" && <StackGrid />}
        </div>
      </div>
    </section>
  );
}

function ProjectGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => {
        const Art = art[p.art];
        const link = p.liveUrl ?? p.codeUrl;
        return (
          <li key={p.id} id={p.id} className="scroll-mt-28">
            <article className={`${card} flex h-full flex-col p-3`}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-rule">
                <ImageSlot
                  src={p.image}
                  alt={`Screenshot of ${p.title}`}
                  title={p.shortTitle}
                  hint="Screenshot coming soon"
                  art={<Art className="size-9" />}
                  accent={p.accent}
                  variant="browser"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] shadow-card ${
                    p.current ? "bg-signal text-[#17140f]" : "bg-surface text-ink"
                  }`}
                >
                  {p.current ? "In progress" : "Completed"}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                  {p.category}
                </p>
                <h3 className="font-wide mt-1.5 text-lg font-bold leading-snug">
                  <a href={projectPath(p.id)} className="hover:underline">
                    {p.title}
                  </a>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.points[0]}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-ink hover:text-signal"
                    >
                      {p.liveUrl ? "Live site" : "Code"} <ArrowIcon className="size-3.5" />
                    </a>
                  ) : (
                    <span className="text-sm text-muted">No link</span>
                  )}
                  <a
                    href={projectPath(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-ink/[0.06] px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Details <span aria-hidden="true">→</span>
                    <span className="sr-only">about {p.title}</span>
                  </a>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

// Certificates shown as round badges: the issuer's logo (or a badge image, if set),
// then the name, issuer and date. Badges with a verify link open it.
function CertGrid() {
  return (
    <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {certifications.map((c) => {
        const body = (
          <>
            <span className="cert-badge relative mx-auto grid size-32 place-items-center rounded-full">
              {c.badge ? (
                <img src={c.badge} alt="" loading="lazy" className="size-full rounded-full object-contain" />
              ) : (
                <span className="grid size-[5.5rem] place-items-center rounded-full border border-rule bg-surface shadow-card">
                  {c.logo ? (
                    <TechIcon name={c.logo} className="size-12" />
                  ) : (
                    <AwardIcon className="size-9 text-ink" />
                  )}
                </span>
              )}
            </span>
            <span title={c.name} className="mt-4 line-clamp-2 text-sm font-semibold leading-snug text-ink">
              {c.name}
            </span>
            {c.issuer && <span className="mt-1 block text-xs text-muted">{c.issuer}</span>}
            <span className="mt-0.5 block text-xs text-muted">Issued {c.date}</span>
            {c.verifyUrl && (
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ink">
                Verify <ArrowIcon className="size-3" />
              </span>
            )}
          </>
        );
        return (
          <li key={c.name} className="text-center">
            {c.verifyUrl ? (
              <a href={c.verifyUrl} target="_blank" rel="noreferrer" className="group block">
                {body}
              </a>
            ) : (
              <div className="group">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// Small square tiles with big logos, grouped by category.
function StackGrid() {
  return (
    <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 xl:grid-cols-2">
      {skillGroups.map((g) => (
        <div key={g.name}>
          <h3 className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {g.name}
            <span aria-hidden="true" className="h-px flex-1 bg-rule" />
            <span className="text-ink/40">{String(g.items.length).padStart(2, "0")}</span>
          </h3>
          <ul className="flex flex-wrap gap-3">
            {g.items.map((s) => (
              <li
                key={s}
                className="tech-tile flex size-[5.5rem] flex-col items-center justify-center gap-2 rounded-2xl p-2 text-center sm:size-24"
              >
                <TechIcon name={s} className="size-9 sm:size-10" />
                <span className="line-clamp-2 text-[0.625rem] leading-tight text-muted sm:text-[0.6875rem]">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
