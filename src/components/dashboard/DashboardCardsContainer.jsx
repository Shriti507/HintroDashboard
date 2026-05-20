"use client";
import { useEffect, useState } from "react";
import { PhoneCall, Clock, Target, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { useUser } from "@/context/UserContext";
import { fetchDashboardStats } from "@/services/api";

export function DashboardCardsContainer() {
  const { activeUser } = useUser();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchDashboardStats(activeUser).then((data) => {
      if (isMounted) {
        setStats(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [activeUser]);

  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[140px] rounded-xl bg-[var(--muted)]/50 border border-[var(--border)] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Total Sessions" 
        value={0} 
        icon={PhoneCall} 
        
        
      />
      <StatsCard 
        title="Avgerage Duration" 
        value={0} 
        icon={Clock} 
        
        
      />
      <StatsCard 
        title="AI Used" 
        value={0} 
        icon={Target} 
        suffix="%" 
        
      />
      <StatsCard 
        title="Last Session" 
        value={0} 
        icon={Users} 
        
      />
    </div>
  );
}
