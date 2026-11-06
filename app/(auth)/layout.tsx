import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative isolate min-h-svh overflow-hidden bg-[#070707] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-brand/15 blur-[150px]" />
        <div className="absolute -bottom-52 -left-40 h-[440px] w-[440px] rounded-full bg-[#d8a06a]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col">
        <header className="px-4 pt-4 sm:px-6 sm:pt-6">
          <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#101010]/80 px-5 backdrop-blur-md sm:px-8">
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

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to home</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center px-4 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        </main>

        <footer className="px-4 pb-6 sm:px-6">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-2 text-[11px] text-[#6f6f6f] sm:flex-row">
            <p>© 2026 HireLoop. All rights reserved.</p>
            <p>Built for people who take their next step seriously.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
