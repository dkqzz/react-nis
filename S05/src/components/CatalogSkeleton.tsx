import styled, { css, keyframes } from 'styled-components';
import { ProductBottom, ProductContent, ProductFrame, ProductMedia } from './ProductCard';
import { Grid } from './ui';

const sweep = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`;

const placeholder = css`
  background: linear-gradient(
    100deg,
    ${({ theme }) => theme.colors.skeleton} 32%,
    ${({ theme }) => theme.colors.shimmer} 48%,
    ${({ theme }) => theme.colors.skeleton} 64%
  );
  background-size: 220% 100%;
  animation: ${sweep} 1350ms linear infinite;
`;

const MediaSkeleton = styled(ProductMedia)`${placeholder}`;

const Line = styled.span<{ $width: string; $height: number }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height}px;
  border-radius: ${({ theme }) => theme.radius.field};
  ${placeholder}
`;

export function CatalogSkeleton() {
  return (
    <Grid aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <ProductFrame as="div" key={index}>
          <MediaSkeleton />
          <ProductContent>
            <Line $width="28%" $height={16} />
            <Line $width="75%" $height={21} />
            <ProductBottom>
              <Line $width="25%" $height={22} />
              <Line $width="7rem" $height={36} />
            </ProductBottom>
          </ProductContent>
        </ProductFrame>
      ))}
    </Grid>
  );
}
