import type { CSSProperties, ReactNode } from "react";

// Shows an image, or a designed placeholder until the real image is added.
type Props = {
  src?: string;
  alt: string;
  title: string; // shown large on the placeholder
  hint: string; // e.g. "Screenshot coming soon"
  art: ReactNode; // icon or logo drawn on the placeholder
  accent?: string; // placeholder color
  variant: "browser" | "certificate" | "photo";
  className?: string;
};

export default function ImageSlot({
  src,
  alt,
  title,
  hint,
  art,
  accent = "var(--river)",
  variant,
  className = "",
}: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${title}: ${hint.toLowerCase()}`}
      style={{ "--accent": accent } as CSSProperties}
      className={`placeholder relative flex h-full w-full items-center justify-center overflow-hidden p-4 sm:p-10 ${
        variant === "browser" ? "pt-12 sm:pt-12" : ""
      } ${className}`}
    >
      {variant === "browser" ? (
        <BrowserMock title={title} hint={hint} art={art} />
      ) : variant === "certificate" ? (
        <CertificateMock title={title} hint={hint} art={art} />
      ) : (
        <PhotoMock title={title} hint={hint} art={art} />
      )}
    </div>
  );
}

// A little app window, so the empty slot already reads as "a screenshot goes here".
function BrowserMock({ title, hint, art }: { title: string; hint: string; art: ReactNode }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
      <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-surface-2" />
      </div>
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--accent)] text-white shadow-card sm:size-16">
          {art}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-xl font-bold text-ink">
            {title}
          </span>
          <span className="mt-2 block h-2 w-4/5 rounded-full bg-surface-2" />
          <span className="mt-1.5 block h-2 w-3/5 rounded-full bg-surface-2" />
        </span>
      </div>
      <div className="hidden grid-cols-3 gap-2 px-5 pb-5 min-[400px]:grid">
        <span className="h-10 rounded-lg bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]" />
        <span className="h-10 rounded-lg bg-surface-2" />
        <span className="h-10 rounded-lg bg-surface-2" />
      </div>
      <p className="border-t border-rule px-5 py-2 text-center text-xs font-medium text-muted">
        {hint}
      </p>
    </div>
  );
}

// A framed certificate with a seal.
function CertificateMock({ title, hint, art }: { title: string; hint: string; art: ReactNode }) {
  return (
    <div className="relative w-full max-w-xs rounded-lg border border-rule bg-surface p-2 shadow-card">
      <div className="flex flex-col items-center gap-2 rounded border-2 border-double border-[color-mix(in_srgb,var(--accent)_45%,transparent)] px-4 py-5 text-center">
        <span className="text-ink">{art}</span>
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Certificate
        </span>
        <span className="font-display text-base font-bold leading-tight text-ink">
          {title}
        </span>
        <span className="mt-1 h-px w-16 bg-rule" />
        <span className="text-xs text-muted">{hint}</span>
      </div>
      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 grid size-10 place-items-center rounded-full bg-signal text-[#12263a] shadow-card"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5 9-10" />
        </svg>
      </span>
    </div>
  );
}

// An empty photo frame with a camera icon.
function PhotoMock({ title, hint, art }: { title: string; hint: string; art: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-surface text-[var(--accent)] shadow-card">
        {art}
      </span>
      <span className="text-sm font-semibold text-ink">{title}</span>
      <span className="text-xs text-muted">{hint}</span>
    </div>
  );
}
