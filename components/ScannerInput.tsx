"use client";

import type { DragEvent } from "react";
import type { ScannerInputProps } from "@/lib/types";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const sampleHtml = `<main>
  <header>
    <h1>Launch Week</h1>
    <h3>Highlights</h3>
    <img src="/hero.jpg">
    <p>See the full checklist.</p>
    <a href="/details">Click here</a>
  </header>
</main>`;

export default function ScannerInput({ html, onHtmlChange, onScan }: ScannerInputProps) {
  const handleDragOver = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const [file] = Array.from(event.dataTransfer.files ?? []);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => onHtmlChange(String(reader.result ?? ""));
      reader.readAsText(file);
      return;
    }

    const droppedText = event.dataTransfer.getData("text/plain");
    if (droppedText) {
      onHtmlChange(droppedText);
    }
  };

  const handleSampleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData("text/plain", sampleHtml);
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="w-full space-y-5">
      <div className="space-y-2">
        <SectionLabel>HTML Input</SectionLabel>
        <p className="text-sm text-[color:var(--muted-foreground)] sm:text-base">
          Paste a snippet to check for common accessibility pitfalls.
        </p>
        <p className="text-xs text-[color:var(--muted-foreground)]">
          Drag and drop HTML text or a file, or copy a small section from View Page Source or your component file.
        </p>
      </div>

      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)] p-4 shadow-soft transition-all duration-300 focus-within:border-[color:var(--accent)] focus-within:shadow-lift sm:p-5">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <label
            htmlFor="html-input"
            className="block text-sm font-semibold text-[color:var(--foreground)]"
          >
            HTML
          </label>
          <button
            type="button"
            draggable
            onDragStart={handleSampleDragStart}
            onClick={() => onHtmlChange(sampleHtml)}
            className="group flex w-full flex-col items-start gap-0.5 rounded-2xl border border-dashed border-[color:rgba(0,82,255,0.5)] bg-[color:rgba(0,82,255,0.12)] px-4 py-2 text-xs font-semibold text-[color:var(--accent)] shadow-soft transition hover:-translate-y-0.5 hover:bg-[color:rgba(0,82,255,0.2)] active:translate-y-0 active:scale-[0.98] motion-safe:animate-[float_6s_ease-in-out_infinite] cursor-grab active:cursor-grabbing sm:w-auto"
            aria-label="Drag this sample prompt into the input or click to fill"
            title="Drag into the box or click to load"
          >
            <span>Sample prompt</span>
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              drag into box
            </span>
          </button>
        </div>
        <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">
          Drag this bubble into the box above (or click it to fill).
        </p>
        <textarea
          id="html-input"
          className="mt-3 min-h-[9rem] w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 text-sm text-[color:var(--foreground)] shadow-[inset_0_1px_3px_rgba(15,23,42,0.12)] outline-none transition focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] placeholder:text-[color:var(--muted-foreground)] placeholder:opacity-70 sm:min-h-[11rem]"
          value={html}
          onChange={(e) => onHtmlChange(e.target.value)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          placeholder="<div>Drop or paste your page HTML snippet here</div>"
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
              onClick={() => onHtmlChange(sampleHtml)}
            >
              Load sample snippet
            </Button>
            <p className="text-xs text-[color:var(--muted-foreground)]">
              We never store your input.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
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
