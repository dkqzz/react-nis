import { useMemo } from 'react'
import useCartContext from '../context/useCartContext.js'
import ProductCard from './ProductCard.jsx'

function ProductList({ products }) {
  const { items, add, remove } = useCartContext()
  const qtyById = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, item.qty])),
    [items],
  )

  if (products.length === 0) {
    return <p className="empty-state">Ничего не найдено</p>
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          qty={qtyById[product.id] ?? 0}
          onAdd={add}
          onRemove={remove}
        />
      ))}
    </ul>
  )
}

export default ProductList
