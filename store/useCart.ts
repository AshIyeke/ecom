import { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } from './api/cartApi'

export const useCart = () => {
  const { data: cart, isLoading, error } = useGetCartQuery()
  const [addToCart] = useAddToCartMutation()
  const [removeFromCart] = useRemoveFromCartMutation()

  if (error) {
    console.log("Error from useGetCartQuery in useCart hook:", error)
  }

  const items = cart?.cart_items || []

  return {
    items,
    isLoading,
    error,
    addItem: async (product: any, quantity: number = 1) => {
      const productId = typeof product === 'string' ? product : product.id
      try {
        await addToCart({ productId, quantity }).unwrap()
      } catch (err) {
        console.log("Error adding to cart in useCart hook:", err)
      }
    },
    removeItem: async (id: string) => {
      try {
        await removeFromCart(id).unwrap()
      } catch (err) {
        console.log("Error removing from cart in useCart hook:", err)
      }
    },
  }
}
