import { formatDistanceToNow, parseISO } from "date-fns";


export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "-";
  if (seconds === 0) return "0s";

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}


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
