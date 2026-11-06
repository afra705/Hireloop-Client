import { Check, Quote } from "lucide-react"

type ShowcaseVariant = "sign-in" | "sign-up"

const content = {
  "sign-in": {
    badge: "Welcome back",
    title: (
      <>
        Pick up where <span className="text-[#d8a06a]">you left off.</span>
      </>
    ),
    description:
      "Sign in to track your applications, revisit saved roles, and get matched with opportunities that fit the career you're building.",
    stats: [
      { value: "50K+", label: "Active roles" },
      { value: "12K+", label: "Hiring teams" },
      { value: "2M+", label: "Job seekers" },
    ],
    quote:
      "HireLoop made my job search feel less like guesswork and more like a clear next step.",
    author: "Maya Chen",
    role: "Product Designer at Northwind",
    initials: "MC",
  },
  "sign-up": {
    badge: "Join 2M+ job seekers",
    title: (
      <>
        Your next chapter <span className="text-[#d8a06a]">starts here.</span>
      </>
    ),
    description:
      "Create a free profile, get discovered by hiring teams, and apply to roles curated around your skills and ambitions.",
    points: [
      "Curated roles from companies that are actually hiring",
      "One profile that keeps your applications in sync",
      "Insights on salary, culture, and growth potential",
    ],
    quote:
      "I set up my profile on a Sunday and had three interviews by Friday.",
    author: "Alex Rivera",
    role: "Frontend Engineer at Lumen",
    initials: "AR",
  },
} satisfies Record<ShowcaseVariant, Record<string, unknown>>

export function AuthShowcase({ variant }: { variant: ShowcaseVariant }) {
  const data = content[variant]
  const hasStats = "stats" in data

  return (
    <section className="hidden max-w-[520px] lg:block">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-[#c7c7c7] uppercase">
        <span className="size-1.5 rounded-full bg-[#d8a06a]" />
        {data.badge}
      </span>

      <h1 className="mt-5 text-[40px] leading-[1.08] font-semibold tracking-tight text-balance xl:text-[46px]">
        {data.title}
      </h1>

      <p className="mt-4 max-w-[440px] text-sm leading-relaxed text-[#9a9a9a]">
        {data.description}
      </p>

      {hasStats ? (
        <dl className="mt-8 grid grid-cols-3 gap-3">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5"
            >
              <dt className="text-[11px] text-[#8f8f8f]">{stat.label}</dt>
              <dd className="mt-1 text-xl font-semibold tracking-tight text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <ul className="mt-8 space-y-3">
          {data.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm text-[#c7c7c7]"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-[#d8a06a]/25 bg-[#d8a06a]/10">
                <Check className="size-3 text-[#e0ad7c]" strokeWidth={2.4} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      )}

      <figure className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
        <Quote className="size-5 text-[#d8a06a]" />
        <blockquote className="mt-3 text-sm leading-relaxed text-[#d6d6d6]">
          &ldquo;{data.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#d8a06a] text-[11px] font-semibold text-white">
            {data.initials}
          </span>
          <span>
            <span className="block text-xs font-medium text-white">
              {data.author}
            </span>
            <span className="block text-[11px] text-[#8f8f8f]">
              {data.role}
            </span>
          </span>
        </figcaption>
      </figure>
    </section>
  )
}
