import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getProducts, getProduct, createProduct, uploadProductImage, updateProduct, deleteProduct } from '@/lib/supabase/queries/products'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: any[]; count: number }, { category?: string; search?: string; page?: number; limit?: number; isPublished?: boolean | null; isAdmin?: boolean; stockStatus?: "all" | "low" | "out" } | void>({
      queryFn: async (arg) => {
        try {
          const data = await getProducts(arg || {})
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
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
        try {
          const data = await getProduct(id)
          return { data }
        } catch (error: any) {
          return { error: { status: 500, data: error.message } }
        }
      },
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    addProduct: builder.mutation<any, {
      name: string;
      description?: string;
      price: number;
      category_id: string;
      image: File;
      is_published?: boolean;
      stock: number;
    }>({
      queryFn: async ({ image, ...productData }) => {
        try {
          const image_url = await uploadProductImage(image);
          const data = await createProduct({
            ...productData,
            image_url,
          });
          return { data };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<any, {
      id: string;
      productData: {
        name?: string;
        description?: string;
        price?: number;
        category_id?: string;
        image?: File;
        is_published?: boolean;
        stock?: number;
      };
    }>({
      queryFn: async ({ id, productData: { image, ...rest } }) => {
        try {
          let image_url = undefined;
          if (image) {
            image_url = await uploadProductImage(image);
          }
          const data = await updateProduct(id, {
            ...rest,
            ...(image_url && { image_url }),
          });
          return { data };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' }
      ],
    }),
    deleteProduct: builder.mutation<any, string>({
      queryFn: async (id) => {
        try {
          const data = await deleteProduct(id);
          return { data };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi
