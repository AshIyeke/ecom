import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getOrders, getOrderById } from '@/lib/supabase/queries/orders'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const data = await getOrders()
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<any, string>({
      queryFn: async (orderId) => {
        try {
          const data = await getOrderById(orderId)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
})

export const { useGetOrdersQuery, useGetOrderByIdQuery } = orderApi
