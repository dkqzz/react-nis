export const products = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  title: `Товар ${index + 1}`,
  price: 100 + (index % 50) * 10,
  inStock: index % 3 !== 0,
}))
