"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type PageItem = number | "ellipsis"

type JobPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  className?: string
}

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: PageItem[] = [1]
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) items.push("ellipsis")

  for (let page = start; page <= end; page += 1) {
    items.push(page)
  }

  if (end < totalPages - 1) items.push("ellipsis")

  items.push(totalPages)

  return items
}

export function JobPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: JobPaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageItems(currentPage, totalPages)

  return (
    <nav
      aria-label="Job results pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="flex size-8 items-center justify-center rounded-lg text-[#A1A4AA] transition-colors hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex size-8 items-center justify-center text-xs text-[#7C7F87]"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange?.(page)}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-xs transition-colors",
              page === currentPage
                ? "bg-white font-semibold text-[#0B0B0C]"
                : "text-[#A1A4AA] hover:bg-white/[0.06] hover:text-white"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="flex size-8 items-center justify-center rounded-lg text-[#A1A4AA] transition-colors hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
