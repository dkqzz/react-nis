import { useEffect, useRef, useState } from 'react';
import type { Product } from './products';

export interface CartLine {
  product: Product;
  quantity: number;
}

export function useCart() {
  const [lines, setLines] = useState<readonly CartLine[]>([]);
  const [pending, setPending] = useState<ReadonlySet<number>>(new Set());
  const [lastAdded, setLastAdded] = useState('');
  const timers = useRef(new Map<number, number>());

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  function add(product: Product) {
    if (timers.current.has(product.id)) return;

    const timer = window.setTimeout(() => {
      timers.current.delete(product.id);
      setPending(new Set(timers.current.keys()));
      setLines((current) => {
        const existing = current.find((line) => line.product.id === product.id);
        if (!existing) return [...current, { product, quantity: 1 }];
        return current.map((line) => line === existing ? { product, quantity: line.quantity + 1 } : line);
      });
      setLastAdded(product.title);
    }, 750);

    timers.current.set(product.id, timer);
    setPending(new Set(timers.current.keys()));
  }

  const count = lines.reduce((total, line) => total + line.quantity, 0);

  return {
    add,
    lines,
    pending,
    count,
    announcement: lastAdded ? `Добавлено в корзину: ${lastAdded}. Всего в корзине: ${count}.` : '',
  };
}
