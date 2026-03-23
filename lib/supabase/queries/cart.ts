import { createClient } from "@/lib/supabase/server";

export async function getUserCart() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: cart, error } = await supabase
    .from("carts")
    .select(`
      id,
      user_id,
      cart_items (
        id,
        quantity,
        product_id,
        products (*)
      )
    `)
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") { // Ignore if cart not found
    throw new Error(`Failed to fetch cart: ${error.message}`);
  }
  
  return cart;
}

export async function getCartId(userId: string) {
  const supabase = await createClient();
  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .single();
  
  return cart?.id;
}
