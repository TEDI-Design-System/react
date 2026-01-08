'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

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
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, initialTheme);
      document.cookie = `${STORAGE_KEY}=${initialTheme};path=/;max-age=31536000`;
    }

    return initialTheme;
  });

  const setTheme = useCallback((newTheme: Theme) => {
    if (!AVAILABLE_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);

    if (typeof document === 'undefined') return;

    localStorage.setItem(STORAGE_KEY, newTheme);
    document.cookie = `${STORAGE_KEY}=${newTheme};path=/;max-age=31536000`;

    const root = document.documentElement;
    for (const t of AVAILABLE_THEMES) {
      root.classList.remove(`${THEME_CLASS_PREFIX}${t}`);
    }
    root.classList.add(`${THEME_CLASS_PREFIX}${newTheme}`);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
