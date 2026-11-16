import { useEffect, useRef, useState, type MouseEvent } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { Catalog } from './components/Catalog';
import { KitPreview } from './components/KitPreview';
import { StoreHeader } from './components/StoreHeader';
import { GlobalStyle } from './theme/GlobalStyle';
import { themes } from './theme/theme';
import { useTheme } from './theme/useTheme';
import { useCart } from './useCart';

const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

const Announcement = styled.p`${visuallyHidden}`;

const SkipLink = styled.a`
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.surface};

  &:not(:focus) { ${visuallyHidden} padding: 0; }
`;

const Main = styled.main`
  width: min(100%, 1248px);
  margin-inline: auto;
  padding: clamp(1.75rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) 3rem;
`;

const isKitView = () => new URLSearchParams(window.location.search).get('view') === 'ui';

export function App() {
  const { name, chooseTheme } = useTheme();
  const { add, lines, pending, count, announcement } = useCart();
  const [kit, setKit] = useState(isKitView);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncLocation = () => setKit(isKitView());
    window.addEventListener('popstate', syncLocation);
    return () => window.removeEventListener('popstate', syncLocation);
  }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = event.currentTarget.href;
    if (url !== window.location.href) window.history.pushState(null, '', url);
    setKit(isKitView());
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }

  return (
    <ThemeProvider theme={themes[name]}>
      <GlobalStyle />
      <SkipLink href="#main">К содержимому</SkipLink>
      <StoreHeader theme={name} onThemeChange={chooseTheme} onNavigate={navigate} kit={kit} count={count} lines={lines} />
      <Main id="main" tabIndex={-1} ref={main}>
        {kit ? <KitPreview /> : <Catalog pending={pending} onAdd={add} />}
      </Main>
      <Announcement role="status" aria-atomic="true">{announcement}</Announcement>
    </ThemeProvider>
  );
}
