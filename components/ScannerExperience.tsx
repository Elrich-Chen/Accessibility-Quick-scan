"use client";

import { useState } from "react";
import ScannerInput from "@/components/ScannerInput";
import ResultsPanel from "@/components/ResultsPanel";
import { parseHTML } from "@/lib/parser";
import { runScan } from "@/lib/runScan";
import type { Report } from "@/lib/types";

export default function ScannerExperience() {
  const [html, setHtml] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  function handleScan() {
    const doc = parseHTML(html);

    if (doc !== null) {
      setReport(runScan(doc));
    } else {
      setReport(null);
    }
  }

  return (
    <div className="grid gap-8 lg:gap-10 2xl:grid-cols-[0.7fr_1.3fr]">
      <ScannerInput html={html} onHtmlChange={setHtml} onScan={handleScan} />
      <ResultsPanel report={report} />
    </div>
  );
}

