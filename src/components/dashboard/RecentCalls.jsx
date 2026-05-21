"use client";

import { useEffect, useState, useCallback } from "react";
import { MoreVertical, Phone, AlertCircle, RefreshCw, PhoneMissed } from "lucide-react";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { useUser } from "@/context/UserContext";
import { fetchCallSessions } from "@/services/api";
import { formatDuration } from "@/utils/formatters";

// ---------- helpers ----------

function getDateLabel(isoString) {
  const date = parseISO(isoString);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
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

function getParticipantNames(participants) {
  if (!participants || participants.length === 0) return "—";
  return participants.map((p) => p.name).join(", ");
}

// ---------- Empty State ----------

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[var(--muted)] flex items-center justify-center">
        <PhoneMissed className="w-7 h-7 text-[var(--muted-foreground)]" />
      </div>
      <div>
        <p className="font-semibold text-[var(--foreground)] text-base">No Recent Calls</p>
        <p className="text-sm text-[var(--muted-foreground)] mt-1 max-w-xs mx-auto">
          Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
        </p>
      </div>
      <button className="mt-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-opacity">
        Start a Call
      </button>
    </div>
  );
}

// ---------- Session Row ----------

function SessionRow({ session }) {
  const time = format(parseISO(session.started_at), "h:mm a");
  const duration = formatDuration(session.total_duration_seconds);
  const participants = getParticipantNames(session.participants);

  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-[var(--muted)]/40 rounded-lg transition-colors group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
          <Phone className="w-4 h-4 text-[var(--accent-foreground)]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--foreground)] truncate">
            {session.description || "Call"}
            {session.client ? ` · ${session.client}` : ""}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] truncate">
            {participants}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-[var(--muted-foreground)]">{time}</p>
          <p className="text-xs font-medium text-[var(--foreground)]">{duration}</p>
        </div>
        <button
          className="p-1 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors opacity-0 group-hover:opacity-100"
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

  return (
    <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm mt-8 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--foreground)]">Recent Calls</h2>
        {!isLoading && !error && sessions.length > 0 && (
          <span className="text-xs text-[var(--muted-foreground)]">
            {sessions.length} session{sessions.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 rounded-lg bg-[var(--muted)]/50 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center px-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-[var(--muted-foreground)]">{error}</p>
          <button
            onClick={loadSessions}
            className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : sessions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="p-2">
          {Object.entries(groupByDate(sessions)).map(([dateLabel, group]) => (
            <div key={dateLabel} className="mb-4">
              <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider px-4 py-2">
                {dateLabel}
              </p>
              {group.map((session) => (
                <SessionRow key={session._id} session={session} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
