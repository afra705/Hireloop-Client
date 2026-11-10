"use client"

import Link from "next/link"
import { BriefcaseBusiness, Globe, MapPin, Wallet } from "lucide-react"

import { formatSalaryRange } from "@/lib/job-utils"
import type { Job } from "@/types/job"

import { BookmarkButton } from "./bookmark-button"

type JobCardProps = {
  job: Job
  onBookmark?: (job: Job) => void
}

export function JobCard({ job, onBookmark }: JobCardProps) {
  const salary = formatSalaryRange(job)

  return (
   <Link href={`/browse-jobs/${job._id}`}>
       <article className="flex gap-4 rounded-xl border border-white/[0.06] bg-[#131315] p-5 transition-colors hover:border-white/10 hover:bg-[#161618]">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1C1C20] text-sm font-semibold text-[#B3AEFF] ring-1 ring-white/10">
        {job.companyName?.charAt(0).toUpperCase() || "J"}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
           <h3 className="truncate text-base font-semibold text-white transition-colors hover:text-[#B3AEFF]">
  {job.jobTitle}
</h3>
            <p className="mt-1 truncate text-xs text-[#7C7F87]">
              {job.companyName}

              {job.location && (
                <>
                  <span className="px-1.5">•</span>
                  {job.location}
                </>
              )}

              {job.isRemote && (
                <span className="text-[#5FD99A]"> (Remote)</span>
              )}
            </p>
          </div>

          <BookmarkButton
            label={`Save ${job.jobTitle}`}
            onToggle={() => onBookmark?.(job)}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {salary && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-[#1A1A1D] px-2.5 py-1 text-[11px] text-[#A1A4AA]">
              <Wallet className="size-3 text-[#7C7F87]" />
              {salary}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-[#1A1A1D] px-2.5 py-1 text-[11px] text-[#A1A4AA]">
            <BriefcaseBusiness className="size-3 text-[#7C7F87]" />
            {job.jobType}
          </span>

          <span
            className={
              job.isRemote
                ? "inline-flex items-center gap-1.5 rounded-md border border-[#2FBF71]/20 bg-[#2FBF71]/10 px-2.5 py-1 text-[11px] text-[#5FD99A]"
                : "inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-[#1A1A1D] px-2.5 py-1 text-[11px] text-[#A1A4AA]"
            }
          >
            {job.isRemote ? (
              <Globe className="size-3" />
            ) : (
              <MapPin className="size-3" />
            )}
            {job.isRemote ? "Remote" : "On-site"}
          </span>
        </div>
      </div>
    </article>  
   </Link>
  )
}
