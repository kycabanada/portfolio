import { useManilaTime } from "../useManilaTime";
import { profile } from "../data/profile";
import { PinIcon } from "./Icons";

export default function Hero() {
  const time = useManilaTime();
  const marqueeText = Array(3).fill(profile.name.toUpperCase()).join(" • ") + " • ";

  return (
    <>
      {/* Full-screen opener: portrait in front, outlined name scrolling behind */}
      <section id="top" className="relative isolate h-[100svh] min-h-[36rem] overflow-hidden">
        <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

        <h1 className="sr-only">
          {profile.name}, {profile.status}
        </h1>

        {/* Moving name, behind the photo */}
        <div aria-hidden="true" className="hero-marquee absolute inset-x-0 top-[34%] -z-0 select-none sm:top-[30%]">
          <div className="hero-marquee-track">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        {/* Portrait (background removed so the name passes behind) */}
        <img
          src={profile.cutout}
          alt={`Portrait of ${profile.name}`}
          width={900}
          height={1350}
          fetchPriority="high"
          className="hero-photo absolute bottom-0 left-1/2 z-10 h-[78svh] w-auto max-w-none -translate-x-1/2 object-contain object-bottom sm:h-[86svh]"
        />

        {/* Bottom-left: where and when */}
        <div className="absolute bottom-8 left-6 z-20 hidden space-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted md:block lg:left-12">
          <p className="flex items-center gap-2 text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            Open to internships
          </p>
          <p className="flex items-center gap-1.5">
            <PinIcon className="size-4" /> {profile.location} · {time}
          </p>
        </div>

        {/* Scroll cue */}
        <a
          href="#intro"
          className="absolute bottom-8 right-5 z-20 hidden flex-col items-center gap-3 text-muted transition-colors hover:text-ink sm:flex lg:right-10"
        >
          <span className="scroll-line h-12 w-px bg-current" />
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Scroll down
          </span>
        </a>
      </section>

    </>
  );
}
