import type { ComponentType } from "react";
import Placeholder from "./Placeholder";
import { journey, nextGoal } from "../data/journey";
import type { JourneyItem } from "../data/journey";
import { profile } from "../data/profile";
import {
  ArrowIcon,
  AwardIcon,
  BriefcaseIcon,
  CapIcon,
  CodeIcon,
  DownloadIcon,
  SparkIcon,
  StarIcon,
  UsersIcon,
} from "./Icons";

const kinds: Record<JourneyItem["type"], { label: string; Icon: ComponentType<{ className?: string }> }> = {
  education: { label: "Education", Icon: CapIcon },
  project: { label: "Project", Icon: CodeIcon },
  certificate: { label: "Certificate", Icon: AwardIcon },
  leadership: { label: "Leadership", Icon: UsersIcon },
  award: { label: "Award", Icon: StarIcon },
  event: { label: "Event", Icon: SparkIcon },
};

// Milestones grouped by year, newest first, keeping the order from journey.ts.
const years = journey.reduce<{ year: string; items: JourneyItem[] }[]>((groups, item) => {
  const g = groups.find((x) => x.year === item.year);
  if (g) g.items.push(item);
  else groups.push({ year: item.year, items: [item] });
  return groups;
}, []);

export default function Journey() {
  return (
    <section id="journey" className="intro relative isolate overflow-clip py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <header className="reveal text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Journey</p>
          <h2 className="font-wide mt-4 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.01em]">
            How I got here
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            School, projects, certificates and everything in between, and where I'm headed next.
          </p>
        </header>

        <NextGoal />

        <div className="mt-16 space-y-12 sm:mt-20">
          {years.map(({ year, items }) => (
            <div key={year} className="reveal grid gap-5 lg:grid-cols-[11rem_1fr] lg:gap-10">
              {/* Year label, pinned while its milestones scroll by */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-wide flex items-center gap-4 text-4xl font-bold text-ink/80 sm:text-5xl">
                  {year}
                  <span aria-hidden="true" className="h-px flex-1 bg-rule lg:hidden" />
                </p>
                <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                  {items.filter((i) => i.title).length} milestone
                  {items.filter((i) => i.title).length === 1 ? "" : "s"}
                </p>
              </div>

              <ol className="grid items-start gap-3 sm:grid-cols-2">
                {items.map((item, i) => (
                  <li key={`${item.title}-${i}`} className={item.type === "project" ? "sm:col-span-2 xl:col-span-1" : ""}>
                    <Milestone item={item} />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// The internship goal, as a bold call to action.
function NextGoal() {
  const facts = [
    { label: "Available", value: nextGoal.available },
    { label: "Setup", value: nextGoal.setup },
  ];
  return (
    <div className="reveal relative mt-14 overflow-hidden rounded-3xl bg-ink p-7 text-paper shadow-card sm:p-10 lg:p-12">
      {/* Big outlined year in the corner, like the name on the opener */}
      <span
        aria-hidden="true"
        className="goal-year font-wide pointer-events-none absolute -bottom-6 -right-2 select-none text-[clamp(6rem,16vw,13rem)] font-extrabold leading-none"
      >
        {nextGoal.when}
      </span>

      <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-signal">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            Next chapter · {nextGoal.when}
          </p>
          <h3 className="font-wide mt-4 text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.05]">
            {nextGoal.title}
          </h3>
          <p className="mt-4 max-w-xl leading-relaxed text-paper/70">{nextGoal.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-[#17140f] transition-transform hover:-translate-y-0.5"
            >
              <BriefcaseIcon className="size-4" /> Let's talk
            </a>
            <a
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-paper/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-paper/70"
            >
              <DownloadIcon className="size-4" /> Resume
            </a>
          </div>
        </div>

        <dl className="space-y-5 rounded-2xl border border-paper/15 bg-paper/[0.04] p-6 backdrop-blur-sm">
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper/50">Roles I'm looking for</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {nextGoal.roles.map((r) => (
                <span key={r} className="rounded-lg border border-paper/20 px-3 py-1.5 text-sm">
                  {r}
                </span>
              ))}
            </dd>
          </div>
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper/50">{f.label}</dt>
              <dd className={`mt-1 ${f.value ? "" : "text-paper/45 italic"}`}>{f.value || "To be confirmed"}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// Projects get a stronger card; certificates, awards and the rest stay compact.
function Milestone({ item }: { item: JourneyItem }) {
  const { label, Icon } = kinds[item.type];
  if (!item.title) {
    return (
      <Placeholder
        className="h-full"
        icon={<Icon className="size-4" />}
        label={`An ${label.toLowerCase()} I joined: hackathon, seminar or competition`}
      />
    );
  }
  const major = item.type === "project";
  const title = item.link ? (
    <a href={item.link} className="inline-flex items-center gap-1.5 hover:underline">
      {item.title}
      <ArrowIcon className="size-3.5 shrink-0 text-muted" />
    </a>
  ) : (
    item.title
  );

  return (
    <div
      className={`flex h-full gap-4 rounded-2xl border bg-surface/70 backdrop-blur transition-colors ${
        major ? "border-ink/20 p-5 shadow-card sm:p-6" : "border-rule p-4"
      }`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-xl ${
          major ? "size-11 bg-ink text-paper" : "size-9 bg-ink/[0.06] text-ink"
        }`}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
          <span className={major ? "text-signal" : "text-ink"}>{label}</span>
          <span>{item.date}</span>
        </p>
        <h3 className={`mt-1.5 leading-snug ${major ? "font-wide text-lg font-bold" : "text-[0.9375rem] font-semibold"}`}>
          {title}
        </h3>
        {item.place && <p className="mt-1 text-sm text-muted">{item.place}</p>}
        {item.description && <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>}
      </div>
    </div>
  );
}
