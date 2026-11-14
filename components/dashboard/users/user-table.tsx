import { UsersIcon } from "lucide-react"

import { formatJoinDate } from "@/lib/user-utils"
import type { Role } from "@/types/auth"
import type { AdminUserRow } from "@/types/user"

import { UserAvatar } from "./user-avatar"
import { UserRoleBadge, UserStatusBadge } from "./user-badges"
import { UserRoleActions } from "./user-role-actions"

type UserTableProps = {
  users: AdminUserRow[]
  totalUsers: number
  emptyMessage: string
  onChangeRole: (userId: string, role: Role) => void
  onToggleStatus: (userId: string) => void
  onDelete: (userId: string) => void
}

export function UserTable({
  users,
  totalUsers,
  emptyMessage,
  onChangeRole,
  onToggleStatus,
  onDelete,
}: UserTableProps) {
  return (
    <section className="overflow-hidden rounded-[10px] border border-white/[0.06] bg-[#111113]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-left">
          <caption className="sr-only">
            Platform users with their role, join date, status, and actions
          </caption>

          <thead>
            <tr className="border-b border-white/[0.05]">
              <th
                scope="col"
                className="w-[22%] px-5 py-3 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase"
              >
                User Name
              </th>

              <th
                scope="col"
                className="w-[22%] px-5 py-3 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase"
              >
                Email Address
              </th>

              <th
                scope="col"
                className="w-[11%] px-5 py-3 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase"
              >
                Role
              </th>

              <th
                scope="col"
                className="w-[13%] px-5 py-3 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase"
              >
                Join Date
              </th>

              <th
                scope="col"
                className="w-[12%] px-5 py-3 text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase"
              >
                Status
              </th>

              <th
                scope="col"
                className="w-[20%] px-5 py-3 text-right text-[10px] font-medium tracking-[0.06em] whitespace-nowrap text-[#7C7F87] uppercase"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/[0.04] transition-colors last:border-b-0 hover:bg-white/[0.015]"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} image={user.image} />

                      <p className="truncate text-[13px] font-medium text-[#E9E9EA]">
                        {user.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-3">
                    <a
                      href={`mailto:${user.email}`}
                      className="block truncate text-[12px] text-[#A1A4AA] transition-colors hover:text-[#B3AEFF]"
                    >
                      {user.email}
                    </a>
                  </td>

                  <td className="px-5 py-3">
                    <UserRoleBadge role={user.role} />
                  </td>

                  <td className="px-5 py-3 text-[12px] whitespace-nowrap text-[#A1A4AA]">
                    {formatJoinDate(user.createdAt)}
                  </td>

                  <td className="px-5 py-3">
                    <UserStatusBadge status={user.status} />
                  </td>

                  <td className="px-5 py-3">
                    <UserRoleActions
                      user={user}
                      onChangeRole={onChangeRole}
                      onToggleStatus={onToggleStatus}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <UsersIcon className="mx-auto size-8 text-[#7C7F87]" />

                  <h2 className="mt-3 text-sm font-semibold text-white">
                    No users found
                  </h2>

                  <p className="mt-1 text-xs text-[#7C7F87]">{emptyMessage}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] px-5 py-3">
        <p className="text-[11px] text-[#7C7F87]">
          Showing <span className="text-[#A1A4AA]">{users.length}</span> of{" "}
          <span className="text-[#A1A4AA]">{totalUsers}</span> users
        </p>

        <p className="text-[11px] text-[#7C7F87]">
          Role and status changes are UI-only for now
        </p>
      </div>
    </section>
  )
}
