import type { Metadata } from "next"

import { AuthShowcase } from "@/app/(auth)/_components/auth-showcase"
import { SignInForm } from "@/app/(auth)/_components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
  description:
    "Sign in to HireLoop to track applications, revisit saved roles, and find your next opportunity.",
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string | string[] }>
}) {
  const { success } = await searchParams

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <AuthShowcase variant="sign-in" />

      <div className="mx-auto w-full max-w-[460px]">
        <SignInForm
          success={typeof success === "string" ? success : undefined}
        />
      </div>
    </div>
  )
}
