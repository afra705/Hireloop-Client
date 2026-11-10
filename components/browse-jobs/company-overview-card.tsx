import Link from "next/link"

import { formatJobDate } from "@/lib/job-utils"
import type { Job } from "@/types/job"

type CompanyOverviewCardProps = {
  job: Job
}

export function CompanyOverviewCard({ job }: CompanyOverviewCardProps) {
  const location = job.isRemote
    ? `${job.location ? `${job.location} ` : ""}(Remote)`
    : job.location || "Not specified"
  const deadline = formatJobDate(job.deadline) || "Not specified"

  const details = [
    { label: "Industry", value: job.category || "Not specified" },
    { label: "Location", value: location },
    { label: "Deadline", value: deadline },
  ]

  return (
    <aside className="h-fit rounded-xl border border-white/[0.06] bg-[#111113] p-5">
      <h2 className="text-base font-semibold text-white">Company Overview</h2>

      <div className="relative mt-4 flex h-36 items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-[#151517]">
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(92,83,254,0.2),transparent_60%)]"
        />

        <div className="relative flex size-16 items-center justify-center rounded-2xl bg-[#1C1C20] text-2xl font-semibold text-[#B3AEFF] ring-1 ring-white/10">
          {job.companyName?.charAt(0).toUpperCase() || "J"}
        </div>
      </div>

      <div className="mt-4">
        <p className="truncate text-sm font-medium text-white">
          {job.companyName}
        </p>

        <p className="mt-1 text-xs text-[#7C7F87]">Hiring for {job.jobTitle}</p>
      </div>

      <dl className="mt-5 space-y-3">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-b-0 last:pb-0"
          >
            <dt className="text-[11px] tracking-[0.06em] text-[#7C7F87] uppercase">
              {detail.label}
            </dt>

            <dd className="text-right text-xs text-[#D4D4D8]">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href="/browse-jobs"
        className="mt-5 flex h-10 w-full items-center justify-center rounded-lg border border-white/[0.08] bg-[#1A1A1D] text-xs font-medium text-[#D4D4D8] transition-colors hover:bg-[#222226] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE] focus-visible:outline-none"
      >
        Browse More Jobs
      </Link>
    </aside>
  )
}
