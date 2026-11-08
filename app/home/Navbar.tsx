"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: `/dashboard/${session?.user.role}` },
]
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in")
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex h-20 w-full max-w-[1320px] items-center justify-between gap-4 rounded-xl bg-[#242424] px-6 sm:px-8">

        {/* Logo */}
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

          {/* Navigation Links */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-8 md:flex lg:gap-10"
          >
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

          <span
            aria-hidden
            className="hidden h-5 w-px bg-white/15 md:block"
          />

          {/* Conditional Authentication Buttons */}
          <div className="flex items-center gap-5 sm:gap-7">

            {isPending ? null : session?.user ? (
              <>
                {/* Logged In User Name */}
                <span className="text-sm font-medium whitespace-nowrap text-white">
                  {session.user.name}
                </span>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  href="/sign-in"
                  className="text-sm font-medium whitespace-nowrap text-brand-muted transition-colors hover:text-white"
                >
                  Sign In
                </Link>

                {/* Get Started */}
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    variant: "brand",
                    className:
                      "h-12 rounded-xl px-4 text-sm font-medium sm:px-7",
                  })}
                >
                  Get Started
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  )
}
