LabelProvider from @tedi-design-system/react. Use via `window.Tedi.LabelProvider` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `LabelProvider.html`): Default.

## Props

```ts
interface LabelProviderProps {
  /** Global labels that are use in components. If omitted then default labels are used based on `locale` prop. If both props are omitted then Estonian translations are used by default */
  labels?: TRecord | TediLabelValuesRecord;
  /** Currently used locale. Supported languages are:<br /> et - Estonian<br /> en - English<br /> ru - Russian */
  locale?: "et" | "en" | "ru";
  /** Rest of the App code */
  children: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default = {
  render: Template,

  args: {
    locale: 'en',
    labels: {
      close: {
        en: 'Close this',
      },
    },
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
