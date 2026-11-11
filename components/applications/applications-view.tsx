"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BellIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  Code2Icon,
  DownloadIcon,
  FileTextIcon,
  InboxIcon,
  MailIcon,
  SearchIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react"

import { formatRelativeTime } from "@/lib/application-utils"
import { cn } from "@/lib/utils"
import type { JobApplication } from "@/types/application"

import { ApplicationStats } from "./application-stats"
import { ApplicationStatusBadge } from "./application-status-badge"

const PAGE_SIZE = 5

type ViewMode = "active" | "archived"

type ApplicationsViewProps = {
  applications: JobApplication[]
}

type CompanyMark = {
  icon: LucideIcon
  className: string
}

const COMPANY_MARKS: Record<string, CompanyMark> = {
  "Stark Industries": {
    icon: Code2Icon,
    className: "bg-[#1C1C20] text-[#E4E4E7]",
  },
  "Cyberdyne Systems": {
    icon: UserRoundIcon,
    className: "bg-[#1C1C20] text-[#E4E4E7]",
  },
  "Wayne Enterprises": {
    icon: FileTextIcon,
    className: "bg-[#1C1C20] text-[#A1A4AA]",
  },
  "Oscorp Tech": {
    icon: CloudIcon,
    className: "bg-[#E11D48] text-white",
  },
  "Hooli Corp": {
    icon: BriefcaseBusinessIcon,
    className: "bg-[#1C1C20] text-[#E4E4E7]",
  },
}

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 0) return []

  const count = Math.min(3, totalPages)
  const start = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages - count + 1, 1)
  )

  return Array.from({ length: count }, (_, index) => start + index)
}

function CompanyIcon({ companyName }: { companyName: string }) {
  const mark = COMPANY_MARKS[companyName]
  const Icon = mark?.icon ?? Building2Icon

  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ring-white/[0.04]",
        mark?.className ?? "bg-[#1C1C20] text-[#A1A4AA]"
      )}
    >
      <Icon className="size-[15px]" strokeWidth={1.8} />
    </span>
  )
}

export function ApplicationsView({ applications }: ApplicationsViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("active")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  const stats = useMemo(() => {
    const totalApplied = applications.length
    const shortlisted = applications.filter(
      (application) => application.status === "Shortlisted"
    ).length
    const interviews = applications.filter(
      (application) => application.status === "Interview"
    ).length
    const offers = applications.filter(
      (application) => application.status === "Offered"
    ).length

    return {
      totalApplied,
      shortlisted,
      interviews,
      successRate:
        totalApplied > 0 ? Math.floor((offers / totalApplied) * 100) : 0,
    }
  }, [applications])

  const filteredApplications = useMemo(() => {
    const term = query.trim().toLowerCase()

    return applications.filter((application) => {
      const isArchived = application.archived === true

      if (viewMode === "archived" ? !isArchived : isArchived) {
        return false
      }

      if (!term) return true

      return [
        application.jobTitle,
        application.companyName,
        application.category,
        application.location,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    })
  }, [applications, query, viewMode])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE)
  )
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const pageApplications = filteredApplications.slice(
    startIndex,
    startIndex + PAGE_SIZE
  )
  const pageNumbers = getPageNumbers(currentPage, totalPages)
  const rangeStart = filteredApplications.length === 0 ? 0 : startIndex + 1
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, filteredApplications.length)

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  const handleViewMode = (mode: ViewMode) => {
    setViewMode(mode)
    setPage(1)
  }

  return (
    <div className="min-h-svh bg-[#0B0B0C] text-[#F4F4F5]">
      <header className="flex h-16 items-center justify-between gap-4 border-b border-white/[0.06] px-5 sm:px-6 lg:px-7">
        <label className="relative w-full max-w-[255px]">
          <span className="sr-only">Search applications</span>

          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7C7F87]"
          />

          <input
            type="text"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search applications..."
            className="h-8 w-full rounded-md border border-white/[0.07] bg-[#121214] pr-3 pl-9 text-xs text-white transition outline-none placeholder:text-[#7C7F87] focus:border-[#5C53FE] focus:ring-1 focus:ring-[#5C53FE]"
          />
        </label>

        <div className="flex shrink-0 items-center gap-3.5">
          <button
            type="button"
            aria-label="Notifications"
            className="text-[#A1A4AA] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
          >
            <BellIcon className="size-[18px]" strokeWidth={1.7} />
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="text-[#A1A4AA] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
          >
            <MailIcon className="size-[18px]" strokeWidth={1.7} />
          </button>

          <Image
            src="/images/avatars/seeker.png"
            alt="Seeker profile"
            width={28}
            height={28}
            className="size-7 rounded-full object-cover ring-1 ring-white/10"
          />
        </div>
      </header>

      <div className="px-5 py-5 sm:px-6 lg:px-7">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl leading-7 font-semibold tracking-[-0.02em] text-white">
                My Applications
              </h1>

              <p className="mt-1.5 text-[13px] text-[#7C7F87]">
                Track your job applications and interview progress in real-time.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <div className="flex items-center rounded-md border border-white/[0.06] bg-[#111113] p-0.5">
                {(["active", "archived"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleViewMode(mode)}
                    aria-pressed={viewMode === mode}
                    className={cn(
                      "inline-flex h-7 items-center rounded-[4px] px-3 text-[11px] font-medium capitalize transition-colors focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none",
                      viewMode === mode
                        ? "bg-[#2A2A2E] text-[#F4F4F5]"
                        : "text-[#8B8E94] hover:text-[#F4F4F5]"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-[34px] items-center gap-2 rounded-md bg-[#F4F4F5] px-3.5 text-[11px] font-semibold text-[#0B0B0C] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#8F88FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C] focus-visible:outline-none"
              >
                <DownloadIcon className="size-3.5" />
                Export PDF
              </button>
            </div>
          </div>

          <ApplicationStats {...stats} />

          <section
            aria-label="Applications list"
            className="mt-5 overflow-hidden rounded-[10px] border border-white/[0.06] bg-[#111113]"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">
                  Job applications and their current status
                </caption>

                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th
                      scope="col"
                      className="w-[42%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                    >
                      Job Title
                    </th>

                    <th
                      scope="col"
                      className="w-[22%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                    >
                      Company
                    </th>

                    <th
                      scope="col"
                      className="w-[16%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                    >
                      Applied
                    </th>

                    <th
                      scope="col"
                      className="w-[12%] px-5 py-3 text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="w-[8%] px-5 py-3 text-right text-[11px] font-normal whitespace-nowrap text-[#7C7F87]"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pageApplications.length > 0 ? (
                    pageApplications.map((application) => (
                      <tr
                        key={application._id ?? application.jobId}
                        className="border-b border-white/[0.04] transition-colors last:border-b-0 hover:bg-white/[0.015]"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <CompanyIcon
                              companyName={application.companyName}
                            />

                            <div className="min-w-0">
                              <Link
                                href={`/browse-jobs/${application.jobId}`}
                                className="block truncate text-[13px] font-medium text-[#E9E9EA] transition-colors hover:text-[#B3AEFF]"
                              >
                                {application.jobTitle}
                              </Link>

                              <p className="mt-0.5 truncate text-[11px] text-[#7C7F87]">
                                {application.jobType}

                                <span aria-hidden className="px-1.5">
                                  •
                                </span>

                                {application.workMode}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3 text-[13px] whitespace-nowrap text-[#A1A4AA]">
                          {application.companyName}
                        </td>

                        <td
                          suppressHydrationWarning
                          className="px-5 py-3 text-[13px] whitespace-nowrap text-[#A1A4AA]"
                        >
                          {formatRelativeTime(application.appliedAt)}
                        </td>

                        <td className="px-5 py-3">
                          <ApplicationStatusBadge status={application.status} />
                        </td>

                        <td className="px-5 py-3 text-right">
                          <Link
                            href={`/browse-jobs/${application.jobId}`}
                            className="text-[11px] whitespace-nowrap text-[#A1A4AA] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-16 text-center">
                        <InboxIcon className="mx-auto size-8 text-[#7C7F87]" />

                        <h2 className="mt-3 text-sm font-semibold text-white">
                          No applications found
                        </h2>

                        <p className="mt-1 text-xs text-[#7C7F87]">
                          {viewMode === "archived"
                            ? "You don't have any archived applications yet."
                            : "Try a different search term."}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] px-5 py-3">
              <p className="text-[11px] text-[#7C7F87]">
                Showing{" "}
                <span className="text-[#A1A4AA]">
                  {rangeStart}-{rangeEnd}
                </span>{" "}
                of{" "}
                <span className="text-[#A1A4AA]">
                  {filteredApplications.length}
                </span>{" "}
                applications
              </p>

              {totalPages > 1 ? (
                <nav
                  aria-label="Applications pagination"
                  className="flex items-center gap-1"
                >
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={currentPage <= 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="flex size-7 items-center justify-center rounded-md text-[#A1A4AA] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeftIcon className="size-3.5" />
                  </button>

                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      aria-label={`Page ${pageNumber}`}
                      aria-current={
                        pageNumber === currentPage ? "page" : undefined
                      }
                      onClick={() => setPage(pageNumber)}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-md text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none",
                        pageNumber === currentPage
                          ? "bg-white font-semibold text-[#0B0B0C]"
                          : "text-[#A1A4AA] hover:bg-white/[0.06] hover:text-white"
                      )}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="flex size-7 items-center justify-center rounded-md text-[#A1A4AA] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronRightIcon className="size-3.5" />
                  </button>
                </nav>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
