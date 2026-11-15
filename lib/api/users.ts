'use server'
import type { AppUser } from "@/types/user"
import { authFetch } from "../core/server"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getUserPremium = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load premium status")
  }

  return res.json()
}

export const getAdminUsers  = async()=>{
  const res = await authFetch(`${BASE_URL}/users`, {
    cache: "no-store",
  })
  return res.json()
}

export const getUsers = async (): Promise<AppUser[]> => {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load users")
  }

  return res.json()
}
