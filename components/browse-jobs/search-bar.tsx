"use client"

import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type SearchBarProps = {
  defaultValue?: string
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchBar({
  defaultValue = "",
  placeholder = "Search by job title, keywords...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)

  const router = useRouter()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch?.(query.trim())

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    const search = data.searchField as string
    const params = new URLSearchParams()
    params.set("search", search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#111113] p-3 sm:flex-row sm:items-center"
    >
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search jobs</span>

        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#7C7F87]"
        />

        <input
          type="text"
          value={query}
          name="searchField"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-white/[0.06] bg-[#1A1A1D] pr-4 pl-11 text-sm text-white transition outline-none placeholder:text-[#7C7F87] focus:border-[#5C53FE] focus:ring-1 focus:ring-[#5C53FE]"
        />
      </label>

      <Button
        type="submit"
        className="h-11 w-full shrink-0 rounded-lg bg-white px-6 text-sm font-semibold text-[#0B0B0C] hover:bg-white/90 sm:w-auto"
      >
        Search Jobs
      </Button>
    </form>
  )
}
