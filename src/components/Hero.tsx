import type { CSSProperties, ReactNode } from "react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Hero() {
  // The route map runs oldest to newest, so the current project is the last stop.
  const stops = [...projects].reverse().slice(-5);
  const current = projects.find((p) => p.current);

  return (
    <section id="top" className="relative pb-16 pt-12 sm:pb-24 sm:pt-20">
      <div aria-hidden="true" className="hero-glow" />

      <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3.5 py-1.5 text-sm font-medium text-muted shadow-card">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
            </span>
            {profile.status}
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,5.75rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            Hi, I'm{" "}
            <span className="text-river">Kristine</span>
            <br />
            Cabanada.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-ink px-6 py-3 font-semibold text-paper shadow-card hover:bg-river"
            >
              See my projects
            </a>
            <a
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-2.5 font-semibold text-ink hover:border-river hover:text-river"
            >
              <DownloadIcon /> Résumé
            </a>
          </div>

          <ul className="mt-8 flex gap-2" aria-label="Find me online">
            {profile.github && (
              <SocialLink href={profile.github} label="GitHub">
                <GitHubIcon />
              </SocialLink>
            )}
            <SocialLink href={profile.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href={`mailto:${profile.email}`} label="Email">
              <MailIcon />
            </SocialLink>
          </ul>
        </div>

        <div className="order-1 mx-auto w-full max-w-[17rem] sm:max-w-xs md:order-2 md:max-w-none">
          <div className="portrait">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={769}
              height={769}
              className="aspect-square w-full rounded-[2rem] bg-surface object-cover shadow-card"
            />
            {current && (
              <a
                href={`#${current.id}`}
                className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-rule bg-surface px-4 py-2.5 text-sm shadow-card hover:border-river md:-left-8 md:translate-x-0"
              >
                <span className="block text-xs text-muted">Now building</span>
                <span className="font-display font-bold text-ink">
                  {current.title}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      <nav
        aria-label="Projects, oldest to newest"
        className="mt-20 rounded-3xl border border-rule bg-surface p-6 shadow-card sm:mt-24 sm:p-8"
      >
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted">
          My route so far
        </p>
        <ol className="route">
          {stops.map((p, i) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="route-stop"
                data-current={p.current ? "true" : "false"}
                style={{ "--i": i } as CSSProperties}
              >
                <span className="route-dot" />
                <span className="mt-3 block font-display text-sm font-bold leading-tight text-ink sm:text-lg">
                  {p.shortTitle}
                </span>
                <span className="block text-xs text-muted sm:text-sm">
                  {p.year}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

function SocialLink(props: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = props.href.startsWith("http");
  return (
    <li>
      <a
        href={props.href}
        aria-label={props.label}
        title={props.label}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="grid size-11 place-items-center rounded-full border border-rule bg-surface text-ink hover:border-river hover:text-river"
      >
        {props.children}
      </a>
    </li>
  );
}
