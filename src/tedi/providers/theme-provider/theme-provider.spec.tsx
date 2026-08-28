import { act, render, screen } from '@testing-library/react';

import { Theme, ThemeProvider, useTheme } from './theme-provider';

import '@testing-library/jest-dom';

Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = 'tedi-theme--default';
    document.cookie = '';
  });

  const TestComponent = () => {
    const { theme, setTheme } = useTheme();

    return (
      <div>
        <p data-testid="theme">{theme}</p>
        <button onClick={() => setTheme('dark')}>Set Dark</button>
        <button onClick={() => setTheme('rit')}>Set Rit</button>
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
    expect(localStorage.getItem('tedi-theme')).toBe('default');
    expect(document.cookie).toContain('tedi-theme=default');
  });

  it('applies the provided initial theme correctly', () => {
    render(
      <ThemeProvider theme="default">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('default');
    expect(document.documentElement).toHaveClass('tedi-theme--default');
    expect(localStorage.getItem('tedi-theme')).toBe('default');
    expect(document.cookie).toContain('tedi-theme=default');
  });

  it('uses theme from localStorage over provided prop theme', () => {
    localStorage.setItem('tedi-theme', 'dark');

    render(
      <ThemeProvider theme="default">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('tedi-theme--dark');
    expect(localStorage.getItem('tedi-theme')).toBe('dark');
    expect(document.cookie).toContain('tedi-theme=dark');
  });

  it('updates theme and document classes when setTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Set Dark').click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('tedi-theme')).toBe('dark');
    expect(document.cookie).toContain('tedi-theme=dark');
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

    act(() => {
      screen.getByText('Set Rit').click();
    });

    expect(document.documentElement).toHaveClass('tedi-theme--rit');
    expect(document.documentElement).not.toHaveClass('tedi-theme--default');
    expect(document.documentElement).not.toHaveClass('tedi-theme--dark');
  });

  it('updates localStorage and cookie when theme changes', () => {
    render(
      <ThemeProvider theme="default">
        <TestComponent />
      </ThemeProvider>
    );

    expect(localStorage.getItem('tedi-theme')).toBe('default');
    expect(document.cookie).toContain('tedi-theme=default');

    act(() => {
      screen.getByText('Set Rit').click();
    });

    expect(localStorage.getItem('tedi-theme')).toBe('rit');
    expect(document.cookie).toContain('tedi-theme=rit');
  });

  it('allows custom theme values', () => {
    const TestComponentWithCustomTheme = () => {
      const { theme, setTheme } = useTheme();

      return (
        <div>
          <p data-testid="theme">{theme}</p>
          <button onClick={() => setTheme('invalid' as Theme)}>Set Custom</button>
        </div>
      );
    };

    render(
      <ThemeProvider theme="default">
        <TestComponentWithCustomTheme />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Set Custom').click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('invalid');
    expect(document.documentElement).toHaveClass('tedi-theme--invalid');
    expect(localStorage.getItem('tedi-theme')).toBe('invalid');
    expect(document.cookie).toContain('tedi-theme=invalid');
  });
});
