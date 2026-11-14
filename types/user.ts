import type { Role } from "./auth"

/** Shape of a user document returned by the HireLoop API. */
export type AppUser = {
  _id: string
  name: string
  email: string
  role?: Role
  image?: string | null
}

export type UserStatus = "Active" | "Suspended"

/** Normalised user row used by the admin user management table. */
export type AdminUserRow = {
  id: string
  name: string
  email: string
  role: Role
  image?: string | null
  createdAt: string
  status: UserStatus
}
