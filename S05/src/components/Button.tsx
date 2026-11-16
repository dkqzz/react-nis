import type { ComponentPropsWithoutRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

export const BUTTON_VARIANTS = ['primary', 'outline', 'ghost', 'danger'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

type Variant = (typeof BUTTON_VARIANTS)[number];
type Size = (typeof BUTTON_SIZES)[number];

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  loadingLabel?: string;
}

const variants = {
  primary: css`
    color: ${({ theme }) => theme.colors.onPrimary};
    background: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled, [aria-disabled='true']) { background: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  outline: css`
    color: ${({ theme }) => theme.colors.primary};
    border-color: currentColor;
    &:hover:not(:disabled, [aria-disabled='true']) { background: ${({ theme }) => theme.colors.accentSurface}; }
  `,
  ghost: css`
    color: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled, [aria-disabled='true']) { background: ${({ theme }) => theme.colors.accentSurface}; }
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.onDanger};
    background: ${({ theme }) => theme.colors.danger};
    &:hover:not(:disabled, [aria-disabled='true']) { background: ${({ theme }) => theme.colors.dangerHover}; }
  `,
};

const sizes = {
  sm: css`
    min-height: 36px;
    padding-inline: ${({ theme }) => theme.space(3)};
    font-size: 0.8125rem;
  `,
  md: css`
    min-height: 44px;
    padding-inline: ${({ theme }) => theme.space(4)};
    font-size: 0.875rem;
  `,
  lg: css`
    min-height: 52px;
    padding-inline: ${({ theme }) => theme.space(5)};
    font-size: 1rem;
  `,
};

const StyledButton = styled.button<{ $variant: Variant; $size: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.field};
  background: transparent;
  cursor: pointer;
  font-weight: 650;

  &:disabled, &[aria-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const Spinner = styled.span.attrs({ 'aria-hidden': true })`
  width: 0.9em;
  height: 0.9em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 600ms linear infinite;
`;

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingLabel = 'Загрузка…',
  disabled,
  onClick,
  'aria-disabled': ariaDisabled,
  'aria-busy': ariaBusy,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      {...rest}
      type={type}
      $variant={variant}
      $size={size}
      disabled={disabled}
      aria-disabled={loading || ariaDisabled}
      aria-busy={loading || ariaBusy}
      onClick={loading ? (event) => event.preventDefault() : onClick}
    >
      {loading ? <><Spinner />{loadingLabel}</> : children}
    </StyledButton>
  );
}
