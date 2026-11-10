"use client"

import { Button } from "@/components/ui/button"

import { BookmarkButton } from "./bookmark-button"

type JobActionsProps = {
  jobTitle: string
  onApply?: () => void
  onBookmark?: () => void
}

export function JobActions({ jobTitle, onApply, onBookmark }: JobActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <BookmarkButton
        label={`Save ${jobTitle}`}
        onToggle={onBookmark}
        className="size-10 rounded-lg border border-white/[0.08] bg-[#1A1A1D]"
      />

      <Button
        type="button"
        onClick={() => onApply?.()}
        className="h-10 rounded-lg bg-white px-5 text-sm font-semibold text-[#0B0B0C] hover:bg-white/90"
      >
        Apply Now
      </Button>
    </div>
  )
}
