import type { ReactNode } from "react"

type FormAlertProps = {
  variant?: "error" | "success"
  children: ReactNode
}

export function FormAlert({ variant = "error", children }: FormAlertProps) {
  if (variant === "success") {
    return (
      <div className="rounded-xl border border-green-500/25 bg-green-500/10 px-3.5 py-3 text-sm text-green-300">
        {children}
      </div>
    )
  }

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-3 text-[13px] leading-relaxed text-red-200"
    >
      {children}
    </div>
  )
}
