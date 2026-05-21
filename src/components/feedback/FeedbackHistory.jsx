"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";

const STORAGE_KEY = "hintro_feedback";

const TYPE_COLORS = {
  "Bug Report": "bg-red-100 text-red-700 border-red-200",
  "Feature Request": "bg-blue-100 text-blue-700 border-blue-200",
  "General Feedback": "bg-purple-100 text-purple-700 border-purple-200",
  Other: "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)]",
};

function getBadgeClass(type) {
  return TYPE_COLORS[type] || TYPE_COLORS["Other"];
}

export function FeedbackHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setItems(stored);
  }, []);

  function handleDelete(id) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col items-center gap-3 text-center max-w-lg">
        <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[var(--muted-foreground)]" />
        </div>
        <p className="font-medium text-[var(--foreground)]">No feedback submitted yet</p>
        <p className="text-sm text-[var(--muted-foreground)]">
          Your submitted feedback will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-lg">
      <p className="text-sm text-[var(--muted-foreground)]">
        {items.length} item{items.length !== 1 ? "s" : ""} submitted
      </p>
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-4 shadow-sm group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getBadgeClass(item.type)}`}
                >
                  {item.type}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {format(parseISO(item.createdAt), "MMM d, yyyy · h:mm a")}
                </span>
              </div>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {item.message}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="p-1.5 rounded-md text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              aria-label="Delete feedback"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
