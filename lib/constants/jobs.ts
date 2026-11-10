import type { Frequency, JobForm, JobType } from "@/types/job"

export const JOB_TYPES: readonly JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

export const FREQUENCIES: readonly Frequency[] = [
  "Yearly",
  "Monthly",
  "Weekly",
  "Hourly",
]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Business & Finance",
  "Education",
  "Healthcare",
  "Customer Support",
  "Other",
] as const

export const INITIAL_JOB_FORM: JobForm = {
  jobTitle: "",
  companyName: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "Yearly",
  responsibilities: "",
  qualifications: "",
}
