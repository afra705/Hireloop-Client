import type { Metadata } from "next"

import { AuthShowcase } from "@/app/(auth)/_components/auth-showcase"
import { SignUpForm } from "@/app/(auth)/_components/sign-up-form"

export const metadata: Metadata = {
  title: "Create an account | HireLoop",
  description:
    "Join HireLoop to build a free profile, get discovered by hiring teams, and apply to curated roles.",
}

export default function SignUpPage() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <AuthShowcase variant="sign-up" />

      <div className="mx-auto w-full max-w-[460px]">
        <SignUpForm />
      </div>
    </div>
  )
}
