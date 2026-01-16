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

export const ThemeProvider = ({
  theme: initialTheme = 'default',
  children,
}: {
  theme?: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    root.className = root.className
      .replace(new RegExp(`${THEME_CLASS_PREFIX}\\w+`, 'g'), '')
      .replace(/\s+/g, ' ')
      .trim();

    root.classList.add(`${THEME_CLASS_PREFIX}${theme}`);
  }, [theme]);

  const setThemeAndPersist = useCallback((newTheme: Theme) => {
    if (!AVAILABLE_THEMES.includes(newTheme)) return;

    setTheme(newTheme);

    if (typeof document !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.cookie = `${STORAGE_KEY}=${newTheme};path=/;max-age=31536000`;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && AVAILABLE_THEMES.includes(saved)) {
      setTheme(saved);
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme: setThemeAndPersist }}>{children}</ThemeContext.Provider>;
};
