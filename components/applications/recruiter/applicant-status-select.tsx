"use client"

import { ChevronDownIcon } from "lucide-react"

import {
  getApplicationStatusClassName,
  RECRUITER_APPLICATION_STATUSES,
} from "@/lib/application-status"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types/application"

const RECRUITER_STATUSES = new Set<string>(RECRUITER_APPLICATION_STATUSES)

type ApplicantStatusSelectProps = {
  applicantName: string
  value: ApplicationStatus
  onChange: (status: ApplicationStatus) => void
  className?: string
}

/**
 * Status picker for an application row.
 *
 * Keeps `Withdrawn` visible if it is already the current value, so the select
 * never renders with an unknown option.
 */
export function ApplicantStatusSelect({
  applicantName,
  value,
  onChange,
  className,
}: ApplicantStatusSelectProps) {
  const options: ApplicationStatus[] = RECRUITER_STATUSES.has(value)
    ? [...RECRUITER_APPLICATION_STATUSES]
    : [value, ...RECRUITER_APPLICATION_STATUSES]

  return (
    <div className={cn("relative inline-flex", className)}>
      <select
        aria-label={`Application status for ${applicantName}`}
        value={value}
        onChange={(event) =>
          onChange(event.target.value as ApplicationStatus)
        }
        className={cn(
          "h-7 w-full cursor-pointer appearance-none rounded-full border pr-7 pl-3 text-[11px] leading-none font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 [&>option]:bg-[#1A1A1D] [&>option]:text-[#F4F4F5]",
          getApplicationStatusClassName(value)
        )}
      >
        {options.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 opacity-70"
      />
    </div>
  )
}
