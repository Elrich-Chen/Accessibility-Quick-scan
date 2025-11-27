"use client";

import ResultsPanel from "@/components/ResultsPanel";
import { useState } from "react";
import ScannerInput from "@/components/ScannerInput";
import { parseHTML } from "@/lib/parser";
import { runScan } from "@/lib/runScan";
import type { Issue, Report } from '@/lib/types';
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
    <div className="flex flex-col min-h-screen items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-slate-100 pt-28">
      {/* FIXED NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-10 h-20 bg-slate-900/80 backdrop-blur-lg border-b border-slate-300/10">
        <div className="w-full max-w-3xl mx-auto px-6 h-full flex items-center justify-between">
          {/* This is where we use the custom font */}
          <span style={{ fontFamily: 'var(--font-fig-tree)' }} className="text-sm font-semibold tracking-tight text-slate-300">WCAG-style scan</span>
          <span className="text-xs text-slate-400 hidden md:block">Make your websites more accessible</span>
        </div>
      </header>

      <span
        style={{
          fontFamily: 'var(--font-fig-tree)',
          textShadow: '0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3)'
        }}
        className="text-5xl font-bold tracking-tight mb-8"
      >
        Accessibility Quickscan
      </span>

      <main className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl bg-white/5 p-10 shadow-2xl backdrop-blur-sm ring-1 ring-white/10">
        <ScannerInput html={html} onHtmlChange={setHtml} onScan={handleScan}/>
        <ResultsPanel report = {report}/>
      </main>
    </div>
  );
}
