"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const FEEDBACK_TYPES = ["Bug Report", "Feature Request", "General Feedback", "Other"];
const STORAGE_KEY = "hintro_feedback";

function saveFeedback(type, message) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const entry = {
    id: `fb_${Date.now()}`,
    type,
    message,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing]));
}

export function FeedbackForm() {
  const [type, setType] = useState(FEEDBACK_TYPES[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }
    setError("");
    saveFeedback(type, message.trim());
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-sm max-w-lg">
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">Submit Feedback</h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-5">
        Help us improve Hintro by sharing your thoughts.
      </p>

      {submitted && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Feedback submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="feedback-type"
            className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
          >
            Feedback Type
          </label>
          <select
            id="feedback-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-colors"
          >
            {FEEDBACK_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="feedback-message"
            className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
          >
            Message
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError("");
            }}
            rows={4}
            placeholder="Describe your feedback..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-colors placeholder:text-[var(--muted-foreground)]"
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium py-2.5 hover:opacity-90 transition-opacity"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
