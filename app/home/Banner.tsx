import Image from "next/image"
import {
  BarChart3,
  Briefcase,
  Building2,
  Crosshair,
  Search,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const trendingTags = [
  "Trending Position",
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: BarChart3, value: "12K", label: "Companies" },
  { icon: Crosshair, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* Hero */}
      <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center px-4 pt-2 text-center sm:pt-3">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/25 sm:w-14" />
          <span className="flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] text-[#d8a06a] uppercase sm:text-[11px]">
            <Building2 className="size-3.5 text-[#e8b07a]" />
            <span>
              <span className="font-semibold text-[#f0b57f]">50,000+</span> New Jobs This
              Month
            </span>
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/25 sm:w-14" />
        </div>

        <h1 className="mt-4 text-[30px] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[32px] lg:text-[40px]">
          Find Your Dream Job Today
        </h1>

        <p className="mt-2 max-w-[420px] text-[13px] leading-[1.6] text-[#a3a3a3] text-balance">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <div className="mt-4 flex h-11 w-full max-w-[440px] items-center gap-1 rounded-xl border border-white/10 bg-[#151515] pr-1.5 pl-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
          <label className="flex min-w-0 flex-1 items-center gap-2.5">
            <Search className="size-4 shrink-0 text-[#8b8b8b]" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="h-full w-full min-w-0 bg-transparent text-[13px] text-white placeholder:text-[#8b8b8b] focus:outline-none"
            />
          </label>

          <span aria-hidden className="hidden h-5 w-px shrink-0 bg-white/10 sm:block" />

          <label className="hidden w-[36%] items-center gap-2 px-1 sm:flex">
            <Crosshair className="size-4 shrink-0 text-[#8b8b8b]" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="h-full w-full min-w-0 bg-transparent text-[13px] text-white placeholder:text-[#8b8b8b] focus:outline-none"
            />
          </label>

          <Button
            variant="brand"
            size="icon"
            aria-label="Search jobs"
            className="size-9 rounded-lg"
          >
            <Search className="size-4" />
          </Button>
        </div>

        {/* Trending */}
        <div className="mt-2.5 flex max-w-[500px] flex-wrap items-center justify-center gap-2">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-md border border-white/[0.08] bg-[#141414] px-2.5 py-1 text-[10.5px] text-[#b9b9b9] transition-colors hover:border-white/20 hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Globe + stats */}
      <div className="relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/globe.png"
            alt=""
            aria-hidden
            width={1440}
            height={1882}
            sizes="100vw"
            priority
            style={{ top: "calc(71px - 51.8vw)" }}
            className="absolute inset-x-0 h-auto w-full max-w-none select-none"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pt-[161px] pb-6">
          <p className="mx-auto max-w-[560px] text-center text-[22px] leading-snug text-balance text-[#e9e5f7] lg:text-[26px]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 lg:mt-10">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex h-[112px] flex-col justify-between rounded-xl border border-white/[0.09] bg-[#0b0a0d]/90 p-4 backdrop-blur-sm lg:h-40 lg:p-6"
              >
                <Icon className="size-4 text-[#a9a4b8] lg:size-[18px]" strokeWidth={1.6} />
                <div>
                  <p className="text-[30px] leading-none font-semibold tracking-tight text-white lg:text-[34px]">
                    {value}
                  </p>
                  <p className="mt-1.5 text-[11px] text-[#9c97a8] lg:mt-2 lg:text-[13px]">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
