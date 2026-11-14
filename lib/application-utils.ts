/** Format an application timestamp as e.g. "14 Nov 2026". */
export function formatApplicationDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/** Build avatar initials from a person's name. */
export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

export function formatRelativeTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return ""

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`
  }

  const weeks = Math.floor(days / 7)
  if (weeks < 5) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`
  }

  const years = Math.floor(days / 365)
  return `${years} year${years === 1 ? "" : "s"} ago`
}
