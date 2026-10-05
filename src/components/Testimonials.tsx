import { testimonials } from "../data/testimonials";
import { notes } from "../data/notes";
import { ArrowIcon } from "./Icons";

const box = "rounded-2xl border border-rule bg-surface/70 shadow-card backdrop-blur";

// Kind words from people I've worked with, then short write-ups (Notes).
// Edit src/data/testimonials.ts and src/data/notes.ts.
export default function Testimonials() {
  return (
    <section id="kind-words" className="intro relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <header className="reveal text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Kind words</p>
          <h2 className="font-wide mt-4 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.01em]">
            What people say
          </h2>
        </header>

        <ul className="reveal mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.role}>
              <figure
                className={`flex h-full flex-col p-6 sm:p-7 ${
                  t.quote ? box : "rounded-2xl border border-dashed border-rule bg-ink/[0.02]"
                }`}
              >
                <span aria-hidden="true" className="font-display text-5xl leading-none text-signal/60">
                  “
                </span>
                <blockquote className="mt-1 flex-1">
                  {t.quote ? (
                    <p className="leading-relaxed text-ink">{t.quote}</p>
                  ) : (
                    <p className="text-sm text-muted">
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/70">
                        Coming soon
                      </span>
                      A few words from someone I've worked with.
                    </p>
                  )}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-rule pt-4">
                  {t.photo ? (
                    <img src={t.photo} alt="" className="size-10 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-ink/[0.06] font-semibold text-muted">
                      {t.name ? t.name[0] : "?"}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-ink">{t.name || "Name"}</span>
                    <span className="block text-xs text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {notes.length > 0 && (
          <div id="notes" className="mt-24">
            <header className="reveal flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Notes</p>
                <h2 className="font-wide mt-3 text-2xl font-bold sm:text-3xl">Things I've written</h2>
              </div>
              <p className="max-w-sm text-sm text-muted">Short write-ups on what I've built and learned.</p>
            </header>
            <ul className="reveal mt-8 grid gap-4 md:grid-cols-2">
              {notes.map((n) => {
                const inner = (
                  <>
                    <span className="flex items-center justify-between gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                      <span className="rounded-md border border-rule px-2 py-0.5 text-ink">{n.tag}</span>
                      <span>{n.url ? n.date : "Coming soon"}</span>
                    </span>
                    <span className="font-wide mt-4 block text-lg font-bold leading-snug text-ink">{n.title}</span>
                    {n.summary && <span className="mt-2 block text-sm leading-relaxed text-muted">{n.summary}</span>}
                    {n.url && (
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink">
                        Read <ArrowIcon className="size-3.5" />
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={n.title}>
                    {n.url ? (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`${box} block h-full p-6 transition-colors hover:border-ink/30`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="block h-full rounded-2xl border border-dashed border-rule bg-ink/[0.02] p-6">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
