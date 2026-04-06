import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getProfile, updateProfile } from '@/lib/supabase/queries/profiles'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      queryFn: async () => {
        try {
          const data = await getProfile()
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<any, {
      full_name?: string;
      shipping_address?: string;
      billing_address?: string;
      phone?: string;
      city?: string;
    }>({
      queryFn: async (profileData) => {
        try {
          const data = await updateProfile(profileData)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
