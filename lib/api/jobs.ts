import type { Job } from "@/types/job"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = ""): Promise<Job[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    const error = await res.text()
    console.log("Status:", res.status)
    console.log("Error:", error)

    throw new Error("Failed to load jobs")
  }

  return res.json()
}

export const getJobById = async (jobId: string): Promise<Job> => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load job")
  }

  return res.json()
}

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)

    throw new Error(data?.message || "Failed to delete job")
  }

  return res.json()
}
