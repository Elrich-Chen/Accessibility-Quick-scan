type StatsCounterProps = {
  label?: string;
};

export default function StatsCounter({ label = "200+" }: StatsCounterProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[rgba(0,82,255,0.18)] blur-[90px]" />
      <p className="font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl">
        {label}
      </p>
      <p className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-[color:var(--muted-foreground)]">
        websites loaded for quick checks
      </p>
    </div>
  );
}
