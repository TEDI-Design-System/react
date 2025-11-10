import { act, render, screen } from '@testing-library/react';

import { ThemeProvider, useTheme } from './theme-provider';

import '@testing-library/jest-dom';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  const TestComponent = () => {
    const { theme, setTheme } = useTheme();
    return (
      <div>
        <p data-testid="theme">{theme}</p>
        <button onClick={() => setTheme('dark')}>Set Dark</button>
      </div>
    );
  };

  it('renders with default theme when no initial theme is provided', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('default');
    expect(document.documentElement).toHaveClass('tedi-theme--default');
  });

  it('applies the provided initial theme correctly', () => {
    render(
      <ThemeProvider theme="rit">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('rit');
    expect(document.documentElement).toHaveClass('tedi-theme--rit');
  });

  it('loads theme from localStorage if available', () => {
    localStorage.setItem('tedi-theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('tedi-theme--dark');
  });

  it('updates theme and document classes when setTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Set Dark');

    act(() => {
      button.click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('tedi-theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('tedi-theme--dark');
    expect(document.documentElement).not.toHaveClass('tedi-theme--default');
  });

  it('removes previous theme classes when theme changes', () => {
    render(
      <ThemeProvider theme="default">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('tedi-theme--default');

    act(() => {
      screen.getByText('Set Dark').click();
    });

    expect(document.documentElement).toHaveClass('tedi-theme--dark');
    expect(document.documentElement).not.toHaveClass('tedi-theme--default');
    expect(document.documentElement).not.toHaveClass('tedi-theme--rit');
  });
});
