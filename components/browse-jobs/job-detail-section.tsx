import type { ReactNode } from "react"

type JobDetailSectionProps = {
  title: string
  children: ReactNode
}

export function JobDetailSection({ title, children }: JobDetailSectionProps) {
  return (
    <section className="py-6 first:pt-0 last:pb-0">
      <h2 className="text-base font-semibold text-white sm:text-lg">{title}</h2>

      <div className="mt-4 text-sm leading-6 text-[#A1A4AA]">{children}</div>
    </section>
  )
}
