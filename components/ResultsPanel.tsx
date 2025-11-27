import { useState } from 'react';
import type { ResultsPanelProps } from '@/lib/types';

const FILTERS = ["all", "image", "heading", "link"] as const;
type filter = (typeof FILTERS)[number];

export default function ResultsPanel({ report }: ResultsPanelProps) {
  const [filter, setFilter] = useState<filter>("all");

  if (!report) {
    return (
      <section className="w-full rounded-2xl border-4 border-slate-400 bg-slate-50/80 p-12 py-24 text-center text-slate-500 shadow-sm dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-300 flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-outlined text-6xl">file_copy_off</span>
        <p className="text-lg">No scan yet.</p>
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
  }, {... emptyCounts});

  const filteredIssues = 
    filter === "all" ?
      issues:
      issues.filter((issue) => issue.type === filter);

  return (
    <section className="w-full rounded-2xl border border-slate-200/70 bg-slate-50/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 space-y-5">
      {/* PASSES */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100"> Passed</h2>

        {passes.length === 0 ? (
          <p className="text-slate-500 text-sm dark:text-slate-300">No passes yet.</p>
        ) : (
          <ul className="list-disc ml-5 text-sm space-y-1 text-slate-800 dark:text-slate-100">
            {passes.map((p, i) => (
              <li key={i} className="leading-relaxed">{p}</li>
            ))}
          </ul>
        )}
      </div>

      {/* BUTTONS SECTION */}
      <div className="flex gap-3 mb-4">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => setFilter(f)}
          className={
            filter === f
              ? "bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
              : "bg-white text-slate-700 px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
          }
        >
          {f[0].toUpperCase() + f.slice(1)} {f === 'all'?
          issues.length:
          issueCounts[f]}
        </button>
      ))}
    </div>

      
      {/* ISSUES */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Issues Found</h2>

        {filteredIssues.length === 0 ? (
          <p className="text-slate-500 text-sm dark:text-slate-300">No issues found 🎉</p>
        ) : (
          <ul className="space-y-3">
            {filteredIssues.map((issue, i) => (
              <li key={i} className="space-y-1 rounded-xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                <p className="font-medium text-sm text-slate-900 dark:text-slate-50 whitespace-pre-wrap">{issue.message}</p>
                <p className="text-xs text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">Why:</span> {issue.why}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <span className="font-semibold">Fix:</span> {issue.suggestion}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
