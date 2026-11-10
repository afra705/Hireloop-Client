import { cn } from "@/lib/utils"
import type { JobStatus } from "@/types/job"

type StatusBadgeProps = {
  status: JobStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
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
