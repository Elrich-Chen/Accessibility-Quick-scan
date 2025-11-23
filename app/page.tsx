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
      setReport(results);
    } else {
      setReport({
        passes: [],
        issues: [{message: "Missing input", why: "", suggestion: ""}],
        stats: {
          total: 0,
          issues: 0
        }
      })
    }
  }


  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-slate-100">

      <header className="w-full max-w-3xl px-6 py-6 text-xl font-semibold tracking-tight flex items-center justify-between">
        <span>Accessibility-Quickscan</span>
        <span>Make your websites more accessible</span>
      </header>

      <main className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl bg-white/95 p-10 shadow-2xl backdrop-blur-sm dark:bg-slate-900/90">
        <ScannerInput html={html} onHtmlChange={setHtml} onScan={handleScan}/>
        <ResultsPanel report = {report}/>
      </main>
    </div>
  );
}
