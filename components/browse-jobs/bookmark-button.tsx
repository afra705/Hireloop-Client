"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"

import { cn } from "@/lib/utils"

type BookmarkButtonProps = {
  label: string
  className?: string
  onToggle?: () => void
}

export function BookmarkButton({
  label,
  className,
  onToggle,
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false)

  const handleToggle = () => {
    setIsSaved((previous) => !previous)
    onToggle?.()
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isSaved}
      onClick={handleToggle}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#7C7F87] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE] focus-visible:outline-none",
        isSaved && "text-white",
        className
      )}
    >
      <Bookmark className={cn("size-4", isSaved && "fill-current")} />
    </button>
  )
}
