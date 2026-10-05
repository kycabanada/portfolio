import type { ReactNode } from "react";

// Shown wherever content hasn't been written yet. Fill in the matching field in
// src/data and it disappears on its own.
export default function Placeholder({
  label,
  icon,
  className = "",
}: {
  label: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-dashed border-rule bg-ink/[0.02] px-4 py-3 text-sm text-muted ${className}`}
    >
      {icon && <span className="shrink-0 text-muted/70">{icon}</span>}
      <span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/70">Coming soon</span>
        <span className="block">{label}</span>
      </span>
    </div>
  );
}
