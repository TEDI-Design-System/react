Section from @tedi-design-system/react. Use via `window.Tedi.Section` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Section.html`): Default, Section As Article, Section With Custom Id And ARIA.

## Props

```ts
interface SectionProps {
  /** Section content */
  children?: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Defines the HTML element to render (e.g., section, article, aside, etc.) */
  as?: "article" | "aside" | "div" | "section";
  /** ARIA role for accessibility */
  role?: string;
  /** Unique identifier for the section */
  id?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    children: (
      <VerticalSpacing>
        <Heading>Page title</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget convallis quam, eu rhoncus turpis.
          Vestibulum venenatis leo eget felis accumsan, in finibus metus tristique. Curabitur ac quam eu justo consequat
          efficitur quis eget purus. Donec blandit, augue in vehicula tempor, erat nulla tincidunt tellus, ut tincidunt
          purus dolor sed augue.
        </p>
      </VerticalSpacing>
    ),
    className: 'default-section',
  },
};

// Section As Article
export const SectionAsArticle: Story = {
  args: {
    as: 'article',
    children: (
      <VerticalSpacing>
        <Heading>Article Title</Heading>
        <p>
          This is a section rendered as an <code>article</code> element. It can be used to define sections of content
          that could stand independently.
        </p>
      </VerticalSpacing>
    ),
    className: 'article-section',
  },
};

// Section With Custom Id And ARIA
export const SectionWithCustomIdAndARIA: Story = {
  args: {
    as: 'section',
    id: 'custom-section',
    role: 'complementary',
    children: (
      <VerticalSpacing>
        <Heading id="section-heading">Custom Section with ARIA</Heading>
        <p>
          This section demonstrates the use of custom <code>id</code> and ARIA attributes for accessibility.
        </p>
      </VerticalSpacing>
    ),
    className: 'custom-section',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### SectionAsArticle

```jsx
/* Section As Article */ compose(S, "SectionAsArticle")
```

### SectionWithCustomIdAndARIA

```jsx
/* Section With Custom Id And ARIA */ compose(S, "SectionWithCustomIdAndARIA")
```
