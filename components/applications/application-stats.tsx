import { cn } from "@/lib/utils"

type ApplicationStatsProps = {
  totalApplied: number
  shortlisted: number
  interviews: number
  successRate: number
}

export function ApplicationStats({
  totalApplied,
  shortlisted,
  interviews,
  successRate,
}: ApplicationStatsProps) {
  const stats = [
    {
      label: "Total Applied",
      value: totalApplied,
      className: "text-[#F4F4F5]",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      className: "text-[#F4F4F5]",
    },
    {
      label: "Interviews",
      value: interviews,
      className: "text-[#FFC107]",
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      className: "text-[#2FBF71]",
    },
  ]

  return (
    <dl className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] border border-white/[0.06] bg-[#111113] p-5"
        >
          <dt className="text-xs font-medium text-[#8B8E94]">{stat.label}</dt>

          <dd
            className={cn(
              "mt-3.5 text-[28px] leading-none font-semibold tracking-[-0.02em] tabular-nums",
              stat.className
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
