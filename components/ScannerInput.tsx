"use client";

import type { ScannerInputProps } from '@/lib/types';

export default function ScannerInput({html, onHtmlChange, onScan }: ScannerInputProps) {
    return (
        <div className="w-full space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                HTML Input
            </label>
            <textarea className="text-black w-full h-48 rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:focus:border-indigo-400"
                value={html}
                onChange={(e) => onHtmlChange(e.target.value)}
                placeholder="Paste HTML here..."
            />
            <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-100"
                onClick={onScan} disabled={html.trim().length === 0}>
                Scan
            </button>
        </div>
    )
}
