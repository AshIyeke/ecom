"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/supabase/queries/orders";

export async function initiatePayment(cartItems: any[], totalAmount: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. Create the Pending Order in Supabase
  const orderId = await createOrder(cartItems, totalAmount);

  // 2. Call Paystack API to initialize transaction
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: Math.round(totalAmount * 100), // Amount in kobo (NGN) or pesewas (GHS)
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
        metadata: {
          orderId: orderId, // Pass our DB Order ID to Paystack
        },
      }),
    },
  );

  const resData = await response.json();

  if (!resData.status) {
    throw new Error("Paystack initialization failed");
  }

  // 3. Update the order with the Paystack reference immediately
  await supabase
    .from("orders")
    .update({ paystack_id: resData.data.reference })
    .eq("id", orderId);

  // 4. Redirect user to Paystack's secure checkout page
  redirect(resData.data.authorization_url);
}
