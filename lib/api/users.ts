import type { AppUser } from "@/types/user"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getUserPremium = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`, {
    cache: "no-store",
  })

  return res.json()
}

/**
 * Fetch users from the API.
 *
 * Used by the recruiter dashboard to resolve applicant names from the
 * `userId` stored on each application.
 */
export const getUsers = async (): Promise<AppUser[]> => {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load users")
  }

  return res.json()
}
