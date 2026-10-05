import { useEffect, useState } from "react";
import Section from "./Section";
import ImageSlot from "./ImageSlot";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import TechIcon from "./TechIcon";
import {
  ArrowIcon,
  CoffeeIcon,
  FerryIcon,
  GemIcon,
  GitHubIcon,
  LeafIcon,
  PawIcon,
} from "./Icons";

const art = {
  ferry: FerryIcon,
  gem: GemIcon,
  leaf: LeafIcon,
  coffee: CoffeeIcon,
  paw: PawIcon,
};

// Filter buttons are built from the stacks in projects.ts, most used first.
const counts = new Map<string, number>();
projects.forEach((p) =>
  p.stack.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)),
);
const filters = [...counts.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([name]) => name);

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  // The newest project starts open; links like #agos open their project.
  const [open, setOpen] = useState<string | null>(projects[0]?.id ?? null);

  useEffect(() => {
    const openFromHash = () => {
      const id = location.hash.slice(1);
      if (projects.some((p) => p.id === id)) {
        setActive(null);
        setOpen(id);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const shown = active
    ? projects.filter((p) => p.stack.includes(active))
    : projects;

  return (
    <Section
      id="projects"
      number="01"
      eyebrow="Selected work"
      title={
        <>
          Things I've <span className="italic text-signal">built</span>
        </>
      }
      intro="Things I've built and tested, from school projects to systems for real clients. Newest first."
    >
      <div
        role="group"
        aria-label="Filter projects by technology"
        className="flex flex-wrap gap-2"
      >
        <FilterButton
          label="All"
          pressed={active === null}
          onClick={() => setActive(null)}
        />
        {filters.map((f) => (
          <FilterButton
            key={f}
            label={f}
            pressed={active === f}
            onClick={() => setActive(active === f ? null : f)}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
        {active ? ` that use ${active}` : ""}.
      </p>

      <ol className="mt-10 border-b border-ink">
        {shown.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={projects.indexOf(p) + 1}
            open={open === p.id}
            onToggle={() => setOpen(open === p.id ? null : p.id)}
          />
        ))}
      </ol>
    </Section>
  );
}

function ProjectRow({
  project: p,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const Art = art[p.art];
  const panelId = `${p.id}-details`;
  return (
    <li id={p.id} className="reveal border-t border-ink">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-6 text-left sm:grid-cols-[4rem_1fr_14rem_6rem_auto] sm:gap-6 sm:py-8"
        >
          <span className="font-mono text-sm text-muted">{String(index).padStart(2, "0")}</span>
          <span className="min-w-0">
            <span className="block font-display text-3xl leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl lg:text-6xl">
              {p.title}
            </span>
            <span className="mt-2 block font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted sm:hidden">
              {p.category} · {p.year}
            </span>
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted sm:block">
            {p.category}
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted sm:block">
            {p.current ? (
              <span className="inline-flex items-center gap-1.5 text-signal">
                <span className="size-1.5 rounded-full bg-signal" /> Now
              </span>
            ) : (
              p.year
            )}
          </span>
          <span
            aria-hidden="true"
            className={`grid size-10 place-items-center rounded-full border border-ink text-xl transition-all duration-300 ${
              open ? "rotate-45 bg-ink text-paper" : "group-hover:bg-ink group-hover:text-paper"
            }`}
          >
            +
          </span>
        </button>
      </h3>

      <div id={panelId} className="expand" data-open={open}>
        <div inert={!open}>
          <div className="grid gap-8 pb-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-rule sm:aspect-[16/10]">
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
                className={`absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.15em] shadow-card ${
                  p.current ? "bg-signal text-[#17140f]" : "bg-surface text-ink"
                }`}
              >
                {p.current ? "In progress" : "Completed"}
              </span>
            </div>

            <div className="flex flex-col">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {p.period}
                {p.role ? ` · ${p.role}` : ""}
              </p>
              <p className="mt-3 font-display text-2xl italic leading-snug sm:text-3xl">
                {p.tagline}
              </p>
              <ul className="mt-5 space-y-3 text-muted">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">Built with</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Built with">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-3 py-1 text-sm"
                    >
                      <TechIcon name={s} className="size-3.5" />
                      {s}
                    </li>
                  ))}
                </ul>

                {(p.liveUrl || p.codeUrl) && (
                  <p className="mt-6 flex flex-wrap gap-3 font-medium">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-signal hover:text-[#17140f]"
                      >
                        Visit site <ArrowIcon />
                      </a>
                    )}
                    {p.codeUrl && (
                      <a
                        href={p.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink px-5 py-2.5 text-sm text-ink hover:bg-ink hover:text-paper"
                      >
                        <GitHubIcon className="size-4" /> View code
                      </a>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function FilterButton(props: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={props.pressed}
      onClick={props.onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
        props.pressed
          ? "border-ink bg-ink text-paper"
          : "border-rule bg-surface text-ink hover:border-ink"
      }`}
    >
      {props.label !== "All" && <TechIcon name={props.label} className="size-3.5" mono={props.pressed} />}
      {props.label}
    </button>
  );
}
