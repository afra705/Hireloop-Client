import { cn } from "@/lib/utils"
import type { AdminUserRow } from "@/types/user"

type UserStatsProps = {
  users: AdminUserRow[]
  newSignups: number
}

export function UserStats({ users, newSignups }: UserStatsProps) {
  const total = users.length
  const active = users.filter((user) => user.status === "Active").length
  const recruiters = users.filter((user) => user.role === "recruiter").length
  const suspended = users.filter((user) => user.status === "Suspended").length

  const suspendedShare =
    total > 0 ? ((suspended / total) * 100).toFixed(1) : "0.0"

  const stats = [
    {
      label: "Total Active Users",
      value: active,
      note: `${total} total account${total === 1 ? "" : "s"}`,
      noteClassName: "text-[#4ADE80]",
    },
    {
      label: "Recruiter Growth",
      value: recruiters,
      note: "High demand",
      noteClassName: "text-[#4ADE80]",
    },
    {
      label: "Suspended Accounts",
      value: suspended,
      note: `${suspendedShare}% of total`,
      noteClassName: "text-[#7C7F87]",
    },
    {
      label: "New Signups (24h)",
      value: newSignups,
      note: "Steady activity",
      noteClassName: "text-[#E8AE48]",
    },
  ]

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] border border-white/[0.06] bg-[#111113] p-5"
        >
          <dt className="text-xs font-medium text-[#8B8E94]">
            {stat.label}
          </dt>

          <dd className="mt-3.5 text-[28px] leading-none font-semibold tracking-[-0.02em] text-[#F4F4F5] tabular-nums">
            {stat.value.toLocaleString("en-US")}
          </dd>

          <p className={cn("mt-2 text-[11px] font-medium", stat.noteClassName)}>
            {stat.note}
          </p>
        </div>
      ))}
    </dl>
  )
}
