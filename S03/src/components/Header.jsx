import useCartContext from '../context/useCartContext.js'

function Header() {
  const { totalCount: cartTotalCount, totalPrice: cartTotalPrice, clear } = useCartContext()

  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Каталог товаров</p>
        <h1>Магазин</h1>
      </div>

      <div className="cart-summary" role="status">
        <p>Корзина: {cartTotalCount} шт. · {cartTotalPrice} ₽</p>
        <button type="button" onClick={clear}>
          Очистить
        </button>
      </div>
    </header>
  )
}

export default Header
