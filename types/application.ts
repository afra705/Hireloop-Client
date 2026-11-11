import type { Frequency, JobType } from "./job"

export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Offered"
  | "Rejected"
  | "Withdrawn"

export type WorkMode = "Remote" | "Hybrid" | "On-site"

/**
 * Snapshot of the job at the moment the seeker applied.
 *
 * These fields are copied onto the application instead of being read from
 * the job document, so a seeker's application history stays intact even if
 * the recruiter later edits or deletes the job post.
 */
export type JobApplicationSnapshot = {
  jobTitle: string
  companyName: string
  category: string
  jobType: JobType
  workMode: WorkMode
  location: string
  minSalary: string
  maxSalary: string
  frequency: Frequency
}

export type JobApplication = JobApplicationSnapshot & {
  _id?: string
  jobId: string
  userId: string
  email: string
  status: ApplicationStatus
  appliedAt: string
  updatedAt?: string
  archived?: boolean
}

/** Payload sent to the API when a seeker applies to a job. */
export type JobApplicationInput = Omit<JobApplication, "_id" | "updatedAt">
