import { useEffect } from "react";
import type { ReactNode } from "react";
import ImageSlot from "./ImageSlot";
import TechIcon from "./TechIcon";
import { projects } from "../data/projects";
import { projectArt } from "./projectArt";
import type { Project } from "../data/projects";
import { useTheme } from "../useTheme";
import Placeholder from "./Placeholder";
import {
  ArrowIcon,
  CameraIcon,
  CodeIcon,
  GitHubIcon,
  LayersIcon,
  MoonIcon,
  SparkIcon,
  SunIcon,
  WrenchIcon,
} from "./Icons";

const filled = (list?: string[]) => (list ?? []).filter(Boolean);

// Simple outline icons used only on this page.
const TargetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);
const ChartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const projectPath = (id: string) => `#/projects/${id}`;

const box = "rounded-2xl border border-rule bg-surface/70 shadow-card backdrop-blur";

// A page of its own for one project, opened from the portfolio cards.
export default function ProjectPage({ project: p }: { project: Project }) {
  const { theme, toggle } = useTheme();
  const Art = projectArt[p.art];
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const before = document.title;
    document.title = `${p.title} | Kristine Cabanada`;
    return () => {
      document.title = before;
    };
  }, [p]);

  return (
    <main id="main" className="intro relative isolate min-h-[100svh] overflow-hidden pb-20">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <div className="flex items-center justify-between py-8">
          {/* Back to this project's card in the portfolio */}
          <a
            href={`#${p.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
            className="grid size-10 place-items-center rounded-xl border border-rule text-muted transition-colors hover:text-ink"
          >
            {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: about the project */}
          <div className="reveal">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
              <span className={p.current ? "text-signal" : ""}>{p.current ? "● In progress" : "Completed"}</span>
              <span>{p.category}</span>
            </p>
            <h1 className="font-wide mt-4 text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.01em]">
              {p.title}
            </h1>
            <span aria-hidden="true" className="mt-6 block h-1 w-14 rounded-full bg-gradient-to-r from-ink/60 to-transparent" />

            <p className="mt-8 leading-relaxed text-muted">{p.description ?? p.tagline}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {p.period}
              {p.role ? ` · ${p.role}` : ""}
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              <Stat icon={<CodeIcon className="size-4" />} value={p.stack.length} label="Technologies Used" />
              <Stat icon={<LayersIcon className="size-4" />} value={p.points.length} label="Key Features" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href={p.liveUrl} icon={<ArrowIcon className="size-4" />} label="Live Site" />
              <LinkButton href={p.codeUrl} icon={<GitHubIcon className="size-4" />} label="Source Code" />
            </div>

            <h2 className="mt-10 flex items-center gap-2 font-semibold">
              <CodeIcon className="size-4" /> Technologies Used
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className={`${box} inline-flex items-center gap-2 !rounded-xl px-3 py-2 text-sm`}>
                  <TechIcon name={s} className="size-4" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: screenshot and key features */}
          <div className="reveal space-y-6">
            <div className={`${box} overflow-hidden p-2`}>
              <div className="aspect-[16/10] overflow-hidden rounded-xl">
                <ImageSlot
                  src={p.image}
                  alt={`Screenshot of ${p.title}`}
                  title={p.shortTitle}
                  hint="Screenshot coming soon"
                  art={<Art className="size-9" />}
                  accent={p.accent}
                  variant="browser"
                />
              </div>
            </div>

            <div className={`${box} p-6 sm:p-8`}>
              <h2 className="flex items-center gap-2 font-semibold">
                <SparkIcon className="size-4" /> Key Features
              </h2>
              <ul className="mt-5 space-y-4">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/50" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The story: problem, results, challenges */}
        <div className="reveal mt-12 grid gap-6 lg:grid-cols-2">
          <div className={`${box} p-6 sm:p-8`}>
            <h2 className="flex items-center gap-2 font-semibold">
              <TargetIcon className="size-4" /> The Problem
            </h2>
            {p.problem ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.problem}</p>
            ) : (
              <Placeholder className="mt-4" label="What problem this project solves, and for whom" />
            )}
          </div>
          <div className={`${box} p-6 sm:p-8`}>
            <h2 className="flex items-center gap-2 font-semibold">
              <ChartIcon className="size-4" /> Results &amp; Impact
            </h2>
            {filled(p.results).length ? (
              <ul className="mt-4 space-y-3">
                {filled(p.results).map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                    {r}
                  </li>
                ))}
              </ul>
            ) : (
              <Placeholder className="mt-4" label="Numbers, feedback, grades or awards" />
            )}
          </div>
        </div>

        <div className={`${box} reveal mt-6 p-6 sm:p-8`}>
          <h2 className="flex items-center gap-2 font-semibold">
            <WrenchIcon className="size-4" /> Challenges &amp; Solutions
          </h2>
          {p.challenges?.some((c) => c.challenge) ? (
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              {p.challenges
                .filter((c) => c.challenge)
                .map((c, n) => (
                  <li key={c.challenge} className="rounded-xl border border-rule p-5">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                      Challenge {String(n + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink">{c.challenge}</p>
                    <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                      How I solved it
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.solution || "—"}</p>
                  </li>
                ))}
            </ol>
          ) : (
            <Placeholder className="mt-4" label="The hardest part of building this, and how I solved it" />
          )}
        </div>

        {/* Gallery and process */}
        <ImageGroup title="Gallery" icon={<CameraIcon className="size-4" />} images={p.gallery} art={<Art className="size-7" />} accent={p.accent} cols="sm:grid-cols-3" />
        <ImageGroup title="Design Process" icon={<LayersIcon className="size-4" />} images={p.process} art={<Art className="size-7" />} accent={p.accent} cols="sm:grid-cols-2" />

        {/* Next project */}
        {next !== p && (
          <a
            href={projectPath(next.id)}
            className={`${box} group mt-16 flex items-center justify-between gap-4 p-6 transition-colors hover:border-ink/30 sm:p-8`}
          >
            <span>
              <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                Next project
              </span>
              <span className="font-wide mt-1 block text-xl font-bold sm:text-2xl">{next.title}</span>
            </span>
            <ArrowIcon className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </main>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return (
    <div className={`${box} flex items-center gap-3 p-4`}>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink/[0.06] text-ink">{icon}</span>
      <span>
        <span className="block text-lg font-semibold leading-none">{value}</span>
        <span className="mt-1 block text-xs text-muted">{label}</span>
      </span>
    </div>
  );
}

// A link button, or a greyed-out "No Link" when the URL isn't set yet.
function LinkButton({ href, icon, label }: { href?: string; icon: ReactNode; label: string }) {
  const cls = "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm";
  if (!href) {
    return (
      <span className={`${cls} border-rule text-muted/70`} title={`${label}: not available yet`}>
        {icon} No Link
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${cls} border-ink/60 font-medium text-ink transition-colors hover:bg-ink hover:text-paper`}
    >
      {icon} {label}
    </a>
  );
}

// A titled row of pictures; empty "src" shows a placeholder with the caption.
function ImageGroup({
  title,
  icon,
  images,
  art,
  accent,
  cols,
}: {
  title: string;
  icon: ReactNode;
  images?: { src: string; caption: string }[];
  art: ReactNode;
  accent: string;
  cols: string;
}) {
  if (!images?.length) return null;
  return (
    <section className="reveal mt-12">
      <h2 className="flex items-center gap-2 font-semibold">
        {icon} {title}
      </h2>
      <ul className={`mt-5 grid gap-4 ${cols}`}>
        {images.map((img) => (
          <li key={img.caption} className={`${box} overflow-hidden p-2`}>
            <figure>
              <div className="aspect-[16/10] overflow-hidden rounded-xl">
                {img.src ? (
                  <a href={img.src} target="_blank" rel="noreferrer">
                    <img src={img.src} alt={img.caption} loading="lazy" className="size-full object-cover" />
                  </a>
                ) : (
                  <ImageSlot src={undefined} alt={img.caption} title={img.caption} hint="Coming soon" art={art} accent={accent} variant="photo" />
                )}
              </div>
              <figcaption className="px-2 pb-1 pt-3 text-xs text-muted">{img.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
