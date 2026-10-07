import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import { products } from './data.js'

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

function App() {
  const [query, setQuery] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(normalizedQuery)
      const matchesStock = !onlyInStock || product.inStock

      return matchesQuery && matchesStock
    })
  }, [query, onlyInStock])

  const qtyById = useMemo(
    () => Object.fromEntries(cart.items.map((item) => [item.id, item.qty])),
    [cart.items],
  )
  const totalCount = cart.items.reduce((total, item) => total + item.qty, 0)
  const totalPrice = cart.items.reduce((total, item) => total + item.price * item.qty, 0)
  const onAdd = useCallback((product) => dispatch({ type: 'add', product }), [])
  const onRemove = useCallback((id) => dispatch({ type: 'remove', id }), [])

  return (
    <main className="app-shell">
      <Header
        totalCount={totalCount}
        totalPrice={totalPrice}
        onClear={() => dispatch({ type: 'clear' })}
      />

      <SearchBar
        inputRef={inputRef}
        query={query}
        onlyInStock={onlyInStock}
        onQueryChange={setQuery}
        onOnlyInStockChange={setOnlyInStock}
      />

      <p className="result-count" aria-live="polite">
        Найдено: {visibleProducts.length}
      </p>

      <ProductList
        products={visibleProducts}
        qtyById={qtyById}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </main>
  )
}

export default App
