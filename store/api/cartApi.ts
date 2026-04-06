import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUserCart, addToCart, removeFromCart, updateCartQuantity } from '@/lib/supabase/queries/cart'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      queryFn: async () => {
        try {
          const data = await getUserCart()
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<any, { productId: string; quantity: number }>({
      queryFn: async ({ productId, quantity }) => {
        try {
          const data = await addToCart(productId, quantity)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation<void, string>({
      queryFn: async (itemId) => {
        try {
          await removeFromCart(itemId)
          return { data: null as any }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ['Cart'],
    }),
    updateCartQuantity: builder.mutation<any, { itemId: string; quantity: number }>({
      queryFn: async ({ itemId, quantity }) => {
        try {
          const data = await updateCartQuantity(itemId, quantity)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
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
