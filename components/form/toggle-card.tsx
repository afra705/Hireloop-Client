import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ToggleCardProps = {
  checked: boolean
  onChange: () => void
  title: string
  description: string
  icon: ReactNode
}

export function ToggleCard({
  checked,
  onChange,
  title,
  description,
  icon,
}: ToggleCardProps) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4 rounded-xl border border-[#29292D] bg-[#18181B] p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#242428] text-gray-400 [&_svg]:size-5">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-[#6554FF]" : "bg-gray-600"
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition",
            checked ? "left-6" : "left-1"
          )}
        />
      </button>
    </div>
  )
}
