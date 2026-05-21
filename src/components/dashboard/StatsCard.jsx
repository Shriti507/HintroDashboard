"use client";

import { cn } from "@/utils/cn";

export function StatsCard({ title, formattedValue, icon: Icon }) {
  const isEmpty = !formattedValue || formattedValue === "0" || formattedValue === "-";

  return (
    <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Decorative glow */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[var(--primary)]/5 rounded-full blur-2xl group-hover:bg-[var(--primary)]/10 transition-colors pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-medium text-[var(--muted-foreground)] tracking-tight">
          {title}
        </h3>
        <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] group-hover:text-[var(--primary)] group-hover:scale-110 transition-all">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10">
        <span
          className={cn(
            "text-3xl font-bold tracking-tight",
            isEmpty
              ? "text-[var(--muted-foreground)]"
              : "text-[var(--foreground)]"
          )}
        >
          {formattedValue || "0"}
        </span>
      </div>
    </div>
  );
}
