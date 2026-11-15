
import "server-only"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return session
}

export const getToken = async () => {
  const session = await getSession()

  if (!session || !session.session?.token) {
    redirect("/unauthorized")
  }

  return session.session.token
}

export const authFetch = async (
  api: string,
  options?: RequestInit
) => {
  const token = await getToken()

  const res = await fetch(api, {
    ...options,
    headers: {
      ...options?.headers,
      authorization: `Bearer ${token}`,
    },
  })

  return res
}

export const protectedMutation = async (
  api: string,
  method: string,
  data?: unknown
) => {
  const token = await getToken()

  if (!token) {
    throw new Error("Authentication token not found")
  }

  const res = await fetch(api, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(data !== undefined && {
      body: JSON.stringify(data),
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Request failed: ${res.status} - ${error}`)
  }

  return res
}


export const requireRole = async (role: string) => {
  const session = await getSession()

  if (!session || session.user.role !== role) {
    redirect("/unauthorized")
  }

  return session
}
