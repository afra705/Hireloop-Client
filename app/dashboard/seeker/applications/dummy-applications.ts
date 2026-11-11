import type {
  ApplicationStatus,
  JobApplication,
  WorkMode,
} from "@/types/application"
import type { JobType } from "@/types/job"

/**
 * Temporary data used to build the My Applications UI.
 * Replace this with the seeker's applications fetched from the API.
 */

const now = Date.now()

const hoursAgo = (hours: number) =>
  new Date(now - hours * 60 * 60 * 1000).toISOString()

const daysAgo = (days: number) =>
  new Date(now - days * 24 * 60 * 60 * 1000).toISOString()

type ApplicationSeed = {
  jobTitle: string
  companyName: string
  jobType: JobType
  workMode: WorkMode
  status: ApplicationStatus
  appliedAt: string
}

const seeds: ApplicationSeed[] = [
  {
    jobTitle: "Senior Frontend Engineer",
    companyName: "Stark Industries",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Applied",
    appliedAt: hoursAgo(2),
  },
  {
    jobTitle: "Product Designer",
    companyName: "Cyberdyne Systems",
    jobType: "Contract",
    workMode: "Hybrid",
    status: "Review",
    appliedAt: daysAgo(1),
  },
  {
    jobTitle: "Lead Data Scientist",
    companyName: "Wayne Enterprises",
    jobType: "Full-time",
    workMode: "On-site",
    status: "Shortlisted",
    appliedAt: daysAgo(4),
  },
  {
    jobTitle: "Cloud Architect",
    companyName: "Oscorp Tech",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Rejected",
    appliedAt: daysAgo(7),
  },
  {
    jobTitle: "AI Research Engineer",
    companyName: "Hooli Corp",
    jobType: "Full-time",
    workMode: "Hybrid",
    status: "Offered",
    appliedAt: daysAgo(14),
  },
  {
    jobTitle: "Backend Developer",
    companyName: "Initech",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Applied",
    appliedAt: daysAgo(16),
  },
  {
    jobTitle: "UX Researcher",
    companyName: "Umbrella Corp",
    jobType: "Contract",
    workMode: "Hybrid",
    status: "Review",
    appliedAt: daysAgo(18),
  },
  {
    jobTitle: "Data Engineer",
    companyName: "Soylent Corp",
    jobType: "Full-time",
    workMode: "On-site",
    status: "Shortlisted",
    appliedAt: daysAgo(20),
  },
  {
    jobTitle: "Machine Learning Engineer",
    companyName: "Globex",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Interview",
    appliedAt: daysAgo(22),
  },
  {
    jobTitle: "Mobile Developer",
    companyName: "Vandelay Industries",
    jobType: "Contract",
    workMode: "Remote",
    status: "Applied",
    appliedAt: daysAgo(24),
  },
  {
    jobTitle: "Frontend Engineer",
    companyName: "Acme Corp",
    jobType: "Full-time",
    workMode: "On-site",
    status: "Shortlisted",
    appliedAt: daysAgo(27),
  },
  {
    jobTitle: "Platform Engineer",
    companyName: "Pied Piper",
    jobType: "Full-time",
    workMode: "Hybrid",
    status: "Review",
    appliedAt: daysAgo(30),
  },
  {
    jobTitle: "Site Reliability Engineer",
    companyName: "Massive Dynamic",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Rejected",
    appliedAt: daysAgo(33),
  },
  {
    jobTitle: "Solutions Architect",
    companyName: "Aperture Science",
    jobType: "Contract",
    workMode: "On-site",
    status: "Shortlisted",
    appliedAt: daysAgo(36),
  },
  {
    jobTitle: "QA Engineer",
    companyName: "Tyrell Corp",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Applied",
    appliedAt: daysAgo(39),
  },
  {
    jobTitle: "Security Engineer",
    companyName: "Weyland-Yutani",
    jobType: "Full-time",
    workMode: "Hybrid",
    status: "Interview",
    appliedAt: daysAgo(42),
  },
  {
    jobTitle: "Full Stack Developer",
    companyName: "Cyberdyne Systems",
    jobType: "Contract",
    workMode: "Remote",
    status: "Shortlisted",
    appliedAt: daysAgo(45),
  },
  {
    jobTitle: "Product Manager",
    companyName: "Stark Industries",
    jobType: "Full-time",
    workMode: "On-site",
    status: "Review",
    appliedAt: daysAgo(48),
  },
  {
    jobTitle: "Engineering Manager",
    companyName: "Hooli Corp",
    jobType: "Full-time",
    workMode: "Hybrid",
    status: "Offered",
    appliedAt: daysAgo(52),
  },
  {
    jobTitle: "Data Scientist",
    companyName: "Oscorp Tech",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Shortlisted",
    appliedAt: daysAgo(56),
  },
  {
    jobTitle: "DevOps Engineer",
    companyName: "Wayne Enterprises",
    jobType: "Contract",
    workMode: "Remote",
    status: "Shortlisted",
    appliedAt: daysAgo(60),
  },
  {
    jobTitle: "Technical Lead",
    companyName: "Initech",
    jobType: "Full-time",
    workMode: "On-site",
    status: "Interview",
    appliedAt: daysAgo(65),
  },
  {
    jobTitle: "Principal Engineer",
    companyName: "Pied Piper",
    jobType: "Full-time",
    workMode: "Remote",
    status: "Offered",
    appliedAt: daysAgo(70),
  },
  {
    jobTitle: "Software Engineer",
    companyName: "Acme Corp",
    jobType: "Full-time",
    workMode: "Hybrid",
    status: "Shortlisted",
    appliedAt: daysAgo(75),
  },
]

export const dummyApplications: JobApplication[] = seeds.map((seed, index) => ({
  _id: `app_${String(index + 1).padStart(3, "0")}`,
  jobId: `job_${String(index + 1).padStart(3, "0")}`,
  userId: "user_demo",
  email: "seeker@example.com",
  category: "Engineering & Tech",
  location: "San Francisco, CA",
  minSalary: "90000",
  maxSalary: "130000",
  frequency: "Yearly",
  archived: false,
  ...seed,
}))
