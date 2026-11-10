import type { Job } from "@/types/job"

type SalaryFields = Pick<Job, "minSalary" | "maxSalary">

function formatAmount(value: string) {
  const amount = value?.trim()

  if (!amount) return ""

  const number = Number(amount)

  return Number.isFinite(number) ? number.toLocaleString("en-US") : amount
}

export function formatSalaryRange({ minSalary, maxSalary }: SalaryFields) {
  const min = formatAmount(minSalary)
  const max = formatAmount(maxSalary)

  if (!min && !max) return null
  if (min && max) return `$${min} - $${max}`

  return `$${min || max}`
}

export function formatJobDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return ""

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function toBulletPoints(value: string) {
  return value
    .split(/[\r\n•]+/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
}
