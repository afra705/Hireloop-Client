import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type FormSectionProps = {
  step: number
  title: string
  className?: string
  children: ReactNode
}

export function FormSection({
  step,
  title,
  className,
  children,
}: FormSectionProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <h2 className="flex items-center gap-3 text-base font-semibold text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6554FF] text-xs">
          {step}
        </span>
        {title}
      </h2>

      {children}
    </section>
  )
}
