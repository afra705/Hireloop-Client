"use client"

import { useMemo, useState } from "react"
import {
  BellIcon,
  ChevronDownIcon,
  CircleHelpIcon,
  DownloadIcon,
  SearchIcon,
} from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/dashboard/page-header"
import {
  ROLE_FILTER_OPTIONS,
  ROLE_LABELS,
  type RoleFilter,
} from "@/lib/constants/users"
import { formatJoinDate } from "@/lib/user-utils"
import type { Role } from "@/types/auth"
import type { AdminUserRow } from "@/types/user"

import { UserStats } from "./user-stats"
import { UserTable } from "./user-table"
import { updateUserRole } from "@/lib/actions/users"

type UserManagementViewProps = {
  initialUsers: AdminUserRow[]
  newSignups24h: number
}

export function UserManagementView({
  initialUsers,
  newSignups24h,
}: UserManagementViewProps) {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")

  const filteredUsers = useMemo(() => {
    const term = query.trim().toLowerCase()

    return users.filter((user) => {
      const matchesRole =
        roleFilter === "all" || user.role === roleFilter
      const matchesQuery =
        term.length === 0 || user.email.toLowerCase().includes(term)

      return matchesRole && matchesQuery
    })
  }, [users, query, roleFilter])

  const hasActiveFilters = query.trim().length > 0 || roleFilter !== "all"

  // role change
  const handleRoleChange = async(userId: string, role: Role) => {

    const res = await updateUserRole(userId, role)
    console.log('res after update', res);
    

    const target = users.find((user) => user.id === userId)

    setUsers((previous) =>
      previous.map((user) =>
        user.id === userId ? { ...user, role } : user
      )
    )
  
    toast.success(`Role updated to ${ROLE_LABELS[role]}`, {
      description: `${target?.name ?? "User"} — UI only. Role persistence is not connected yet.`,
    })
  }

  const handleToggleStatus = (userId: string) => {
    const target = users.find((user) => user.id === userId)

    if (!target) return

    const nextStatus =
      target.status === "Active" ? "Suspended" : "Active"

    setUsers((previous) =>
      previous.map((user) =>
        user.id === userId ? { ...user, status: nextStatus } : user
      )
    )

    toast.success(
      `${target.name} is now ${nextStatus.toLowerCase()}`,
      {
        description:
          "UI only — status persistence is not connected yet.",
      }
    )
  }

  const handleDelete = (userId: string) => {
    const target = users.find((user) => user.id === userId)

    toast.info("Delete is not implemented yet", {
      description: target
        ? `${target.name} was not removed.`
        : undefined,
    })
  }

  const handleExport = () => {
    if (filteredUsers.length === 0) {
      toast.info("There are no users to export.")
      return
    }

    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      ROLE_LABELS[user.role],
      formatJoinDate(user.createdAt),
      user.status,
    ])

    const csv = [
      ["Name", "Email", "Role", "Join Date", "Status"],
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "hireloop-users.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success("User list exported")
  }

  return (
    <div className="min-h-svh bg-[#0B0B0C] px-4 py-6 text-[#F4F4F5] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <label className="relative w-full max-w-[320px]">
            <span className="sr-only">Search users by email</span>

            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7C7F87]"
            />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by email..."
              className="h-9 w-full rounded-lg border border-white/[0.07] bg-[#111113] pr-3 pl-9 text-xs text-white transition outline-none placeholder:text-[#7C7F87] focus:border-[#5C53FE] focus:ring-1 focus:ring-[#5C53FE]"
            />
          </label>

          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="text-[#A1A4AA] transition-colors hover:text-white"
            >
              <BellIcon className="size-[18px]" strokeWidth={1.7} />
            </span>

            <span
              aria-hidden
              className="text-[#A1A4AA] transition-colors hover:text-white"
            >
              <CircleHelpIcon className="size-[18px]" strokeWidth={1.7} />
            </span>

            <a
              href="#user-table"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#141416] px-3 text-[11px] font-medium text-[#D4D4D8] transition-colors hover:border-white/[0.14] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
            >
              Manage Roles
              <ChevronDownIcon aria-hidden className="size-3" />
            </a>
          </div>
        </div>

        <PageHeader
          className="mt-6 mb-5"
          title="User Management"
          description="Review, filter, and manage platform access for all users."
          action={
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <select
                  aria-label="Filter users by role"
                  value={roleFilter}
                  onChange={(event) =>
                    setRoleFilter(event.target.value as RoleFilter)
                  }
                  className="h-9 cursor-pointer appearance-none rounded-lg border border-white/[0.08] bg-[#141416] pr-8 pl-3 text-[11px] font-medium text-[#D4D4D8] outline-none transition-colors hover:border-white/[0.14] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 [&>option]:bg-[#1A1A1D] [&>option]:text-[#F4F4F5]"
                >
                  {ROLE_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDownIcon
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-2.5 size-3 -translate-y-1/2 text-[#7C7F87]"
                />
              </div>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#F4F4F5] px-3.5 text-[11px] font-semibold text-[#0B0B0C] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#8F88FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C] focus-visible:outline-none"
              >
                <DownloadIcon aria-hidden className="size-3.5" />
                Export List
              </button>
            </div>
          }
        />

        <UserStats users={users} newSignups={newSignups24h} />

        <div id="user-table" className="mt-5">
          <UserTable
            users={filteredUsers}
            totalUsers={users.length}
            emptyMessage={
              hasActiveFilters
                ? "Try a different search term or role filter."
                : "No users have signed up yet."
            }
            onChangeRole={handleRoleChange}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
