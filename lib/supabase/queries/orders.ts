"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getOrders(isAdmin = false) {
  const startTime = Date.now();
  try {
    const supabase = isAdmin ? supabaseAdmin : await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && !isAdmin) return [];

    let query = supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (*)
        )
      `,
      )
      .order("created_at", { ascending: false });

    // If not admin, only show user's orders
    if (!isAdmin && user) {
      query = query.eq("user_id", user.id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching orders:", error);
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }

    console.log(
      `[getOrders] Fetched ${data?.length} orders in ${Date.now() - startTime}ms (isAdmin: ${isAdmin})`,
    );

    return data || [];
  } catch (error: any) {
    console.error("[getOrders] Error:", error.message);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}

export async function getOrderById(orderId: string, isAdmin = false) {
  const startTime = Date.now();
  try {
    const supabase = isAdmin ? supabaseAdmin : await createClient();
    
    // First, get the basic order info and items
    const { data: order, error: orderError } = await supabase
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

    if (orderError) {
      console.error(`[getOrderById] Order Error for ${orderId}:`, orderError.message);
      throw orderError;
    }

    if (!order) return null;

    // Security check: If not admin, ensure the order belongs to the user
    if (!isAdmin) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || order.user_id !== user.id) {
        throw new Error("Unauthorized to view this order");
      }
    }

    // Try to get profile info
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", order.user_id)
      .single();
    
    order.profiles = profile;

    // If admin and no profile found, try fetching from auth
    if (isAdmin && !profile) {
      const { data: { user: authUser }, error: authError } = await supabaseAdmin.auth.admin.getUserById(order.user_id);
      if (!authError && authUser) {
        order.profiles = {
          id: authUser.id,
          email: authUser.email,
          full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
          username: authUser.user_metadata?.username || authUser.email?.split('@')[0],
        };
      }
    }

    console.log(`[getOrderById] Fetched order ${orderId} in ${Date.now() - startTime}ms (isAdmin: ${isAdmin})`);
    
    return order;
  } catch (error: any) {
    console.error("[getOrderById] Error:", error.message);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const role = user.app_metadata?.role || user.app_metadata?.user_role;

    if (role !== "admin") {
      throw new Error("Unauthorized: Admin privileges required");
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error(`[updateOrderStatus] DB Error for ${orderId}:`, error.message);
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("[updateOrderStatus] Error:", error.message);
    throw new Error(error.message || "Failed to update order status");
  }
}
export async function createOrder(cartItems: any[], totalAmount: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: orderId, error: dbError } = await supabase.rpc(
    "create_order_with_items",
    {
      p_user_id: user.id,
      p_total_amount: totalAmount,
      p_items: cartItems,
    },
  );

  if (dbError) throw new Error(`Database error: ${dbError.message}`);
  return orderId;
}
