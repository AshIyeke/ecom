import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getReviews, createReview, updateReview, deleteReview } from '@/lib/supabase/queries/reviews'
import { Review } from '@/types/product'

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], string>({
      queryFn: async (productId) => {
        try {
          const data = await getReviews(productId)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: (result, error, productId) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({ type: 'Review' as const, id })),
              { type: 'Review', id: `LIST-${productId}` }
            ]
          : [{ type: 'Review', id: 'LIST' }],
    }),
    addReview: builder.mutation<Review, { product_id: string; rating: number; comment: string }>({
      queryFn: async (reviewData) => {
        try {
          const data = await createReview(reviewData)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: (result, error, { product_id }) => [
        { type: 'Review', id: `LIST-${product_id}` }
      ],
    }),
    updateReview: builder.mutation<Review, { id: string; product_id: string; rating: number; comment: string }>({
      queryFn: async ({ id, ...reviewData }) => {
        try {
          const data = await updateReview(id, reviewData)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: (result, error, { id, product_id }) => [
        { type: 'Review', id },
        { type: 'Review', id: `LIST-${product_id}` }
      ],
    }),
    deleteReview: builder.mutation<{ success: boolean }, { id: string; product_id: string }>({
      queryFn: async ({ id }) => {
        try {
          const data = await deleteReview(id)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: (result, error, { id, product_id }) => [
        { type: 'Review', id },
        { type: 'Review', id: `LIST-${product_id}` }
      ],
    }),
  }),
})

export const { useGetReviewsQuery, useAddReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } = reviewApi
