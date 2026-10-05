import type { ReactNode } from "react";

type Props = {
  id: string;
  number: string; // "01", "02", … shown like a ferry stop number
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  band?: boolean; // full-width tinted background, to break up the page
  children: ReactNode;
};

export default function Section({ id, number, eyebrow, title, intro, band, children }: Props) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${band ? "border-y border-rule bg-surface-2/50" : ""}`}
    >
      <div className="shell">
        <header className="grid gap-6 border-t border-ink pt-5 md:grid-cols-[12rem_1fr] md:gap-10">
          <p className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-signal">{number}</span>
            {eyebrow}
          </p>
          <div>
            <h2 className="font-display text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl">
              {title}
            </h2>
            {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
          </div>
        </header>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
