ThemeProvider from @tedi-design-system/react. Use via `window.Tedi.ThemeProvider` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ThemeProvider.html`): Default.

## Props

```ts
interface ThemeProviderProps {
  theme?: string;
  children: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default = {
  render: () => {
    const [globals, updateGlobals] = useGlobals();

    return (
      <ThemeProvider theme="default">
        <Text element="h3" color={globals.theme === 'dark' ? 'white' : 'primary'}>
          ThemeProvider Example
        </Text>
        <Text element="p" color={globals.theme === 'dark' ? 'white' : 'primary'}>
          Use the buttons below to toggle between default, dark, and RIT themes. The background and text colors should
          update according to the active theme.
        </Text>
        <ThemeSwitcher globals={globals} updateGlobals={updateGlobals} />
        <div style={{ marginTop: '2rem' }}>
          <Button>Primary Button</Button>
          <Button visualType="secondary" style={{ marginLeft: '1rem' }}>
            Secondary Button
          </Button>
        </div>
      </ThemeProvider>
    );
  },

  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```
