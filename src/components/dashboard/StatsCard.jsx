"use client";

import { cn } from "@/utils/cn";

export function StatsCard({ title, formattedValue, icon: Icon, iconBg, iconColor }) {
  const isEmpty = !formattedValue || formattedValue === "0" || formattedValue === "-";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-2xl bg-white border border-[var(--border)] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 group h-full">
     
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110",
        iconBg || "bg-[var(--muted)]"
      )}>
        <Icon className={cn("w-5 h-5", iconColor || "text-[var(--foreground)]")} />
      </div>

      <div className="flex flex-col min-w-0 mt-1 sm:mt-0">
        <span className="text-xs sm:text-sm font-medium text-[var(--muted-foreground)] tracking-tight leading-none line-clamp-1">
          {title}
        </span>
        <span
          className={cn(
            "text-lg sm:text-[22px] font-bold tracking-tight mt-1.5 sm:mt-2 text-[var(--foreground)] leading-none truncate",
            isEmpty && "text-[var(--muted-foreground)]"
          )}
        >
          {formattedValue || "0"}
        </span>
      </div>
    </div>
  );
}
