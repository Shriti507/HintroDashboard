"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { MoreVertical, AlertCircle, RefreshCw, CalendarDays } from "lucide-react";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { useUser } from "@/context/UserContext";
import { fetchCallSessions } from "@/services/api";

// ---------- helpers ----------

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

function getDateLabel(isoString) {
  const date = parseISO(isoString);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  
  const monthDay = format(date, "MMMM d");
  const day = date.getDate();
  return `${monthDay}${getOrdinalSuffix(day)}`;
}

function groupByDate(sessions) {
  const groups = {};
  sessions.forEach((session) => {
    const label = getDateLabel(session.started_at);
    if (!groups[label]) groups[label] = [];
    groups[label].push(session);
  });
  return groups;
}

// ---------- Empty State ----------

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center gap-5">
      <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center">
        <CalendarDays className="w-7 h-7 text-[var(--primary)]" />
      </div>
      <div>
        <p className="font-semibold text-[var(--foreground)] text-base">No Recent Calls</p>
        <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-xs mx-auto leading-relaxed">
          Connect your Google Calendar to see upcoming meetings,
          get reminders, and join calls directly from Hintro.
        </p>
      </div>
      <button className="px-5 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--muted)] transition-colors">
        Start a Call
      </button>
    </div>
  );
}

// ---------- Session Row ----------

function SessionRow({ session }) {
  const time = format(parseISO(session.started_at), "h:mm a").toLowerCase();
  
  // Determine letter badge value based on client or description
  const letter = session.client
    ? session.client.charAt(0).toUpperCase()
    : (session.description ? session.description.charAt(0).toUpperCase() : "C");

  // Determine participant list and fill up to 3 avatars for realistic display
  const participantList = session.participants || [];
  const avatarSeeds = [
    participantList[0]?.name || `${session._id}-1`,
    participantList[1]?.name || `${session._id}-2`,
    participantList[2]?.name || `${session._id}-3`,
  ];

  return (
    <div className="flex items-center justify-between px-3 py-3 hover:bg-gray-50/70 rounded-xl transition-all duration-200 group">
      <div className="flex items-center gap-4 min-w-0">
        {/* Purple Letter Badge */}
        <div className="w-11 h-11 rounded-xl bg-[#8b5cf6] flex items-center justify-center flex-shrink-0 text-white font-bold text-[15px] shadow-sm">
          {letter}
        </div>
        
        {/* Description & Avatars */}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {session.description || "Call"}
          </p>
          
          {/* Overlapping Avatars */}
          <div className="flex -space-x-1.5 overflow-hidden mt-1.5">
            {avatarSeeds.map((seed, idx) => (
              <img
                key={idx}
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-slate-100 object-cover"
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`}
                alt="Avatar"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Time & Action menu */}
      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        <p className="text-xs font-semibold text-gray-500">{time}</p>
        <button
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors opacity-70 group-hover:opacity-100"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---------- Main Component ----------

export function RecentCalls() {
  const { userId } = useUser();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCallSessions(userId, 10);
      setSessions(data.callSessions || []);
    } catch (err) {
      setError(err.message || "Failed to load recent calls");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const groupedSessions = useMemo(() => groupByDate(sessions), [sessions]);

  return (
    <div className="mt-12 max-w-2xl mx-auto w-full">
      <h2 className="text-base font-bold text-[var(--foreground)] text-center mb-6">
        Recent calls
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-[var(--muted)]/50 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-white border border-[var(--border)] p-6 flex flex-col items-center gap-3 text-center shadow-sm">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-[var(--muted-foreground)]">{error}</p>
          <button
            onClick={loadSessions}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : sessions.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[var(--border)] shadow-sm">
          <EmptyState />
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSessions).map(([dateLabel, group]) => (
            <div key={dateLabel} className="space-y-3">
              <p className="text-xs font-semibold text-gray-400 tracking-wider px-1">
                {dateLabel}
              </p>
              <div className="space-y-2">
                {group.map((session) => (
                  <SessionRow key={session._id} session={session} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
