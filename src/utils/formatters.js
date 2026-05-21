import { formatDistanceToNow, parseISO } from "date-fns";

/**
 * Formats seconds into "Xm Ys" format.
 * e.g. 2211 → "36m 51s", 870 → "14m 30s", 45 → "45s"
 */
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "-";
  if (seconds === 0) return "0s";

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

/**
 * Takes an array of ISO date strings (lastSession from stats API).
 * Returns "Today", "2 days ago", "5 days ago", or "-" if empty.
 */
export function formatLastSession(lastSessionArray) {
  if (!lastSessionArray || lastSessionArray.length === 0) return "-";

  const mostRecent = lastSessionArray[0];
  try {
    const date = parseISO(mostRecent);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "-";
  }
}
