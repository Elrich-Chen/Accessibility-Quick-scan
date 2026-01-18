import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export type SectionLabelProps = HTMLAttributes<HTMLDivElement>;

export default function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-[color:rgba(0,82,255,0.3)] bg-[color:rgba(0,82,255,0.08)] px-4 py-2",
        className
      )}
      {...props}
    >
      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] motion-safe:animate-[pulse-soft_2s_ease-in-out_infinite]" />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
        {children}
      </span>
    </div>
  );
}
