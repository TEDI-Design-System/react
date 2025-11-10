import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'dark' | 'rit';

const AVAILABLE_THEMES: Theme[] = ['default', 'dark', 'rit'];
const THEME_CLASS_PREFIX = 'tedi-theme--';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'default',
  setTheme: () => {},
});

export const ThemeProvider = ({
  theme: initialTheme = 'default',
  children,
}: {
  theme?: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('tedi-theme') as Theme) || initialTheme;
    }
    return initialTheme;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tedi-theme', newTheme);

      AVAILABLE_THEMES.forEach((themeName) => {
        document.documentElement.classList.remove(`${THEME_CLASS_PREFIX}${themeName}`);
      });

      document.documentElement.classList.add(`${THEME_CLASS_PREFIX}${newTheme}`);
    }
  };

  useEffect(() => {
    AVAILABLE_THEMES.forEach((themeName) => {
      document.documentElement.classList.remove(`${THEME_CLASS_PREFIX}${themeName}`);
    });

    document.documentElement.classList.add(`${THEME_CLASS_PREFIX}${theme}`);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
