"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Play, LogOut, ChevronDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { LogoutModal } from "@/components/common/LogoutModal";
import { cn } from "@/utils/cn";

const USER_OPTIONS = [
  { id: "u1", label: "User 1", sublabel: "Empty State" },
  { id: "u2", label: "User 2", sublabel: "Filled State" },
];

export function Navbar({ onMenuClick }) {
  const { userId, setUserId } = useUser();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [userSwitcherOpen, setUserSwitcherOpen] = useState(false);

  const avatarRef = useRef(null);
  const userSwitcherRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
      if (userSwitcherRef.current && !userSwitcherRef.current.contains(e.target)) {
        setUserSwitcherOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    setAvatarMenuOpen(false);
    setLogoutModalOpen(true);
  }

  function handleLogoutConfirm() {
    // In a real app: clear session/tokens and redirect to login
    setLogoutModalOpen(false);
    alert("Logged out! (redirect to login in production)");
  }

  const currentUser = USER_OPTIONS.find((u) => u.id === userId) || USER_OPTIONS[1];
  const avatarSeed = userId === "u1" ? "Felix" : "Alex";

  return (
    <>
      <header className="h-16 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="md:hidden p-2 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex relative items-center font-medium font-sans text-lg text-[var(--foreground)]">
            <p>Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* ── Dev User Switcher ── */}
          <div className="relative" ref={userSwitcherRef}>
            <button
              onClick={() => setUserSwitcherOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-xs font-medium px-3 py-1.5 hover:bg-[var(--muted)] transition-colors"
              aria-label="Switch user"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              {currentUser.label}
              <ChevronDown className={cn("w-3 h-3 transition-transform", userSwitcherOpen && "rotate-180")} />
            </button>

            {userSwitcherOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {USER_OPTIONS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setUserId(user.id);
                      setUserSwitcherOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                      userId === user.id
                        ? "bg-[var(--accent)] text-[var(--accent-foreground)] font-medium"
                        : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                    )}
                  >
                    <div className="text-left">
                      <p className="font-medium">{user.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{user.sublabel}</p>
                    </div>
                    {userId === user.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Watch Tutorial Button ── */}
          <button className="hidden sm:flex h-[36px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 hover:bg-[var(--muted)] transition-colors">
            <Play size={12} fill="currentColor" className="text-[var(--foreground)]" />
            <span className="text-sm font-medium">Watch Tutorial</span>
          </button>

          {/* ── Avatar + Dropdown ── */}
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setAvatarMenuOpen((v) => !v)}
              aria-label="Open user menu"
              aria-haspopup="true"
              aria-expanded={avatarMenuOpen}
              className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-purple-500 p-[2px] cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
            >
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-[var(--muted)]">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {avatarMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-0"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout confirmation modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
