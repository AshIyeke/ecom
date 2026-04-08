"use server";

import { createClient } from "@/lib/supabase/server";
import { createOrder } from "@/lib/supabase/queries/orders";

export async function initiatePayment(
  cartItems: any[], 
  totalAmount: number, 
  shippingAddress: any,
  billingAddress: any
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // 1. Create the Pending Order in Supabase
    const orderId = await createOrder(cartItems, totalAmount, shippingAddress);

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
          amount: Math.round(totalAmount * 100), // Amount in kobo/pesewas
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
          metadata: {
            orderId: orderId,
            shippingAddress,
            billingAddress,
          },
        }),
      },
    );

    const resData = await response.json();

    if (!resData.status) {
      console.error("Paystack Error:", resData);
      return { error: `Payment initialization failed: ${resData.message || "Unknown error"}` };
    }

    // 3. Update the order with the Paystack reference immediately
    const { error: updateError } = await supabase
      .from("orders")
      .update({ paystack_id: resData.data.reference })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order with paystack_id:", updateError);
      // We don't necessarily want to fail here if the payment was initialized, 
      // but it's good to know.
    }

    // 4. Return the authorization URL instead of redirecting directly
    // This avoids catching the redirect error in the client-side try/catch
    return { url: resData.data.authorization_url };
  } catch (error: any) {
    console.error("[initiatePayment] Unexpected Error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}
