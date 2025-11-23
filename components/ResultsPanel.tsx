import type { ResultsPanelProps } from '@/lib/types';

export default function ResultsPanel({ report }: ResultsPanelProps) {
  if (!report) {
    return (
      <section className="w-full rounded-2xl border border-slate-200/70 bg-slate-50/80 p-6 text-center text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
        No scan yet.
      </section>
    );
  }

  const { passes, issues, stats } = report;

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

      {/* ISSUES */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Issues Found</h2>

        {issues.length === 0 ? (
          <p className="text-slate-500 text-sm dark:text-slate-300">No issues found 🎉</p>
        ) : (
          <ul className="space-y-3">
            {issues.map((issue, i) => (
              <li key={i} className="space-y-1 rounded-xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                <p className="font-medium text-sm text-slate-900 dark:text-slate-50 whitespace-pre-wrap">{issue.message}</p>
                <p className="text-xs text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">Why:</span> {issue.why}
                </p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">
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
