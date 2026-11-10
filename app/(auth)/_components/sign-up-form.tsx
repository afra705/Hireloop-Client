"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BriefcaseBusiness,
  LoaderCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { AuthField, authFieldClassName } from "@/components/auth/auth-field"
import { FormAlert } from "@/components/auth/form-alert"
import { PasswordInput } from "@/app/(auth)/_components/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { Role } from "@/types/auth"

const roles = [
  {
    value: "seeker",
    label: "Job seeker",
    description: "Find roles and track your applications.",
    icon: UserRound,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Post jobs and discover great talent.",
    icon: BriefcaseBusiness,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the HireLoop platform.",
    icon: ShieldCheck,
  },
] as const

export function SignUpForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)
  const [role, setRole] = React.useState<Role>("seeker")

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    if (password.length < 8) {
      setError("Your password must be at least 8 characters long.")
      setPending(false)
      return
    }

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        role,
        // callbackURL: "/sign-in",
      })

      if (result.error) {
        setError(
          result.error.message ??
            "We couldn't create your account. Please try again."
        )
        return
      }

      router.push(
        "/sign-in?success=Account created successfully! Please sign in."
      )
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
      title="Create your account"
      description="Start applying to your next role in minutes."
      shieldText="Free to join. No credit card required."
      footerPrompt="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/sign-in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? <FormAlert>{error}</FormAlert> : null}

        <fieldset className="space-y-2">
          <legend className="text-[13px] font-medium text-[#d4d4d4]">
            I&apos;m joining as
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((option) => {
              const Icon = option.icon
              const isSelected = role === option.value

              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors focus-within:ring-3 focus-within:ring-brand/20",
                    isSelected
                      ? "border-brand/60 bg-brand/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-[#9a9a9a] hover:border-white/20 hover:text-white"
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => setRole(option.value)}
                    className="sr-only"
                  />
                  <Icon
                    className={cn(
                      "size-4",
                      isSelected ? "text-brand-muted" : "text-[#8b8b8b]"
                    )}
                  />
                  <span className="text-xs font-medium">{option.label}</span>
                </label>
              )
            })}
          </div>
          <p className="text-[11px] text-[#7d7d7d]">
            {roles.find((option) => option.value === role)?.description}
          </p>
        </fieldset>

        <AuthField label="Full name" htmlFor="name">
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            required
            className={authFieldClassName}
          />
        </AuthField>

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

        <AuthField
          label="Password"
          htmlFor="password"
          hint="Use at least 8 characters."
        >
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            required
            minLength={8}
            className={authFieldClassName}
          />
        </AuthField>

        <Button
          type="submit"
          variant="brand"
          disabled={pending}
          className="h-11 w-full rounded-xl text-sm font-medium"
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  )
}
