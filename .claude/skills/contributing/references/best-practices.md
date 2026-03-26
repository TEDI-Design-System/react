# TEDI React Best Practices

Read before writing any component code.

## Component Architecture

### Standard Component
```tsx
export interface ComponentNameProps {
  // Props grouped: required first, then optional
}

export const ComponentName = (props: ComponentNameProps): JSX.Element => {
  const { prop1, prop2 = 'default', ...rest } = props;
  // hooks, state, computed values
  return <div className={styles['tedi-component-name']}>{/* ... */}</div>;
};

ComponentName.displayName = 'ComponentName';
export default ComponentName;
```

### ForwardRef Component
```tsx
export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  (props, ref): JSX.Element => {
    const { prop1, prop2 = 'default', ...rest } = props;
    return <div ref={ref} className={styles['tedi-component-name']}>{/* ... */}</div>;
  }
);

ComponentName.displayName = 'ComponentName';
export default ComponentName;
```

### Polymorphic Component (renders as different elements)
```tsx
const ComponentNameInner = forwardRef(
  <C extends React.ElementType = 'button'>(
    props: ComponentNameProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const { as, ...rest } = props;
    const Element = as || 'button';
    return <Element ref={ref} {...rest} />;
  }
);

ComponentNameInner.displayName = 'ComponentName';
export const ComponentName = ComponentNameInner as <C extends React.ElementType = 'button'>(
  props: ComponentNameProps<C> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null;
export default ComponentName;
```

### Breakpoint Support
```tsx
export const ComponentName = (props: BreakpointSupport<ComponentNameBreakpointProps>): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { size = 'default', variant = 'primary', ...rest } = getCurrentBreakpointProps(props);
  // ...
};
```

## Form Control Patterns

### Controlled + Uncontrolled Support
Every form component must support both modes:
```tsx
export const FormControl = (props: FormControlProps): JSX.Element => {
  const { value: externalValue, defaultValue, onChange, ...rest } = props;

  // Internal state for uncontrolled mode
  const [innerValue, setInnerValue] = React.useState(externalValue ?? defaultValue ?? '');

  // Use external value when controlled, internal when uncontrolled
  const value = React.useMemo(
    () => externalValue ?? innerValue,
    [externalValue, innerValue]
  );

  const handleChange = (newValue: string) => {
    if (typeof externalValue === 'undefined') {
      setInnerValue(newValue);
    }
    onChange?.(newValue);
  };

  return <input value={value} onChange={(e) => handleChange(e.target.value)} />;
};
```

### Choice Inputs (Checkbox, Radio)
```tsx
// Shared interface from choice-input.types.ts
const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);
const getChecked = React.useMemo((): boolean => {
  return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
}, [onChange, checked, innerChecked]);
```

### Event Handler Conventions
- Text inputs: `onChange?: (value: string) => void` + `onChangeEvent?: React.ChangeEventHandler`
- Choice inputs: `onChange?: (value: string, checked: boolean) => void`
- Select: returns `ISelectOption | ISelectOption[] | null`

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Component file | `kebab-case.tsx` | `button.tsx` |
| Component export | PascalCase | `Button` |
| Props interface | PascalCase + Props | `ButtonProps` |
| Types file | `kebab-case.types.ts` | `choice-input.types.ts` |
| Test file | `kebab-case.spec.tsx` | `button.spec.tsx` |
| Story file | `kebab-case.stories.tsx` | `button.stories.tsx` |
| SCSS module | `kebab-case.module.scss` | `button.module.scss` |
| CSS classes | BEM with `tedi-` prefix | `.tedi-button__icon--large` |
| Hooks | `use-kebab-case.ts` | `use-breakpoint-props.ts` |

## Styling

### CSS Modules + SCSS
- File naming: `component-name.module.scss`
- Import: `import styles from './component-name.module.scss';`
- Usage: `className={styles['tedi-component-name']}`
- BEM: `.tedi-block__element--modifier`
- Max nesting depth: 3 levels
- Use design tokens from `@tedi-design-system/core` — never hardcode colors
- Never use fallback values in CSS `var()` — write `var(--token-name)`, not `var(--token-name, fallback)`
- Use `@use '@tedi-design-system/core/bootstrap-utility/breakpoints'` for responsive styles
- No obvious comments — do not add comments that restate what a selector, class name, or variable already says (e.g., `// Primary variant` above `&--primary`, or `// Disabled state` above `&:disabled`). Only comment when the logic isn't self-evident.

### Example
```scss
.tedi-button {
  display: inline-flex;
  align-items: center;
  gap: var(--tedi-spacing-2);

  &__icon {
    flex-shrink: 0;
  }

  &--primary {
    background-color: var(--color-primary);
  }
}
```

## Testing Patterns

### Basic Component Test
```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ComponentName', () => {
  it('renders with default properties', () => {
    render(<ComponentName id="test" label="Test" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Mocking Breakpoint Hook
```tsx
jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

beforeEach(() => {
  (useBreakpointProps as jest.Mock).mockReturnValue({
    getCurrentBreakpointProps: jest.fn((props) => props),
  });
});
```

### Testing Form Controls
```tsx
it('calls onChange when value changes', () => {
  const handleChange = jest.fn();
  render(<TextField id="test" label="Test" onChange={handleChange} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new' } });
  expect(handleChange).toHaveBeenCalledWith('new');
});

it('works in uncontrolled mode', () => {
  render(<TextField id="test" label="Test" defaultValue="initial" />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('initial');
  fireEvent.change(input, { target: { value: 'updated' } });
  expect(input).toHaveValue('updated');
});
```

### Testing Controlled vs Uncontrolled
```tsx
it('changes state when clicked if not controlled', async () => {
  const TestComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Checkbox
        id="test"
        label="Test"
        defaultChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    );
  };

  render(<TestComponent />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  await act(async () => { fireEvent.click(checkbox); });
  expect(checkbox).toBeChecked();
});
```

### Query Priority
Use semantic queries in this order:
1. `getByRole` (preferred)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

## Storybook Stories

### Structure
```tsx
import { Meta, StoryFn, StoryObj } from '@storybook/react';

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
  title: 'TEDI-Ready/Components/Category/ComponentName',
  parameters: {
    status: { type: [{ name: 'breakpointSupport', url: '...' }] },
    design: { type: 'figma', url: 'https://www.figma.com/...' },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

const Template: StoryFn<ComponentNameProps> = (args) => <ComponentName {...args} />;

export const Default: Story = {
  render: Template,
  args: { children: 'Content' },
};
```

### Story Coverage
Every story file must include:
- **Default** — component with default props
- One story **per visual variant** (e.g., primary, secondary, ghost)
- One story **per significant state** (disabled, loading, error, empty)
- **Controlled examples** — form controls with React state
- Stories matching **all variants visible in Figma**

## Barrel Exports

### Simple Components (no index.ts needed)
Export directly from the component file:
```tsx
export const ComponentName = ...;
export default ComponentName;
```
Then add to `src/tedi/index.ts`:
```tsx
export * from './components/category/component-name/component-name';
```

### Complex Components (with sub-components)
Create `index.ts` in the component directory:
```tsx
export * from './component-name';
export * from './component-name.types';
export * from './sub-component/sub-component';
```
Then add to `src/tedi/index.ts`:
```tsx
export * from './components/category/component-name';
```

## Import Order
Enforced by `simple-import-sort`:
1. External packages (`react`, `@floating-ui/react`)
2. `@ria.*` scope imports
3. Relative imports (`./`, `../`)
4. Absolute imports
5. Side-effect imports

## Key File Locations

### Providers
- ThemeProvider: `src/tedi/providers/theme-provider/`
- StyleProvider: `src/tedi/providers/style-provider/`
- AccessibilityProvider: `src/tedi/providers/accessibility-provider/`
- LabelProvider: `src/tedi/providers/label-provider/`

### Helpers
- Breakpoint hook: `src/tedi/helpers/hooks/use-breakpoint-props.ts`
- Polymorphic types: `src/tedi/helpers/polymorphic/types.ts`
- Main index: `src/tedi/helpers/index.ts`

### Key Components
- Overlay (floating-ui wrapper): `src/tedi/components/overlays/overlay/`
- FormLabel (shared form label): `src/tedi/components/form/form-label/`
- FeedbackText (validation messages): `src/tedi/components/form/feedback-text/`

## Known Patterns
- Select wraps react-select with 14 custom component overrides
- Overlay components use floating-ui hooks: `useClick`, `useFocus`, `useHover`, `useDismiss`, `useRole`
- `useIsTouchDevice()` hook for touch-specific behavior in overlays
- `useLabels()` hook for internationalization
- `useScrollFade()` hook (`src/tedi/helpers/hooks/use-scroll-fade.ts`) for scroll containers with fade indicators — supports `direction: 'vertical' | 'horizontal'`, returns `canScrollStart`, `canScrollEnd`, `scrollRef` (callback ref with ResizeObserver), and `handleScroll`
- Do NOT reference `src/community/` components as examples — they are not always reviewed to TEDI standards
