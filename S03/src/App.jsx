import { useEffect, useMemo, useRef, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import { products } from './data.js'

function App() {
  const [query, setQuery] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
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

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Каталог товаров</p>
        <h1>Магазин</h1>
      </header>

      <SearchBar
        inputRef={inputRef}
        query={query}
        onlyInStock={onlyInStock}
        onQueryChange={setQuery}
        onOnlyInStockChange={setOnlyInStock}
      />

      <p className="result-count" role="status">
        Найдено: {visibleProducts.length}
      </p>

      <ProductList products={visibleProducts} />
    </main>
  )
}

export default App
