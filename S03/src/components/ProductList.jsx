import ProductCard from './ProductCard.jsx'

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="empty-state">Ничего не найдено</p>
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}

export default ProductList
