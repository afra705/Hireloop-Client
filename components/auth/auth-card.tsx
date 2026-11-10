import type { ReactNode } from "react"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

type AuthCardProps = {
  title: string
  description: string
  shieldText: string
  footerPrompt: string
  footerLinkText: string
  footerLinkHref: string
  children: ReactNode
}

export function AuthCard({
  title,
  description,
  shieldText,
  footerPrompt,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthCardProps) {
  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c0c]/95 p-6 shadow-[0_32px_120px_-40px_rgba(0,0,0,1)] backdrop-blur-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1.5 text-sm text-[#9a9a9a]">{description}</p>
      </div>

      {children}

      <div className="mt-5 flex items-center gap-2 text-[11px] text-[#7d7d7d]">
        <ShieldCheck className="size-3.5 shrink-0" />
        {shieldText}
      </div>

      <p className="mt-6 border-t border-white/[0.07] pt-5 text-center text-sm text-[#9a9a9a]">
        {footerPrompt}{" "}
        <Link
          href={footerLinkHref}
          className="font-medium text-white transition-colors hover:text-brand-muted"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  )
}
