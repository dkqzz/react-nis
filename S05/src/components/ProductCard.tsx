import styled from 'styled-components';
import { CATEGORIES, formatPrice, type Category, type Product } from '../products';
import { Button } from './Button';
import { Badge, Card } from './ui';

const mediaToken = {
  tech: 'mediaTech',
  home: 'mediaHome',
  office: 'mediaOffice',
} as const;

export const ProductFrame = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space(3)};
`;

export const ProductMedia = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 154px;
  isolation: isolate;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.field};
`;

const Illustration = styled(ProductMedia)<{ $category: Category }>`
  background: ${({ theme, $category }) => theme.colors[mediaToken[$category]]};

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 106px;
    aspect-ratio: 1;
    border: 1px solid ${({ theme }) => theme.colors.mediaAccent};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mediaAccent};
    box-shadow: 0 0 0 14px ${({ theme }) => theme.colors.mediaAccent};
  }
`;

const Emoji = styled.span`
  display: block;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
  font-size: 62px;
  line-height: 1.2;
  transform: rotate(-8deg);
`;

const BadgePosition = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space(2)};
  left: ${({ theme }) => theme.space(2)};
`;

export const ProductContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(1)} ${({ theme }) => theme.space(1)};
`;

const CategoryLabel = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
`;

const ProductName = styled.h2`
  font-size: 1rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

export const ProductBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space(3)};
`;

const Price = styled.span`
  font-size: 1.125rem;
  font-weight: 750;
  letter-spacing: -0.035em;
  white-space: nowrap;
`;

const AddButton = styled(Button)`
  min-inline-size: 7rem;
`;

const badgeLabel = { new: 'Новинка', deal: 'Скидка' };

interface ProductCardProps {
  product: Product;
  pending: boolean;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, pending, onAdd }: ProductCardProps) {
  const titleId = `product-${product.id}`;

  return (
    <ProductFrame aria-labelledby={titleId}>
      <Illustration $category={product.category}>
        <Emoji aria-hidden="true">{product.emoji}</Emoji>
        {product.badge && (
          <BadgePosition>
            <Badge $tone={product.badge}>{badgeLabel[product.badge]}</Badge>
          </BadgePosition>
        )}
      </Illustration>
      <ProductContent>
        <CategoryLabel>{CATEGORIES[product.category]}</CategoryLabel>
        <ProductName id={titleId}>{product.title}</ProductName>
        <ProductBottom>
          <Price>{formatPrice(product.price)}</Price>
          <AddButton
            size="sm"
            loading={pending}
            loadingLabel="Добавляем…"
            aria-label={`${pending ? 'Добавляем…' : 'В корзину'} ${product.title}`}
            onClick={() => onAdd(product)}
          >
            В корзину
          </AddButton>
        </ProductBottom>
      </ProductContent>
    </ProductFrame>
  );
}
