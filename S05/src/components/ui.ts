import styled, { css } from 'styled-components';

export const Card = styled.article`
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 3px 12px ${({ theme }) => theme.colors.shadow};
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space(5)};
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const field = css`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
  border: 1px solid ${({ theme }) => theme.colors.controlBorder};
  border-radius: ${({ theme }) => theme.radius.field};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9375rem;
`;

export const Input = styled.input`
  ${field}
  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 1;
  }
`;

export const Select = styled.select`
  ${field}
`;

export const Badge = styled.span<{ $tone: 'new' | 'deal' }>`
  display: inline-flex;
  padding: ${({ theme }) => theme.space(1)} ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, $tone }) => $tone === 'new' ? theme.colors.badgeNewText : theme.colors.badgeDealText};
  background: ${({ theme, $tone }) => $tone === 'new' ? theme.colors.badgeNew : theme.colors.badgeDeal};
  font-size: 0.6875rem;
  font-weight: 750;
  white-space: nowrap;
`;
