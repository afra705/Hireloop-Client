import type { JobApplication } from "@/types/application"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getApplications = async (
  userId?: string
): Promise<JobApplication[]> => {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : ""

  const res = await fetch(`${BASE_URL}/applications${query}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    const error = await res.text()
    console.log("Status:", res.status)
    console.log("Error:", error)

    throw new Error("Failed to load applications")
  }

  return res.json()
}
