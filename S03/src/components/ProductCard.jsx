import { memo } from 'react'

const ProductCard = memo(function ProductCard({ product, qty, onAdd, onRemove }) {
  console.log('render', product.id)

  return (
    <li className="product-card">
      <div>
        <h2>{product.title}</h2>
        <p className="product-price">{product.price} ₽</p>
        <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
          {product.inStock ? 'В наличии' : 'Нет в наличии'}
        </p>
      </div>
      {qty > 0 ? (
        <div className="product-actions">
          <button type="button" onClick={() => onAdd(product)}>
            В корзине: {qty}
          </button>
          <button type="button" className="secondary-button" onClick={() => onRemove(product.id)}>
            Убрать
          </button>
        </div>
      ) : (
        <button type="button" disabled={!product.inStock} onClick={() => onAdd(product)}>
          В корзину
        </button>
      )}
    </li>
  )
})

export default ProductCard
