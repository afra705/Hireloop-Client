import type { Role } from "@/types/auth"

export const USER_ROLES = [
  "admin",
  "recruiter",
  "seeker",
] as const satisfies readonly Role[]

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  recruiter: "Recruiter",
  seeker: "Seeker",
}

export const ROLE_FILTER_OPTIONS = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "recruiter", label: "Recruiter" },
  { value: "seeker", label: "Seeker" },
] as const

export type RoleFilter = (typeof ROLE_FILTER_OPTIONS)[number]["value"]
