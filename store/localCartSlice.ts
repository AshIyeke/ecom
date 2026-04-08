import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface LocalCartItem {
  id: string; // This will be the product ID for local items
  product_id: string;
  quantity: number;
  products: Product;
}

interface LocalCartState {
  items: LocalCartItem[];
}

const initialState: LocalCartState = {
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('localCart') || '[]') : [],
};

const localCartSlice = createSlice({
  name: 'localCart',
  initialState,
  reducers: {
    addToLocalCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product_id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id, // For local cart, id and product_id can be the same
          product_id: product.id,
          quantity,
          products: product,
        });
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('localCart', JSON.stringify(state.items));
      }
    },
    removeFromLocalCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('localCart', JSON.stringify(state.items));
      }
    },
    updateLocalCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product_id === productId);
      if (item) {
        item.quantity = quantity;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('localCart', JSON.stringify(state.items));
      }
    },
    clearLocalCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('localCart');
      }
    },
  },
});

export const { addToLocalCart, removeFromLocalCart, updateLocalCartQuantity, clearLocalCart } = localCartSlice.actions;
export default localCartSlice.reducer;
