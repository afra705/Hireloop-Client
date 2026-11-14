import { cn } from "@/lib/utils"
import type { JobApplicant } from "@/types/application"

type ApplicantStatsProps = {
  applicants: JobApplicant[]
}

export function ApplicantStats({ applicants }: ApplicantStatsProps) {
  const stats = [
    {
      label: "Total applicants",
      value: applicants.length,
      className: "text-[#F4F4F5]",
    },
    {
      label: "In review",
      value: applicants.filter((applicant) => applicant.status === "Review")
        .length,
      className: "text-[#E8AE48]",
    },
    {
      label: "Shortlisted",
      value: applicants.filter(
        (applicant) => applicant.status === "Shortlisted"
      ).length,
      className: "text-[#6BA6F8]",
    },
    {
      label: "Interviewing",
      value: applicants.filter(
        (applicant) => applicant.status === "Interview"
      ).length,
      className: "text-[#B49AF8]",
    },
    {
      label: "Offered",
      value: applicants.filter((applicant) => applicant.status === "Offered")
        .length,
      className: "text-[#4ADE80]",
    },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] border border-white/[0.06] bg-[#111113] px-4 py-4"
        >
          <dt className="text-[11px] font-medium text-[#8B8E94]">
            {stat.label}
          </dt>

          <dd
            className={cn(
              "mt-2 text-2xl leading-none font-semibold tracking-[-0.02em] tabular-nums",
              stat.className
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
