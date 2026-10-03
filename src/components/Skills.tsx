import Section from "./Section";
import { skillGroups, certifications } from "../data/skills";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="What I work with" title="Skills">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div
            key={g.name}
            className="reveal rounded-3xl border border-rule bg-surface p-6 shadow-card"
          >
            <h3 className="font-display text-lg font-bold">{g.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-16 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Certifications
      </h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {certifications.map((c) => (
          <li
            key={c.name}
            className="reveal flex gap-4 rounded-2xl border border-rule bg-surface p-5 shadow-card"
          >
            <span
              aria-hidden="true"
              className="mt-1 size-3 shrink-0 rounded-full bg-signal"
            />
            <span>
              <span className="block font-semibold">{c.name}</span>
              <span className="block text-sm text-muted">
                {c.issuer ? `${c.issuer} · ` : ""}
                {c.date}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
