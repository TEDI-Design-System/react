'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type TEDITheme = 'default' | 'dark';
export type Theme = TEDITheme | string;

const THEME_CLASS_PREFIX = 'tedi-theme--';
const STORAGE_KEY = 'tedi-theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'default',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function getInitialTheme(initialTheme?: Theme): Theme {
  if (typeof window === 'undefined') {
    return initialTheme ?? 'default';
  }

  const fromStorage = localStorage.getItem(STORAGE_KEY);
  if (fromStorage) return fromStorage;

  const cookieMatch = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${STORAGE_KEY}=`))
    ?.split('=')[1];

  if (cookieMatch) return cookieMatch;

  return initialTheme ?? 'default';
}

export const ThemeProvider = ({ theme: initialTheme, children }: { theme?: Theme; children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(initialTheme));

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    for (let i = root.classList.length - 1; i >= 0; i--) {
      const cls = root.classList.item(i);
      if (cls?.startsWith(THEME_CLASS_PREFIX)) {
        root.classList.remove(cls);
      }
    }

    root.classList.add(`${THEME_CLASS_PREFIX}${theme}`);

    localStorage.setItem(STORAGE_KEY, theme);
    document.cookie = `${STORAGE_KEY}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
