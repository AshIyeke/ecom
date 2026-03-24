import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { createClient } from '@/lib/supabase/client'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      queryFn: async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { data: null }

        const { data, error } = await supabase
          .from('carts')
          .select(`
            id,
            cart_items (
              id,
              quantity,
              product_id,
              products (*)
            )
          `)
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.log("Error fetching cart in cartApi:", error)
          return { error }
        }
        return { data }
      },
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<any, { productId: string; quantity: number }>({
      queryFn: async ({ productId, quantity }) => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        // First get or create cart
        let { data: cart } = await supabase
          .from('carts')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (!cart) {
          const { data: newCart, error: cartError } = await supabase
            .from('carts')
            .insert({ user_id: user.id })
            .select()
            .single();
          
          if (cartError) {
            console.log("Error creating cart in cartApi:", cartError);
            return { error: cartError };
          }
          cart = newCart;
        }

        if (!cart) {
          const error = new Error("Failed to get or create cart");
          console.log("Error: Cart not found or created in cartApi", error);
          return { error };
        }

        // Check if item exists
        const { data: existingItem } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('cart_id', cart.id)
          .eq('product_id', productId)
          .single()

        if (existingItem) {
          const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id)
            .select()
            .single()
          
          if (error) {
            console.log("Error updating cart item in cartApi:", error)
            return { error }
          }
          return { data }
        } else {
          const { data, error } = await supabase
            .from('cart_items')
            .insert({
              cart_id: cart.id,
              product_id: productId,
              quantity,
            })
            .select()
            .single()
          
          if (error) {
            console.log("Error inserting cart item in cartApi:", error)
            return { error }
          }
          return { data }
        }
      },
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation<void, string>({
      queryFn: async (itemId) => {
        const supabase = createClient()
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId)
        
        if (error) {
          console.log("Error removing from cart in cartApi:", error)
          return { error }
        }
        return { data: null as any }
      },
      invalidatesTags: ['Cart'],
    }),
    updateCartQuantity: builder.mutation<any, { itemId: string; quantity: number }>({
      queryFn: async ({ itemId, quantity }) => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId)
          .select()
          .single()
        
        if (error) {
          console.log("Error updating cart quantity in cartApi:", error)
          return { error }
        }
        return { data }
      },
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const { 
  useGetCartQuery, 
  useAddToCartMutation, 
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation
} = cartApi
