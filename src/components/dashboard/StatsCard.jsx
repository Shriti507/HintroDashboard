"use client";

import { cn } from "@/utils/cn";

export function StatsCard({ title, formattedValue, icon: Icon, iconBg, iconColor }) {
  const isEmpty = !formattedValue || formattedValue === "0" || formattedValue === "-";

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white border border-[var(--border)] p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
     
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110",
        iconBg || "bg-[var(--muted)]"
      )}>
        <Icon className={cn("w-5 h-5", iconColor || "text-[var(--foreground)]")} />
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-[var(--muted-foreground)] tracking-tight leading-none">
          {title}
        </span>
        <span
          className={cn(
            "text-xl sm:text-[22px] font-bold tracking-tight mt-2 text-[var(--foreground)] leading-none",
            isEmpty && "text-[var(--muted-foreground)]"
          )}
        >
          {formattedValue || "0"}
        </span>
      </div>
    </div>
  );
}
