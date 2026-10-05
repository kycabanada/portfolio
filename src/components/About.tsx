import type { ReactNode } from "react";
import ImageSlot from "./ImageSlot";
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

export default function About() {
  const { education, leadership } = profile;

  return (
    <section id="about" className="intro relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <header className="reveal text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">About me</p>
          <h2 className="font-wide mt-4 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.01em]">
            Background
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{profile.about[0]}</p>
        </header>

        {/* Stat cards */}
        <ul className="reveal mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                className={`${card} group flex h-full flex-col justify-between gap-10 p-6 transition-colors hover:border-ink/40`}
              >
                <span className="flex items-start justify-between">
                  <Icon className="size-5 text-ink" />
                  <span className="font-wide text-3xl font-extrabold leading-none">{value}</span>
                </span>
                <span className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {label}
                  <ArrowIcon className="size-4 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Education and leadership */}
        <div className="reveal mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard
            icon={<CapIcon className="size-5" />}
            eyebrow={`Education · ${education.period}`}
            title={education.degree}
            sub={`${education.school}, ${education.college}`}
          >
            <ul className="mt-4 space-y-2">
              {education.honors.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-ink">
                  <StarIcon className="mt-0.5 size-4 shrink-0 text-signal" />
                  {h}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard
            icon={<UsersIcon className="size-5" />}
            eyebrow={`Leadership · ${leadership.period}`}
            title={leadership.role}
            sub={leadership.org}
          >
            <p className="mt-4 text-sm leading-relaxed text-muted">{leadership.summary}</p>
          </InfoCard>
        </div>

        {/* Currently learning and beyond code */}
        <div className="reveal mt-4 grid gap-4 md:grid-cols-2">
          <ChipCard icon={<SparkIcon className="size-5" />} title="Currently learning" items={profile.learning} hint="Something new" />
          <ChipCard icon={<HeartIcon className="size-5" />} title="Beyond code" items={profile.interests} hint="A hobby" />
        </div>

        {/* Photos */}
        <ul className="reveal mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {profile.aboutPhotos.map((photo, i) => (
            <li key={photo.caption} className={`${card} overflow-hidden p-2 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
              <figure>
                <div className="aspect-[4/3] overflow-hidden rounded-xl grayscale transition-[filter] duration-500 hover:grayscale-0">
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

function InfoCard({
  icon,
  eyebrow,
  title,
  sub,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className={`${card} p-6 sm:p-7`}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <span className="text-ink">{icon}</span>
        {eyebrow}
      </p>
      <h3 className="font-wide mt-4 text-xl font-bold leading-snug">{title}</h3>
      <p className="mt-1 text-sm text-muted">{sub}</p>
      {children}
    </div>
  );
}

const HeartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);

// A card of short chips; empty entries show as dashed "Coming soon" chips.
function ChipCard({ icon, title, items, hint }: { icon: ReactNode; title: string; items: string[]; hint: string }) {
  return (
    <div className={`${card} p-6 sm:p-7`}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <span className="text-ink">{icon}</span>
        {title}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((item, i) =>
          item ? (
            <li key={item} className="rounded-lg border border-rule bg-surface px-3 py-1.5 text-sm text-ink">
              {item}
            </li>
          ) : (
            <li key={`empty-${i}`} className="rounded-lg border border-dashed border-rule px-3 py-1.5 text-sm text-muted/70">
              {hint} · coming soon
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
