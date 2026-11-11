"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoaderCircle } from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { AuthField, authFieldClassName } from "@/components/auth/auth-field"
import { FormAlert } from "@/components/auth/form-alert"
import { PasswordInput } from "@/app/(auth)/_components/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth-client"

export function SignInForm({ success }: { success?: string }) {
  const router = useRouter()
  const [rememberMe, setRememberMe] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/'
  console.log(redirectTo);
  

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
        callbackURL: redirectTo
      })

      if (result.error) {
        setError(
          result.error.message ?? "We couldn't sign you in. Please try again."
        )
        return
      }

      router.push(redirectTo)
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
    <AuthCard
      title="Sign in to HireLoop"
      description="Welcome back. Enter your details to continue."
      shieldText="Secure sign-in. Your data stays private."
      footerPrompt="New to HireLoop?"
      footerLinkText="Create an account"
      footerLinkHref="/sign-up"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {success ? <FormAlert variant="success">{success}</FormAlert> : null}
        {error ? <FormAlert>{error}</FormAlert> : null}

        <AuthField label="Email address" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className={authFieldClassName}
          />
        </AuthField>

        <AuthField label="Password" htmlFor="password">
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className={authFieldClassName}
          />
        </AuthField>

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
    </AuthCard>
  )
}
