'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'dark' | 'rit';

const AVAILABLE_THEMES: Theme[] = ['default', 'dark', 'rit'];
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
  theme: serverTheme = 'default',
  children,
}: {
  theme?: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] = useState<Theme>(serverTheme);

  const setTheme = useCallback((newTheme: Theme) => {
    if (!AVAILABLE_THEMES.includes(newTheme)) return;

    setThemeState(newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }

    document.cookie = `${STORAGE_KEY}=${newTheme};path=/;max-age=31536000`;

    AVAILABLE_THEMES.forEach((t) => document.documentElement.classList.remove(`${THEME_CLASS_PREFIX}${t}`));
    document.documentElement.classList.add(`${THEME_CLASS_PREFIX}${newTheme}`);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && stored !== theme) {
      setTheme(stored);
      return;
    }

    AVAILABLE_THEMES.forEach((t) => document.documentElement.classList.remove(`${THEME_CLASS_PREFIX}${t}`));
    document.documentElement.classList.add(`${THEME_CLASS_PREFIX}${theme}`);
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
