import { useState, type MouseEventHandler } from 'react';
import styled from 'styled-components';
import { formatPrice } from '../products';
import { THEME_LABELS, THEME_NAMES, type ThemeName } from '../theme/theme';
import type { CartLine } from '../useCart';
import { Button } from './Button';
import { Card, Select } from './ui';

const Bar = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(4)};
  width: min(100%, 1248px);
  margin-inline: auto;
  padding: ${({ theme }) => theme.space(3)} clamp(1rem, 4vw, 2rem);
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.06em;
  text-decoration: none;
`;

const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.field};
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};

  &::before {
    content: '';
    width: 16px;
    height: 12px;
    border: 2px solid currentColor;
    border-top-width: 4px;
    border-radius: 2px 2px 5px 5px;
    transform: perspective(22px) rotateX(-14deg);
  }
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
`;

const NavLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 650;
  white-space: nowrap;
  text-underline-offset: 3px;
`;

const ThemeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8125rem;
`;

const ThemeSelect = styled(Select)`
  width: auto;
`;

const CartPanel = styled(Card)`
  width: min(calc(100% - 2rem), 480px);
  margin: ${({ theme }) => theme.space(4)} auto 0;
  padding: ${({ theme }) => theme.space(4)};

  h2 { margin-bottom: ${({ theme }) => theme.space(2)}; font-size: 1.125rem; }
  ul { margin: 0; padding-left: ${({ theme }) => theme.space(5)}; }
  li + li { margin-top: ${({ theme }) => theme.space(2)}; }
  ul + p { margin-top: ${({ theme }) => theme.space(3)}; font-weight: 700; }
`;

interface StoreHeaderProps {
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  onNavigate: MouseEventHandler<HTMLAnchorElement>;
  kit: boolean;
  count: number;
  lines: readonly CartLine[];
}

export function StoreHeader({ theme, onThemeChange, onNavigate, kit, count, lines }: StoreHeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Bar>
        <Row>
          <Brand href="./" onClick={onNavigate} aria-label="Полка, каталог">
            <BrandMark aria-hidden="true" />
            Полка
          </Brand>
          <Tools>
            <NavLink onClick={onNavigate} href={kit ? './' : '?view=ui'}>{kit ? 'Каталог' : 'UI-кит'}</NavLink>
            <ThemeLabel>
              Тема
              <ThemeSelect
                value={theme}
                onChange={(event) => {
                  const next = THEME_NAMES.find((name) => name === event.currentTarget.value);
                  if (next) onThemeChange(next);
                }}
              >
                {THEME_NAMES.map((name) => <option key={name} value={name}>{THEME_LABELS[name]}</option>)}
              </ThemeSelect>
            </ThemeLabel>
            {!kit && (
              <Button
                variant="outline"
                aria-expanded={cartOpen}
                aria-controls="cart"
                aria-label={`Корзина, ${count}`}
                onClick={() => setCartOpen((open) => !open)}
              >
                Корзина · {count}
              </Button>
            )}
          </Tools>
        </Row>
      </Bar>
      {!kit && (
        <CartPanel as="section" id="cart" aria-label="Содержимое корзины" hidden={!cartOpen}>
          <h2>Корзина</h2>
          {lines.length === 0 ? <p>Корзина пока пуста.</p> : (
            <>
              <ul>
                {lines.map(({ product, quantity }) => (
                  <li key={product.id}>{product.title} × {quantity}</li>
                ))}
              </ul>
              <p>Итого {formatPrice(lines.reduce((total, line) => total + line.product.price * line.quantity, 0))}</p>
            </>
          )}
        </CartPanel>
      )}
    </>
  );
}
