import Link from "next/link";
import { 
  LayoutDashboard,
  Phone,
  FileText,
  MessageSquare,
  LifeBuoy,
  CircleAlert,
  Settings,
  Inbox,
  Gift
} from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: Phone, label: "Call Insights", href: "#" },
  { icon: FileText, label: "Knowledge Base", href: "#" },
  { icon: MessageSquare, label: "Prompts", href: "#" },
  { icon: LifeBuoy, label: "Boxy Controls", href: "#" },

];

const bottomItems = [
  { icon: Inbox, label: "Feedback History", href: "#" },
  { icon: Gift, label: "Feedback", href: "#" },
];

export function Sidebar({ className }) {
  return (
    <aside className={cn(
      "hidden md:flex flex-col w-64 h-screen border-r border-[var(--border)] bg-[var(--card)] sticky top-0",
      className
    )}>
      <div className="p-6 flex items-center gap-3">
        
        <span className="text-xl font-semibold tracking-tight text-[var(--foreground)]">Hintro</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
              item.active 
                ? "bg-[var(--primary)] text-white shadow-md hover:bg-[var(--primary)] hover:text-white" 
                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors", 
              item.active ? "text-white" : "text-[var(--muted-foreground)] group-hover:text-[var(--primary)]"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border)] space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all group"
          >
            <item.icon className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
