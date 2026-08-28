# Create New TEDI React Component

## Prerequisites

A Figma link MUST be provided: `$ARGUMENTS`

If no Figma link was provided, stop immediately and ask the user for one. Do not proceed without design reference.

## Step 1: Gather Context

1. Use `figma-desktop` MCP to fetch design context, screenshots, and metadata from the Figma link.
2. Check if TEDI Angular (`../angular/tedi/components/`) has an equivalent component — use as behavioral reference.
3. Check TEDI Core (`../core/src/`) for available design tokens and shared styles.

## Step 2: Plan

Enter plan mode and create a detailed plan covering:

- **Component name** and export name (PascalCase)
- **Category** — which folder under `src/tedi/components/` it belongs to
- **API design** — all props (with TypeScript types and defaults), children/render props
- **Controlled/uncontrolled** — if form component, both modes must be supported
- **Polymorphic** — does it need an `as` prop for different element types?
- **Breakpoint support** — does it need responsive prop overrides?
- **Accessibility** — ARIA roles, keyboard interactions, screen reader behavior, focus management
- **Dependencies** — existing TEDI components to reuse, third-party libraries if needed
- **File list** — every file to create
- **Test plan** — what to test (props, callbacks, states, keyboard, a11y)
- **Stories plan** — which stories to create (match all Figma variants). If the component uses
  composition (dot-notation sub-components), plan to expose the sub-components' props as live
  controls on the primary story via `subcomponentArgTypes` — see [stories.md](stories.md) §5.

If a new dependency is needed, stop and ask the user for permission.

## Step 3: Scaffold Files

Create the following files in `src/tedi/components/<category>/<component-name>/`:

```
component-name.tsx
component-name.spec.tsx
component-name.stories.tsx
component-name.module.scss   (if styles needed)
```

## Step 4: Implement

Follow all patterns from best-practices:
- forwardRef when the component needs ref forwarding
- Polymorphic pattern if it needs to render as different elements
- Controlled + uncontrolled if it's a form control
- CSS Modules with BEM SCSS, using design tokens
- `displayName` set on every exported component
- Full WCAG compliance (roles, keyboard nav, focus, aria attributes)

## Step 5: Export

Add export to `src/tedi/index.ts`:
```tsx
export * from './components/<category>/<component-name>/<component-name>';
```

## Step 6: Verify

1. Run tests: `npm test -- --testPathPattern="<component-name>"`
2. Fix any failures.
3. Run lint: `npm run lint`
4. Fix any lint errors.

## Step 7: Update Consumer Catalog

Update `skills/tedi-react/references/components.md` with the new component:
1. Add an entry to the appropriate section (TEDI-Ready or Community) with import path, key props, and a usage example.
2. Follow the format of existing entries in the file.
