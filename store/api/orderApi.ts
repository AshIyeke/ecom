import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { createClient } from '@/lib/supabase/client'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<any[], void>({
      queryFn: async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return { data: [] }

        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              products (*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error("Error fetching orders:", error)
          return { error }
        }
        
        return { data: data || [] }
      },
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<any, string>({
      queryFn: async (orderId) => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              products (*)
            )
          `)
          .eq('id', orderId)
          .single()

        if (error) {
          console.error(`Error fetching order ${orderId}:`, error)
          return { error }
        }
        
        return { data }
      },
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
})

export const { useGetOrdersQuery, useGetOrderByIdQuery } = orderApi
