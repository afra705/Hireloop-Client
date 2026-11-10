import type { Job } from "@/types/job"

import { JobActions } from "./job-actions"

type JobDetailHeaderProps = {
  job: Job
}

export function JobDetailHeader({ job }: JobDetailHeaderProps) {
  return (
    <header className="rounded-xl border border-white/[0.06] bg-[#111113] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#1C1C20] text-lg font-semibold text-[#B3AEFF] ring-1 ring-white/10">
            {job.companyName?.charAt(0).toUpperCase() || "J"}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {job.jobTitle}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
              <span className="text-[#A1A4AA]">{job.companyName}</span>

              <span aria-hidden className="size-1 rounded-full bg-white/20" />

              <span className="rounded-full border border-[#5C53FE]/30 bg-[#5C53FE]/10 px-2 py-0.5 text-[11px] font-medium text-[#B3AEFF]">
                {job.category}
              </span>
            </div>
          </div>
        </div>

        <JobActions jobTitle={job.jobTitle} />
      </div>
    </header>
  )
}
