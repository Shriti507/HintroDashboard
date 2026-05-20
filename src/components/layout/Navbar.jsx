"use client";

import { Menu ,Play} from "lucide-react";
import { useUser } from "@/context/UserContext";

export function Navbar({ onMenuClick }) {
  const { activeUser, setActiveUser } = useUser();

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex relative items-center font-medium font-sans text-lg text-[var(--foreground)]">
          <p>Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
     

        <button className="flex h-[40px] items-center gap-2 rounded-lg border border-black px-4">
          <Play
            size={14}
            fill="black"
            className="text-black"
          />

          <span className="text-sm font-medium text-black">
            Watch Tutorial
          </span>
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-purple-500 p-[2px] cursor-pointer shadow-sm">
          <div className="w-full h-full rounded-full border-2 border-white dark:border-[var(--card)] overflow-hidden bg-[var(--muted)]">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeUser === 'user1' ? 'Felix' : 'Alex'}`} 
              alt="User profile"
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
