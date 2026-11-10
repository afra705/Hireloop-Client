import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type FormFieldProps = {
  label: ReactNode
  htmlFor?: string
  required?: boolean
  hint?: ReactNode
  className?: string
  labelClassName?: string
  children: ReactNode
}

export function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  className,
  labelClassName,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          "mb-2 block text-sm font-medium text-gray-300",
          labelClassName
        )}
      >
        {label}
        {required ? <span className="text-red-400"> *</span> : null}
      </label>

      {children}

      {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
    </div>
  )
}
