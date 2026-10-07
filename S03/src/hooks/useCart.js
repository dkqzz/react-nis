import { useCallback, useMemo, useReducer } from 'react'

const initialCart = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existingItem = state.items.find((item) => item.id === action.product.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }

      const { id, title, price } = action.product

      return {
        ...state,
        items: [...state.items, { id, title, price, qty: 1 }],
      }
    }
    case 'remove':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      }
    case 'clear':
      return initialCart
    default:
      return state
  }
}

function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  const add = useCallback((product) => dispatch({ type: 'add', product }), [])
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const totalCount = useMemo(
    () => cart.items.reduce((total, item) => total + item.qty, 0),
    [cart.items],
  )
  const totalPrice = useMemo(
    () => cart.items.reduce((total, item) => total + item.price * item.qty, 0),
    [cart.items],
  )

  return { ...cart, totalCount, totalPrice, add, remove, clear }
}

export default useCart
