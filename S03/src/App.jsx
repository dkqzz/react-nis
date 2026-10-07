import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import useCart from './hooks/useCart.js'
import { products } from './data.js'

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef(null)
  const { items, totalCount, totalPrice, add, remove, clear } = useCart()

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

  const qtyById = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, item.qty])),
    [items],
  )

  function handleSearch(value) {
    setQuery(value)
    startTransition(() => setFilter(value))
  }

  return (
    <main className="app-shell">
      <Header
        totalCount={totalCount}
        totalPrice={totalPrice}
        onClear={clear}
      />

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

      <ProductList
        products={visibleProducts}
        qtyById={qtyById}
        onAdd={add}
        onRemove={remove}
      />
    </main>
  )
}

export default App
