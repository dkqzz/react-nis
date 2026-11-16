import { useEffect, useState } from 'react';
import { THEME_NAMES, type ThemeName } from './theme';

const STORAGE_KEY = 's05-theme';
const SYSTEM_QUERY = '(prefers-color-scheme: dark)';

function readPreference(): ThemeName | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return THEME_NAMES.find((name) => name === stored) ?? null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const [preference, setPreference] = useState(readPreference);
  const [systemTheme, setSystemTheme] = useState<ThemeName>(() =>
    window.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light',
  );
  const name = preference ?? systemTheme;

  useEffect(() => {
    const media = window.matchMedia(SYSTEM_QUERY);
    const sync = () => setSystemTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', sync);
    sync();
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = name;
  }, [name]);

  function chooseTheme(next: ThemeName) {
    setPreference(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // переключение работает и при недоступном хранилище
    }
  }

  return { name, chooseTheme };
}
