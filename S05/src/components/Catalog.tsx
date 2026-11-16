import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CATEGORIES, PRODUCTS, type Product } from '../products';
import { Button } from './Button';
import { CatalogSkeleton } from './CatalogSkeleton';
import { ProductCard } from './ProductCard';
import { Card, Grid, Input, Select } from './ui';

const Title = styled.h1`
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  line-height: 1.06;
  letter-spacing: -0.07em;
`;

const Filters = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space(3)};
  margin: ${({ theme }) => theme.space(7)} 0 ${({ theme }) => theme.space(5)};

  @media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }
`;

const FieldLabel = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.space(2)};
  font-size: 0.875rem;
  font-weight: 650;
`;

const ResultsCount = styled.p`
  margin-bottom: ${({ theme }) => theme.space(3)};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

const EmptyState = styled(Card)`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(10)} ${({ theme }) => theme.space(4)};
  text-align: center;

  h2 { font-size: 1.25rem; }
  p { color: ${({ theme }) => theme.colors.muted}; }
`;

interface CatalogProps {
  pending: ReadonlySet<number>;
  onAdd: (product: Product) => void;
}

export function Catalog({ pending, onAdd }: CatalogProps) {
  const [products, setProducts] = useState<readonly Product[] | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const loading = products === null;

  useEffect(() => {
    // имитируем получение каталога, чтобы показать скелетоны
    const timer = window.setTimeout(() => setProducts(PRODUCTS), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');
  const visibleProducts = products?.filter((product) =>
    product.title.toLocaleLowerCase('ru-RU').includes(normalizedQuery) &&
    (!category || product.category === category),
  ) ?? [];

  function resetFilters() {
    setQuery('');
    setCategory('');
    searchInput.current?.focus();
  }

  return (
    <>
      <Title>Каталог товаров</Title>
      <Filters role="search" aria-label="Фильтры каталога">
        <FieldLabel>
          Поиск
          <Input
            ref={searchInput}
            type="search"
            placeholder="Например, наушники"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </FieldLabel>
        <FieldLabel>
          Категория
          <Select value={category} onChange={(event) => setCategory(event.currentTarget.value)}>
            <option value="">Все категории</option>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>
        </FieldLabel>
      </Filters>

      <ResultsCount role="status">
        {loading ? 'Загружаем товары…' : `Найдено: ${visibleProducts.length}`}
      </ResultsCount>
      <section aria-label="Товары" aria-busy={loading}>
        {loading ? <CatalogSkeleton /> : visibleProducts.length > 0 ? (
          <Grid>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} pending={pending.has(product.id)} onAdd={onAdd} />
            ))}
          </Grid>
        ) : (
          <EmptyState as="div">
            <h2>Ничего не найдено</h2>
            <p>Измените запрос или выберите другую категорию.</p>
            <Button variant="outline" onClick={resetFilters}>Сбросить фильтры</Button>
          </EmptyState>
        )}
      </section>
    </>
  );
}
