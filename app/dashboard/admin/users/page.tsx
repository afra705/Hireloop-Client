import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { UserManagementView } from "@/components/dashboard/users/user-management-view"

import { getSession } from "@/lib/core/server"
import {
  countNewSignups,
  getUserStatus,
  normalizeRole,
  toIsoDate,
} from "@/lib/user-utils"
import type { AdminUserRow } from "@/types/user"
import { getAdminUsers  } from "@/lib/api/users"

export const metadata: Metadata = {
  title: "User Management | HireLoop",
  description:
    "Review, filter, and manage platform access for all users.",
}

const DASHBOARD_BY_ROLE = {
  recruiter: "/dashboard/recruiter",
  seeker: "/dashboard/seeker",
} as const

const AdminUsersPage = async () => {
  const session = await getSession()

  if (!session) {
    redirect(
      `/sign-in?redirectTo=${encodeURIComponent("/dashboard/admin/users")}`
    )
  }

  if (session.user.role !== "admin") {
    redirect(
      session.user.role === "recruiter"
        ? DASHBOARD_BY_ROLE.recruiter
        : DASHBOARD_BY_ROLE.seeker
    )
  }

  const users  = await getAdminUsers ()

  const rows: AdminUserRow[] = users.map((user) => ({
    id: user._id,
    name: user.name || "Unnamed user",
    email: user.email,
    role: normalizeRole(user.role),
    image: user.image ?? null,
    createdAt: toIsoDate(user.createdAt),
    status: getUserStatus(user.banned),
  }))

  return (
    <UserManagementView
      initialUsers={rows}
      newSignups24h={countNewSignups(rows)}
    />
  )
}

export default AdminUsersPage
