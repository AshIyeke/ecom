'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addToCartAction(productId: string, quantity: number = 1) {
  const supabase = await createClient()
  
  // 1. Get User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Please login to add items' }

  // 2. Get User's Cart ID
  const { data: cart } = await supabase.from('carts').select('id').eq('user_id', user.id).single()

  // 3. Upsert item into cart_items
  const { error } = await supabase
    .from('cart_items')
    .upsert(
      { cart_id: cart?.id, product_id: productId, quantity },
      { onConflict: 'cart_id,product_id' }
    )

  if (error) {
    console.log("Error in addToCartAction in cart/actions.ts:", error);
    return { error: error.message };
  }
  
  revalidatePath('/cart')
  return { success: true }
}