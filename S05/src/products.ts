export const CATEGORIES = {
  tech: 'Техника',
  home: 'Для дома',
  office: 'Канцелярия',
} as const;

export type Category = keyof typeof CATEGORIES;

export interface Product {
  id: number;
  title: string;
  category: Category;
  price: number;
  emoji: string;
  badge?: 'new' | 'deal';
}

export const PRODUCTS: readonly Product[] = [
  { id: 1, title: 'Беспроводные наушники', category: 'tech', price: 7990, emoji: '🎧', badge: 'new' },
  { id: 2, title: 'Настольная лампа', category: 'home', price: 2590, emoji: '💡' },
  { id: 3, title: 'Блокнот в точку', category: 'office', price: 490, emoji: '📓', badge: 'deal' },
  { id: 4, title: 'Механическая клавиатура', category: 'tech', price: 11490, emoji: '⌨️' },
  { id: 5, title: 'Керамическая кружка', category: 'home', price: 890, emoji: '☕' },
  { id: 6, title: 'Набор карандашей', category: 'office', price: 650, emoji: '✏️', badge: 'new' },
  { id: 7, title: 'Компактная колонка', category: 'tech', price: 3490, emoji: '🔊', badge: 'deal' },
  { id: 8, title: 'Горшок с суккулентом', category: 'home', price: 1290, emoji: '🪴' },
];

const rubles = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number) => rubles.format(price);
