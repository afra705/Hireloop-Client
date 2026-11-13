
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  BriefcaseBusiness,
  Sparkles,
} from 'lucide-react'
import { checkoutVerify } from '@/lib/actions/payments'

export default async function BillingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id')
  }
    
  const session = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: ['line_items', 'payment_intent'],
    }
  )

  if (session.status === 'open') {
    redirect('/dashboard/seeker/billing')
  }

  if (session.status !== 'complete' || session.payment_status !== 'paid') {
    redirect('/dashboard/seeker/billing')
  }

  const paymentIntent = session.payment_intent

  const transactionId =
    typeof paymentIntent === 'string'
      ? paymentIntent
      : paymentIntent?.id || session.id

  const amount = session.amount_total
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: session.currency || 'usd',
      }).format(session.amount_total / 100)
    : 'N/A'
 
  const result = await checkoutVerify(session_id)

  console.log(result);
  
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090D] px-4 py-12">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative w-full max-w-xl">

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111318] shadow-2xl shadow-black/40">

          {/* Header */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
              <CheckCircle2
                className="h-12 w-12 text-emerald-400"
                strokeWidth={1.7}
              />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              Payment Successful
            </span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Congratulations!
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Your payment has been successfully processed.
              Welcome to your next career journey with HireLoop!
            </p>

          </div>

          {/* Amount Card */}
          <div className="mx-6 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/15 to-indigo-500/5 px-5 py-7 text-center sm:mx-10">

            <p className="text-sm font-medium text-gray-400">
              Amount Paid
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {amount}
            </h2>

            <p className="mt-2 text-xs text-emerald-400">
              Payment completed successfully
            </p>

          </div>

          {/* Transaction Details */}
          <div className="px-6 py-8 sm:px-10">

            <h3 className="mb-6 text-sm font-bold text-white">
              Transaction Details
            </h3>

            <div className="space-y-5">

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-400">
                    Transaction ID
                  </span>
                </div>

                <span className="max-w-[180px] break-all text-right text-xs font-medium text-gray-300">
                  {transactionId}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400">
                  Email
                </span>

                <span className="max-w-[190px] break-all text-right text-sm font-medium text-gray-300">
                  {session.customer_email || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400">
                  Payment Status
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Paid
                </span>
              </div>

            </div>

            <div className="my-7 border-t border-dashed border-white/10" />

            {/* Actions */}
            <Link
              href="/dashboard/seeker"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard/seeker/billing"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/[0.07]"
            >
              View Billing Details
            </Link>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <p className="text-xs text-gray-500">
              Secure payment powered by Stripe
            </p>
          </div>

        </div>

        {/* Branding */}
        <div className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500">
          <BriefcaseBusiness className="h-4 w-4" />
          HireLoop
        </div>

      </div>
    </main>
  )
}
