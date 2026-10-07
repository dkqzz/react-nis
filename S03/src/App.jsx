import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import Header from './components/Header.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import CartProvider from './context/CartProvider.jsx'
import { products } from './data.js'

function Catalog() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const visibleProducts = useMemo(() => {
    const normalizedQuery = filter.trim().toLowerCase()

    return products.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(normalizedQuery)
      const matchesStock = !onlyInStock || product.inStock

      return matchesQuery && matchesStock
    })
  }, [filter, onlyInStock])

  function handleSearch(value) {
    setQuery(value)
    startTransition(() => setFilter(value))
  }

  return (
    <main className="app-shell">
      <Header />

      <SearchBar
        inputRef={inputRef}
        query={query}
        onlyInStock={onlyInStock}
        onQueryChange={handleSearch}
        onOnlyInStockChange={setOnlyInStock}
      />

      {isPending && <p className="pending-indicator">Обновляем список…</p>}

      <p className="result-count" aria-live="polite">
        Найдено: {visibleProducts.length}
      </p>

      <ErrorBoundary>
        <ProductList products={visibleProducts} />
      </ErrorBoundary>
    </main>
  )
}

function App() {
  return (
    <CartProvider>
      <Catalog />
    </CartProvider>
  )
}

export default App
