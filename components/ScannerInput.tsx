"use client";

import type { ScannerInputProps } from '@/lib/types';

export default function ScannerInput({html, onHtmlChange, onScan }: ScannerInputProps) {
    return (
        <div className="w-full space-y-3">
            <label className="block text-sm font-semibold text-slate-200 dark:text-slate-200">
                HTML Input
            </label>
            <textarea className="text-black w-full h-48 rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:focus:border-indigo-400"
                value={html}
                onChange={(e) => onHtmlChange(e.target.value)}
                placeholder="<div>Paste your HTML here</div>"
            />
            <div className="flex justify-end">
                <button
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    onClick={onScan}
                    disabled={html.trim().length === 0}
                >
                    <span className="material-symbols-outlined">search</span>
                    Scan HTML
                </button>
            </div>
        </div>
    )
}
