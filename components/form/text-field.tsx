import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

export const textFieldClassName =
  "w-full min-w-0 rounded-xl border border-[#29292D] bg-[#18181B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#6554FF] focus:ring-1 focus:ring-[#6554FF]"

type TextFieldProps = ComponentProps<"input"> & {
  icon?: ReactNode
}

export function TextField({ icon, className, ...props }: TextFieldProps) {
  const input = (
    <input
      className={cn(textFieldClassName, icon ? "pl-11" : undefined, className)}
      {...props}
    />
  )

  if (!icon) {
    return input
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-4 flex -translate-y-1/2 text-gray-500 [&_svg]:size-4">
        {icon}
      </span>

      {input}
    </div>
  )
}

type TextAreaFieldProps = ComponentProps<"textarea">

export function TextAreaField({ className, ...props }: TextAreaFieldProps) {
  return (
    <textarea
      className={cn(textFieldClassName, "resize-y", className)}
      {...props}
    />
  )
}

type SelectFieldProps = ComponentProps<"select">

export function SelectField({ className, ...props }: SelectFieldProps) {
  return <select className={cn(textFieldClassName, className)} {...props} />
}
