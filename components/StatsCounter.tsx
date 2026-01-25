"use client";

import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  target?: number;
};

export default function StatsCounter({ target = 200 }: StatsCounterProps) {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const durationMs = 1200;
    const start = Date.now();
    let rafId = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.floor(target * progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, target]);

  const label = value >= target ? `${target}+` : `${value}`;

  return (
    <div
      ref={statsRef}
      className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift sm:p-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[rgba(0,82,255,0.18)] blur-[90px]" />
      <p
        className={`font-display text-4xl tracking-tight transition-opacity duration-700 sm:text-6xl lg:text-7xl ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
        websites loaded for quick checks
      </p>
    </div>
  );
}

