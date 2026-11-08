import Link from "next/link"
import {
  ChevronRightIcon,
  CopyIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react"
import { cn } from "cn"

type JobStatus = "Active" | "Expired"

type Job = {
  id: string
  title: string
  department: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  compensation: string
  applicants: number
  status: JobStatus
  deadline: string
  deadlineNote: string
  logo: {
    label: string
    className: string
  }
}

const jobs: Job[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    company: "HirePulse Network",
    location: "Remote (New York, USA)",
    type: "Full-time",
    compensation: "€25 - €40 / hr",
    applicants: 34,
    status: "Active",
    deadline: "May 30, 2025",
    deadlineNote: "Posted 40d ago",
    logo: {
      label: "H",
      className: "bg-[#5C53FE] text-white",
    },
  },
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    department: "Design",
    company: "HirePulse Labs",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    compensation: "€90k - €115k / yr",
    applicants: 19,
    status: "Active",
    deadline: "Jan 14, 2025",
    deadlineNote: "Posted 8d ago",
    logo: {
      label: "X",
      className: "bg-[#F97316] text-white",
    },
  },
  {
    id: "devops-specialist",
    title: "DevOps Specialist",
    department: "Infrastructure",
    company: "HirePulse Platforms",
    location: "Berlin, Germany",
    type: "Full-time",
    compensation: "€95k - €120k / yr",
    applicants: 12,
    status: "Active",
    deadline: "Jan 30, 2025",
    deadlineNote: "Posted 22d ago",
    logo: {
      label: "P",
      className: "bg-[#38BDF8] text-[#0B0B0C]",
    },
  },
  {
    id: "product-marketing-lead",
    title: "Product Marketing Lead",
    department: "Marketing",
    company: "HirePulse Network",
    location: "Remote (EU/US)",
    type: "Full-time",
    compensation: "€80k - €105k / yr",
    applicants: 27,
    status: "Active",
    deadline: "Jul 15, 2025",
    deadlineNote: "Posted 5d ago",
    logo: {
      label: "H",
      className: "bg-[#5C53FE] text-white",
    },
  },
  {
    id: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Quality",
    company: "HirePulse Platform",
    location: "Dublin, Ireland (Hybrid)",
    type: "Part-time",
    compensation: "€35 - €50 / hr",
    applicants: 8,
    status: "Expired",
    deadline: "May 01, 2025",
    deadlineNote: "Closed",
    logo: {
      label: "P",
      className: "bg-[#2563EB] text-white",
    },
  },
]

const StatusBadge = ({ status }: { status: JobStatus }) => {
  const isActive = status === "Active"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium",
        isActive
          ? "border-[#2FBF71]/20 bg-[#2FBF71]/10 text-[#5FD99A]"
          : "border-white/[0.08] bg-white/[0.04] text-[#A1A4AA]"
      )}
    >
      <span
        className={cn(
          "size-1 rounded-full",
          isActive ? "bg-[#5FD99A]" : "bg-[#7C7F87]"
        )}
      />
      {status}
    </span>
  )
}

const ManageJobsPage = () => {
  return (
    <div className="min-h-svh bg-[#0B0B0C] px-4 py-6 text-[#F4F4F5] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[11px] font-medium text-[#7C7F87]"
            >
              <Link
                href="/dashboard/recruiter/jobs"
                className="transition-colors hover:text-[#F4F4F5]"
              >
                Manage Jobs
              </Link>
              <ChevronRightIcon className="size-3" />
              <span className="text-[#A1A4AA]">
                Job Listings &amp; Posting
              </span>
            </nav>

            <h1 className="mt-4 text-2xl leading-8 font-semibold tracking-[-0.02em] text-white">
              Manage Job Posts
            </h1>
            <p className="mt-1 text-xs text-[#7C7F87]">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#5C53FE] px-4 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(92,83,254,0.8)] transition-colors hover:bg-[#6C64FF] focus-visible:ring-2 focus-visible:ring-[#8F88FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C] focus-visible:outline-none"
          >
            <PlusIcon className="size-3.5" />
            New Job Post
          </Link>
        </div>

        <div className="overflow-x-auto border-y border-white/[0.06]">
          <table className="w-full min-w-[1020px] border-collapse text-left">
            <caption className="sr-only">List of job posts</caption>

            <thead>
              <tr className="bg-[#111113]">
                {[
                  "Job Title & Dept",
                  "Company & Location",
                  "Type",
                  "Compensation",
                  "Applicants",
                  "Status",
                  "Deadline",
                  "Actions",
                ].map((heading, index) => (
                  <th
                    key={heading}
                    scope="col"
                    className={cn(
                      "border-b border-white/[0.06] px-3 py-2.5 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase",
                      index === 0 && "pl-4",
                      index === 7 && "pr-4 text-right"
                    )}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-white/[0.05] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                >
                  <td className="px-3 py-2.5 pl-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-[5px] text-[10px] font-bold ring-1 ring-white/10",
                          job.logo.className
                        )}
                      >
                        {job.logo.label}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-xs leading-4 font-medium text-[#F4F4F5]">
                          {job.title}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] leading-3 text-[#7C7F87]">
                          {job.department}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="text-xs leading-4 whitespace-nowrap text-[#D4D4D8]">
                      {job.company}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] leading-3 whitespace-nowrap text-[#7C7F87]">
                      <MapPinIcon className="size-2.5 shrink-0" />
                      {job.location}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 text-xs whitespace-nowrap text-[#A1A4AA]">
                    {job.type}
                  </td>

                  <td className="px-3 py-2.5 text-xs whitespace-nowrap text-[#D4D4D8]">
                    {job.compensation}
                  </td>

                  <td className="px-3 py-2.5">
                    <span className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
                      <UsersIcon className="size-3 text-[#7C7F87]" />
                      <span className="text-[#D4D4D8]">
                        {job.applicants}
                      </span>
                      <span className="text-[#7C7F87]">Candidates</span>
                    </span>
                  </td>

                  <td className="px-3 py-2.5">
                    <StatusBadge status={job.status} />
                  </td>

                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <p className="text-[11px] leading-4 text-[#D4D4D8]">
                      {job.deadline}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-3 text-[#7C7F87]">
                      {job.deadlineNote}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 pr-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        aria-label={`Edit ${job.title}`}
                        title="Edit job"
                        className="inline-flex h-6 items-center gap-1 rounded-md border border-[#5C53FE]/35 bg-[#5C53FE]/[0.08] px-2 text-[10px] font-medium text-[#B3AEFF] transition-colors hover:bg-[#5C53FE]/[0.16] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
                      >
                        <PencilIcon className="size-2.5" />
                        Update
                      </button>

                      <button
                        type="button"
                        aria-label={`Duplicate ${job.title}`}
                        title="Duplicate job"
                        className="inline-flex size-6 items-center justify-center rounded-md text-[#7C7F87] transition-colors hover:bg-white/[0.06] hover:text-[#F4F4F5] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
                      >
                        <CopyIcon className="size-3" />
                      </button>

                      <button
                        type="button"
                        aria-label={`Delete ${job.title}`}
                        title="Delete job"
                        className="inline-flex size-6 items-center justify-center rounded-md text-[#7C7F87] transition-colors hover:bg-[#F87171]/10 hover:text-[#F87171] focus-visible:ring-2 focus-visible:ring-[#F87171]/60 focus-visible:outline-none"
                      >
                        <Trash2Icon className="size-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageJobsPage
