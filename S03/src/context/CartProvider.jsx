import useCart from '../hooks/useCart.js'
import CartContext from './CartContext.jsx'

function CartProvider({ children }) {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export default CartProvider
