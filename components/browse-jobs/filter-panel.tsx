"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/jobs"
import { cn } from "@/lib/utils"
import type { JobType } from "@/types/job"
import { useRouter } from "next/navigation"

export type JobFilters = {
  jobTypes: JobType[]
  categories: string[]
  remoteOnly: boolean
}

export const INITIAL_JOB_FILTERS: JobFilters = {
  jobTypes: [],
  categories: [],
  remoteOnly: false,
}

type FilterOption = {
  value: string
  label: string
  count?: number
}

type FilterGroupProps = {
  name: string
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onToggle: (value: string) => void
}

type FilterPanelProps = {
  defaultValue?: JobFilters
  jobTypeCounts?: Partial<Record<JobType, number>>
  categoryCounts?: Partial<Record<string, number>>
  onChange?: (filters: JobFilters) => void
}

function formatCount(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count)
}

function FilterGroup({
  title,
  name,
  options,
  selectedValues,
  onToggle,
}: FilterGroupProps) {
  const router = useRouter()

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(name, e?.target.value)

    const params = new URLSearchParams(window.location.search)
    params.set(name, e.target.value)
    router.push(`/browse-jobs?${params.toString()}`)
  }
  return (
    <fieldset className="border-b border-white/[0.06] pb-5 last:border-b-0 last:pb-0">
      <legend className="text-xs font-semibold text-white">{title}</legend>

      <div className="mt-3 space-y-1">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)

          return (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3 py-1"
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => {
                  onToggle(option.value)
                  handleCheckBox(e)
                }}
                className="peer sr-only"
              />

              <span
                aria-hidden
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#5C53FE] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#111113]",
                  isSelected
                    ? "border-white bg-white text-[#0B0B0C]"
                    : "border-white/15 text-transparent group-hover:border-white/30"
                )}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>

              <span
                className={cn(
                  "min-w-0 flex-1 truncate text-xs transition-colors",
                  isSelected
                    ? "text-white"
                    : "text-[#A1A4AA] group-hover:text-white"
                )}
              >
                {option.label}
              </span>

              {option.count !== undefined && (
                <span className="text-[11px] text-[#7C7F87] tabular-nums">
                  {formatCount(option.count)}
                </span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function FilterPanel({
  defaultValue = INITIAL_JOB_FILTERS,
  jobTypeCounts,
  categoryCounts,
  onChange,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<JobFilters>(defaultValue)

  const updateFilters = (nextFilters: JobFilters) => {
    setFilters(nextFilters)
    onChange?.(nextFilters)
  }

  const toggleJobType = (value: string) => {
    const jobType = value as JobType
    const isSelected = filters.jobTypes.includes(jobType)

    updateFilters({
      ...filters,
      jobTypes: isSelected
        ? filters.jobTypes.filter((type) => type !== jobType)
        : [...filters.jobTypes, jobType],
    })
  }

  const toggleCategory = (value: string) => {
    const isSelected = filters.categories.includes(value)

    updateFilters({
      ...filters,
      categories: isSelected
        ? filters.categories.filter((category) => category !== value)
        : [...filters.categories, value],
    })
  }

  const toggleRemoteOnly = () => {
    updateFilters({ ...filters, remoteOnly: !filters.remoteOnly })
  }

  return (
    <aside
      aria-label="Job filters"
      className="h-fit rounded-xl border border-white/[0.06] bg-[#111113] p-5 lg:sticky lg:top-6"
    >
      <h2 className="text-base font-semibold text-white">Filters</h2>

      <div className="mt-5 space-y-5">
        <FilterGroup
          title="Job Type"
          name="jobType"
          options={JOB_TYPES.map((type) => ({
            value: type,
            label: type,
            count: jobTypeCounts?.[type],
          }))}
          selectedValues={filters.jobTypes}
          onToggle={toggleJobType}
        />

        <FilterGroup
          title="Work Mode"
          name="isRemote"
          options={[{ value: "true", label: "Remote only" }]}
          selectedValues={filters.remoteOnly ? ["true"] : []}
          onToggle={toggleRemoteOnly}
        />

        <FilterGroup
          title="Category"
          name="category"
          options={JOB_CATEGORIES.map((category) => ({
            value: category,
            label: category,
            count: categoryCounts?.[category],
          }))}
          selectedValues={filters.categories}
          onToggle={toggleCategory}
        />
      </div>
    </aside>
  )
}
