"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoaderCircle, ShieldCheck } from "lucide-react"

import { PasswordInput } from "@/app/(auth)/_components/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client"

const fieldClassName =
  "h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white shadow-none placeholder:text-white/25 focus-visible:border-brand/60 focus-visible:ring-3 focus-visible:ring-brand/20"

export function SignInForm({ success }: { success?: string }) {
  const router = useRouter()
  const [rememberMe, setRememberMe] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    try {
      const result = await signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/",
      })

      if (result.error) {
        setError(
          result.error.message ?? "We couldn't sign you in. Please try again."
        )
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError(
        "Something went wrong. Please check your connection and try again."
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c0c]/95 p-6 shadow-[0_32px_120px_-40px_rgba(0,0,0,1)] backdrop-blur-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Sign in to HireLoop
        </h2>
        <p className="mt-1.5 text-sm text-[#9a9a9a]">
          Welcome back. Enter your details to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {success ? (
          <div className="rounded-xl border border-green-500/25 bg-green-500/10 px-3.5 py-3 text-sm text-green-300">
            {success}
          </div>
        ) : null}
        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-3 text-[13px] leading-relaxed text-red-200"
          >
            {error}
          </div>
        ) : null}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[13px] font-medium text-[#d4d4d4]"
          >
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[13px] font-medium text-[#d4d4d4]"
          >
            Password
          </Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className={fieldClassName}
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-[13px] text-[#a3a3a3] select-none">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="size-4 rounded border-white/20 bg-white/5 accent-[#5b5bf6]"
          />
          Keep me signed in
        </label>

        <Button
          type="submit"
          variant="brand"
          disabled={pending}
          className="h-11 w-full rounded-xl text-sm font-medium"
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-5 flex items-center gap-2 text-[11px] text-[#7d7d7d]">
        <ShieldCheck className="size-3.5 shrink-0" />
        Secure sign-in. Your data stays private.
      </div>

      <p className="mt-6 border-t border-white/[0.07] pt-5 text-center text-sm text-[#9a9a9a]">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-white transition-colors hover:text-brand-muted"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
