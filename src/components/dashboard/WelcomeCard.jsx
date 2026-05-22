"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { fetchProfile } from "@/services/api";

export function WelcomeCard() {
  const { userId } = useUser();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchProfile(userId);
      setProfile(data);
    } catch {
     
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
      {isLoading ? (
        <div className="h-14 w-64 rounded-lg bg-[var(--muted)]/50 animate-pulse" />
      ) : (
        <div>
          <h1 className="text-2.5xl font-bold tracking-tight text-[var(--foreground)] font-sans">
            Hi, {profile?.firstName ?? "there"} 👋 Welcome to Hintro
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm font-medium">
            Ready to make your next call smarter ?
          </p>
        </div>
      )}
      <button className="inline-flex items-center justify-center px-5 py-2.5 bg-black hover:bg-neutral-900 text-white text-sm font-semibold rounded shadow-sm transition-all duration-200 cursor-pointer active:scale-95">
        Start New Call
      </button>
    </div>
  );
}
