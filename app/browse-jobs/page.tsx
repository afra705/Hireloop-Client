
import type { Metadata } from "next"
import { SearchX } from "lucide-react"

import { Navbar } from "@/app/home/Navbar"
import { FilterPanel } from "@/components/browse-jobs/filter-panel"
import { JobCard } from "@/components/browse-jobs/job-card"
import { JobPagination } from "@/components/browse-jobs/job-pagination"
import { SearchBar } from "@/components/browse-jobs/search-bar"
import { SortSelect } from "@/components/browse-jobs/sort-select"
import { getJobs } from "@/lib/api/jobs"
import type { JobType } from "@/types/job"

const JOBS_PER_PAGE = 10

type SearchParams = Record<string, string | string[] | undefined>

export const metadata: Metadata = {
  title: "Browse Jobs | HireLoop",
  description:
    "Find your next role from curated job opportunities on HireLoop.",
}

function getParam(searchParams: SearchParams, key: string) {
  const value = searchParams[key]

  return Array.isArray(value) ? value[0] : value
}

function toQueryString(searchParams: SearchParams) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item && item !== "undefined" && item !== "null") {
          query.append(key, item)
        }
      })
    } else if (
      value &&
      value !== "undefined" &&
      value !== "null"
    ) {
      query.set(key, value)
    }
  }

  return query.toString()
}

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const search = await searchParams

  const queryString = toQueryString(search)

  console.log("Search Params:", search)
  console.log("Query String:", queryString)

  const jobs = await getJobs(queryString)

  const jobTypeCounts = jobs.reduce<Partial<Record<JobType, number>>>(
    (counts, job) => {
      counts[job.jobType] = (counts[job.jobType] ?? 0) + 1
      return counts
    },
    {}
  )

  const categoryCounts = jobs.reduce<Partial<Record<string, number>>>(
    (counts, job) => {
      counts[job.category] = (counts[job.category] ?? 0) + 1
      return counts
    },
    {}
  )

  const totalPages = Math.max(
    1,
    Math.ceil(jobs.length / JOBS_PER_PAGE)
  )

  const requestedPage = Number(getParam(search, "page")) || 1

  const currentPage = Math.min(
    Math.max(requestedPage, 1),
    totalPages
  )

  const visibleJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  )

  const initialQuery =
    getParam(search, "search") ??
    getParam(search, "q") ??
    ""

  const initialSort = getParam(search, "sort") ?? "recent"

  return (
    <div className="min-h-svh bg-[#0B0B0C] text-[#F4F4F5]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">

        <SearchBar defaultValue={initialQuery} />

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">

          <FilterPanel
            jobTypeCounts={jobTypeCounts}
            categoryCounts={categoryCounts}
          />

          <section aria-label="Job results">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

              <h1 className="text-base font-semibold text-white">
                Found {jobs.length.toLocaleString()} Professional Jobs
              </h1>

              <SortSelect defaultValue={initialSort} />

            </div>

            {visibleJobs.length > 0 ? (
              <ul className="space-y-4">
                {visibleJobs.map((job) => (
                  <li key={job._id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-[#111113] px-6 py-16 text-center">

                <SearchX className="mx-auto size-8 text-[#7C7F87]" />

                <h2 className="mt-3 text-sm font-semibold text-white">
                  No jobs found
                </h2>

                <p className="mt-1 text-xs text-[#7C7F87]">
                  Try adjusting your search or filters.
                </p>

              </div>
            )}

            <JobPagination
              className="mt-8"
              currentPage={currentPage}
              totalPages={totalPages}
            />

          </section>
        </div>
      </main>
    </div>
  )
}

export default BrowseJobsPage
