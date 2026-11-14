import {
  BriefcaseBusinessIcon,
  ShieldCheckIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react"

import { ROLE_LABELS } from "@/lib/constants/users"
import { cn } from "@/lib/utils"
import type { Role } from "@/types/auth"
import type { UserStatus } from "@/types/user"

const ROLE_STYLES: Record<
  Role,
  { icon: LucideIcon; className: string }
> = {
  admin: {
    icon: ShieldCheckIcon,
    className: "border-[#F87171]/25 bg-[#F87171]/10 text-[#FCA5A5]",
  },
  recruiter: {
    icon: BriefcaseBusinessIcon,
    className: "border-[#8B5CF6]/25 bg-[#8B5CF6]/10 text-[#C4B5FD]",
  },
  seeker: {
    icon: UserRoundIcon,
    className: "border-white/[0.08] bg-white/[0.04] text-[#B4B7BD]",
  },
}

type UserRoleBadgeProps = {
  role: Role
  className?: string
}

export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  const { icon: Icon, className: roleClassName } = ROLE_STYLES[role]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[10px] leading-4 font-medium whitespace-nowrap",
        roleClassName,
        className
      )}
    >
      <Icon aria-hidden className="size-2.5" />
      {ROLE_LABELS[role]}
    </span>
  )
}

type UserStatusBadgeProps = {
  status: UserStatus
  className?: string
}

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const isActive = status === "Active"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[10px] leading-4 font-medium whitespace-nowrap",
        isActive
          ? "border-[#22C55E]/25 bg-[#22C55E]/[0.08] text-[#4ADE80]"
          : "border-[#EF4444]/25 bg-[#EF4444]/[0.08] text-[#F87171]",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1 rounded-full",
          isActive ? "bg-[#4ADE80]" : "bg-[#F87171]"
        )}
      />
      {status}
    </span>
  )
}
