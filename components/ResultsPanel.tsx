import { useState } from "react";
import type { ResultsPanelProps } from "@/lib/types";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const FILTERS = ["all", "image", "heading", "link"] as const;
type Filter = (typeof FILTERS)[number];

export default function ResultsPanel({ report }: ResultsPanelProps) {
  const [filter, setFilter] = useState<Filter>("all");

  if (!report) {
    return (
      <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--foreground)] p-6 text-[color:var(--background)] shadow-lift">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
        <div className="relative space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionLabel>Results</SectionLabel>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">
              Awaiting Scan
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center text-white/70">
            <span className="material-symbols-outlined text-5xl text-white/80">
              file_copy_off
            </span>
            <p className="text-sm">
              No scan yet. Paste HTML and run a scan to see results here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { passes, issues } = report;

  const emptyCounts = {
    image: 0,
    heading: 0,
    link: 0,
  };

  const issueCounts = issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] ?? 0) + 1;
    return acc;
  }, { ...emptyCounts });

  const filteredIssues =
    filter === "all" ? issues : issues.filter((issue) => issue.type === filter);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--foreground)] p-6 text-[color:var(--background)] shadow-lift">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel>Results</SectionLabel>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 font-mono uppercase tracking-[0.2em]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] motion-safe:animate-[pulse-soft_2s_ease-in-out_infinite]" />
              Live
            </span>
            <span>{issues.length} issues</span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Passes
              </h2>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                {passes.length} checks
              </span>
            </div>

            {passes.length === 0 ? (
              <p className="mt-4 text-sm text-white/60">No passes yet.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {passes.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Issues
              </h2>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                {issues.length} total
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const isActive = filter === f;
                return (
                    <Button
                      key={f}
                      type="button"
                      size="sm"
                      variant={isActive ? "primary" : "ghost"}
                      onClick={() => setFilter(f)}
                      className={
                        isActive
                        ? "rounded-full px-4"
                        : "rounded-full border border-white/15 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                      }
                    >
                    {f[0].toUpperCase() + f.slice(1)}{" "}
                    {f === "all" ? issues.length : issueCounts[f]}
                  </Button>
                );
              })}
            </div>

            {filteredIssues.length === 0 ? (
              <p className="text-sm text-white/60">No issues found.</p>
            ) : (
              <ul className="space-y-3">
                {filteredIssues.map((issue, i) => (
                  <li key={i}>
                    <div className="rounded-2xl border border-white/30 bg-white/95 p-4 text-[color:var(--foreground)] shadow-soft">
                      <p className="text-sm font-semibold">{issue.message}</p>
                      <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">
                        <span className="font-semibold">Why:</span> {issue.why}
                      </p>
                      <p className="mt-1 text-xs text-[color:var(--accent)]">
                        <span className="font-semibold">Fix:</span>{" "}
                        {issue.suggestion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
