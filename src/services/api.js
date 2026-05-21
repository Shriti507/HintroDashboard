// Real Mock API Service
// Base URL: https://mock-backend-hintro.vercel.app

const BASE_URL = "https://mock-backend-hintro.vercel.app";

async function apiFetch(path, userId) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "x-user-id": userId,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchProfile(userId) {
  return apiFetch("/api/auth/profile", userId);
}

export async function fetchDashboard(userId) {
  return apiFetch("/api/auth/dashboard", userId);
}

export async function fetchStats(userId) {
  return apiFetch("/api/call-sessions/stats", userId);
}

export async function fetchCallSessions(userId, limit = 10) {
  return apiFetch(`/api/call-sessions?limit=${limit}`, userId);
}
