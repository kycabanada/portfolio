import type { ReactNode } from "react";
import { strengths, type Strength } from "../data/strengths";
import { ArrowIcon, DatabaseIcon, LayersIcon, UsersIcon } from "./Icons";

const card = "rounded-2xl border border-rule bg-surface/70 backdrop-blur";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 12l2 2 4-4" />
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
  </svg>
);

const icons: Record<Strength["icon"], ReactNode> = {
  test: <CheckIcon className="size-5" />,
  data: <DatabaseIcon className="size-5" />,
  stack: <LayersIcon className="size-5" />,
  team: <UsersIcon className="size-5" />,
};

// What I bring to a team, each point backed by something I've actually done.
// Edit src/data/strengths.ts.
export default function HowIWork() {
  return (
    <section id="how-i-work" className="intro relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <header className="reveal mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-signal">✦</span> What I bring
          </p>
          <h2 className="font-wide mt-4 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.01em]">
            How I work
          </h2>
          <p className="mt-3 text-muted">The habits I bring to every project, and where you can see them.</p>
        </header>

        <ul className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((s) => (
            <li
              key={s.title}
              className={`${card} bento-card group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_18px_40px_-24px] hover:shadow-signal/60 sm:p-7`}
            >
              {/* Big faint icon in the corner, for depth */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 text-ink/[0.03] transition-colors duration-300 group-hover:text-signal/[0.08] [&_svg]:size-32"
              >
                {icons[s.icon]}
              </span>

              <div className="relative flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-signal/10 text-signal transition-colors duration-300 group-hover:bg-signal group-hover:text-paper">
                  {icons[s.icon]}
                </span>
                <span className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                  {s.tag}
                </span>
              </div>

              <h3 className="relative mt-6 text-xl font-bold leading-snug">{s.title}</h3>
              <p className="relative mt-3 text-justify text-sm leading-relaxed text-muted [hyphens:auto]">{s.body}</p>

              {/* Proof, pinned to the bottom so every card lines up */}
              <div className="relative mt-auto pt-6">
                <div className="flex items-center justify-between gap-3 border-t border-rule pt-4">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/80">Seen in</span>
                  {s.proofLink ? (
                    <a
                      href={s.proofLink}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-signal"
                    >
                      {s.proof}
                      <ArrowIcon className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-ink">{s.proof}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
