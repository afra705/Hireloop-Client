import type { Role } from "./auth"

/** Shape of a user document returned by the HireLoop API. */
export type AppUser = {
  _id: string
  name: string
  email: string
  role?: Role
  image?: string | null
}
