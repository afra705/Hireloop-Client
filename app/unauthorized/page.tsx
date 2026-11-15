
"use client"

import { LockKeyhole, ArrowLeft, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

const Unauthorized = () => {
  const router = useRouter()

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#050505] px-4 py-16 text-white">

      {/* Background Effects */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 shadow-lg shadow-red-500/5">
          <LockKeyhole className="h-11 w-11 text-red-400" />
        </div>

        {/* Error Code */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
          Error 403
        </p>

        {/* Heading */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Access Denied
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          Sorry! You don&apos;t have permission to access this page.
          Please contact the administrator if you believe this is a mistake.
        </p>

        {/* Notice */}
        <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-400">
          <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
          <span>This page is restricted to authorized users.</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200 hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>

      </div>
    </div>
  )
}

export default Unauthorized
