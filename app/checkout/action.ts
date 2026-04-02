'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function initiatePayment(cartItems: any[], totalAmount: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // 1. Create the Pending Order in Supabase
  // We use the 'create_order_with_items' RPC function we wrote in Step 12
  const { data: orderId, error: dbError } = await supabase.rpc('create_order_with_items', {
    p_user_id: user.id,
    p_total_amount: totalAmount,
    p_items: cartItems
  })

  if (dbError) throw new Error("Database error: " + dbError.message)

  // 2. Call Paystack API to initialize transaction
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      amount: Math.round(totalAmount * 100), // Amount in kobo (NGN) or pesewas (GHS)
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/verify`,
      metadata: {
        orderId: orderId, // Pass our DB Order ID to Paystack
      },
    }),
  })

  const resData = await response.json()

  if (!resData.status) {
    throw new Error('Paystack initialization failed')
  }

  // 3. Redirect user to Paystack's secure checkout page
  redirect(resData.data.authorization_url)
}