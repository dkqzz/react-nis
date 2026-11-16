import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => theme.scheme};
    font-family: 'Inter Variable', Inter, system-ui, sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    font-synthesis: none;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  h1, h2, h3, p { margin: 0; }
  button, input, select { font: inherit; }
  a { color: inherit; }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;
