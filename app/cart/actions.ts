'use server'

import { revalidatePath } from 'next/cache'
import { addToCart } from '@/lib/supabase/queries/cart'

export async function addToCartAction(productId: string, quantity: number = 1) {
  try {
    await addToCart(productId, quantity);
    revalidatePath('/cart')
    return { success: true }
  } catch (error: any) {
    console.error("Error in addToCartAction:", error);
    return { error: error.message || 'Failed to add item to cart' };
  }
}