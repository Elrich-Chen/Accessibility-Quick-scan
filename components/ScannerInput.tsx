"use client";

import type { ScannerInputProps } from "@/lib/types";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ScannerInput({ html, onHtmlChange, onScan }: ScannerInputProps) {
  return (
    <div className="w-full space-y-5">
      <div className="space-y-2">
        <SectionLabel>HTML Input</SectionLabel>
        <p className="text-sm text-[color:var(--muted-foreground)]">
          Paste a snippet to check for common accessibility pitfalls.
        </p>
      </div>

      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)] p-4 shadow-soft">
        <label
          htmlFor="html-input"
          className="block text-sm font-semibold text-[color:var(--foreground)]"
        >
          HTML
        </label>
        <textarea
          id="html-input"
          className="mt-3 min-h-[11rem] w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 text-sm text-[color:var(--foreground)] shadow-[inset_0_1px_3px_rgba(15,23,42,0.12)] outline-none transition focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] placeholder:opacity-70"
          value={html}
          onChange={(e) => onHtmlChange(e.target.value)}
          placeholder="<div>Paste your HTML here</div>"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[color:var(--muted-foreground)]">
            We never store your input.
          </p>
          <Button
            size="lg"
            onClick={onScan}
            disabled={html.trim().length === 0}
          >
            <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-x-1">
              search
            </span>
            Scan HTML
          </Button>
        </div>
      </div>
    </div>
  );
}
