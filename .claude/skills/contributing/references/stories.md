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
  subcomponents: { /* sub-components if compound — also wire live controls, see §5 */ } as never,
  parameters: {
    status: { type: [{ name: 'breakpointSupport', url: '...' }] },
    design: { type: 'figma', url: 'https://www.figma.com/...' },
    controls: { exclude: ['sm', 'md', 'lg', 'xl', 'xxl'] },
  },
} as Meta;

type Story = StoryObj;
```

### 5. Compound Components — Live Subcomponent Controls

Storybook's Controls panel only binds live controls to the story's primary `component`.
Sub-components declared via `subcomponents` render a **documentation table** in autodocs but
get **no interactive controls**. For any compound/composition component (`Card.Header`,
`Modal.Content`, `Dropdown.Item`, …) use the shared helper at
`.storybook/subcomponent-controls.ts` so the sub-component's props become real controls.

**Use it whenever a new component uses composition** (a primary that renders dot-notation
sub-components) **and the sub-component exposes props the parent does not.**

Three exports:
- `subcomponentArgTypes(Component, { category, prefix, exclude?, include? })` — reads the
  sub-component's `__docgenInfo` and returns namespaced `argTypes` (keys like `content__width`)
  that render as live controls grouped under `category`.
- `getSubcomponentProps(args, prefix)` — in `render`, collects the namespaced values back into a
  props object to spread onto the sub-component.
- `getPrimaryComponentProps(args)` — returns the non-namespaced args (the primary component's own props).

**Always fold these controls into the primary/`Default` story — never create a separate
`Playground` story.** The primary story is what autodocs binds its `<Controls>` block to.

```tsx
import { getPrimaryComponentProps, getSubcomponentProps, subcomponentArgTypes } from '../../../../../.storybook/subcomponent-controls';

export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Card.Header, { category: 'Card.Header', prefix: 'header', exclude: ['children'] }),
    ...subcomponentArgTypes(Card.Content, { category: 'Card.Content', prefix: 'content', exclude: ['children'] }),
  },
  render: (args: Record<string, unknown>) => (
    <Card {...getPrimaryComponentProps<CardProps>(args)}>
      <Card.Header {...getSubcomponentProps(args, 'header')}>
        <Heading element="h3">Card title</Heading>
      </Card.Header>
      <Card.Content {...getSubcomponentProps(args, 'content')}>Description</Card.Content>
    </Card>
  ),
};
```

Rules:
- **One unique `prefix` per sub-component** in a story (it namespaces the args).
- **Exclude noise** — always exclude `children`; also exclude raw passthroughs and complex/internal
  props that don't make good knobs (`aria-*`, `initialFocus`, ref-like or object props such as
  `titleProps`/`closeProps`). Use `include: [...]` instead when only a few props are worth surfacing.
  Breakpoint keys (`xs`–`xxl`, `defaultServerBreakpoint`) and `style`/`ref`/`key` are excluded automatically.
- **Config/array-driven components** (a primary that takes an `items` array rather than JSX children,
  e.g. `ChoiceGroup`, or a repeated child like `Dropdown.Item`) still work: surface the sub-component's
  controls, then merge the flattened props into one representative item so the effect is visible:
  ```tsx
  const itemProps = getSubcomponentProps<Partial<ItemProps>>(args, 'item');
  // ...spread onto the middle item / every items[] entry
  ```
- **Skip it when the sub-component shares its entire prop surface with the parent.** If the
  sub-component has no distinct props (e.g. `TextGroup.List` exposes the same `type`/`labelAlign`/
  `labelWidth` as `TextGroup`), the generated controls only duplicate the parent's and render dead
  when the parent isn't on screen — make `Default` a plain single-component playground instead.

### 6. Story Checklist

- [ ] Every Figma section has a corresponding story export, in the same order
- [ ] Example content (labels, data, item count) matches Figma exactly
- [ ] `Default` story has all controls wired up via `args`
- [ ] Compound component? Sub-component props are live controls on the primary story via `subcomponentArgTypes` (not a separate `Playground`)
- [ ] States story covers all visual states shown in Figma (default, hover, active, focus, disabled)
- [ ] Controlled example included if the component is a form control
- [ ] Figma link is in the meta `parameters.design` and in the JSDoc comment above `export default`
- [ ] When multiple instances of the same component appear in one story, use unique IDs per instance to avoid conflicts
- [ ] Use `CardContent` with `padding` prop to add content padding in story examples (components should not hardcode content padding)

### 7. Parameters Convention

```tsx
parameters: {
  status: { type: [{ name: 'breakpointSupport' }] },
  design: { type: 'figma', url: 'figma-url-here' },
  controls: { exclude: ['sm', 'md', 'lg', 'xl', 'xxl'] },
  pseudo: { hover: true },  // for pseudo-state stories
}
```

### 8. Verify

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
