import type { Role } from "@/types/auth"
import type { AdminUserRow, UserStatus } from "@/types/user"

const DAY_IN_MS = 24 * 60 * 60 * 1000

/** Map better-auth roles (which may include legacy values) to app roles. */
export function normalizeRole(role?: string | null): Role {
  if (role === "admin" || role === "recruiter") return role

  return "seeker"
}

/** Derive the UI status from better-auth's `banned` flag. */
export function getUserStatus(banned?: boolean | null): UserStatus {
  return banned ? "Suspended" : "Active"
}

/** Format a join date as e.g. "12 Oct 2023". */
export function formatJoinDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/** Normalise the many possible date shapes to an ISO string. */
export function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string") return value

  return ""
}

/** Count users created within the last 24 hours. */
export function countNewSignups(
  users: AdminUserRow[],
  windowMs = DAY_IN_MS
) {
  const cutoff = Date.now() - windowMs

  return users.filter((user) => {
    const createdAt = new Date(user.createdAt).getTime()

    return Number.isFinite(createdAt) && createdAt >= cutoff
  }).length
}
