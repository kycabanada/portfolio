import type { ReactNode } from "react";

type Props = { id: string; eyebrow: string; title: string; children: ReactNode };

export default function Section({ id, eyebrow, title, children }: Props) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-river">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
