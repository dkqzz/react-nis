function SearchBar({
  inputRef,
  query,
  onlyInStock,
  onQueryChange,
  onOnlyInStockChange,
}) {
  return (
    <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
      <label className="search-field" htmlFor="product-search">
        Поиск по названию
        <input
          id="product-search"
          ref={inputRef}
          type="search"
          placeholder="Поиск по названию"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <label className="stock-filter">
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(event) => onOnlyInStockChange(event.target.checked)}
        />
        Только в наличии
      </label>
    </form>
  )
}

export default SearchBar
