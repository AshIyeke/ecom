import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productApi'
import { cartApi } from './api/cartApi'
import { orderApi } from './api/orderApi'
import { profileApi } from './api/profileApi'
import { reviewApi } from './api/reviewApi'
import localCartReducer from './localCartSlice'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    localCart: localCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware, 
      cartApi.middleware, 
      orderApi.middleware,
      profileApi.middleware,
      reviewApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
