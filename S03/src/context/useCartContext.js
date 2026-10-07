import { useContext } from 'react'
import CartContext from './CartContext.jsx'

function useCartContext() {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error('useCartContext must be used inside CartProvider')
  }

  return cart
}

export default useCartContext
