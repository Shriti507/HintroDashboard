"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Phone,
  FileText,
  MessageSquare,
  LifeBuoy,
  Inbox,
  Gift,
} from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Phone, label: "Call Insights", href: "/call-insights" },
  { icon: FileText, label: "Knowledge Base", href: "/knowledge-base" },
  { icon: MessageSquare, label: "Prompts", href: "/prompts" },
  { icon: LifeBuoy, label: "Boxy Controls", href: "/boxy-controlls" },
];

const bottomItems = [
  { icon: Inbox, label: "Feedback History", href: "/feedback-history" },
  { icon: Gift, label: "Feedback", href: "/feedback" },
];

export function Sidebar({ className }) {
  const pathname = usePathname();

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 h-screen border-r border-[var(--border)] bg-[var(--card)] sticky top-0",
        className
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <span className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
          Hintro
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  active
                    ? "text-[var(--primary-foreground)]"
                    : "text-[var(--muted-foreground)] group-hover:text-[var(--primary)]"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)] space-y-1">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  active
                    ? "text-[var(--primary-foreground)]"
                    : "text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
