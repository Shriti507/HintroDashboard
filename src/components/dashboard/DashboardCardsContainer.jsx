"use client";
import { useEffect, useState, useCallback } from "react";
import { PhoneCall, Clock, Cpu, Calendar, AlertCircle, RefreshCw } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { useUser } from "@/context/UserContext";
import { fetchStats } from "@/services/api";
import { formatDuration, formatLastSession } from "@/utils/formatters";

export function DashboardCardsContainer() {
  const { userId } = useUser();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchStats(userId);
      if (isMounted) {
        setStats(data);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message || "Failed to load stats");
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[140px] rounded-xl bg-[var(--muted)]/50 border border-[var(--border)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="text-sm text-[var(--muted-foreground)]">{error}</p>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Sessions",
      value: stats?.totalSessions ?? 0,
      icon: PhoneCall,
      formatted: String(stats?.totalSessions ?? 0),
    },
    {
      title: "Average Duration",
      value: stats?.averageDuration ?? 0,
      icon: Clock,
      formatted: formatDuration(stats?.averageDuration ?? 0),
    },
    {
      title: "AI Used",
      value: stats?.totalAIInteractions ?? 0,
      icon: Cpu,
      formatted: String(stats?.totalAIInteractions ?? 0),
    },
    {
      title: "Last Session",
      value: stats?.lastSession,
      icon: Calendar,
      formatted: formatLastSession(stats?.lastSession),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatsCard
          key={card.title}
          title={card.title}
          formattedValue={card.formatted}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
