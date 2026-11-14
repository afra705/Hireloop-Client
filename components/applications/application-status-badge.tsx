import { cn } from "@/lib/utils"
import { getApplicationStatusClassName } from "@/lib/application-status"
import type { ApplicationStatus } from "@/types/application"

type ApplicationStatusBadgeProps = {
  status: ApplicationStatus
  className?: string
}

export function ApplicationStatusBadge({
  status,
  className,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-2.5 py-[3px] text-[10px] leading-4 font-medium whitespace-nowrap",
        getApplicationStatusClassName(status),
        className
      )}
    >
      {status}
    </span>
  )
}
