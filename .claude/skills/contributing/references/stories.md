# Create TEDI React Storybook Stories

Target component: `$ARGUMENTS`

## Workflow

### 1. Understand the Component

1. Read the component's `.tsx` to understand all props, types, and variants.
2. **Figma is the source of truth for stories.** If the component or its stories file contains a Figma link, use `figma-desktop` MCP to fetch the design. If no link exists, ask the user for one.
3. Check if TEDI Angular (`../angular/tedi/components/`) has stories for the equivalent component — use as reference for story coverage.

### 2. Map Figma Sections to Stories

**Stories must match Figma 1:1 in order and naming.** Each distinct section/example in the Figma component page becomes a named story export:

| Figma section | Story export name |
|---|---|
| "Default" | `Default` |
| "With icon" | `WithIcon` |
| "With dropdown" | `WithDropdown` |
| "With status" | `WithStatus` |
| States showcase (default, hover, active, focus, disabled) | `States` |

Rules:
- **Same order** — export stories in the same top-to-bottom order as they appear in Figma.
- **Same examples** — reproduce the exact content/data shown in Figma (labels, placeholder text, number of items). Do not invent different example data.
- **Same variants** — if Figma shows 3 tabs with specific labels, use those exact labels.
- **States story** — if Figma has a states showcase (showing default, hover, active, focus, disabled side by side), create a `States` story that renders all states together using `storybook-addon-pseudo-states` parameters:
  ```tsx
  export const States: Story = {
    render: () => (
      <Row gutter={3}>
        <Col width="auto"><ComponentName>Default</ComponentName></Col>
        <Col width="auto"><ComponentName>Hover</ComponentName></Col>
        <Col width="auto"><ComponentName>Active</ComponentName></Col>
        <Col width="auto"><ComponentName>Focus</ComponentName></Col>
        <Col width="auto"><ComponentName disabled>Disabled</ComponentName></Col>
      </Row>
    ),
    parameters: {
      pseudo: {
        hover: '[data-name="component"]:nth-of-type(2)',
        active: '[data-name="component"]:nth-of-type(3)',
        focusVisible: '[data-name="component"]:nth-of-type(4)',
      },
    },
  };
  ```

### 3. Determine the Story Category

Map the component path to the Storybook title:

| Component path | Story title prefix |
|---|---|
| `src/tedi/components/form/` | `TEDI-Ready/Components/Form/` |
| `src/tedi/components/buttons/` | `TEDI-Ready/Components/Buttons/` |
| `src/tedi/components/overlays/` | `TEDI-Ready/Components/Overlays/` |
| `src/tedi/components/navigation/` | `TEDI-Ready/Components/Navigation/` |
| Other category | `TEDI-Ready/Components/<Category>/` |

### 4. Create the Stories File

Follow this structure:

```tsx
import { Meta, StoryFn, StoryObj } from '@storybook/react';

/**
 * <a href="https://www.figma.com/design/..." target="_BLANK">Figma ↗</a>
 */

export default {
  title: 'TEDI-Ready/Components/Category/ComponentName',
  component: ComponentName,
  subcomponents: { /* sub-components if compound */ } as never,
  parameters: {
    status: { type: [{ name: 'breakpointSupport', url: '...' }] },
    design: { type: 'figma', url: 'https://www.figma.com/...' },
    controls: { exclude: ['sm', 'md', 'lg', 'xl', 'xxl'] },
  },
} as Meta;

type Story = StoryObj;
```

### 5. Story Checklist

- [ ] Every Figma section has a corresponding story export, in the same order
- [ ] Example content (labels, data, item count) matches Figma exactly
- [ ] `Default` story has all controls wired up via `args`
- [ ] States story covers all visual states shown in Figma (default, hover, active, focus, disabled)
- [ ] Controlled example included if the component is a form control
- [ ] Figma link is in the meta `parameters.design` and in the JSDoc comment above `export default`
- [ ] When multiple instances of the same component appear in one story, use unique IDs per instance to avoid conflicts
- [ ] Use `CardContent` with `padding` prop to add content padding in story examples (components should not hardcode content padding)

### 6. Parameters Convention

```tsx
parameters: {
  status: { type: [{ name: 'breakpointSupport' }] },
  design: { type: 'figma', url: 'figma-url-here' },
  controls: { exclude: ['sm', 'md', 'lg', 'xl', 'xxl'] },
  pseudo: { hover: true },  // for pseudo-state stories
}
```

### 7. Verify

Run Storybook to visually confirm stories render correctly:
```
npm start
```

Check that:
- All stories appear in the correct category
- Story order matches Figma section order
- Example content matches Figma
- Controls work interactively
- No console errors
