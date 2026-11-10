export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type Frequency = "Yearly" | "Monthly" | "Weekly" | "Hourly"

export type JobStatus = "Active" | "Expired"

export type Job = {
  _id: string
  jobTitle: string
  companyName: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
  applicants?: number
}

export type JobForm = {
  jobTitle: string
  companyName: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: Frequency
  responsibilities: string
  qualifications: string
}
