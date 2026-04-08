"use client";

import { useEffect } from 'react';
import { useAuth } from '@/store/AuthContext';
import { useCart } from '@/store/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { clearLocalCart } from '@/store/localCartSlice';

export default function CartSync() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const localCartItems = useSelector((state: RootState) => state.localCart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && localCartItems.length > 0) {
      const syncCart = async () => {
        // Copy items and clear local cart to prevent multiple triggers
        const itemsToSync = [...localCartItems];
        dispatch(clearLocalCart());

        for (const item of itemsToSync) {
          try {
            await addItem(item.products, item.quantity);
          } catch (error) {
            console.error("Failed to sync item to remote cart:", item.product_id, error);
          }
        }
      };

      syncCart();
    }
  }, [user, localCartItems.length, addItem, dispatch]);

  return null;
}
