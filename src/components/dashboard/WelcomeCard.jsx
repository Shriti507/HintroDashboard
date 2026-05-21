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
      // Silently fail — greeting degrades gracefully
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div>
      {isLoading ? (
        <div className="h-8 w-56 rounded-lg bg-[var(--muted)]/50 animate-pulse" />
      ) : (
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Hi, {profile?.firstName ?? "there"} 👋 Welcome to Hintro
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Ready to make your next call smarter ?
          </p>
        </div>
      )}
    </div>
  );
}
