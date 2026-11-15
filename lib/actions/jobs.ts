'use server'
import type { JobForm } from "@/types/job"
import type { JobApplicationInput } from "@/types/application"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Create Job
export const CreatJob = async (data: JobForm) => {
   const api = `${BASE_URL}/jobs`;
  const res = await protectedMutation(api, 'POST', data)
  return res.json()

}

// Apply to a Job
export const applyToAJob = async (data: JobApplicationInput) => {
  const api = `${BASE_URL}/application`;
  const res = await protectedMutation(api, 'POST', data)
  return res.json()

}
