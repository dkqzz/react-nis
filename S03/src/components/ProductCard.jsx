function ProductCard({ product }) {
  return (
    <li className="product-card">
      <div>
        <h2>{product.title}</h2>
        <p className="product-price">{product.price} ₽</p>
        <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
          {product.inStock ? 'В наличии' : 'Нет в наличии'}
        </p>
      </div>
      <button type="button" disabled={!product.inStock}>
        В корзину
      </button>
    </li>
  )
}

export default ProductCard
