'use server'

import { createClient } from "@/lib/supabase/server";

export async function getOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const role = user.app_metadata?.user_role;

  let query = supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .order("created_at", { ascending: false });

  // If not admin, only show user's orders
  if (role !== "admin") {
    query = query.eq("user_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return data || [];
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const role = user.app_metadata?.role;

  const query = supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq("id", orderId)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  // Security check: If not admin, ensure the order belongs to the user
  if (role !== "admin" && data.user_id !== user.id) {
    throw new Error("Unauthorized to view this order");
  }

  return data;
}

export async function createOrder(cartItems: any[], totalAmount: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: orderId, error: dbError } = await supabase.rpc("create_order_with_items", {
    p_user_id: user.id,
    p_total_amount: totalAmount,
    p_items: cartItems,
  });

  if (dbError) throw new Error(`Database error: ${dbError.message}`);
  return orderId;
}
