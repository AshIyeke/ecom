import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getOrders, getOrderById, updateOrderStatus } from '@/lib/supabase/queries/orders'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<any[], boolean | void>({
      queryFn: async (isAdmin) => {
        try {
          const data = await getOrders(!!isAdmin)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getOrderById: builder.query<any, { orderId: string; isAdmin?: boolean }>({
      queryFn: async ({ orderId, isAdmin }) => {
        try {
          const data = await getOrderById(orderId, !!isAdmin)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),
    updateOrderStatus: builder.mutation<any, { orderId: string; status: string }>({
      queryFn: async ({ orderId, status }) => {
        try {
          const data = await updateOrderStatus(orderId, status)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetOrdersQuery, useGetOrderByIdQuery, useUpdateOrderStatusMutation } = orderApi
