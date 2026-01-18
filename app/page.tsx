"use client";

import ResultsPanel from "@/components/ResultsPanel";
import { useState } from "react";
import ScannerInput from "@/components/ScannerInput";
import { parseHTML } from "@/lib/parser";
import { runScan } from "@/lib/runScan";
import type { Report } from "@/lib/types";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
// import Image from "next/image";

export default function Home() {
  const [html, setHtml] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  function handleScan() {
    const doc = parseHTML(html);

    if (doc !== null){
      const results = runScan(doc);
      // here is where i call the actual scanning function
      setReport(results);
    } else {
      setReport(null);
    }
  }


  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-[rgba(0,82,255,0.12)] blur-[140px]" />
        <div className="absolute bottom-[-35%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-[rgba(77,124,255,0.12)] blur-[170px]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-20 border-b border-[color:var(--border)] bg-[color:var(--background)]/80 backdrop-blur-lg">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-accent">
              <span className="material-symbols-outlined text-xl">search</span>
            </span>
            <div className="leading-tight">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                Accessibility
              </p>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                QuickScan
              </p>
            </div>
          </div>
          <p className="hidden text-sm text-[color:var(--muted-foreground)] md:block">
            Make your websites more accessible, fast.
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-32">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionLabel>WCAG QuickScan</SectionLabel>
            <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-[5.25rem]">
              Make accessibility checks feel{" "}
              <span className="relative inline-block">
                <span className="gradient-text">instant</span>
                <span className="gradient-underline" aria-hidden="true" />
              </span>
              .
            </h1>
            <p className="text-lg leading-relaxed text-[color:var(--muted-foreground)]">
              Paste any HTML snippet and get focused, actionable issues and passes
              in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] motion-safe:animate-[pulse-soft_2s_ease-in-out_infinite]" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  Live
                </span>
              </span>
              <span>Checks images, headings, and links.</span>
            </div>
          </div>

          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[110%] w-[110%] rounded-full border border-dashed border-[color:var(--border)] motion-safe:animate-[spin-slow_60s_linear_infinite]" />
            </div>
            <div className="relative z-10 grid gap-4 rounded-[2.5rem] border border-[color:var(--border)] bg-white/80 p-6 shadow-lift backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-accent">
                  <span className="material-symbols-outlined text-lg">search</span>
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  Visual Scan
                </span>
              </div>
              <div className="grid gap-3">
                <div className="h-24 rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)] shadow-soft motion-safe:animate-[float_6s_ease-in-out_infinite]" />
                <div className="h-16 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft motion-safe:animate-[float_7s_ease-in-out_infinite]" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[color:var(--accent)] shadow-accent" />
                <div className="space-y-2">
                  <div className="h-2 w-28 rounded-full bg-[color:var(--muted)]" />
                  <div className="h-2 w-20 rounded-full bg-[color:var(--muted)]" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-[1.5rem] border border-[color:rgba(0,82,255,0.3)] bg-white shadow-accent motion-safe:animate-[float_5s_ease-in-out_infinite]" />
            <div className="absolute -top-6 right-3 h-16 w-16 rounded-full border border-[color:rgba(0,82,255,0.4)] bg-[color:var(--muted)] shadow-soft motion-safe:animate-[float_6s_ease-in-out_infinite]" />
          </div>
        </section>

        <section id="scan" className="relative">
          <div className="rounded-[2rem] bg-gradient-to-br from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)] p-[2px] shadow-accent-lg">
            <Card className="rounded-[calc(2rem-2px)] p-8 shadow-lift md:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <ScannerInput html={html} onHtmlChange={setHtml} onScan={handleScan} />
                <ResultsPanel report={report} />
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
