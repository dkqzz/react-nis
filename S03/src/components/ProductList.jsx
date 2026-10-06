import ProductCard from './ProductCard.jsx'

function ProductList({ products, qtyById, onAdd, onRemove }) {
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
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}

export default ProductList
