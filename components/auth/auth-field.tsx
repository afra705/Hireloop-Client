import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const authFieldClassName =
  "h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white shadow-none placeholder:text-white/25 focus-visible:border-brand/60 focus-visible:ring-3 focus-visible:ring-brand/20"

type AuthFieldProps = {
  label: ReactNode
  htmlFor: string
  hint?: ReactNode
  className?: string
  children: ReactNode
}

export function AuthField({
  label,
  htmlFor,
  hint,
  className,
  children,
}: AuthFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={htmlFor}
        className="text-[13px] font-medium text-[#d4d4d4]"
      >
        {label}
      </Label>

      {children}

      {hint ? <p className="text-[11px] text-[#7d7d7d]">{hint}</p> : null}
    </div>
  )
}
