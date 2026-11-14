import type { ApplicationStatus } from "@/types/application"

/**
 * Statuses a recruiter can move an application through.
 *
 * `Withdrawn` is intentionally excluded — it is a seeker-initiated action.
 */
export const RECRUITER_APPLICATION_STATUSES = [
  "Applied",
  "Review",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
] as const satisfies readonly ApplicationStatus[]

/** Shared colour treatment for application status badges and selects. */
export const APPLICATION_STATUS_STYLES: Record<ApplicationStatus, string> = {
  Applied: "border-white/[0.08] bg-white/[0.04] text-[#B4B7BD]",
  Review: "border-[#F5A623]/25 bg-[#F5A623]/[0.08] text-[#E8AE48]",
  Shortlisted: "border-[#3B82F6]/25 bg-[#3B82F6]/[0.08] text-[#6BA6F8]",
  Interview: "border-[#8B5CF6]/25 bg-[#8B5CF6]/[0.08] text-[#B49AF8]",
  Offered: "border-[#22C55E]/25 bg-[#22C55E]/[0.08] text-[#4ADE80]",
  Rejected: "border-[#EF4444]/25 bg-[#EF4444]/[0.08] text-[#F87171]",
  Withdrawn: "border-white/[0.08] bg-white/[0.03] text-[#7C7F87]",
}

export function getApplicationStatusClassName(status: ApplicationStatus) {
  return APPLICATION_STATUS_STYLES[status] ?? APPLICATION_STATUS_STYLES.Applied
}
