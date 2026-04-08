import { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartQuantityMutation } from './api/cartApi'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { addToLocalCart, removeFromLocalCart, updateLocalCartQuantity } from './localCartSlice'
import { useAuth } from './AuthContext'

export const useCart = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()
  
  // Remote Cart (for authenticated users)
  const { data: remoteCart, isLoading: isRemoteLoading, error: remoteError } = useGetCartQuery(undefined, { skip: !user })
  const [addToRemoteCart] = useAddToCartMutation()
  const [removeFromRemoteCart] = useRemoveFromCartMutation()
  const [updateRemoteQuantityMutation] = useUpdateCartQuantityMutation()

  // Local Cart (for guest users)
  const localCartItems = useSelector((state: RootState) => state.localCart.items)

  if (remoteError && user) {
    console.log("Error from useGetCartQuery in useCart hook:", remoteError)
  }

  const items = user ? (remoteCart?.cart_items || []) : localCartItems
  const isLoading = user ? isRemoteLoading : false

  return {
    items,
    isLoading,
    error: user ? remoteError : null,
    addItem: async (product: any, quantity: number = 1) => {
      if (user) {
        const productId = typeof product === 'string' ? product : product.id
        try {
          await addToRemoteCart({ productId, quantity }).unwrap()
        } catch (err) {
          console.log("Error adding to remote cart:", err)
        }
      } else {
        dispatch(addToLocalCart({ product, quantity }))
      }
    },
    removeItem: async (id: string) => {
      if (user) {
        try {
          await removeFromRemoteCart(id).unwrap()
        } catch (err) {
          console.log("Error removing from remote cart:", err)
        }
      } else {
        dispatch(removeFromLocalCart(id))
      }
    },
    updateQuantity: async (itemId: string, quantity: number) => {
      if (quantity < 1) return
      if (user) {
        try {
          await updateRemoteQuantityMutation({ itemId, quantity }).unwrap()
        } catch (err) {
          console.log("Error updating remote quantity:", err)
        }
      } else {
        dispatch(updateLocalCartQuantity({ productId: itemId, quantity }))
      }
    },
  }
}
