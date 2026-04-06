'use server'

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

export async function addToCart(productId: string, quantity: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // 1. Get or create cart
  let { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!cart) {
    const { data: newCart, error: cartError } = await supabase
      .from("carts")
      .insert({ user_id: user.id })
      .select()
      .single();
    
    if (cartError) throw new Error(`Failed to create cart: ${cartError.message}`);
    cart = newCart;
  }

  if (!cart) throw new Error("Cart not found or created");

  // 2. Check if item exists
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // 3. Update quantity
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to update cart: ${error.message}`);
    return data;
  } else {
    // 4. Insert new item
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cart.id,
        product_id: productId,
        quantity,
      })
      .select()
      .single();
    
    if (error) throw new Error(`Failed to add to cart: ${error.message}`);
    return data;
  }
}

export async function removeFromCart(itemId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);
  
  if (error) throw new Error(`Failed to remove from cart: ${error.message}`);
}

export async function updateCartQuantity(itemId: string, quantity: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update cart quantity: ${error.message}`);
  return data;
}
