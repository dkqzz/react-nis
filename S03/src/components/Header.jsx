function Header({ totalCount, totalPrice, onClear }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Каталог товаров</p>
        <h1>Магазин</h1>
      </div>

      <div className="cart-summary" role="status">
        <p>Корзина: {totalCount} шт. · {totalPrice} ₽</p>
        <button type="button" onClick={onClear}>
          Очистить
        </button>
      </div>
    </header>
  )
}

export default Header
