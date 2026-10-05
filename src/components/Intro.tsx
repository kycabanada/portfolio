import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { certifications } from "../data/certifications";
import { skillGroups } from "../data/skills";
import { ArrowIcon, DownloadIcon } from "./Icons";

const techCount = new Set(skillGroups.flatMap((g) => g.items)).size;

// Types each role out, pauses, deletes it, then moves on to the next.
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    let word = 0;
    let chars = 0;
    let deleting = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = words[word];
      chars += deleting ? -1 : 1;
      setText(full.slice(0, chars));
      let delay = deleting ? 35 : 75;
      if (!deleting && chars === full.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && chars === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 400;
      }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

export default function Intro() {
  const role = useTypewriter(profile.roles);
  const current = projects.find((p) => p.current);

  return (
    <section id="intro" className="intro relative isolate overflow-hidden">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell grid min-h-[100svh] items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* Text */}
        <div className="reveal py-20 lg:py-28">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="text-signal">✦</span> Available for internships
          </p>

          <h2 className="font-wide mt-6 text-[clamp(2.4rem,6.2vw,6.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
            <span className="whitespace-nowrap">Full-Stack</span>
            <br />
            <span className="text-muted/70">Developer</span>
          </h2>

          <p className="mt-6 h-8 font-mono text-xl text-ink">
            <span aria-hidden="true">
              {role}
              <span className="caret">_</span>
            </span>
            <span className="sr-only">{profile.roles.join(", ")}</span>
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{profile.intro}</p>

          <ul aria-label="Main tools" className="mt-6 flex flex-wrap gap-2">
            {profile.stack.map((t) => (
              <li
                key={t}
                className="rounded-md border border-rule bg-surface/60 px-3.5 py-2 font-mono text-sm text-ink backdrop-blur"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              See my work <ArrowIcon />
            </a>
            <a
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-full border border-rule px-6 py-3 font-medium text-ink transition-colors hover:border-ink"
            >
              <DownloadIcon className="size-4" /> Resume
            </a>
          </div>

          <ul className="mt-10 space-y-2.5 font-mono text-[0.9375rem] text-muted">
            <li>↓ explore my work below</li>
            {current && (
              <li>
                <a href={`#${current.id}`} className="hover:text-ink">
                  → now building {current.title}: {current.tagline.toLowerCase()}
                </a>
              </li>
            )}
            <li>
              ↗ {String(projects.length).padStart(2, "0")} projects ·{" "}
              {String(certifications.length).padStart(2, "0")} certifications · {techCount} technologies
            </li>
          </ul>
        </div>

        {/* Hanging ID card */}
        <Lanyard />
      </div>

    </section>
  );
}

// An ID card on a lanyard. It sways on its own; drag it and it swings back.
// Moving the pointer over it tilts it in 3D.
function Lanyard() {
  const swing = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const setAngle = (deg: number, spring: boolean) => {
    const el = swing.current;
    if (!el) return;
    el.style.transition = spring ? "rotate 1.4s cubic-bezier(0.25, 1.8, 0.4, 1)" : "none";
    el.style.rotate = `${deg}deg`;
  };

  const onDown = (e: ReactPointerEvent) => {
    const el = swing.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    // The pivot is where the strap is pinned, at the top middle.
    drag.current = { x: r.left + r.width / 2, y: r.top };
    el.parentElement?.classList.add("is-held");
  };

  const onMove = (e: ReactPointerEvent) => {
    const c = card.current;
    if (drag.current) {
      const dx = e.clientX - drag.current.x;
      const dy = Math.max(e.clientY - drag.current.y, 40);
      const deg = (-Math.atan2(dx, dy) * 180) / Math.PI;
      setAngle(Math.max(-40, Math.min(40, deg)), false);
    }
    if (c && e.pointerType === "mouse") {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `rotateY(${px * 22}deg) rotateX(${-py * 16}deg)`;
    }
  };

  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    setAngle(0, true);
    swing.current?.parentElement?.classList.remove("is-held");
  };

  const onLeave = () => {
    if (card.current) card.current.style.transform = "";
  };

  const [first, ...rest] = profile.name.split(" ");

  return (
    <div className="relative flex h-[42rem] justify-center self-start lg:h-[100svh]">
      <div className="lanyard-sway">
        <div ref={swing} className="lanyard-swing flex flex-col items-center">
          {/* Strap */}
          <div aria-hidden="true" className="lanyard-strap h-40 w-7 sm:h-48 lg:h-[30svh]">
            <span>{profile.strap}</span>
          </div>
          <div aria-hidden="true" className="lanyard-clip" />

          {/* Card */}
          <div
            className="cursor-grab touch-none select-none [perspective:900px] active:cursor-grabbing"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={onLeave}
          >
            <div
              ref={card}
              className="lanyard-card w-64 rounded-2xl bg-surface p-3.5 text-ink sm:w-72 xl:w-80"
            >
              <div aria-hidden="true" className="mx-auto mb-3 h-2 w-12 rounded-full bg-ink/15" />
              <img
                src={profile.photo}
                alt={`Photo of ${profile.name}`}
                width={1000}
                height={1500}
                draggable={false}
                className="aspect-[4/5] w-full rounded-lg object-cover object-[50%_20%]"
              />
              <div className="mt-3 flex items-end justify-between gap-2 px-1 pb-1">
                <div>
                  <p className="font-wide text-base font-extrabold uppercase leading-tight">
                    {first}
                    <br />
                    {rest.join(" ")}
                  </p>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                    BS IT · UST
                  </p>
                </div>
                <span className="rounded bg-ink px-1.5 py-0.5 font-mono text-[0.625rem] text-paper">
                  ’27
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
