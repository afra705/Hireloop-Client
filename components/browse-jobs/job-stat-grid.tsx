import type { LucideIcon } from "lucide-react"

export type JobStat = {
  label: string
  value: string
  icon: LucideIcon
}

type JobStatGridProps = {
  stats: JobStat[]
}

export function JobStatGrid({ stats }: JobStatGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.06] bg-[#111113] p-4"
          >
            <div className="flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] text-[#7C7F87] uppercase">
              <Icon className="size-3.5" />
              {stat.label}
            </div>

            <p className="mt-2 truncate text-sm font-semibold text-white">
              {stat.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
