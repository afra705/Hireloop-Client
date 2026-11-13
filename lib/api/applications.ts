import type { JobApplication } from "@/types/application"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getApplications = async (
  query = ''
): Promise<JobApplication[]> => {

  const res = await fetch(`${BASE_URL}/applications?${query}`, {
    cache: "no-store",
  })

  return res.json()
}

export const getApplicationsCount = async (
 query = ''
): Promise<{count: number}> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`, {
    cache: "no-store",
  })

  return res.json()
}