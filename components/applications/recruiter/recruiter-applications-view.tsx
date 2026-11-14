"use client"

import { useMemo, useState } from "react"
import { InboxIcon, InfoIcon } from "lucide-react"
import { toast } from "sonner"

import {
  formatApplicationDate,
  formatRelativeTime,
  getInitials,
} from "@/lib/application-utils"
import type { ApplicationStatus, JobApplicant } from "@/types/application"

import { ApplicantStats } from "./applicant-stats"
import { ApplicantStatusSelect } from "./applicant-status-select"
import { updatedApplicationStatus } from "@/lib/actions/applications"

type RecruiterApplicationsViewProps = {
  initialApplicants: JobApplicant[]
  jobTitle: string
}

export function RecruiterApplicationsView({
  initialApplicants,
  jobTitle,
}: RecruiterApplicationsViewProps) {
  const [applicants, setApplicants] = useState(initialApplicants)

  const sortedApplicants = useMemo(
    () =>
      [...applicants].sort(
        (a, b) =>
          new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      ),
    [applicants]
  )

  const handleStatusChange = async (
  applicantId: string,
  status: ApplicationStatus
) => {
  const applicant = applicants.find(
    (item) => item.id === applicantId
  )

  if (!applicant) return

  try {
    const result = await updatedApplicationStatus(
      applicantId,
      { status }
    )

    console.log("Update:", result)

    setApplicants((previous) =>
      previous.map((item) =>
        item.id === applicantId
          ? { ...item, status }
          : item
      )
    )

    toast.success(`Status updated to ${status}`, {
      description: `${applicant.name} — status updated.`,
    })
  } catch (error) {
    console.error("Status update failed:", error)
    toast.error("Failed to update application status")
  }
}

  return (
    <div className="space-y-4">
      <ApplicantStats applicants={applicants} />

      <div
        role="status"
        className="flex items-start gap-2 rounded-[10px] border border-[#F5A623]/20 bg-[#F5A623]/[0.06] px-3.5 py-2.5 text-[11px] leading-5 text-[#E8AE48]"
      >
        <InfoIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />

        <p>
          Status changes are kept in the browser for now and reset on refresh.
          Database persistence is coming soon.
        </p>
      </div>

      <section
        aria-label={`Applicants for ${jobTitle}`}
        className="overflow-hidden rounded-[10px] border border-white/[0.06] bg-[#111113]"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">
              Applicants for {jobTitle} and their current status
            </caption>

            <thead>
              <tr className="border-b border-white/[0.05]">
                <th
                  scope="col"
                  className="w-[38%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                >
                  Applicant
                </th>

                <th
                  scope="col"
                  className="w-[20%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                >
                  Applied
                </th>

                <th
                  scope="col"
                  className="w-[22%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                >
                  Application
                </th>

                <th
                  scope="col"
                  className="w-[20%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedApplicants.length > 0 ? (
                sortedApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-b border-white/[0.04] transition-colors last:border-b-0 hover:bg-white/[0.015]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5C53FE]/15 text-[11px] font-semibold text-[#B3AEFF] ring-1 ring-white/10"
                        >
                          {getInitials(applicant.name) || "?"}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium text-[#E9E9EA]">
                            {applicant.name}
                          </p>

                          <a
                            href={`mailto:${applicant.email}`}
                            className="mt-0.5 block truncate text-[11px] text-[#7C7F87] transition-colors hover:text-[#B3AEFF]"
                          >
                            {applicant.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <p className="text-[12px] whitespace-nowrap text-[#D4D4D8]">
                        {formatApplicationDate(applicant.appliedAt)}
                      </p>

                      <p
                        suppressHydrationWarning
                        className="mt-0.5 text-[11px] whitespace-nowrap text-[#7C7F87]"
                      >
                        {formatRelativeTime(applicant.appliedAt)}
                      </p>
                    </td>

                    <td className="px-5 py-3.5">
                      <p className="text-[12px] whitespace-nowrap text-[#D4D4D8]">
                        {applicant.jobType}
                      </p>

                      <p className="mt-0.5 text-[11px] whitespace-nowrap text-[#7C7F87]">
                        {applicant.workMode}
                      </p>
                    </td>

                    <td className="px-5 py-3.5">
                      <ApplicantStatusSelect
                        applicantName={applicant.name}
                        value={applicant.status}
                        onChange={(status) =>
                          handleStatusChange(applicant.id, status)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <InboxIcon className="mx-auto size-8 text-[#7C7F87]" />

                    <h2 className="mt-3 text-sm font-semibold text-white">
                      No applicants yet
                    </h2>

                    <p className="mt-1 text-xs text-[#7C7F87]">
                      Applications for this job will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] px-5 py-3">
          <p className="text-[11px] text-[#7C7F87]">
            Showing{" "}
            <span className="text-[#A1A4AA]">{sortedApplicants.length}</span>{" "}
            applicant{sortedApplicants.length === 1 ? "" : "s"}
          </p>

          <p className="text-[11px] text-[#7C7F87]">
            Changes are not saved to the database yet
          </p>
        </div>
      </section>
    </div>
  )
}
