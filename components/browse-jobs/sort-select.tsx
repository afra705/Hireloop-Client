"use client"

import { useState, type ChangeEvent } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type SortOption = {
  value: string
  label: string
}

export const JOB_SORT_OPTIONS: SortOption[] = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary-desc", label: "Salary: High to Low" },
  { value: "salary-asc", label: "Salary: Low to High" },
]

type SortSelectProps = {
  options?: SortOption[]
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export function SortSelect({
  options = JOB_SORT_OPTIONS,
  defaultValue = "recent",
  onChange,
  className,
}: SortSelectProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)
    onChange?.(event.target.value)
  }

  return (
    <label
      className={cn(
        "flex items-center gap-2 text-xs text-[#7C7F87]",
        className
      )}
    >
      Sort by:
      <span className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="h-9 appearance-none rounded-lg border border-white/[0.08] bg-[#151517] pr-9 pl-3 text-xs text-[#D4D4D8] transition outline-none focus:border-[#5C53FE] focus:ring-1 focus:ring-[#5C53FE]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-[#7C7F87]"
        />
      </span>
    </label>
  )
}
