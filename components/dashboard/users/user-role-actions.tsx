import { ROLE_LABELS, USER_ROLES } from "@/lib/constants/users"
import { cn } from "@/lib/utils"
import type { Role } from "@/types/auth"
import type { AdminUserRow } from "@/types/user"

const ROLE_ACTION_STYLES: Record<Role, string> = {
  admin: "text-[#FCA5A5] hover:text-[#FECACA]",
  recruiter: "text-[#C4B5FD] hover:text-[#DDD6FE]",
  seeker: "text-[#A1A4AA] hover:text-white",
}

const actionButtonClassName =
  "rounded px-0.5 py-1 text-[10px] font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"

type UserRoleActionsProps = {
  user: AdminUserRow
  onChangeRole: (userId: string, role: Role) => void
  onToggleStatus: (userId: string) => void
  onDelete: (userId: string) => void
}

export function UserRoleActions({
  user,
  onChangeRole,
  onToggleStatus,
  onDelete,
}: UserRoleActionsProps) {
  const isActive = user.status === "Active"

  return (
    <div className="flex items-center justify-end gap-2.5">
      {USER_ROLES.filter((role) => role !== user.role).map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChangeRole(user.id, role)}
          aria-label={`Make ${user.name} a ${ROLE_LABELS[role]}`}
          className={cn(
            actionButtonClassName,
            ROLE_ACTION_STYLES[role]
          )}
        >
          Make {ROLE_LABELS[role]}
        </button>
      ))}

      <span aria-hidden className="h-3 w-px bg-white/[0.08]" />

      <button
        type="button"
        onClick={() => onToggleStatus(user.id)}
        aria-label={`${isActive ? "Suspend" : "Activate"} ${user.name}`}
        className={cn(
          actionButtonClassName,
          isActive
            ? "text-[#F87171] hover:text-[#FCA5A5]"
            : "text-[#4ADE80] hover:text-[#86EFAC]"
        )}
      >
        {isActive ? "Suspend" : "Activate"}
      </button>

      {!isActive && (
        <button
          type="button"
          onClick={() => onDelete(user.id)}
          aria-label={`Delete ${user.name}`}
          className={cn(
            actionButtonClassName,
            "text-[#7C7F87] hover:text-[#F87171]"
          )}
        >
          Delete
        </button>
      )}
    </div>
  )
}
