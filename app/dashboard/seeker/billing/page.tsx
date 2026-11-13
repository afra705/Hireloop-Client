"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Download, Plus } from "lucide-react"

const billingHistory = [
  {
    date: "Sep 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    transaction: "TRX-948102-HL",
    status: "Paid",
  },
  {
    date: "Aug 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    transaction: "TRX-771920-HL",
    status: "Paid",
  },
  {
    date: "Jul 24, 2023",
    plan: "Professional Tier",
    amount: "$29.00",
    transaction: "TRX-331805-HL",
    status: "Paid",
  },
  {
    date: "Jun 24, 2023",
    plan: "Standard Tier",
    amount: "$12.00",
    transaction: "TRX-220199-HL",
    status: "Paid",
  },
]

const features = [
  "Unlimited Applications",
  "Premium Job Insights",
  "Priority Candidate Badge",
  "Direct Recruiter Messaging",
]

const BillingContent = () => {
  const searchParams = useSearchParams()
  const canceled = searchParams.get("canceled")

  useEffect(() => {
    if (canceled) {
      console.log(
        "Order canceled -- continue to shop around and check out when you're ready."
      )
    }
  }, [canceled])

  return (
    <div className="min-h-screen bg-[#0d0d10] text-white">
      <div className="flex min-h-screen">
        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {/* Page */}
          <div className="mx-auto max-w-[1200px] p-4 sm:p-5">
            {/* Heading */}
            <div className="mb-5">
              <h1 className="text-xl font-bold tracking-tight sm:text-[22px]">
                Subscription & Billing
              </h1>

              <p className="mt-1 text-[11px] text-gray-400">
                Manage your professional tier features, recurring payments, and
                billing history.
              </p>
            </div>

            {/* Subscription & Payment */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
              {/* Current Plan */}
              <section className="rounded-xl border border-white/[0.08] bg-[#151518] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-sm bg-white px-2 py-1 text-[8px] font-medium text-gray-700">
                      CURRENT PLAN
                    </span>

                    <h2 className="mt-3 text-sm font-semibold">
                      Professional Tier
                    </h2>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      $29
                      <span className="text-[11px] text-gray-400"> /mo</span>
                    </p>

                    <p className="mt-1 text-[9px] text-gray-500">
                      Next billing date: Oct 24, 2023
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[10px] text-gray-400">
                  Unlock global job insights and unlimited applications.
                </p>

                {/* Features */}
                <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#12c76a]">
                        <Check size={9} className="text-black" />
                      </span>

                      <span className="text-[10px] text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <form action="/api/checkout_sessions" method="POST">
                    <button
                      type="submit"
                      className="rounded-md bg-white px-3 py-2 text-[9px] font-medium text-black transition hover:bg-gray-200"
                    >
                      Upgrade Plan
                    </button>
                  </form>

                  <button className="rounded-md border border-white/10 px-3 py-2 text-[9px] text-gray-300 transition hover:bg-white/5">
                    Manage Plan
                  </button>
                </div>
              </section>

              {/* Payment Method */}
              <section className="rounded-xl border border-white/[0.08] bg-[#151518] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">Payment Method</h2>

                  <span className="rounded border border-white/10 px-2 py-1 text-[7px] tracking-wider text-gray-500">
                    SECURE BY STRIPE
                  </span>
                </div>

                {/* Credit Card */}
                <div className="relative mt-4 h-[100px] overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-[#210b3a] via-[#160c26] to-black p-4">
                  <div className="absolute -top-12 -right-8 h-36 w-36 rounded-full border-[15px] border-purple-700/50" />

                  <div className="absolute -top-8 -right-3 h-32 w-32 rounded-full border-[8px] border-fuchsia-600/30" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="h-5 w-7 rounded bg-gradient-to-br from-yellow-200 to-yellow-500" />

                    <span className="text-[9px] text-white italic">VISA</span>
                  </div>

                  <p className="relative z-10 mt-3 text-sm tracking-widest">
                    •••• •••• •••• 4242
                  </p>

                  <div className="relative z-10 mt-2 flex justify-between">
                    <div>
                      <p className="text-[6px] text-gray-400">CARD HOLDER</p>

                      <p className="mt-0.5 text-[8px]">ALEXANDER SEEKER</p>
                    </div>

                    <div>
                      <p className="text-[6px] text-gray-400">EXPIRES</p>

                      <p className="mt-0.5 text-[8px]">12/25</p>
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 text-[9px] text-gray-400 transition hover:text-white">
                  <Plus size={12} />
                  Add New Payment Method
                </button>
              </section>
            </div>

            {/* Billing History */}
            <section className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Billing History</h2>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-[9px] text-gray-400 transition hover:text-white"
                >
                  <Download size={13} />
                  Export PDF
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead className="bg-[#1b1b20]">
                    <tr className="text-[9px] text-gray-500">
                      <th className="px-3 py-3 font-medium">Date</th>

                      <th className="px-3 py-3 font-medium">Plan</th>

                      <th className="px-3 py-3 font-medium">Amount</th>

                      <th className="px-3 py-3 font-medium">Transaction ID</th>

                      <th className="px-3 py-3 text-right font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {billingHistory.map((item) => (
                      <tr
                        key={item.transaction}
                        className="border-t border-white/[0.06] text-[9px] text-gray-300 transition hover:bg-white/[0.02]"
                      >
                        <td className="px-3 py-4">{item.date}</td>

                        <td className="px-3 py-4">{item.plan}</td>

                        <td className="px-3 py-4">{item.amount}</td>

                        <td className="px-3 py-4 font-mono text-gray-500">
                          {item.transaction}
                        </td>

                        <td className="px-3 py-4 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-[8px] text-green-500">
                            <span className="h-1 w-1 rounded-full bg-green-500" />
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Support */}
            <section className="mt-4 flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#151518] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h2 className="text-sm font-semibold">
                  Need help with your invoice?
                </h2>

                <p className="mt-2 max-w-[390px] text-[9px] leading-relaxed text-gray-400">
                  Our support team is available 24/7 to help you resolve any
                  payment issues or clarify billing details.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button className="rounded-md border border-white/10 bg-[#202024] px-3 py-2 text-[9px] transition hover:bg-white/10">
                  Contact Support
                </button>

                <a
                  href="/refund-policy"
                  className="text-[9px] text-gray-400 transition hover:text-white"
                >
                  Read Refund Policy
                </a>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-4 text-[9px] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2023 HireLoop Inc. All rights reserved.</p>

              <div className="flex gap-5">
                <a href="/terms" className="hover:text-white">
                  Terms of Service
                </a>

                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}

const BillingPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d10]" />}>
      <BillingContent />
    </Suspense>
  )
}

export default BillingPage
