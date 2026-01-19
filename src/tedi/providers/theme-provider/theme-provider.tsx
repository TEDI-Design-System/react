'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'dark' | 'rit' | 'muis';

const AVAILABLE_THEMES: Theme[] = ['default', 'dark', 'rit', 'muis'];
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

export const ThemeProvider = ({ theme: initialTheme, children }: { theme?: Theme; children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme !== undefined) {
      return initialTheme;
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved && AVAILABLE_THEMES.includes(saved)) {
        return saved;
      }
    }

    return 'default';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    AVAILABLE_THEMES.forEach((t) => {
      root.classList.toggle(`${THEME_CLASS_PREFIX}${t}`, t === theme);
    });

    localStorage.setItem(STORAGE_KEY, theme);
    document.cookie = `${STORAGE_KEY}=${theme};path=/;max-age=31536000`;
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (AVAILABLE_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
