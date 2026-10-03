import { useState } from "react";
import Section from "./Section";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { ArrowIcon, GitHubIcon } from "./Icons";
import { useReveal } from "../useReveal";

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
  const shown = active
    ? projects.filter((p) => p.stack.includes(active))
    : projects;

  // Cards that reappear after filtering need to be watched again.
  useReveal();

  return (
    <Section id="projects" eyebrow="Selected work" title="Projects">
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
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
        {active ? ` that use ${active}` : ""}.
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <li
      id={p.id}
      className={`reveal group flex flex-col rounded-3xl border bg-surface p-6 shadow-card transition-colors hover:border-river sm:p-8 ${
        p.current ? "border-river md:col-span-2" : "border-rule"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted">
        {p.current && (
          <span className="rounded-full bg-signal px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[#12263a]">
            Current
          </span>
        )}
        <span>{p.period}</span>
        {p.role && (
          <>
            <span aria-hidden="true">·</span>
            <span>{p.role}</span>
          </>
        )}
      </div>

      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {p.title}
      </h3>
      <p className="mt-1 text-lg text-ink">{p.tagline}</p>

      {p.image && (
        <img
          src={p.image}
          alt={`Screenshot of ${p.title}`}
          loading="lazy"
          className="mt-5 w-full rounded-xl border border-rule"
        />
      )}

      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-river">
        {p.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => (
            <li
              key={s}
              className="rounded-full bg-river-soft px-3 py-1 text-sm font-medium text-ink"
            >
              {s}
            </li>
          ))}
        </ul>

        {(p.liveUrl || p.codeUrl) && (
          <p className="mt-5 flex flex-wrap gap-3 font-semibold">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper hover:bg-river"
              >
                Visit site <ArrowIcon />
              </a>
            )}
            {p.codeUrl && (
              <a
                href={p.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-rule px-4 py-2 text-sm text-ink hover:border-river hover:text-river"
              >
                <GitHubIcon className="size-4" /> View code
              </a>
            )}
          </p>
        )}
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
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        props.pressed
          ? "border-ink bg-ink text-paper"
          : "border-rule bg-surface text-ink hover:border-river"
      }`}
    >
      {props.label}
    </button>
  );
}
