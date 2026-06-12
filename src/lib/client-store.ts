"use client";

export const STORAGE_KEYS = {
  reports: "boardroom_reports",
  decisions: "boardroom_decisions",
  settings: "boardroom_settings",
  team: "boardroom_team",
};

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
