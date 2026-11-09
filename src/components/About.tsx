import type { ReactNode } from "react";
import ImageSlot from "./ImageSlot";
import { useTheme } from "../useTheme";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { certifications } from "../data/certifications";
import { skillGroups } from "../data/skills";
import {
  ArrowIcon,
  AwardIcon,
  CameraIcon,
  CapIcon,
  CodeIcon,
  LayersIcon,
  SparkIcon,
  StarIcon,
  UsersIcon,
} from "./Icons";

const techCount = new Set(skillGroups.flatMap((g) => g.items)).size;

const stats = [
  { label: "Projects", value: projects.length, href: "#projects", Icon: CodeIcon },
  { label: "Certificates", value: certifications.length, href: "#certifications", Icon: AwardIcon },
  { label: "Technologies", value: techCount, href: "#skills", Icon: LayersIcon },
];

const card = "rounded-2xl border border-rule bg-surface/70 backdrop-blur";

// How far through the degree we are today, for the progress bar.
const DEGREE_START = new Date(2023, 7, 1); // Aug 2023
const DEGREE_END = new Date(2027, 5, 30); // Jun 2027
const degreeProgress = Math.min(
  1,
  Math.max(0, (Date.now() - DEGREE_START.getTime()) / (DEGREE_END.getTime() - DEGREE_START.getTime())),
);

export default function About() {
  const { education, leadership } = profile;
  const [lead, ...more] = profile.about;

  return (
    <section id="about" className="intro relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        {/* Header, centered */}
        <header className="reveal mx-auto max-w-3xl border-b border-rule pb-12 text-center">
          <div>
            <p className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              <span className="text-signal">✦</span> About me
            </p>
            <h2 className="font-wide mt-4 text-[clamp(2.4rem,5.5vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
              Background
            </h2>
          </div>
          <div className="mx-auto mt-6 max-w-2xl space-y-3">
            <p className="text-lg leading-relaxed text-ink">{lead}</p>
            {more.map((p) => (
              <p key={p} className="leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </header>

        {/* Bento grid */}
        <div className="reveal mt-12 grid gap-4 lg:grid-cols-12">
          {/* Education: the big card */}
          <article className={`${card} bento-card relative overflow-hidden p-6 sm:p-8 lg:col-span-7 lg:row-span-2`}>
            <span
              aria-hidden="true"
              className="font-wide pointer-events-none absolute -bottom-8 -right-3 select-none text-[9rem] font-extrabold leading-none text-ink/[0.04] sm:text-[12rem]"
            >
              ’27
            </span>

            <Eyebrow icon={<CapIcon className="size-4" />}>Education</Eyebrow>

            <h3 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">{education.degree}</h3>
            <div className="mt-4 flex items-center gap-4">
              <Logo src={UST_SEAL} alt="University of Santo Tomas seal" size="lg" />
              <div>
                <p className="text-ink">{education.school}</p>
                <p className="text-sm text-muted">{education.college}</p>
              </div>
            </div>

            {/* Degree progress */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                <span>{education.period.split("–")[0].trim()}</span>
                <span className="text-ink">{Math.round(degreeProgress * 100)}% complete</span>
                <span>Jun 2027</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-signal/60 to-signal"
                  style={{ width: `${degreeProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Honors: warm accent so they stand out */}
            <p className="relative mt-8 flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-signal">
              <StarIcon className="size-3.5" /> Honors
            </p>
            <ul className="relative mt-3 grid gap-3 sm:grid-cols-2">
              {education.honors.map((h) => {
                const [title, detail] = h.split(", ");
                return (
                  <li
                    key={h}
                    className="honor-card relative flex items-center gap-3.5 rounded-xl border border-rule border-l-2 border-l-signal bg-surface p-4 transition-colors hover:border-signal/40 hover:border-l-signal"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                      <StarIcon className="size-[1.125rem] fill-current" />
                    </span>
                    <span className="leading-snug">
                      <span className="block font-semibold text-ink">{title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>

          {/* Leadership */}
          <article className={`${card} bento-card p-6 sm:p-7 lg:col-span-5`}>
            <div className="flex items-center justify-between gap-3">
              <Eyebrow icon={<UsersIcon className="size-4" />}>Leadership</Eyebrow>
              <span className="rounded-full border border-rule px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
                {leadership.period}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">{leadership.role}</h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex items-center gap-3">
                <Logo src={UST_SEAL} alt="University of Santo Tomas seal" />
                <Logo src="/logos/ust-site.webp" alt="UST SITE crest" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-signal">{leadership.org}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{leadership.summary}</p>
          </article>

          {/* Numbers, in one strip */}
          <ul className={`${card} grid grid-cols-3 divide-x divide-rule lg:col-span-5`}>
            {stats.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group flex h-full flex-col gap-4 p-4 transition-colors sm:p-5 hover:bg-ink/[0.03]"
                >
                  <span className="flex items-center justify-between text-muted">
                    <Icon className="size-4" />
                    <ArrowIcon className="size-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink group-hover:opacity-100" />
                  </span>
                  <span>
                    <span className="font-wide block text-3xl font-extrabold leading-none text-ink">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted sm:text-[0.625rem] sm:tracking-[0.18em]">
                      {label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Learning and beyond code, two cards side by side */}
          <ChipGroup
            icon={<SparkIcon className="size-4" />}
            title="Currently learning"
            blurb="What I'm picking up right now."
            items={profile.learning}
            live
          />
          <ChipGroup
            icon={<HeartIcon className="size-4" />}
            title="Beyond code"
            blurb="What I enjoy when I'm away from the keyboard."
            items={profile.interests}
          />
        </div>

        {/* Photos */}
        <ul className="reveal mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {profile.aboutPhotos.map((photo, i) => (
            <li key={photo.caption} className={`${card} overflow-hidden p-2 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
              <figure>
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <ImageSlot
                    src={photo.src || undefined}
                    alt={photo.caption}
                    title="Add a photo"
                    hint="Photo coming soon"
                    art={<CameraIcon className="size-6" />}
                    variant="photo"
                  />
                </div>
                <figcaption className="px-2 pb-1 pt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// A logo with a transparent background. Pass { light, dark } when the logo
// needs a different version per theme (the UST seal's ring text is dark on light).
function Logo({ src, alt, size = "md" }: { src: string | { light: string; dark: string }; alt: string; size?: "md" | "lg" }) {
  const { theme } = useTheme();
  return (
    <img
      src={typeof src === "string" ? src : src[theme]}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={`w-auto shrink-0 object-contain ${size === "lg" ? "h-20 sm:h-24" : "h-14"}`}
    />
  );
}

const UST_SEAL = { light: "/logos/ust-seal-light.svg", dark: "/logos/ust-seal-dark.svg" };

function Eyebrow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span className="flex size-8 items-center justify-center rounded-lg border border-rule text-ink">{icon}</span>
      {children}
    </p>
  );
}

const HeartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);

// A card of short chips. "live" marks things in progress with a small pulsing dot.
// If no items are filled in yet, a single dashed "coming soon" chip stands in.
function ChipGroup({
  icon,
  title,
  blurb,
  items,
  live = false,
}: {
  icon: ReactNode;
  title: string;
  blurb: string;
  items: string[];
  live?: boolean;
}) {
  const filled = items.filter(Boolean);
  return (
    <article className={`${card} bento-card flex flex-col p-6 sm:p-7 lg:col-span-6`}>
      <Eyebrow icon={icon}>{title}</Eyebrow>
      <p className="mt-4 text-sm text-muted">{blurb}</p>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {filled.length ? (
          filled.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper/50 px-4 py-2 text-sm text-ink transition-colors duration-200 hover:border-signal/50 hover:bg-signal/5"
            >
              {live && (
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-50 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
                </span>
              )}
              {item}
            </li>
          ))
        ) : (
          <li className="rounded-full border border-dashed border-rule px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted/70">
            Coming soon
          </li>
        )}
      </ul>
    </article>
  );
}
