import styled from 'styled-components';
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from './Button';
import { Badge, Card, Grid, Input } from './ui';

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.space(6)};
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.06em;
`;

const Panel = styled(Card)`
  padding: ${({ theme }) => theme.space(4)};
  margin-bottom: ${({ theme }) => theme.space(4)};

  h2 { font-size: 1.125rem; margin-bottom: ${({ theme }) => theme.space(3)}; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th, td { padding: ${({ theme }) => theme.space(2)}; text-align: left; }

  th {
    color: ${({ theme }) => theme.colors.muted};
    overflow-wrap: anywhere;
  }

  button { width: 100%; padding-inline: 0; }
`;

const Examples = styled(Grid)`
  & > * { align-self: start; justify-self: start; }
`;

const ExampleInput = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.space(2)};
  width: 100%;
  font-size: 0.875rem;
`;

export function KitPreview() {
  return (
    <>
      <Title>UI-кит</Title>
      <Panel as="section" aria-labelledby="button-examples">
        <h2 id="button-examples">Варианты и размеры кнопок</h2>
        <Table aria-labelledby="button-examples">
          <thead>
            <tr>
              <th scope="col">Вариант</th>
              {BUTTON_SIZES.map((size) => <th key={size} scope="col">{size}</th>)}
            </tr>
          </thead>
          <tbody>
            {BUTTON_VARIANTS.map((variant) => (
              <tr key={variant}>
                <th scope="row">{variant}</th>
                {BUTTON_SIZES.map((size) => (
                  <td key={size}>
                    <Button variant={variant} size={size} aria-label={`Кнопка ${variant} ${size}`}>Кнопка</Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>
      <Panel as="section" aria-labelledby="other-examples">
        <h2 id="other-examples">Состояния и поля</h2>
        <Examples>
          <Button loading>Загрузка</Button>
          <Button variant="outline" disabled>Недоступно</Button>
          <Badge $tone="new">Новинка</Badge>
          <ExampleInput>
            Поле ввода
            <Input placeholder="Например, блокнот" />
          </ExampleInput>
        </Examples>
      </Panel>
    </>
  );
}
