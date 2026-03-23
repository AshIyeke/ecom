import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { createClient } from '@/lib/supabase/client'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: any[]; count: number }, { category?: string; search?: string; page?: number; limit?: number } | void>({
      queryFn: async (arg) => {
        const { category, search, page = 1, limit = 8 } = arg || {}
        const supabase = createClient()
        
        const from = (page - 1) * limit
        const to = from + limit - 1

        let query = supabase
          .from('products')
          .select('*, categories(name)', { count: 'exact' })
          .eq('is_published', true)

        if (category) {
          query = query.eq('category_id', category)
        }

        if (search) {
          query = query.ilike('name', `%${search}%`)
        }

        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(from, to)
        
        if (error) {
          console.log("Error fetching products in productApi:", error)
          return { error }
        }
        return { data: { products: data || [], count: count || 0 } }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }: { id: string }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' }
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProduct: builder.query<any, string>({
      queryFn: async (id) => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name)')
          .eq('id', id)
          .single()
        
        if (error) {
          console.log("Error fetching product in productApi:", error)
          return { error }
        }
        return { data }
      },
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productApi
