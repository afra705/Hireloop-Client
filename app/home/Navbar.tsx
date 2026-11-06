import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex h-20 w-full max-w-[1320px] items-center justify-between gap-4 rounded-xl bg-[#242424] px-6 sm:px-8">
        <Link href="/" aria-label="hireloop home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="hireloop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="flex items-center gap-7 lg:gap-9">
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#e6e6e6] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span aria-hidden className="hidden h-5 w-px bg-white/15 md:block" />

          <div className="flex items-center gap-5 sm:gap-7">
            <Link
              href="/sign-in"
              className="text-sm font-medium whitespace-nowrap text-brand-muted transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Button variant="brand" className="h-12 rounded-xl px-4 text-sm font-medium sm:px-7">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
