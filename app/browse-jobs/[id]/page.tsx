import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BriefcaseBusiness, CalendarDays, MapPin, Wallet } from "lucide-react"

import { Navbar } from "@/app/home/Navbar"
import { BulletList } from "@/components/browse-jobs/bullet-list"
import { CompanyOverviewCard } from "@/components/browse-jobs/company-overview-card"
import { JobDetailHeader } from "@/components/browse-jobs/job-detail-header"
import { JobDetailSection } from "@/components/browse-jobs/job-detail-section"
import { JobStatGrid } from "@/components/browse-jobs/job-stat-grid"
import { getJobById } from "@/lib/api/jobs"
import {
  formatJobDate,
  formatSalaryRange,
  toBulletPoints,
} from "@/lib/job-utils"

const loadJob = cache(getJobById)

type JobDetailsPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const job = await loadJob(id).catch(() => null)

  if (!job) {
    return { title: "Job Details | HireLoop" }
  }

  return {
    title: `${job.jobTitle} at ${job.companyName} | HireLoop`,
    description: `Apply for the ${job.jobTitle} role at ${job.companyName} in ${job.location}.`,
  }
}

const JobsDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params
  const job = await loadJob(id).catch(() => null)

  if (!job) notFound()

  const responsibilities = toBulletPoints(job.responsibilities)
  const qualifications = toBulletPoints(job.qualifications)

  const salary = formatSalaryRange(job)
  const deadline = formatJobDate(job.deadline)

  const location = job.isRemote
    ? `${job.location ? `${job.location} ` : ""}(Remote)`
    : job.location || "Not specified"

  const description = `${job.companyName} is hiring a ${job.jobTitle} to join its ${job.category} team. This is a ${job.jobType} role${job.isRemote ? " with remote work available" : job.location ? ` based in ${job.location}` : ""}.${deadline ? ` Applications close on ${deadline}.` : ""}`

  const skillTags = Array.from(
    new Set([job.category, job.jobType, job.isRemote ? "Remote" : "On-site"])
  ).filter(Boolean)

  const stats = [
    {
      label: "Salary Range",
      value: salary ? `${salary} / ${job.frequency}` : "Not specified",
      icon: Wallet,
    },
    {
      label: "Location",
      value: location,
      icon: MapPin,
    },
    {
      label: "Job Type",
      value: job.jobType,
      icon: BriefcaseBusiness,
    },
    {
      label: "Application Deadline",
      value: deadline || "Not specified",
      icon: CalendarDays,
    },
  ]

  return (
    <div className="min-h-svh bg-[#0B0B0C] text-[#F4F4F5]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <JobDetailHeader job={job} />

          <JobStatGrid stats={stats} />

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-[#111113] px-5 py-6 sm:px-6">
              <JobDetailSection title="Job Description">
                <p>{description}</p>
              </JobDetailSection>

              {responsibilities.length > 0 && (
                <JobDetailSection title="Responsibilities">
                  <BulletList items={responsibilities} />
                </JobDetailSection>
              )}

              {qualifications.length > 0 && (
                <JobDetailSection title="Requirements">
                  {skillTags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {skillTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.06] bg-[#1A1A1D] px-2.5 py-1 text-[11px] text-[#A1A4AA]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <BulletList items={qualifications} />
                </JobDetailSection>
              )}
            </article>

            <CompanyOverviewCard job={job} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default JobsDetailsPage
