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

## Prop API

Check every public prop before it ships. Each one is API that consumers will depend on, so removing
it later is a breaking change.

- **Every prop has a consumer who needs it.** If its own JSDoc has to explain that it does nothing
  useful, delete the prop.
- **Match sibling components.** Compare with components in the same category: names, controlled
  and uncontrolled pairs (`value` / `defaultValue`), callback signatures (see Event Handler
  Conventions), and how helper text and feedback are passed.
- **Check parity with TEDI Angular** (`../angular/src/tedi/components/`) for names, units and
  defaults. Read the Angular source before writing down any claim about how Angular differs.
- **The documented `@default` is the real default.** A prop left `undefined` so a parent or context
  can supply it is documented as inheriting, not with the value it ends up resolving to.

## Comments and JSDoc

Apply the deletion test to every line: *if I delete this, what does the reader get wrong?* No
concrete answer means delete it.

**Prop JSDoc** is one sentence, at most three lines not counting block tags (`@default`,
`@deprecated`). A non-obvious default may get one clause of why. Leave out:

- How it works inside, such as which hook computes it. (With two class props, saying which part
  each one styles is fine.)
- Advice that applies to every React prop.
- The same caveat repeated on several props. If it applies to more than one, it belongs in the
  consumer skill once.
- Telling the consumer to use something else. That is composition guidance (`@deprecated` naming the replacement is the exception), so it
  goes in the
  consumer skill.
- Behaviour that is logically necessary, comparisons to other components, and restating the prop's
  name (`/** Disables the button. */` above `disabled`).

```tsx
// ❌
/**
 * Additional class names appended to the inner dropzone element
 * (`tedi-file-upload`) — the content area that holds the file list and the
 * upload button. Use this to tweak the dropzone itself (border, padding,
 * background) without affecting the surrounding container.
 */
className?: string;

// ✅
/** Class name for the dropzone, inside the outer container. */
className?: string;
```

**Comments in code and SCSS** explain a *why* the code can't show, in one line where possible. Don't
comment a variable, function or selector whose name already says what it does (`// Primary variant`
above `&--primary`).

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

### Example
```scss
.tedi-button {
  display: inline-flex;
  align-items: center;
  gap: var(--layout-grid-gutters-04);

  &__icon {
    flex-shrink: 0;
  }

  &--primary {
    background-color: var(--button-main-primary-background-default);
  }
}
```

## Testing and Storybook

Test patterns are in [testing.md](testing.md); story structure, controls and composition rules are in
[stories.md](stories.md).

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
1. Packages and absolute paths (`react`, `@floating-ui/react`)
2. Relative imports (`./`, `../`)
3. Side-effect imports

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
