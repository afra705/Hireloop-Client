import { cache } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { RecruiterApplicationsView } from "@/components/applications/recruiter/recruiter-applications-view"
import { PageHeader } from "@/components/dashboard/page-header"
import { getApplicationsByJob } from "@/lib/api/applications-server"
import { getJobById } from "@/lib/api/jobs"
import { getUsers } from "@/lib/api/users"
import { getSession } from "@/lib/core/server"
import type { JobApplication, JobApplicant } from "@/types/application"
import type { AppUser } from "@/types/user"

const loadJob = cache(getJobById)

export const metadata: Metadata = {
  title: "Job Applications | HireLoop",
  description:
    "Review applicants for your job posts and move them through the hiring pipeline.",
}

type JobApplicationsPageProps = {
  params: Promise<{ id: string }>
}

const DASHBOARD_BY_ROLE = {
  seeker: "/dashboard/seeker",
  admin: "/dashboard/admin",
} as const

const JobApplicationsPage = async ({ params }: JobApplicationsPageProps) => {
  const { id } = await params

  const session = await getSession()

  if (!session) {
    redirect(
      `/sign-in?redirectTo=${encodeURIComponent(
        `/dashboard/recruiter/jobs/${id}/applications`
      )}`
    )
  }

  if (session.user.role !== "recruiter") {
    redirect(
      session.user.role === "admin"
        ? DASHBOARD_BY_ROLE.admin
        : DASHBOARD_BY_ROLE.seeker
    )
  }

  const job = await loadJob(id).catch(() => null)

  // Treat jobs owned by another recruiter as missing rather than revealing
  // that the job exists.
  if (!job || job.recruiterId !== session.user.id) {
    notFound()
  }

  const [applications, users] = await Promise.all([
    getApplicationsByJob(job._id).catch(() => [] as JobApplication[]),
    getUsers().catch(() => [] as AppUser[]),
  ])

  const usersById = new Map(users.map((user) => [user._id, user]))

  const applicants: JobApplicant[] = applications
    .filter((application) => application.jobId === job._id)
    .map((application) => {
      const user = usersById.get(application.userId)
      const fallbackName = application.email?.split("@")[0]

      return {
        id:
          application._id ??
          `${application.userId}-${application.appliedAt}`,
        userId: application.userId,
        name: user?.name || fallbackName || "Applicant",
        email: application.email || user?.email || "No email provided",
        status: application.status,
        appliedAt: application.appliedAt,
        jobType: application.jobType,
        workMode: application.workMode,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    )

  return (
    <div className="min-h-svh bg-[#0B0B0C] px-4 py-6 text-[#F4F4F5] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <PageHeader
          className="mb-6"
          breadcrumb={[
            { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
            { label: job.jobTitle },
            { label: "Applications" },
          ]}
          title="Job Applications"
          description={`Review and update the candidates who applied for ${job.jobTitle} at ${job.companyName}.`}
          action={
            <Link
              href="/dashboard/recruiter/jobs"
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/[0.08] bg-[#141416] px-4 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-white/[0.14] hover:bg-[#1A1A1D] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
            >
              <ArrowLeftIcon className="size-3.5" />
              Back to Manage Jobs
            </Link>
          }
        />

        <RecruiterApplicationsView
          initialApplicants={applicants}
          jobTitle={job.jobTitle}
        />
      </div>
    </div>
  )
}

export default JobApplicationsPage
