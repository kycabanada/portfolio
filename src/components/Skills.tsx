import Section from "./Section";
import TechIcon from "./TechIcon";
import { skillGroups } from "../data/skills";

// Skills shown as a ferry-terminal departure board.
export default function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);
  return (
    <Section
      id="skills"
      number="03"
      eyebrow="What I work with"
      title={
        <>
          Tools of the <span className="italic text-river">trade</span>
        </>
      }
    >
      <div className="reveal overflow-hidden rounded-[1.75rem] bg-board text-board-ink shadow-card ring-1 ring-black/20">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#f3eee4]/60 sm:px-8">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#ff7043]" /> Departures · Skills
          </span>
          <span>{total} total</span>
        </div>
        <div className="hidden grid-cols-[14rem_1fr_4rem] gap-6 border-b border-white/10 px-8 py-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#f3eee4]/45 md:grid">
          <span>Line</span>
          <span>Stops</span>
          <span className="text-right">No.</span>
        </div>
        <ul>
          {skillGroups.map((g) => (
            <li
              key={g.name}
              className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 sm:px-8 md:grid-cols-[14rem_1fr_4rem] md:items-center md:gap-6"
            >
              <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-[#ffb84d]">{g.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1.5 font-mono text-[0.8125rem] text-[#f3eee4] ring-1 ring-white/10"
                  >
                    <TechIcon name={s} className="size-4" />
                    {s}
                  </li>
                ))}
              </ul>
              <span className="hidden text-right font-mono text-2xl text-[#f3eee4]/35 md:block">
                {String(g.items.length).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
