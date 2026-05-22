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
  Info,
} from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", info: false },
  { icon: Phone, label: "Call Insights", href: "/call-insights", info: false },
  { icon: FileText, label: "Knowledge Base", href: "/knowledge-base", info: true },
  { icon: MessageSquare, label: "Prompts", href: "/prompts", info: true },
  { icon: LifeBuoy, label: "Boxy Controls", href: "/boxy-controlls", info: true },
];

const bottomItems = [
  { icon: Inbox, label: "Feedback History", href: "/feedback-history" },
  { icon: Gift, label: "Feedback", href: "/feedback" },
];

export function Sidebar({ className }) {
  const pathname = usePathname();

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
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

     
      <nav className="flex-1 px-4 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-[var(--accent)] text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  active
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)] group-hover:text-[var(--foreground)]"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.info && (
                <Info
                  className={cn(
                    "w-4 h-4 flex-shrink-0 transition-colors",
                    active
                      ? "text-[var(--primary)]"
                      : "text-[var(--muted-foreground)]"
                  )}
                />
              )}
            </Link>
          );
        })}
      </nav>

    
      <div className="px-4 py-4 border-t border-[var(--border)] space-y-0.5">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-[var(--accent)] text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  active
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)] group-hover:text-[var(--foreground)]"
                )}
              />
              {item.label}
            </Link>
          );
        })}


        <div className="pt-3">
          <button className="w-full rounded-lg bg-[var(--secondary-foreground)] text-white text-sm font-medium py-2.5 hover:opacity-80 transition-opacity">
            Upgrade
          </button>
        </div>
      </div>``
    </aside>
  );
}
