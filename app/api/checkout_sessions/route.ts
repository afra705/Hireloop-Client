
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { getSession } from '@/lib/core/server'

export async function POST() {

  const userSession = await getSession()

  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    if (!origin) {
      return NextResponse.json(
        { error: 'Origin not found' },
        { status: 400 }
      )
    }

    // Get Price ID from environment variable
    const priceId = process.env.STRIPE_PRICE_ID

    if (!priceId) {
      throw new Error('STRIPE_PRICE_ID is missing')
    }

    // Create Checkout Session
    
const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price: priceId,
      quantity: 1,
    },
  ],
  mode: 'subscription',
  customer_email: userSession?.user.email,
  success_url: `${origin}/dashboard/seeker/billing/success?session_id={CHECKOUT_SESSION_ID}`,

  cancel_url: `${origin}/dashboard/seeker/billing`,
})


    return NextResponse.redirect(session.url!, 303)

  } catch (err) {
    const error = err instanceof Error
      ? err
      : new Error(String(err))

    console.error('Stripe Checkout Error:', error.message)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
