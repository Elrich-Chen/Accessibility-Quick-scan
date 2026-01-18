import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft",
        className
      )}
      {...props}
    />
  );
}
